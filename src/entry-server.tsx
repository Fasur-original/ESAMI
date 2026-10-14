// Build-time entry: `vite build --ssr src/entry-server.tsx` bundles this for scripts/prerender.mjs.
// Nothing here ships to the browser.
import { StrictMode } from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { AppRoutes } from './AppRoutes'
import { EsamiMark } from './components/brand/EsamiMark'
import { company, seo, services, team } from './content/site'

export { company, seo }

/** HTML for the app at `url`, ready to drop into <div id="root">. */
export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  )
}

/** Standalone SVG of the ESAMI mark, for favicons and the share image. */
export function renderMarkSvg(tone: 'brand' | 'onDark' = 'brand') {
  return renderToStaticMarkup(<EsamiMark tone={tone} title="" />).replace(
    '<svg ',
    '<svg xmlns="http://www.w3.org/2000/svg" ',
  )
}

/** schema.org data describing the firm, its services and partners. */
export function structuredData(siteUrl: string) {
  const orgId = `${siteUrl}/#organization`
  const websiteId = `${siteUrl}/#website`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AccountingService',
        '@id': orgId,
        name: company.legalName,
        alternateName: `${company.name} Audit and Professional Services`,
        description: seo.description,
        url: `${siteUrl}/`,
        email: company.email,
        logo: `${siteUrl}/icon-512.png`,
        image: `${siteUrl}/og-image.png`,
        foundingDate: String(company.founded),
        address: {
          '@type': 'PostalAddress',
          addressLocality: company.city,
          addressRegion: company.city,
          addressCountry: company.countryCode,
        },
        areaServed: { '@type': 'Country', name: company.country },
        knowsLanguage: 'en',
        employee: team.members.map((member) => ({
          '@type': 'Person',
          name: member.name,
          jobTitle: member.role,
          worksFor: { '@id': orgId },
        })),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Accounting, tax and advisory services',
          itemListElement: services.items.map((service) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service.title,
              description: service.body,
              provider: { '@id': orgId },
              areaServed: { '@type': 'Country', name: company.country },
            },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: `${siteUrl}/`,
        name: company.legalName,
        inLanguage: 'en-NG',
        publisher: { '@id': orgId },
      },
      {
        '@type': 'WebPage',
        '@id': `${siteUrl}/#webpage`,
        url: `${siteUrl}/`,
        name: seo.title,
        description: seo.description,
        inLanguage: 'en-NG',
        isPartOf: { '@id': websiteId },
        about: { '@id': orgId },
        primaryImageOfPage: `${siteUrl}/og-image.png`,
      },
    ],
  }
}
