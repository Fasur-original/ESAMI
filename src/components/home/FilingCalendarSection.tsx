import { filingCalendar } from '../../content/site'
import { Container } from '../ui/Container'

export function FilingCalendarSection() {
  return (
    <section
      aria-labelledby="calendar-title"
      className="relative isolate overflow-hidden bg-navy py-16 text-paper md:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(40rem_24rem_at_100%_0%,rgb(193_138_58/0.18),transparent_70%),linear-gradient(180deg,var(--color-navy),var(--color-navy-deep))]"
      />
      <div aria-hidden="true" className="ledger-lines absolute inset-0 -z-10" />

      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="calendar-title" className="text-[clamp(2rem,3.6vw,3rem)] font-normal lg:col-span-6">
            {filingCalendar.title}
          </h2>
          <p className="max-w-[46ch] text-paper/70 lg:col-span-5 lg:col-start-8">{filingCalendar.body}</p>
        </div>

        <dl className="mt-10 grid gap-8 md:mt-16 md:grid-cols-3 md:gap-0">
          {filingCalendar.dates.map((item, i) => (
            <div key={item.when} className={i > 0 ? 'md:border-l md:border-paper/12 md:pl-10' : 'md:pr-10'}>
              <dt className="font-display text-[clamp(3rem,5vw,4.25rem)] leading-none tracking-[-0.03em] text-gold-light">
                {item.when}
              </dt>
              <dd className="mt-3 max-w-[34ch] md:mt-5 text-paper/80">{item.what}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-10 text-sm text-paper/55 md:mt-14">{filingCalendar.note}</p>
      </Container>
    </section>
  )
}
