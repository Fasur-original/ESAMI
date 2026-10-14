import { clients } from '../../content/site'
import { Container } from '../ui/Container'

export function ClientsSection() {
  return (
    <section aria-labelledby="clients-title" className="bg-paper py-16 md:py-32">
      <Container>
        <h2 id="clients-title" className="text-[clamp(2rem,3.6vw,3rem)] font-normal">
          {clients.title}
        </h2>

        <ul className="mt-10 grid gap-px md:mt-14 overflow-hidden rounded-2xl bg-line shadow-lift sm:grid-cols-2 lg:grid-cols-4">
          {clients.groups.map((group) => (
            <li
              key={group.title}
              className="bg-[linear-gradient(160deg,var(--color-paper)_40%,var(--color-mist))] p-6 md:p-8"
            >
              <h3 className="text-[1.375rem] font-medium">{group.title}</h3>
              <p className="mt-4 text-[0.9875rem] text-slate">{group.needs}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
