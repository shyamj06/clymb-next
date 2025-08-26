import IntroSection from '@/components/IntroSection'
import ClientsSection from '@/components/ClientsSection'
import ServicesSection from '@/components/ServicesSection'
import CasesSection from '@/components/CasesSection'
import ContactSection from '@/components/ContactSection'
import Navigation from '@/components/Navigation'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <IntroSection />
      <ClientsSection />
      <ServicesSection />
      <CasesSection />
      <ContactSection />
    </main>
  )
}
