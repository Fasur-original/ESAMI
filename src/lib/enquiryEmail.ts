export type EnquiryIntent = 'consultation' | 'enquiry'

export interface EnquiryDetails {
  name: string
  organisation: string
  organisationType: string
  phone: string
  services: string[]
  message: string
}

export interface EnquiryEmail {
  subject: string
  body: string
  /** mailto: link that opens the visitor's email app with everything filled in. */
  href: string
}

const subjects: Record<EnquiryIntent, string> = {
  consultation: 'Consultation request',
  enquiry: 'Website enquiry',
}

/** Turns the form into a ready-to-send email. Empty optional fields are left out. */
export function buildEnquiryEmail(to: string, intent: EnquiryIntent, details: EnquiryDetails): EnquiryEmail {
  const name = details.name.trim()
  const organisation = details.organisation.trim()
  const subject = `${subjects[intent]} from ${name}${organisation ? `, ${organisation}` : ''}`

  const facts: [string, string][] = [
    ['Name', name],
    ['Organisation', organisation],
    ['Type of organisation', details.organisationType],
    ['Services of interest', details.services.join(', ')],
    ['Phone', details.phone.trim()],
  ]

  const body = [
    'Hello ESAMI,',
    '',
    details.message.trim(),
    '',
    '---',
    ...facts.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`),
    '',
    'Sent from the ESAMI website',
  ].join('\r\n')

  const href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  return { subject, body, href }
}
