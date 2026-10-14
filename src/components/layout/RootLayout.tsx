import { Outlet, ScrollRestoration } from 'react-router'
import { ConsultationProvider } from '../../context/ConsultationProvider'
import { ConsultationDialog } from '../consultation/ConsultationDialog'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

export function RootLayout() {
  return (
    <ConsultationProvider>
      <a
        href="#main"
        className="fixed top-3 left-3 z-60 -translate-y-24 rounded-full bg-gold px-5 py-2.5 font-medium text-navy-deep transition-transform focus-visible:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper active:scale-95"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Outlet />
      </main>
      <SiteFooter />
      <ConsultationDialog />
      <ScrollRestoration />
    </ConsultationProvider>
  )
}
