// Regenerates the icons and social share image in ./public from the EsamiMark component.
// Usage: node scripts/generate-brand-assets.mjs   (needs Microsoft Edge for rasterising)
// Commit the output; the normal build does not run this.
import { chromium } from 'playwright-core'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const root = fileURLToPath(new URL('..', import.meta.url))
const pub = `${root}public`

const vite = await createServer({ root, server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const { renderMarkSvg, company, seo } = await vite.ssrLoadModule('/src/entry-server.tsx')
await vite.close()

const markBrand = renderMarkSvg('brand')
const markLight = renderMarkSvg('onDark')
await writeFile(`${pub}/favicon.svg`, markBrand)

// Fonts are embedded as data URLs so the share image uses the real brand faces.
const fontData = async (path) =>
  `data:font/woff2;base64,${(await readFile(`${root}node_modules/${path}`)).toString('base64')}`
const newsreader = await fontData('@fontsource-variable/newsreader/files/newsreader-latin-opsz-normal.woff2')
const jost = await fontData('@fontsource-variable/jost/files/jost-latin-wght-normal.woff2')

const icon = (size, padding, background) => `<!doctype html><html><body style="margin:0">
  <div style="width:${size}px;height:${size}px;display:grid;place-items:center;background:${background}">
    <div style="width:${size - padding * 2}px;height:${size - padding * 2}px">${background === 'transparent' ? markBrand : markLight}</div>
  </div></body></html>`

const shareImage = `<!doctype html><html><head><style>
  @font-face { font-family: Newsreader; src: url(${newsreader}) format('woff2'); font-weight: 200 800; }
  @font-face { font-family: Jost; src: url(${jost}) format('woff2'); font-weight: 100 900; }
  body { margin: 0; }
  .card { width: 1200px; height: 630px; box-sizing: border-box; padding: 72px 80px; display: grid;
    grid-template-columns: 1fr 360px; gap: 48px; align-items: center; color: #fff;
    background:
      radial-gradient(520px 420px at 82% 50%, rgb(193 138 58 / .24), transparent 65%),
      repeating-linear-gradient(180deg, transparent 0 39px, rgb(255 255 255 / .04) 39px 40px),
      linear-gradient(160deg, #0b2e47, #051826 70%); }
  .name { font: 600 30px/1 Newsreader, serif; letter-spacing: .02em; }
  .tag { margin-top: 10px; font: 500 13px/1 Jost, sans-serif; letter-spacing: .22em; text-transform: uppercase; color: #a9b8c3; }
  h1 { margin: 56px 0 0; font: 400 62px/1.05 Newsreader, serif; letter-spacing: -.03em; text-wrap: balance; }
  p { margin: 28px 0 0; font: 400 24px/1.4 Jost, sans-serif; color: rgb(255 255 255 / .75); }
  .rule { width: 56px; height: 3px; background: #c18a3a; margin-top: 36px; }
</style></head><body><div class="card">
  <div>
    <div class="name">${company.name}</div>
    <div class="tag">${company.tagline}</div>
    <h1>Accounts that hold up when someone asks for them.</h1>
    <div class="rule"></div>
    <p>Accounting, tax and advisory in ${company.city}, ${company.country}</p>
  </div>
  <div>${markLight}</div>
</div></body></html>`

const browser = await chromium.launch({ channel: 'msedge' })
const shoot = async (html, width, height, file, transparent = false) => {
  const page = await browser.newPage({ viewport: { width, height } })
  await page.setContent(html, { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: `${pub}/${file}`, omitBackground: transparent })
  await page.close()
  console.log(`public/${file}`)
}

await shoot(icon(32, 1, 'transparent'), 32, 32, 'favicon-32.png', true)
await shoot(icon(180, 26, '#09263b'), 180, 180, 'apple-touch-icon.png')
await shoot(icon(192, 28, '#09263b'), 192, 192, 'icon-192.png')
await shoot(icon(512, 76, '#09263b'), 512, 512, 'icon-512.png')
await shoot(shareImage, 1200, 630, 'og-image.png')
await browser.close()

await writeFile(
  `${pub}/site.webmanifest`,
  `${JSON.stringify(
    {
      name: company.legalName,
      short_name: company.name,
      description: seo.description,
      start_url: '/',
      display: 'browser',
      background_color: '#051826',
      theme_color: '#051826',
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2,
  )}\n`,
)
console.log('public/favicon.svg, public/site.webmanifest')
