"use client";

import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { SkillsSection } from "@/components/skills-section";
import { EducationSection } from "@/components/education-section";
import { CertificatesSection } from "@/components/certificates-section";
import { ExperienceSection } from "@/components/experience-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (

    <main className="min-h-screen relative bg-bgcolor">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <CertificatesSection />
      <SkillsSection />
      <EducationSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </main>
  );
}