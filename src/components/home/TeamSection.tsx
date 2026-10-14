import { team } from '../../content/site'
import { Container } from '../ui/Container'
import { SectionLabel } from '../ui/SectionLabel'
import { PortraitCard } from '../ui/PortraitCard'

export function TeamSection() {
  return (
    <section
      id="team"
      aria-labelledby="team-title"
      className="bg-[linear-gradient(180deg,var(--color-mist),rgb(241_244_246/0.35))] py-16 md:py-32"
    >
      <Container className="grid gap-10 md:gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionLabel>{team.label}</SectionLabel>
          <h2 id="team-title" className="mt-6 text-[clamp(2rem,3.6vw,3rem)] font-normal">
            {team.title}
          </h2>
          <p className="mt-6 max-w-[36ch] text-lg text-slate">{team.body}</p>
        </div>

        <ul className="grid gap-8 sm:grid-cols-2 sm:gap-8 lg:col-span-8">
          {team.members.map((member, i) => (
            <li key={member.name} className={i > 0 ? 'border-t border-line pt-8 sm:border-0 sm:pt-0' : undefined}>
              <PortraitCard member={member} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
