"use client";

import { Button } from "@/components/ui/button";
import { Download, Mail, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import heroData from "@/data/hero.json";
import { AskModal } from "./AskModal";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaWhatsapp } from "react-icons/fa";
import { useTypewriter } from "./useTypewriter";

/* ─── Floating buttons via portal ─── */
function FloatingButtons({
  isPlaying,
  onToggleMusic,
  onWhatsApp,
}: {
  isPlaying: boolean;
  onToggleMusic: () => void;
  onWhatsApp: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return createPortal(
    <>
      <button
        onClick={onToggleMusic}
        className="fixed bottom-5 left-4 w-10 h-10 sm:w-12 sm:h-12 bg-primary text-primary-foreground rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200"
        style={{ zIndex: 9999 }}
        aria-label="Toggle background music"
      >
        {isPlaying ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}
      </button>
      <button
        onClick={onWhatsApp}
        className="fixed bottom-5 right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-xl flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform duration-200"
        style={{ zIndex: 9999, backgroundColor: "#25D366" }}
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </>,
    document.body
  );
}

export function HeroSection() {
  const [openModal, setOpenModal]           = useState(false);
  const [audio, setAudio]                   = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying]           = useState(false);
  const [showFloating, setShowFloating]     = useState(false);
  const [mounted, setMounted]               = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);

  const typedText = useTypewriter(
    [
      "a Safety Officer",
      "NEBOSH Certified",
      "IOSH & OSHA Certified",
      "a Risk Assessment Expert",
      "a Fire Safety Specialist",
    ],
    80
  );

  useEffect(() => {
    setMounted(true);
    const t1 = setTimeout(() => setShowScrollHint(true), 3000);
    const t2 = setTimeout(() => setShowScrollHint(false), 10000);
    const newAudio = new Audio("/interview.wav");
    newAudio.loop = true;
    newAudio.volume = 0.1;
    setAudio(newAudio);
    newAudio.play().catch(() => {});
    return () => {
      newAudio.pause();
      newAudio.currentTime = 0;
      clearTimeout(t1);
      clearTimeout(t2);
    };
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
    <>
      <section id="home" className="relative bg-background overflow-hidden">
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-3 sm:mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Available for Opportunities
              </div>

              {/* Name */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-2 leading-tight">
                {heroData.name}
              </h1>

              {/* ── Typewriter — "I am ..." ── */}
              <p className="text-base sm:text-lg font-semibold text-primary mb-4 min-h-[1.75rem]">
                <span className="text-destructive">I am </span>
                {typedText}
                <span className="animate-pulse text-primary/60">|</span>
              </p>

              {/* Description */}
              <p className="text-sm sm:text-base text-muted-foreground mb-5 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {heroData.description}
              </p>

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

                {/* Outer ring — clockwise */}
                <div
                  className="absolute rounded-full border-2 border-dashed border-primary/30"
                  style={{ inset: "-28px", animation: "orbit-cw 130s linear infinite" }}
                />
                {/* Inner ring — counter-clockwise */}
                <div
                  className="absolute rounded-full border-[2px] border-dashed border-primary/30"
                  style={{ inset: "-52px", animation: "orbit-ccw 130s linear infinite" }}
                />

                {/* Glow behind image */}
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl scale-110 pointer-events-none" />

                {/* Photo */}
                <div className="relative w-52 h-52 sm:w-64 sm:h-64 lg:w-80 lg:h-80 xl:w-[360px] xl:h-[360px] rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl shadow-primary/20">
                  <Image
                    src={heroData.profileImage || "/placeholder.svg"}
                    alt={heroData.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* NEBOSH badge — top right */}
                <div className="absolute -top-3 -right-3 sm:top-3 sm:right-3 bg-card border border-border rounded-xl px-2 py-1 shadow-xl flex items-center gap-1 hover:-translate-y-0.5 transition-transform">
                  <span className="text-lg">🛡️</span>
                  <div>
                    <p className="text-xs font-medium text-foreground leading-none">NEBOSH</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Certified</p>
                  </div>
                </div>

                {/* Experience badge — top left */}
                <div className="absolute -top-3 -left-3 sm:top-3 sm:left-3 bg-card border border-border rounded-xl px-2 py-1 shadow-xl flex items-center gap-1 hover:-translate-y-0.5 transition-transform">
                  <span className="text-lg">⭐</span>
                  <div>
                    <p className="text-xs font-medium text-foreground leading-none">5+ Years</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Experience</p>
                  </div>
                </div>

                {/* Education badge — bottom left */}
                <div className="absolute -bottom-3 -left-3 sm:bottom-3 sm:left-3 bg-card border border-border rounded-xl px-2 py-1 shadow-xl flex items-center gap-1 hover:-translate-y-0.5 transition-transform">
                  <span className="text-lg">🎓</span>
                  <div>
                    <p className="text-xs font-medium text-foreground leading-none">Graduated</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Computer Science</p>
                  </div>
                </div>

                {/* Certifications badge — bottom right */}
                <div className="absolute -bottom-3 -right-3 sm:bottom-3 sm:right-3 bg-card border border-border rounded-xl px-2 py-1 shadow-xl flex items-center gap-1 hover:-translate-y-0.5 transition-transform">
                  <span className="text-lg">📜</span>
                  <div>
                    <p className="text-xs font-medium text-foreground leading-none">8+ Certifications</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Safety & Health</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Scroll hint */}
        <div
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 transition-all duration-700 ${
            showScrollHint ? "opacity-60 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">Scroll</p>
          <div className="w-5 h-8 rounded-full border border-muted-foreground/40 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-primary animate-bounce" />
          </div>
        </div>

        {/* Orbit keyframes */}
        <style>{`
          @keyframes orbit-cw  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
          @keyframes orbit-ccw { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
        `}</style>
      </section>

      {showFloating && (
        <FloatingButtons
          isPlaying={isPlaying}
          onToggleMusic={toggleMusic}
          onWhatsApp={handleWhatsApp}
        />
      )}
    </>
  );
}