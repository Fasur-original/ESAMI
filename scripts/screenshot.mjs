// Usage: node scripts/screenshot.mjs <url> <name> [width=1440] [--viewport] [--y=<scrollY>] [--el=<css selector>] [--tiles=<px>]
// Captures a full-page screenshot with the installed Microsoft Edge into ./screenshots.
import { chromium } from 'playwright-core'
import { mkdir } from 'node:fs/promises'

const [url, name, widthArg, ...flags] = process.argv.slice(2)
if (!url || !name) {
  console.error('Usage: node scripts/screenshot.mjs <url> <name> [width] [--viewport]')
  process.exit(1)
}

const width = Number(widthArg ?? 1440)
const scrollFlag = flags.find((f) => f.startsWith('--y='))
const scrollY = scrollFlag ? Number(scrollFlag.slice(4)) : 0
const fullPage = !flags.includes('--viewport') && !scrollFlag

await mkdir('screenshots', { recursive: true })
const browser = await chromium.launch({ channel: 'msedge' })
const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 })
await page.goto(url, { waitUntil: 'networkidle' })
await page.waitForTimeout(1800) // let the hero entrance finish
const tileHeight = Number(flags.find((f) => f.startsWith('--tiles='))?.slice(8) ?? 0)
if (tileHeight) {
  // Scroll through once so lazy images load, then cut the full page into tiles.
  const total = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < total; y += 600) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y)
    await page.waitForTimeout(80)
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await page.waitForFunction(() => [...document.images].every((img) => img.complete))
  await page.waitForTimeout(400)
  for (let y = 0, i = 1; y < total; y += tileHeight, i++) {
    const height = Math.min(tileHeight, total - y)
    const out = `screenshots/${name}-${String(i).padStart(2, '0')}.png`
    await page.screenshot({ path: out, fullPage: true, clip: { x: 0, y, width, height } })
    console.log(out)
  }
  await browser.close()
  process.exit(0)
}

const selector = flags.find((f) => f.startsWith('--el='))?.slice(5)
if (selector) {
  const target = page.locator(selector)
  await target.scrollIntoViewIfNeeded()
  await page.waitForFunction(() => [...document.images].every((img) => img.complete))
  await page.waitForTimeout(400)
  await target.screenshot({ path: `screenshots/${name}.png` })
  await browser.close()
  console.log(`screenshots/${name}.png`)
  process.exit(0)
}
if (scrollY) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), scrollY)
  await page.waitForTimeout(500)
}
const path = `screenshots/${name}.png`
await page.screenshot({ path, fullPage })
await browser.close()
console.log(path)
