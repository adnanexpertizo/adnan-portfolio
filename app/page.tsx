'use client';

import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    const audio = new Audio('/music.mp3'); // Replace with your music file path in the public folder
    audio.loop = true; // Loop the music
    audio.volume = 0.5; // Set volume (0 to 1)

    // Try to play on load
    const playAudio = () => {
      audio.play().catch((error) => {
        console.log('Autoplay blocked:', error);
        // Fallback: Play on first user interaction
        const handleInteraction = () => {
          audio.play();
          document.removeEventListener('click', handleInteraction);
          document.removeEventListener('touchstart', handleInteraction);
        };
        document.addEventListener('click', handleInteraction);
        document.addEventListener('touchstart', handleInteraction);
      });
    };

    playAudio();

    // Cleanup audio on unmount
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen relative bg-bgcolor overflow-hidden">
      <div>
        <Animations />
        <Navbar />
        <HeroSection />
        <AboutSection />
        <CertificatesSection />
         <EducationSection />
        <ExperienceSection />
        <ContactSection />
      </div>
      <Footer />
    </main>
  );
}