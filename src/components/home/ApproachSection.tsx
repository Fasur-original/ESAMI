import { AnimatePresence, motion } from 'motion/react'
import { useId, useState } from 'react'
import { approach } from '../../content/site'
import { cn } from '../../lib/cn'
import { ConsultationButton } from '../consultation/ConsultationButton'
import { Container } from '../ui/Container'
import { SectionLabel } from '../ui/SectionLabel'

export function ApproachSection() {
  const [active, setActive] = useState(0)
  const baseId = useId()
  const total = approach.steps.length

  return (
    <section
      id="how-we-work"
      aria-labelledby="how-we-work-title"
      className="bg-[linear-gradient(180deg,var(--color-mist),rgb(241_244_246/0.4))] py-16 md:py-32"
    >
      <Container className="grid gap-10 md:gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel>{approach.label}</SectionLabel>
          <h2 id="how-we-work-title" className="mt-6 text-[clamp(2rem,3.6vw,3rem)] font-normal">
            {approach.title}
          </h2>
          <p className="mt-6 max-w-[48ch] text-lg text-slate">{approach.body}</p>
          <ConsultationButton variant="outlineDark" className="mt-8 md:mt-10" />
        </div>

        <div className="lg:col-span-7">
          <div aria-hidden="true" className="h-0.5 w-full bg-line">
            <div
              className="h-full origin-left bg-gold transition-transform duration-500 ease-(--ease-spring)"
              style={{ transform: `scaleX(${(active + 1) / total})` }}
            />
          </div>
          <p className="mt-3 text-sm text-slate" aria-live="polite">
            Step {active + 1} of {total}
          </p>

          <ol className="mt-4">
            {approach.steps.map((step, i) => {
              const open = i === active
              const panelId = `${baseId}-panel-${i}`
              return (
                <li key={step.title} className="border-b border-line">
                  <h3 className="font-body tracking-normal">
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setActive(i)}
                      className={cn(
                        'group flex w-full items-baseline gap-4 py-5 text-left md:gap-6 md:py-6',
                        'rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold active:opacity-70',
                      )}
                    >
                      <span className={cn('w-8 shrink-0 font-display text-xl tabular-nums', open ? 'text-bronze' : 'text-haze')}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1">
                        <span
                          className={cn(
                            'block font-display text-[1.5rem] leading-tight md:text-[1.75rem] tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-1',
                            open ? 'text-navy' : 'text-navy/55',
                          )}
                        >
                          {step.title}
                        </span>
                        <span className="mt-1 block text-[0.9375rem] text-slate">{step.summary}</span>
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-label={step.title}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                        className="pb-6 pl-12 md:pb-7 md:pl-14"
                      >
                        <p className="max-w-[54ch] text-slate">{step.detail}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ol>
        </div>
      </Container>
    </section>
  )
}
