import type { TeamMember } from '../../content/site'

interface PortraitCardProps {
  member: TeamMember
}

/**
 * Phones: compact profile row (small portrait beside name and role, bio below).
 * sm and up: tall portrait with the caption underneath.
 */
export function PortraitCard({ member }: PortraitCardProps) {
  return (
    <article className="grid grid-cols-[6.5rem_1fr] items-center gap-x-5 sm:block">
      <div className="relative isolate aspect-4/5 overflow-hidden rounded-xl bg-mist shadow-lift sm:rounded-[1.25rem]">
        <img
          src={member.photo}
          alt={`Portrait of ${member.name}`}
          loading="lazy"
          decoding="async"
          className="size-full object-cover object-[50%_20%] brightness-[1.08] contrast-[1.05] grayscale"
        />
        {/* Treatment: the source photos differ in lighting and colour, so both are set in
            monochrome, tinted navy (multiply) and lifted with a warm gold glow (soft light). */}
        <div aria-hidden="true" className="absolute inset-0 bg-navy-soft/25 mix-blend-multiply" />
        <div aria-hidden="true" className="absolute inset-0 bg-gold-light/25 mix-blend-soft-light" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgb(9_38_59/0.45)),radial-gradient(120%_70%_at_50%_0%,rgb(227_183_106/0.12),transparent_60%)]"
        />
        <span aria-hidden="true" className="absolute bottom-0 left-0 h-1 w-8 bg-gold sm:w-16" />
      </div>

      <div className="sm:mt-6">
        <h3 className="text-[1.375rem] leading-tight font-normal sm:text-[1.625rem]">{member.name}</h3>
        <p className="mt-1.5 text-[0.9375rem] leading-snug font-medium text-bronze sm:text-base">{member.role}</p>
      </div>

      {member.bio && (
        <p className="col-span-2 mt-5 max-w-[46ch] text-[0.9875rem] text-slate sm:mt-4">{member.bio}</p>
      )}
      {member.linkedIn && (
        <a
          href={member.linkedIn}
          target="_blank"
          rel="noreferrer"
          className="col-span-2 mt-4 inline-block justify-self-start rounded-sm text-[0.9375rem] text-navy underline decoration-gold underline-offset-4 transition-opacity hover:opacity-75 active:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          {member.name} on LinkedIn
        </a>
      )}
    </article>
  )
}
