"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Award, Calendar, Building2, Eye,
  ChevronLeft, ChevronRight,
  X, ShieldAlert, CheckCircle, ExternalLink,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import certificatesData from "@/data/certificates.json";

type Cert = (typeof certificatesData.certificates)[0];

/* ─── Category pill colours ─── */
const catColor: Record<string, string> = {
  "Health & Safety":    "bg-primary/10 text-primary border-primary/30",
  "Safety Supervision": "bg-primary/10 text-primary border-primary/30",
  "First Aid":          "bg-destructive/10 text-destructive border-destructive/30",
  "Fire Safety":        "bg-destructive/10 text-destructive border-destructive/30",
  "Height Safety":      "bg-primary/10 text-primary border-primary/30",
  "Risk Management":    "bg-primary/10 text-primary border-primary/30",
  "Investigation":      "bg-primary/10 text-primary border-primary/30",
};

/* ════════════════════════════════════════════════════
   MODAL
════════════════════════════════════════════════════ */
function CertificateModal({ cert, onClose }: { cert: Cert; onClose: () => void }) {
  const [orientation, setOrientation] = useState<"landscape" | "portrait" | "loading">("loading");
  const [loaded, setLoaded]   = useState(false);
  const [error, setError]     = useState(false);

  useEffect(() => {
    setLoaded(false); setError(false); setOrientation("loading");
  }, [cert]);

  /* Lock body scroll */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  /* Escape key */
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setOrientation(img.naturalWidth >= img.naturalHeight ? "landscape" : "portrait");
    setLoaded(true);
  };

  const whatsapp = () => {
    const phone = "923077522229";
    const msg = encodeURIComponent(
      `*🛡️ Certificate Verification Request*\n\n` +
      `Certificate: "${cert.title}"\n\n` +
      `*My Details:*\n• Name:\n• Company:\n• Designation:\n• Purpose:\n\nThank you!`
    );
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    window.open(
      isMobile ? `whatsapp://send?phone=${phone}&text=${msg}` : `https://web.whatsapp.com/send?phone=${phone}&text=${msg}`,
      "_blank"
    );
  };

  /* Modal width adapts to image orientation */
  const modalW =
    orientation === "landscape" ? "w-full max-w-2xl lg:max-w-3xl" :
    orientation === "portrait"  ? "w-full max-w-sm sm:max-w-md"   :
    "w-full max-w-xl";

  return (
    /* Overlay — starts below navbar (pt accounts for nav height) */
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center px-3 pt-6 pb-4 sm:pt-10 sm:pb-6 border border-red-700"
      style={{ backgroundColor: "rgba(0,0,0,0.72)", backdropFilter: "blur(14px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`${modalW} bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden`}
        style={{ maxHeight: "calc(100dvh - 104px)" }}
      >
        {/* ── Header ── */}
        <div className="flex items-center gap-3 px-4 sm:px-3 py-3.5 border-b border-border flex-shrink-0">
          <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 flex-shrink-0">
            <Award className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground leading-tight line-clamp-1">{cert.title}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{cert.issuingBody} &middot; {cert.year}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background border border-transparent hover:border-border transition-all flex-shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Scrollable image area ── */}
        <div className="flex-1 overflow-y-auto overscroll-contain min-h-0 bg-background/50">
          {!error ? (
            <div className="flex items-center justify-center p-2 sm:p-3 min-h-[180px] border border-red-600 relative">
              {!loaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5">
                  <div className="w-7 h-7 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs text-muted-foreground">Loading…</p>
                </div>
              )}
              <img
                src={cert.image}
                alt={cert.title}
                onLoad={handleLoad}
                onError={() => setError(true)}
                draggable={false}
                className={`rounded-xl border border-border/60 shadow-md select-none transition-opacity duration-300
                  ${!loaded ? "opacity-0 absolute pointer-events-none" : "opacity-100"}
  
               max-h-auto w-auto object-contain mx-auto `}

              />
            </div>
          ) : (
            /* Permission state */
            <div className="flex flex-col items-center text-center py-10 px-6">
              <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4">
                <ShieldAlert className="w-7 h-7 text-amber-500" />
              </div>
              <h3 className="font-semibold text-sm text-foreground mb-2">Not Publicly Available</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5 max-w-xs">
                This certificate is shared only on verified request. Contact via WhatsApp with your{" "}
                <span className="text-foreground font-medium">name</span>,{" "}
                <span className="text-foreground font-medium">company</span>, and{" "}
                <span className="text-foreground font-medium">purpose</span>.
              </p>
              <Button onClick={whatsapp} className="gap-2 text-white border-0" style={{ backgroundColor: "#25D366" }}>
                <FaWhatsapp className="w-4 h-4" /> Contact on WhatsApp
              </Button>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        {!error && loaded && (
          <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-t border-border flex-shrink-0 bg-card">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span className="text-xs text-muted-foreground">
                Issued by <span className="text-foreground font-medium">{cert.issuingBody}</span>
              </span>
            </div>
            <Button size="sm" variant="outline" onClick={whatsapp} className="text-xs gap-1.5 h-7 px-3">
              <FaWhatsapp className="w-3 h-3" /> Verify
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   CERTIFICATE CARD
════════════════════════════════════════════════════ */
function CertCard({ cert, index, total, onClick }: {
  cert: Cert; index: number; total: number; onClick: () => void;
}) {
  const color = catColor[cert.category] ?? "bg-primary/10 text-primary border-primary/30";

  return (
    <div
      onClick={onClick}
      className="group h-full bg-card rounded-2xl border border-border hover:border-primary/40 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer select-none overflow-hidden"
    >
      {/* Solid top accent */}
      <div className="h-[3px] w-full bg-primary flex-shrink-0" />

      <div className="flex flex-col flex-1 p-4 sm:p-5 gap-3">

        {/* Row 1: icon + counter + status dot */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
              <Award className="w-4 h-4 text-primary" />
            </div>
            {cert.status === "Active" && (
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/8 border border-primary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-semibold text-primary">Active</span>
              </div>
            )}
          </div>
          <span className="text-[10px] text-muted-foreground font-medium bg-background border border-border rounded-full px-2 py-0.5">
            {index + 1}/{total}
          </span>
        </div>

        {/* Row 2: Title */}
        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug flex-1 line-clamp-3">
          {cert.title}
        </h3>

        {/* Row 3: Meta */}
        <div className="space-y-1.5 flex md:flex-row md:justify-between md:gap-6 flex-col">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-xs truncate">{cert.issuingBody}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-xs">Issued {cert.year}</span>
          </div>
        </div>

        {/* Row 4: Category pill */}
        <span className={`self-start text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${color}`}>
          {cert.category}
        </span>

        {/* Row 5: View button — always at bottom */}
        <button
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          className="mt-auto w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold border border-border bg-background text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 group-hover:border-primary/30"
        >
          <Eye className="w-3.5 h-3.5" />
          View Certificate
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   SECTION
════════════════════════════════════════════════════ */
export function CertificatesSection() {
  const [activeCert, setActiveCert]   = useState<Cert | null>(null);
  const [swiperReady, setSwiperReady] = useState(false);
  const [isVisible, setIsVisible]     = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const prevRef    = useRef<HTMLButtonElement | null>(null);
  const nextRef    = useRef<HTMLButtonElement | null>(null);

  useEffect(() => { setSwiperReady(true); }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const active = certificatesData.certificates.filter((c) => c.status === "Active").length;
  const bodies = new Set(certificatesData.certificates.map((c) => c.issuingBody)).size;

  return (
    <section ref={sectionRef} id="certificates" className="relative z-0 bg-background overflow-hidden">
      {/* BG texture */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <Image src="/Background Noise.svg" alt="" fill className="object-cover opacity-60" priority />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_30%_40%,var(--color-primary)_0%,transparent_70%)] opacity-[0.06] dark:opacity-[0.11]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-12 md:py-20 px-4 sm:px-8 lg:px-16">

        {/* Section header */}
        <div className={`text-center mb-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-3">
            Credentials
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-3">
            {certificatesData.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
            {certificatesData.subtitle}
          </p>
          <div className="w-12 h-[3px] bg-primary rounded-full mx-auto mt-5" />
        </div>

        {/* Stat pills */}
        <div className={`flex flex-wrap justify-center gap-2 sm:gap-3 mb-9 transition-all duration-700 delay-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {[
            { label: "Total",  value: certificatesData.certificates.length },
            { label: "Active", value: active },
            { label: "Bodies", value: bodies },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-1 md:px-3 md:py-2 px-2 py-1 rounded-full bg-card border border-border shadow-sm hover:border-primary/30 transition-colors">
              <span className="text-base font-bold text-primary">{s.value}</span>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Swiper */}
        {swiperReady && (
          <div className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={16}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
              onBeforeInit={(swiper) => {
                // @ts-ignore
                swiper.params.navigation.prevEl = prevRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              breakpoints={{
                0:    { slidesPerView: 1, spaceBetween: 14 },
                540:  { slidesPerView: 2, spaceBetween: 14 },
                900:  { slidesPerView: 3, spaceBetween: 20 },
              }}
              className="pb-3"
            >
              {certificatesData.certificates.map((cert, i) => (
                <SwiperSlide key={i} className="h-auto py-2">
                  <CertCard
                    cert={cert}
                    index={i}
                    total={certificatesData.certificates.length}
                    onClick={() => setActiveCert(cert)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                ref={prevRef}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 shadow-sm"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs text-muted-foreground">
                {certificatesData.certificates.length} certificates
              </span>
              <button
                ref={nextRef}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 shadow-sm"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {activeCert && (
        <CertificateModal cert={activeCert} onClose={() => setActiveCert(null)} />
      )}
    </section>
  );
}