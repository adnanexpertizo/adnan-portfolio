
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { EducationSection } from "@/components/education-section"
import { CertificatesSection } from "@/components/certificates-section"
import { ExperienceSection } from "@/components/experience-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen ">
      <div className="">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <CertificatesSection />
      <ExperienceSection />
      <ContactSection />
      </div>
       <Footer />
    </main>
  )
}
