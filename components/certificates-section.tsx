"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { Award, Building2, Calendar, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import certificatesData from "@/data/certificates.json";
import { CertificateModal } from "./certificate-modal";

type Cert = (typeof certificatesData.certificates)[0];

/* Category pill colours */
const catColor: Record<string, string> = {
  "Health & Safety":    "bg-primary/10 text-primary border-primary/25",
  "Safety Supervision": "bg-primary/10 text-primary border-primary/25",
  "First Aid":          "bg-destructive/10 text-destructive border-destructive/25",
  "Fire Safety":        "bg-destructive/10 text-destructive border-destructive/25",
  "Height Safety":      "bg-primary/10 text-primary border-primary/25",
  "Risk Management":    "bg-primary/10 text-primary border-primary/25",
  "Investigation":      "bg-primary/10 text-primary border-primary/25",
};

/* ── Certificate card ── */
function CertCard({ cert, onClick }: { cert: Cert; onClick: () => void }) {
  const color = catColor[cert.category] ?? "bg-primary/10 text-primary border-primary/25";

  return (
    <button
      onClick={onClick}
      className="group w-full h-full text-left flex bg-card rounded-xl border border-border hover:border-primary/40 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      {/* Spine accent — reads as a credential/folder tab, not a generic top bar */}
      <div className="w-1.5 bg-primary/70 group-hover:bg-primary transition-colors flex-shrink-0" />

      <div className="flex flex-col flex-1 min-w-0 p-5 gap-3">
        {/* Icon + status */}
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
            <Award className="w-4 h-4 text-primary" />
          </div>
          {cert.status === "Active" && (
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[11px] font-medium text-muted-foreground">Active</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-serif text-base font-semibold text-foreground leading-snug line-clamp-2 min-h-[2.5rem]">
          {cert.title}
        </h3>

        {/* Meta */}
        <div className="flex justify-between flex-wrap gap-1.5 text-muted-foreground">
          <div className="flex items-center gap-2 min-w-0">
            <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-xs truncate">{cert.issuingBody}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-xs">Issued {cert.year}</span>
          </div>
        </div>

        {/* Category + view link */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/60">
          <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${color}`}>
            {cert.category}
          </span>
          <span className="flex items-center gap-1 hover:cursor-pointer text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
            View
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </button>
  );
}

/* ── Section ── */
export function CertificatesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const certs = certificatesData.certificates;
  const total = certs.length;

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setIsVisible(true),
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const active = certs.filter((c) => c.status === "Active").length;
  const bodies = new Set(certs.map((c) => c.issuingBody)).size;

  const showPrev = () => setActiveIndex((i) => (i === null ? null : (i - 1 + total) % total));
  const showNext = () => setActiveIndex((i) => (i === null ? null : (i + 1) % total));

  return (
    <section ref={sectionRef} id="certificates" className="relative bg-background overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <Image src="/Background Noise.svg" alt="" fill className="object-cover opacity-60" priority />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_30%_40%,var(--color-primary)_0%,transparent_70%)] opacity-[0.06] dark:opacity-[0.11]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-12 md:py-20 px-4 sm:px-8 lg:px-16">
        {/* Header */}
        <div className={`text-center mb-9 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-3">
            Credentials
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-3">
            {certificatesData.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
            {certificatesData.subtitle}
          </p>
        </div>

        {/* Stats */}
        <div className={`flex flex-wrap justify-center gap-3 mb-10 transition-all duration-700 delay-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {[
            { label: "Certifications", value: total },
            { label: "Currently Active", value: active },
            { label: "Issuing Bodies", value: bodies },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-sm">
              <span className="text-base font-bold text-primary">{s.value}</span>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Carousel */}
        <div className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            loop
            autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              0:   { slidesPerView: 1, spaceBetween: 14 },
              540: { slidesPerView: 2, spaceBetween: 14 },
              900: { slidesPerView: 3, spaceBetween: 20 },
            }}
            className="!pb-2"
          >
            {certs.map((cert, i) => (
              <SwiperSlide key={i} className="h-auto py-2">
                <CertCard cert={cert} onClick={() => setActiveIndex(i)} />
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
              {total} certificates
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
      </div>

      {activeIndex !== null && (
        <CertificateModal
          cert={certs[activeIndex]}
          index={activeIndex}
          total={total}
          onClose={() => setActiveIndex(null)}
          onPrev={showPrev}
          onNext={showNext}
        />
      )}
    </section>
  );
}