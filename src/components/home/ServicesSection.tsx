import { services } from '../../content/site'
import { Container } from '../ui/Container'
import { SectionLabel } from '../ui/SectionLabel'

export function ServicesSection() {
  return (
    <section id="what-we-do" aria-labelledby="what-we-do-title" className="bg-paper py-16 md:py-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel>{services.label}</SectionLabel>
            <h2 id="what-we-do-title" className="mt-6 text-[clamp(2rem,3.6vw,3rem)] font-normal">
              {services.title}
            </h2>
          </div>
          <p className="max-w-[40ch] text-lg text-slate lg:col-span-5">{services.body}</p>
        </div>

        <ul className="mt-10 border-t border-navy/15 md:mt-16">
          {services.items.map((service) => (
            <li key={service.title} className="grid gap-2 border-b border-line py-6 md:grid-cols-12 md:gap-8 md:py-8">
              <h3 className="flex items-start gap-3 text-[1.375rem] font-normal md:col-span-5 md:gap-4 md:text-[1.625rem]">
                <svg viewBox="0 0 12 10" aria-hidden="true" className="mt-3 size-2.5 shrink-0 rotate-90 fill-gold">
                  <path d="M6 0 L12 10 L0 10 Z" />
                </svg>
                {service.title}
              </h3>
              <p className="max-w-[58ch] pl-5.5 text-[0.9875rem] text-slate md:col-span-7 md:pt-1 md:pl-0 md:text-base">
                {service.body}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
