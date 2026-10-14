import { useState } from 'react'
import { company, contactCta, enquiryForm } from '../../content/site'
import { EsamiMark } from '../brand/EsamiMark'
import { EnquiryForm } from '../forms/EnquiryForm'
import { Container } from '../ui/Container'

export function ContactCtaSection() {
  const [ready, setReady] = useState(false)

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden border-b border-paper/10 bg-navy-deep py-16 text-paper md:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(40rem_28rem_at_15%_100%,rgb(22_59_85/0.9),transparent_70%),radial-gradient(30rem_20rem_at_90%_10%,rgb(193_138_58/0.14),transparent_70%)]"
      />
      <EsamiMark
        tone="onDark"
        title=""
        className="pointer-events-none absolute -bottom-32 -left-24 -z-10 hidden w-[30rem] opacity-[0.06] lg:block"
      />

      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 id="contact-title" className="text-[clamp(2.25rem,4.4vw,3.5rem)] font-normal">
            {contactCta.title}
          </h2>
          <p className="mt-6 max-w-[44ch] text-lg text-paper/75">{contactCta.body}</p>

          <dl className="mt-10 grid gap-5 text-[0.9375rem]">
            <div>
              <dt className="text-paper/55">Email</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${company.email}`}
                  className="rounded-sm break-all text-paper underline decoration-gold/60 underline-offset-4 transition-opacity hover:opacity-80 active:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
                >
                  {company.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-paper/55">Office</dt>
              <dd className="mt-1">
                {company.city}, {company.country}
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl bg-[linear-gradient(180deg,var(--color-paper),var(--color-mist))] p-6 text-navy shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6),0_0_0_1px_rgb(255_255_255/0.06)] sm:p-10 lg:col-span-7">
          <h3 className="text-[1.75rem] font-normal">{enquiryForm.enquiry.title}</h3>
          {!ready && <p className="mt-2 max-w-[52ch] text-[0.9375rem] text-slate">{enquiryForm.enquiry.intro}</p>}
          <EnquiryForm intent="enquiry" className="mt-8" onReadyChange={setReady} />
        </div>
      </Container>
    </section>
  )
}
