// Smoke test for the consultation dialog and contact form.
// Usage: node scripts/check-forms.mjs [url=http://localhost:5180/] [width=1440]
import { chromium } from 'playwright-core'

const url = process.argv[2] ?? 'http://localhost:5180/'
const width = Number(process.argv[3] ?? 1440)
const tag = width < 640 ? 'mobile' : 'desktop'

const browser = await chromium.launch({ channel: 'msedge' })
const page = await browser.newPage({ viewport: { width, height: 900 } })
const opened = []
await page.goto(url, { waitUntil: 'networkidle' })

// 1. Consultation dialog: opens, validates, builds the email.
await page.getByRole('button', { name: 'Book a consultation' }).first().click()
const dialog = page.getByRole('dialog', { name: 'Book a consultation' })
await dialog.waitFor()
await page.waitForTimeout(400)
await page.screenshot({ path: `screenshots/form-${tag}-dialog.png` })

await dialog.getByRole('button', { name: 'Open in my email app' }).click()
const errors = await dialog.locator('[aria-invalid="true"]').count()
await page.screenshot({ path: `screenshots/form-${tag}-dialog-errors.png` })
opened.push(`empty submit -> ${errors} invalid fields (expected 2)`)

await dialog.getByLabel('Your name', { exact: true }).fill('Ada Okafor')
await dialog.getByLabel(/^Organisation \(optional\)/).fill('Okafor Foods Ltd')
await dialog.getByLabel(/^Type of organisation/).selectOption('Small and growing businesses')
await dialog.getByLabel(/^Phone or WhatsApp/).fill('+234 803 000 0000')
await dialog.getByText('Tax compliance', { exact: true }).click()
await dialog.getByText('Payroll', { exact: true }).click()
await dialog.getByLabel('What would you like to discuss?').fill('Our books are six months behind & VAT is due.')
await dialog.getByRole('button', { name: 'Open in my email app' }).click()
await dialog.getByText('Your email is ready to send').waitFor()
await page.screenshot({ path: `screenshots/form-${tag}-dialog-sent.png` })

// The "Open email app again" link carries the exact mailto URL that was opened.
const mailto = await dialog.getByRole('link', { name: 'Open email app again' }).getAttribute('href')
const parsed = new URL(mailto)
opened.push(`to: ${parsed.pathname}`)
opened.push(`subject: ${parsed.searchParams.get('subject')}`)
opened.push(`body:\n${parsed.searchParams.get('body')}`)

await page.keyboard.press('Escape')
opened.push(`dialog closed on Escape: ${!(await dialog.isVisible())}`)

// 2. Inline contact form.
await page.locator('#contact').scrollIntoViewIfNeeded()
await page.waitForTimeout(300)
await page.locator('#contact').screenshot({ path: `screenshots/form-${tag}-contact.png` })

await browser.close()
console.log(opened.join('\n'))
