import { whoWeAre } from '../../content/site'
import { Container } from '../ui/Container'
import { SectionLabel } from '../ui/SectionLabel'

export function WhoWeAreSection() {
  return (
    <section id="who-we-are" aria-labelledby="who-we-are-title" className="bg-paper py-16 md:py-32">
      <Container className="grid gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-3">
          <SectionLabel>{whoWeAre.label}</SectionLabel>
        </div>

        <div className="lg:col-span-9">
          <h2 id="who-we-are-title" className="max-w-[30ch] text-[clamp(1.75rem,3.2vw,2.6rem)] leading-tight font-normal">
            {whoWeAre.statement}
          </h2>
          <p className="mt-6 max-w-[62ch] text-lg text-slate md:mt-8">{whoWeAre.body}</p>

          <ul className="mt-12 grid gap-8 md:mt-16 md:grid-cols-3">
            {whoWeAre.commitments.map((item) => (
              <li key={item.title} className="relative pt-6">
                <span aria-hidden="true" className="absolute top-0 left-0 h-0.5 w-12 bg-gold" />
                <span aria-hidden="true" className="absolute top-0 right-0 left-14 h-px bg-line" />
                <h3 className="text-[1.375rem] font-medium">{item.title}</h3>
                <p className="mt-3 text-[0.9875rem] text-slate">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
