import { hero } from '../../content/site'
import { EsamiMark } from '../brand/EsamiMark'
import { ConsultationButton } from '../consultation/ConsultationButton'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

export function HeroSection() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-navy-deep text-paper">
      {/* Layered background: navy depth, warm glow behind the mark, faint ledger ruling. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_40rem_at_78%_45%,rgb(193_138_58/0.22),transparent_60%),radial-gradient(50rem_30rem_at_10%_0%,rgb(22_59_85/0.9),transparent_70%),linear-gradient(180deg,var(--color-navy-deep),var(--color-navy))]"
      />
      <div aria-hidden="true" className="ledger-lines absolute inset-0 -z-10 [mask-image:linear-gradient(180deg,black,transparent_85%)]" />

      <Container className="grid items-center gap-8 pt-28 pb-12 md:pt-40 lg:grid-cols-12 lg:gap-12 lg:pb-24">
        <div className="lg:col-span-7">
          <h1 id="hero-title" className="max-w-[14ch] text-[clamp(2.75rem,6.2vw,5.25rem)] sm:max-w-[18ch] lg:max-w-[14ch] font-normal text-paper">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-[56ch] text-lg leading-[1.7] text-paper/75 md:mt-8">{hero.body}</p>
          <div className="mt-8 flex flex-wrap gap-3 md:mt-10 md:gap-4">
            <ConsultationButton />
            <Button href="#what-we-do" variant="outlineLight">
              See what we do
            </Button>
          </div>
        </div>

        {/* On phones the mark sits above the headline as a small crest so its entrance is seen. */}
        <div className="relative order-first w-28 sm:w-40 lg:order-0 lg:col-span-5 lg:w-full">
          <div
            aria-hidden="true"
            className="absolute inset-[8%] -z-10 rounded-full bg-[radial-gradient(circle,rgb(227_183_106/0.28),transparent_68%)] blur-2xl"
          />
          <EsamiMark tone="onDark" animated className="h-auto w-full drop-shadow-[0_30px_40px_rgb(0_0_0/0.35)]" />
        </div>
      </Container>

      <Container>
        <ul className="grid gap-3 border-t border-paper/12 py-6 text-[0.9375rem] text-paper/70 sm:grid-cols-3 sm:gap-4 md:py-7">
          {hero.facts.map((fact) => (
            <li key={fact} className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-6 bg-gold" />
              {fact}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
