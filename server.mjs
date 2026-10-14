// Production server for Render (or any Node host). Serves the Vite build in ./dist
// with long-lived caching for hashed assets, compression, security headers and an
// SPA fallback so client-side routes resolve to index.html. No dependencies.
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pipeline } from 'node:stream'
import { createBrotliCompress, createGzip } from 'node:zlib'

const DIST = fileURLToPath(new URL('./dist/', import.meta.url))
const PORT = Number(process.env.PORT) || 10000
const HOST = process.env.HOST || '0.0.0.0'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
}
const COMPRESSIBLE = new Set(['.html', '.js', '.css', '.json', '.svg', '.txt', '.xml', '.webmanifest'])

const SECURITY_HEADERS = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self'",
    // Motion writes inline style attributes for animations.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join('; '),
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
}

/** Resolves a URL path to a file inside dist, or null if it escapes dist or doesn't exist. */
async function resolveFile(pathname) {
  let decoded
  try {
    decoded = decodeURIComponent(pathname)
  } catch {
    return null
  }
  const target = normalize(join(DIST, decoded))
  if (target !== DIST.slice(0, -1) && !target.startsWith(DIST)) return null
  try {
    const info = await stat(target)
    if (info.isFile()) return { path: target, size: info.size }
    if (info.isDirectory()) return resolveFile(decoded.replace(/\/?$/, '/index.html'))
  } catch {
    // Not found.
  }
  return null
}

function cacheControl(pathname) {
  if (pathname.startsWith('/assets/')) return 'public, max-age=31536000, immutable' // content-hashed by Vite
  if (pathname.endsWith('.html') || pathname === '/') return 'no-cache'
  return 'public, max-age=86400'
}

function send(req, res, status, file, pathname) {
  const ext = extname(file.path).toLowerCase()
  const headers = {
    ...SECURITY_HEADERS,
    'Content-Type': MIME[ext] ?? 'application/octet-stream',
    'Cache-Control': cacheControl(pathname),
    Vary: 'Accept-Encoding',
  }

  const accepts = String(req.headers['accept-encoding'] ?? '')
  const encoder = !COMPRESSIBLE.has(ext)
    ? null
    : /\bbr\b/.test(accepts)
      ? ['br', createBrotliCompress]
      : /\bgzip\b/.test(accepts)
        ? ['gzip', createGzip]
        : null

  if (encoder) headers['Content-Encoding'] = encoder[0]
  else headers['Content-Length'] = file.size

  res.writeHead(status, headers)
  if (req.method === 'HEAD') return res.end()

  const source = createReadStream(file.path)
  const onError = (err) => {
    if (err) res.destroy(err)
  }
  if (encoder) pipeline(source, encoder[1](), res, onError)
  else pipeline(source, res, onError)
}

const server = createServer(async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' }).end()
    return
  }

  const { pathname } = new URL(req.url ?? '/', 'http://localhost')

  if (pathname === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }).end('ok')
    return
  }

  const file = await resolveFile(pathname)
  if (file) return send(req, res, 200, file, pathname)

  // Missing files with an extension (e.g. /assets/old-hash.js) are real 404s;
  // anything else is a client-side route and gets the app shell.
  if (extname(pathname)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8', ...SECURITY_HEADERS }).end('Not found')
    return
  }
  const shell = await resolveFile('/index.html')
  if (!shell) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Build missing: run the build first.')
    return
  }
  send(req, res, 200, shell, '/index.html')
})

server.listen(PORT, HOST, () => {
  console.log(`ESAMI site listening on http://${HOST}:${PORT}`)
})

// Render sends SIGTERM on deploys and restarts; finish in-flight requests first.
for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => {
    server.close(() => process.exit(0))
    setTimeout(() => process.exit(0), 10_000).unref()
  })
}
