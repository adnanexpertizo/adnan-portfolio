"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Award, Calendar, Building2, Eye, ChevronLeft, ChevronRight,
  X, ShieldAlert, CheckCircle,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import certificatesData from "@/data/certificates.json";

/* ─── Types ─────────────────────────────────────── */
type Cert = (typeof certificatesData.certificates)[0];

/* ─── Category color map ─────────────────────────── */
const categoryColors: Record<string, string> = {
  "Health & Safety": "bg-primary/10 text-primary border-primary/20",
  "Safety Supervision": "bg-primary/10 text-primary border-primary/20",
  "First Aid": "bg-destructive/10 text-destructive border-destructive/20",
  "Fire Safety": "bg-destructive/10 text-destructive border-destructive/20",
  "Height Safety": "bg-accent/10 text-accent border-accent/20",
  "Risk Management": "bg-primary/10 text-primary border-primary/20",
  "Investigation": "bg-accent/10 text-accent border-accent/20",
};

/* ─── Certificate Modal ──────────────────────────── */
function CertificateModal({ cert, onClose }: { cert: Cert; onClose: () => void }) {
  const [orientation, setOrientation] = useState<"landscape" | "portrait" | "loading">("loading");
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoaded(false); setError(false); setOrientation("loading");
  }, [cert]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setOrientation(img.naturalWidth >= img.naturalHeight ? "landscape" : "portrait");
    setLoaded(true);
  };

  const handleWhatsApp = () => {
    const phone = "923077522229";
    const msg = encodeURIComponent(
      `Hello!\n\nVerification request for:\n"${cert.title}"\n\n• Full Name:\n• Company:\n• Designation:\n• Purpose:\n\nThank you!`
    );
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    window.open(isMobile ? `whatsapp://send?phone=${phone}&text=${msg}` : `https://web.whatsapp.com/send?phone=${phone}&text=${msg}`, "_blank");
  };

  const maxW = orientation === "landscape" ? "max-w-3xl" : orientation === "portrait" ? "max-w-md" : "max-w-xl";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-background/80 backdrop-blur-xl"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`relative bg-background border border-border/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col w-full ${maxW}`}
        style={{ maxHeight: "92dvh" }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-border/60 flex-shrink-0 bg-card/80 backdrop-blur-sm">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0">
              <Award className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-foreground leading-tight truncate">{cert.title}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{cert.issuingBody} &middot; {cert.year}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="ml-3 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Image Area */}
        <div className="flex-1 overflow-y-auto overscroll-contain min-h-0 bg-muted/20">
          {!error ? (
            <div className="flex items-center justify-center p-4 sm:p-6 min-h-[200px] relative">
              {/* Loading spinner */}
              {!loaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  <p className="text-xs text-muted-foreground">Loading certificate…</p>
                </div>
              )}
              <img
                src={cert.image}
                alt={cert.title}
                onLoad={handleLoad}
                onError={() => setError(true)}
                draggable={false}
                className={`rounded-xl border border-border/40 shadow-lg transition-opacity duration-300 select-none
                  ${orientation === "landscape" ? "w-full h-auto object-contain" : ""}
                  ${orientation === "portrait" ? "max-h-[65vh] w-auto object-contain mx-auto" : ""}
                  ${orientation === "loading" ? "max-h-[60vh] w-auto object-contain" : ""}
                  ${loaded ? "opacity-100" : "opacity-0 absolute"}
                `}
              />
            </div>
          ) : (
            /* Permission state */
            <div className="flex flex-col items-center text-center py-12 px-6">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4">
                <ShieldAlert className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="font-semibold text-base text-foreground mb-2">Certificate Not Publicly Available</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
                For privacy, certificates are shared only on verified request. Contact via WhatsApp with your{" "}
                <span className="text-foreground font-medium">name</span>,{" "}
                <span className="text-foreground font-medium">company</span>, and{" "}
                <span className="text-foreground font-medium">purpose</span>.
              </p>
              <Button
                onClick={handleWhatsApp}
                className="gap-2 text-white border-0 shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                style={{ backgroundColor: "#25D366" }}
              >
                <FaWhatsapp className="w-4 h-4" />
                Contact on WhatsApp
              </Button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {!error && loaded && (
          <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-t border-border/60 flex-shrink-0 bg-card/80 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-muted-foreground">
                Issued by <span className="text-foreground font-medium">{cert.issuingBody}</span>
              </span>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleWhatsApp}
              className="text-xs gap-1.5 border-border/60 hover:border-primary/50 h-7 px-3"
            >
              <FaWhatsapp className="w-3 h-3" />
              Verify
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Certificates Section ───────────────────────── */
export function CertificatesSection() {
  const [activeCert, setActiveCert] = useState<Cert | null>(null);
  const [swiperReady, setSwiperReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => { setSwiperReady(true); }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const activeCount = certificatesData.certificates.filter((c) => c.status === "Active").length;
  const bodyCount = new Set(certificatesData.certificates.map((c) => c.issuingBody)).size;

  return (
    <section ref={sectionRef} id="certificates" className="relative py-20 sm:py-28 bg-background overflow-hidden">
      <div className="absolute w-full md:h-[900px] h-full z-5 overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src="/Background Noise.svg"
            alt="a;t"
            fill
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">

        {/* Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-3">Credentials</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">{certificatesData.title}</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">{certificatesData.subtitle}</p>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto mt-5" />
        </div>

        {/* Stats row */}
        <div className={`flex flex-wrap justify-center gap-3 mb-10 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {[
            { label: "Total Certificates", value: certificatesData.certificates.length },
            { label: "Currently Active", value: activeCount },
            { label: "Issuing Bodies", value: bodyCount },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-background border border-border/60 shadow-sm">
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
              loop={certificatesData.certificates.length > 3}
              autoplay={{ delay: 2800, disableOnInteraction: false, pauseOnMouseEnter: true }}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
              onBeforeInit={(swiper) => {
                // @ts-ignore
                swiper.params.navigation.prevEl = prevRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              breakpoints={{
                0: { slidesPerView: 1 },
                480: { slidesPerView: 2, spaceBetween: 14 },
                900: { slidesPerView: 3, spaceBetween: 16 },
                1200: { slidesPerView: 4, spaceBetween: 20 },
              }}
              className="pb-2"
            >
              {certificatesData.certificates.map((cert, i) => {
                const colorClass = categoryColors[cert.category] ?? "bg-primary/10 text-primary border-primary/20";
                return (
                  <SwiperSlide key={i} className="h-auto py-2">
                    <div
                      onClick={() => setActiveCert(cert)}
                      className="group relative h-full bg-background rounded-2xl border border-border/60 hover:border-primary/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col cursor-pointer select-none"
                    >
                      {/* Top gradient bar */}
                      <div className="h-1 w-full bg-gradient-to-r from-primary/40 via-primary to-primary/40 group-hover:from-primary group-hover:to-primary transition-all duration-500" />

                      <div className="flex flex-col flex-1 p-4 sm:p-5">
                        {/* Icon + status */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                            <Award className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary/8 border border-primary/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            <span className="text-[10px] font-semibold text-primary">{cert.status}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-3 flex-1">
                          {cert.title}
                        </h3>

                        {/* Meta */}
                        <div className="space-y-1.5 mb-3">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="text-xs truncate">{cert.issuingBody}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="text-xs">Issued {cert.year}</span>
                          </div>
                        </div>

                        {/* Category */}
                        <div className={`inline-flex self-start items-center px-2.5 py-1 rounded-full text-[10px] font-semibold border mb-4 ${colorClass}`}>
                          {cert.category}
                        </div>

                        {/* View button */}
                        <div className="mt-auto pt-3 border-t border-border/40">
                          <button
                            onClick={(e) => { e.stopPropagation(); setActiveCert(cert); }}
                            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium text-muted-foreground bg-muted/60 hover:bg-primary hover:text-primary-foreground transition-all duration-200 group-hover:bg-primary/8 group-hover:text-primary"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View Certificate
                          </button>
                        </div>
                      </div>

                      {/* Hover overlay shimmer */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,var(--primary)_0%,transparent_60%)] opacity-0 group-hover:opacity-[0.03]" />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {/* Navigation buttons */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                ref={prevRef}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-border/60 bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 shadow-sm"
                aria-label="Previous certificate"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs text-muted-foreground">
                {certificatesData.certificates.length} certificates
              </span>
              <button
                ref={nextRef}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-border/60 bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 shadow-sm"
                aria-label="Next certificate"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {activeCert && <CertificateModal cert={activeCert} onClose={() => setActiveCert(null)} />}
    </section>
  );
}