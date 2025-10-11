'use client';

import { useRef } from 'react';
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { EducationSection } from "@/components/education-section";
import { CertificatesSection } from "@/components/certificates-section";
import { ExperienceSection } from "@/components/experience-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import Animations from "@/components/Animations";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main ref={containerRef} className="min-h-screen relative bg-gray-100 overflow-hidden">
      <div>
        
        <Animations />
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
  );
}