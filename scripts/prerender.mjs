// Runs after the client and SSR builds. Bakes the rendered app and all SEO tags into
// dist/index.html, writes dist/404.html, robots.txt and sitemap.xml.
// index.html must contain the <!--seo-head--> and <!--app-html--> markers; the <title>
// there is only the dev-server fallback and is replaced here.
// The public URL comes from SITE_URL, falling back to seo.defaultSiteUrl in src/content/site.ts.
import { readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const dist = `${root}dist`
const serverDir = `${root}dist-server`

const { render, structuredData, seo, company } = await import(pathToFileURL(`${serverDir}/entry-server.js`).href)
const siteUrl = (process.env.SITE_URL || seo.defaultSiteUrl).replace(/\/+$/, '')
const template = await readFile(`${dist}/index.html`, 'utf8')
const assets = await readdir(`${dist}/assets`)

const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escapeText = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// JSON inside <script> must not be able to close the tag.
const safeJson = (data) => JSON.stringify(data).replace(/</g, '\\u003c')

// Preload the two Latin font files the first screen needs, so text paints in the right face sooner.
const fontPreloads = [/^newsreader-latin-opsz-normal-.*\.woff2$/, /^jost-latin-wght-normal-.*\.woff2$/]
  .map((pattern) => assets.find((file) => pattern.test(file)))
  .filter(Boolean)
  .map((file) => `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`)

function headTags({ title, description, path, indexable }) {
  const url = `${siteUrl}${path}`
  const image = `${siteUrl}/og-image.png`
  const tags = [
    `<meta name="description" content="${escapeAttr(description)}" />`,
    `<meta name="robots" content="${indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow'}" />`,
    ...fontPreloads,
  ]
  if (indexable) {
    tags.push(
      `<link rel="canonical" href="${escapeAttr(url)}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:site_name" content="${escapeAttr(company.legalName)}" />`,
      `<meta property="og:locale" content="${seo.locale}" />`,
      `<meta property="og:url" content="${escapeAttr(url)}" />`,
      `<meta property="og:title" content="${escapeAttr(seo.shareTitle)}" />`,
      `<meta property="og:description" content="${escapeAttr(seo.shareDescription)}" />`,
      `<meta property="og:image" content="${escapeAttr(image)}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="${escapeAttr(`${company.legalName} logo`)}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${escapeAttr(seo.shareTitle)}" />`,
      `<meta name="twitter:description" content="${escapeAttr(seo.shareDescription)}" />`,
      `<meta name="twitter:image" content="${escapeAttr(image)}" />`,
      `<script type="application/ld+json">${safeJson(structuredData(siteUrl))}</script>`,
    )
  }
  return tags.map((tag) => `    ${tag}`).join('\n')
}

function page({ url, title, description, indexable }) {
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeText(title)}</title>`)
    .replace('<!--seo-head-->', headTags({ title, description, path: url, indexable }).trimStart())
    .replace('<!--app-html-->', render(url))
  if (html.includes('<!--app-html-->') || html.includes('<!--seo-head-->')) {
    throw new Error('index.html is missing its prerender markers')
  }
  return html
}

await writeFile(
  `${dist}/index.html`,
  page({ url: '/', title: seo.title, description: seo.description, indexable: true }),
)
await writeFile(
  `${dist}/404.html`,
  page({ url: '/404', title: seo.notFoundTitle, description: seo.description, indexable: false }),
)

await writeFile(
  `${dist}/robots.txt`,
  ['User-agent: *', 'Allow: /', '', `Sitemap: ${siteUrl}/sitemap.xml`, ''].join('\n'),
)
await writeFile(
  `${dist}/sitemap.xml`,
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    `  <url><loc>${siteUrl}/</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>`,
    '</urlset>',
    '',
  ].join('\n'),
)

await rm(serverDir, { recursive: true, force: true })
console.log(`Prerendered / and 404 for ${siteUrl}`)
