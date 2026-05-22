"use client";

import { Button } from "@/components/ui/button";
import { Download, Mail, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import heroData from "@/data/hero.json";
import { AskModal } from "./AskModal";
import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useTypewriter } from "./useTypewriter";

export function HeroSection() {
  const [openModal, setOpenModal] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFloating, setShowFloating] = useState(false);
  const [mounted, setMounted] = useState(false);

  const typedText = useTypewriter(
    [
      "Safety Officer",
      "NEBOSH Certified",
      "Risk Assessment Expert",
      "IOSH & OSHA Certified",
      "Fire Safety Specialist",
    ],
    80
  );

  useEffect(() => {
    setMounted(true);
    const newAudio = new Audio("/interview.wav");
    newAudio.loop = true;
    newAudio.volume = 0.1;
    setAudio(newAudio);
    newAudio.play().catch(() => {});
    return () => { newAudio.pause(); newAudio.currentTime = 0; };
  }, []);

  useEffect(() => {
    const onScroll = () => setShowFloating(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMusic = async () => {
    if (!audio) return;
    if (isPlaying) { audio.pause(); setIsPlaying(false); }
    else { await audio.play().catch(() => {}); setIsPlaying(true); }
  };

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) window.scrollTo({ top: (el as HTMLElement).offsetTop - 80, behavior: "smooth" });
  };

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = heroData.cvLink || "/Adnan_Rafiq_CV.pdf";
    link.download = "Adnan_Rafiq_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWhatsApp = () => {
    const phone = "923077522229";
    // Message is written FROM Adnan's perspective — the SENDER fills in their own details.
    // "**Safety Portfolio**" tag at the top lets Adnan know this came from his portfolio site.
    const msg = encodeURIComponent(
      `*🛡️ Safety Portfolio Inquiry*\n\n` +
      `Hi Adnan! I visited your safety portfolio and would like to get in touch.\n\n` +
      `*My Details:*\n` +
      `• Name: \n` +
      `• Company: \n` +
      `• Designation: \n` +
      `• Purpose of Contact: \n\n` +
      `Looking forward to hearing from you!`
    );
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    window.open(
      isMobile
        ? `whatsapp://send?phone=${phone}&text=${msg}`
        : `https://web.whatsapp.com/send?phone=${phone}&text=${msg}`,
      "_blank"
    );
  };

  return (
    <section id="home" className="relative z-0 bg-background overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <Image src="/Background Noise.svg" alt="" fill className="object-cover opacity-60" priority />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_40%,var(--color-primary)_0%,transparent_70%)] opacity-[0.07] dark:opacity-[0.12]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-16 pt-24 pb-16 sm:pt-28 sm:pb-20">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-10">

          {/* ── Left: Text ── */}
          <div className={`flex-1 text-center lg:text-left transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/8 text-primary text-xs font-medium mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Available for Opportunities
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-2 leading-tight">
              {heroData.name}
            </h1>

            {/* Typewriter role */}
            <p className="text-base sm:text-lg font-semibold text-primary mb-3 min-h-[1.75rem]">
              {typedText}
              <span className="animate-pulse text-primary/50">|</span>
            </p>

            <p className="text-sm sm:text-base text-muted-foreground mb-5 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {heroData.description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-6 justify-center lg:justify-start">
              {[
                { label: "Years Experience",  value: "5+" },
                { label: "Certifications",    value: "8+" },
                { label: "Projects Completed",value: "30+" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Ask modal */}
            <div className="flex justify-center lg:justify-start mb-5">
              <AskModal openModal={openModal} setOpenModal={setOpenModal} />
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {heroData.buttons.map((button, i) => (
                <Button
                  key={i}
                  size="lg"
                  variant={button.type === "primary" ? "default" : "outline"}
                  className={`gap-2 text-sm font-medium px-6 transition-all duration-200 ${
                    button.type === "primary"
                      ? "shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5"
                      : "hover:-translate-y-0.5"
                  }`}
                  onClick={() => {
                    if (button.icon === "Download") handleDownloadCV();
                    else if (button.action === "scrollToContact") scrollToContact();
                  }}
                >
                  {button.icon === "Download" && <Download className="h-4 w-4" />}
                  {button.icon === "Mail"     && <Mail     className="h-4 w-4" />}
                  {button.text}
                </Button>
              ))}
            </div>
          </div>

          {/* ── Right: Profile image ── */}
          <div className={`flex-shrink-0 transition-all duration-700 delay-200 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="relative">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 scale-110" />
              <div className="absolute inset-0 rounded-full border   border-primary/10 scale-125" />

              {/* Photo */}
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl shadow-primary/10">
                <Image
                  src={heroData.profileImage || "/placeholder.svg"}
                  alt={heroData.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* NEBOSH badge */}
              <div className="absolute -bottom-2 -right-2 sm:bottom-4 sm:right-4 bg-background border border-border rounded-xl px-3 py-2 shadow-lg flex items-center gap-2">
                <span className="text-lg">🛡️</span>
                <div>
                  <p className="text-xs font-semibold text-foreground leading-none">NEBOSH</p>
                  <p className="text-[10px] text-muted-foreground">Certified</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Floating buttons (after scroll) ── */}
      {showFloating && (
        <>
          {/* Music toggle */}
          <button
            onClick={toggleMusic}
            className="fixed bottom-5 left-4 z-50 w-10 h-10 sm:w-12 sm:h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center"
            aria-label="Toggle background music"
          >
            {isPlaying
              ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
              : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>

          {/* WhatsApp */}
          <button
            onClick={handleWhatsApp}
            className="fixed bottom-5 right-4 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center text-white"
            style={{ backgroundColor: "#25D366" }}
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </>
      )}
    </section>
  );
}