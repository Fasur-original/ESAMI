import { company, navItems, services } from '../../content/site'
import { Logo } from '../brand/Logo'
import { Container } from '../ui/Container'

const footerLink =
  'rounded-sm text-haze transition-opacity hover:text-paper active:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light'

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-paper">
      <Container className="grid gap-10 py-14 md:grid-cols-12 md:gap-12 md:py-16">
        <div className="md:col-span-4">
          <Logo tone="onDark" />
          <p className="mt-5 max-w-xs text-[0.9375rem] text-haze">
            Accounting, tax and advisory for Nigerian businesses, NGOs and public bodies.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-2">
          <h2 className="font-body text-sm font-semibold tracking-normal text-paper">Explore</h2>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5 text-[0.9375rem] md:block md:space-y-2.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={footerLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="font-body text-sm font-semibold tracking-normal text-paper">Services</h2>
          <ul className="mt-4 space-y-2.5 text-[0.9375rem] text-haze">
            {services.items.map((service) => (
              <li key={service.title}>{service.title}</li>
            ))}
          </ul>
        </div>

        <address className="not-italic md:col-span-3">
          <h2 className="font-body text-sm font-semibold tracking-normal text-paper">Contact</h2>
          <p className="mt-4 text-[0.9375rem] text-haze">
            {company.city}, {company.country}
          </p>
          <a href={`mailto:${company.email}`} className={`${footerLink} mt-2.5 inline-block text-[0.9375rem] break-all`}>
            {company.email}
          </a>
        </address>
      </Container>

      <Container className="border-t border-paper/10 py-6 text-sm text-haze">
        © {company.founded} {company.legalName}
      </Container>
    </footer>
  )
}
