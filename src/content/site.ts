import jamesPhoto from '../assets/team/james-adesokan-aasa.jpg'
import simeonPhoto from '../assets/team/simeon-olusegun-ogunwuyi.jpg'

export interface TeamMember {
  name: string
  role: string
  photo: string
  /** Leave unset until a bio is supplied; the card renders without it. */
  bio?: string
  linkedIn?: string
}

export interface NavItem {
  label: string
  href: string
}

export interface Commitment {
  title: string
  body: string
}

export interface ApproachStep {
  title: string
  summary: string
  detail: string
}

export interface Service {
  title: string
  body: string
}

export interface ClientGroup {
  title: string
  needs: string
}

export interface FilingDate {
  when: string
  what: string
}

const email = 'adesokan396@yahoo.com'

export const company = {
  name: 'ESAMI',
  legalName: 'ESAMI Audit & Professional Services',
  tagline: 'Audit & Professional Services',
  founded: 2026,
  city: 'Lagos',
  country: 'Nigeria',
  email,
} as const

export const navItems: NavItem[] = [
  { label: 'Who we are', href: '/#who-we-are' },
  { label: 'How we work', href: '/#how-we-work' },
  { label: 'What we do', href: '/#what-we-do' },
  { label: 'Team', href: '/#team' },
  { label: 'Contact', href: '/#contact' },
]

export const hero = {
  title: 'Accounts that hold up when someone asks for them.',
  body: 'ESAMI is a Lagos accounting and advisory firm. We keep your books, filings and controls ready for the people who check them: the Nigeria Revenue Service, your bank, your donors and your board.',
  facts: ['Based in Lagos, Nigeria', 'Founded in 2026', 'Working to the 2025 tax reform acts'],
}

export const whoWeAre = {
  label: 'Who we are',
  statement:
    'We opened in 2026, as Nigeria’s 2025 tax reform laws came into force. Our checklists, templates and filing calendar were written for the new rules, not adapted from the old ones.',
  body: 'We work with small and growing businesses, NGOs, public bodies and larger companies. Each needs something different from its accountant, so we say plainly what we will do, what it will cost and when you will have it.',
  commitments: [
    {
      title: 'One person who knows your file',
      body: 'The accountant doing your work is the one you speak to. Questions don’t wait in a queue.',
    },
    {
      title: 'Fees agreed before work starts',
      body: 'You get a written scope and a fixed fee. If the scope changes, we tell you before the invoice does.',
    },
    {
      title: 'Reports you can read',
      body: 'Every set of accounts comes with a one-page note in plain English: what changed, what needs attention, what is due next.',
    },
  ] satisfies Commitment[],
}

export const approach = {
  label: 'How we work',
  title: 'How we take on a new client',
  body: 'Most new clients come to us with books that are behind, incomplete or kept in three places. The first month is spent finding out exactly where things stand, before anything is filed.',
  steps: [
    {
      title: 'Review',
      summary: 'Find out where things stand',
      detail:
        'We go through your ledgers, bank statements, past returns and tax records, and list what is missing or doesn’t match. You see that list before we quote.',
    },
    {
      title: 'Reconcile',
      summary: 'Make the records agree',
      detail:
        'We bring your bank, ledgers, payroll and tax records into agreement and correct postings, so every balance has evidence behind it.',
    },
    {
      title: 'Report and file',
      summary: 'Prepare, explain, submit',
      detail:
        'We prepare your financial statements and returns, walk you through them line by line, and file with the right authority before the deadline.',
    },
    {
      title: 'Keep current',
      summary: 'Close every month on time',
      detail:
        'Each month we close your books, remind you of deadlines before they arrive and flag anything that needs a decision from you.',
    },
  ] satisfies ApproachStep[],
}

