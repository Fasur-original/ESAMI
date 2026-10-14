import { ApproachSection } from '../components/home/ApproachSection'
import { ClientsSection } from '../components/home/ClientsSection'
import { ContactCtaSection } from '../components/home/ContactCtaSection'
import { FilingCalendarSection } from '../components/home/FilingCalendarSection'
import { HeroSection } from '../components/home/HeroSection'
import { ServicesSection } from '../components/home/ServicesSection'
import { TeamSection } from '../components/home/TeamSection'
import { WhoWeAreSection } from '../components/home/WhoWeAreSection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <WhoWeAreSection />
      <ApproachSection />
      <ServicesSection />
      <FilingCalendarSection />
      <ClientsSection />
      <TeamSection />
      <ContactCtaSection />
    </>
  )
}
