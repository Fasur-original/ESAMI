import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useState } from 'react'
import { company, navItems } from '../../content/site'
import { useScrolledPast } from '../../hooks/useScrolledPast'
import { cn } from '../../lib/cn'
import { Logo } from '../brand/Logo'
import { ConsultationButton } from '../consultation/ConsultationButton'
import { Container } from '../ui/Container'

const navLink = cn(
  'relative py-1 text-[0.9375rem] text-paper/80',
  'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300',
  'hover:text-paper hover:after:scale-x-100 active:opacity-70',
  'focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light',
)

export function SiteHeader() {
  const { sentinelRef, scrolled } = useScrolledPast<HTMLDivElement>()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const solid = scrolled || menuOpen

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="pointer-events-none absolute top-0 left-0 h-16 w-px" />
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Background fades in as a separate layer so only opacity animates. */}
        <div
          aria-hidden="true"
          className={cn(
            'absolute inset-0 bg-navy-deep/95 shadow-[0_1px_0_rgb(255_255_255/0.06),0_12px_30px_-18px_rgb(0_0_0/0.6)] backdrop-blur-md transition-opacity duration-300',
            solid ? 'opacity-100' : 'opacity-0',
          )}
        />
        <Container className="relative flex h-20 items-center justify-between gap-6">
          <a
            href="/#top"
            className="rounded-md transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light active:opacity-75"
            aria-label={`${company.legalName}, back to top`}
          >
            <Logo tone="onDark" />
          </a>

          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className={navLink}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ConsultationButton size="sm" className="hidden sm:inline-flex" />
            <button
              type="button"
              className="relative grid size-11 place-items-center rounded-full text-paper ring-1 ring-paper/25 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light active:scale-95 lg:hidden"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span aria-hidden="true" className="flex w-5 flex-col gap-1.5">
                <span className={cn('h-px w-full bg-current transition-transform duration-300', menuOpen && 'translate-y-[3.5px] rotate-45')} />
                <span className={cn('h-px w-full bg-current transition-transform duration-300', menuOpen && 'translate-y-[-3.5px] -rotate-45')} />
              </span>
            </button>
          </div>
        </Container>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id={menuId}
              aria-label="Main"
              className="relative border-t border-paper/10 bg-navy-deep/95 backdrop-blur-md lg:hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            >
              <Container className="flex flex-col gap-1 py-6">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-md py-3 font-display text-2xl text-paper transition-transform hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-gold-light active:opacity-70"
                  >
                    {item.label}
                  </a>
                ))}
                <ConsultationButton className="mt-4 self-start sm:hidden" onBeforeOpen={() => setMenuOpen(false)} />
              </Container>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