export const services = {
  label: 'What we do',
  title: 'Accounting, tax and advisory',
  body: 'Each service can be a one-off piece of work or a monthly arrangement.',
  items: [
    {
      title: 'Bookkeeping and management accounts',
      body: 'Monthly posting, bank reconciliations and a management pack showing profit, balance sheet and cash position, delivered by an agreed date each month.',
    },
    {
      title: 'Financial statements',
      body: 'Year-end financial statements prepared under IFRS or IFRS for SMEs, ready for your auditor, your bank or your annual returns.',
    },
    {
      title: 'Tax compliance',
      body: 'Company income tax, VAT, withholding tax and PAYE computed and filed, plus a review of what the 2025 tax reform acts change for your business.',
    },
    {
      title: 'Payroll',
      body: 'Monthly payroll and payslips, with PAYE, pension and other statutory deductions calculated and remitted on time.',
    },
    {
      title: 'Internal audit and controls',
      body: 'A review of how money moves through your organisation: approvals, segregation of duties, cash handling and procurement, with fixes ranked by risk.',
    },
    {
      title: 'NGO and public-sector accounting',
      body: 'Fund accounting, donor financial reports and budget-versus-actual tracking for NGOs; IPSAS-based records for public bodies.',
    },
    {
      title: 'Business advisory',
      body: 'Budgets, cash-flow forecasts and financial models for loan applications, investor conversations and expansion decisions.',
    },
  ] satisfies Service[],
}

export const clients = {
  title: 'Who we work with',
  groups: [
    {
      title: 'Small and growing businesses',
      needs: 'Books brought up to date, taxes registered and filed correctly, and a clear cash position every month.',
    },
    {
      title: 'NGOs and foundations',
      needs: 'Fund accounting, donor reports that reconcile to the ledger, and controls that stand up to a donor’s review.',
    },
    {
      title: 'Government agencies',
      needs: 'IPSAS-compliant records, budget monitoring and reviews of internal control.',
    },
    {
      title: 'Larger companies',
      needs: 'Extra hands at year end, internal audit, and tax reviews when a reform changes the numbers.',
    },
  ] satisfies ClientGroup[],
}

export const filingCalendar = {
  title: 'Three dates we keep for you',
  body: 'Late filing in Nigeria costs penalties and interest. These are the deadlines most of our clients work around.',
  dates: [
    { when: '10th', what: 'PAYE deducted from salaries is remitted by the 10th of the following month.' },
    { when: '21st', what: 'VAT returns for the month are filed by the 21st of the next month.' },
    { when: '6 months', what: 'Company income tax returns are due within six months of your financial year end.' },
  ] satisfies FilingDate[],
  note: 'General deadlines. Your obligations depend on your business, so confirm yours with us.',
}

export const team = {
  label: 'Team',
  title: 'The partners',
  body: 'The people responsible for ESAMI’s work and the standards it is held to.',
  members: [
    {
      name: 'James Adesokan Aasa',
      role: 'Managing Partner and Chief Executive',
      photo: jamesPhoto,
      bio: 'James has more than 17 years of audit and assurance experience: eight years as an Audit Senior Manager and over nine at Associate Director level.',
    },
    {
      name: 'Simeon Olusegun Ogunwuyi',
      role: 'Associate Partner',
      photo: simeonPhoto,
      bio: 'Simeon has more than 18 years of accounting experience, including 17 years heading financial reporting in the insurance sector, where he has led both financial reporting and general accounts. He holds an HND and the FCA, ACTI and ANIM designations.',
    },
  ] satisfies TeamMember[],
}

export const contactCta = {
  title: 'Tell us where your books stand.',
  body: 'Fill in the form and we’ll turn it into an email for you. Press send in your email app and it comes straight to us. We’ll reply with the questions we need answered and what a first review would cost.',
}

export const enquiryForm = {
  consultation: {
    title: 'Book a consultation',
    intro: 'Tell us about your organisation. When you continue, your email app opens with this message written and addressed to us. Nothing is sent until you press send.',
  },
  enquiry: {
    title: 'Send us a message',
    intro: 'Your email app opens with this message written and addressed to us. Nothing is sent until you press send.',
  },
  organisationTypes: [...clients.groups.map((group) => group.title), 'Individual or other'],
  messageLabel: {
    consultation: 'What would you like to discuss?',
    enquiry: 'Your message',
  },
  messagePlaceholder: 'For example: our books are six months behind and our VAT returns are due.',
  submitLabel: 'Open in my email app',
  sent: {
    title: 'Your email is ready to send',
    body: 'Your email app should now be open with your message filled in. Press send and it comes straight to us.',
    fallback: 'Email app didn’t open? Copy the message and send it to',
  },
  errors: {
    name: 'Enter your name so we know who to reply to.',
    message: 'Tell us briefly what you need help with.',
  },
}
