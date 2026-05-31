"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import {
  IdCard, Stamp, Monitor, BookOpen,
  CheckCircle, ChevronLeft, ChevronRight,
  ShieldCheck, Globe2,
} from "lucide-react";
import authData from "@/data/work-authorization.json";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  IdCard, Stamp, Monitor, BookOpen, CheckCircle, ShieldCheck,
};

/* Status config */
const statusCfg: Record<string, { pill: string; glow: string; bar: string; dot: string }> = {
  green: {
    pill: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    glow: "shadow-emerald-500/10",
    bar:  "from-emerald-600 to-emerald-400",
    dot:  "bg-emerald-400",
  },
  amber: {
    pill: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    glow: "shadow-amber-500/10",
    bar:  "from-amber-600 to-amber-400",
    dot:  "bg-amber-400",
  },
  red: {
    pill: "bg-red-500/15 text-red-400 border-red-500/30",
    glow: "shadow-red-500/10",
    bar:  "from-red-600 to-red-400",
    dot:  "bg-red-400",
  },
};

export function WorkAuthorizationSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [swiperReady, setSwiperReady] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const prevRef    = useRef<HTMLButtonElement | null>(null);
  const nextRef    = useRef<HTMLButtonElement | null>(null);

  useEffect(() => { setSwiperReady(true); }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="authorization" className="relative z-0 bg-background overflow-hidden">
      {/* BG texture */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <Image src="/Background Noise.svg" alt="" fill className="object-cover opacity-60" priority />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_60%,var(--color-primary)_0%,transparent_70%)] opacity-[0.06] dark:opacity-[0.10]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-12 md:py-20 px-4 sm:px-8 lg:px-16">

        {/* ── Header ── */}
        <div className={`text-center mb-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-3">
            Legal Status
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-3">
            {authData.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {authData.subtitle}
          </p>
          <div className="w-12 h-[3px] bg-primary rounded-full mx-auto mt-5" />
        </div>

        {/* ── Status banner ── */}
        <div className={`mb-10 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-muted/30  shadow-lg">
            {/* green left strip */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-emerald-600" />

            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5 px-6 sm:px-8 py-5">
              {/* Country + status */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl select-none">
                  🇸🇦
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    {authData.country}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-sm font-bold text-foreground">{authData.status}</p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px self-stretch bg-muted/30" />

              {/* Highlights */}
              <div className="flex flex-wrap gap-x-6 gap-y-2.5 flex-1 justify-center sm:justify-start">
                {authData.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">{h.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Document slider ── */}
        {swiperReady && (
          <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={16}
              loop={true}
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
                640: { slidesPerView: 2, spaceBetween: 16 },
                900: { slidesPerView: 3, spaceBetween: 20 },
              }}
              className="pb-3"
            >
              {authData.documents.map((doc, i) => {
                const Icon  = iconMap[doc.icon] ?? IdCard;
                const st    = statusCfg[doc.color] ?? statusCfg.green;

                return (
                  <SwiperSlide key={doc.id} className="h-auto py-2">
                    <div className={`group h-full bg-muted/30 rounded-2xl border border-border hover:border-primary/40 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col cursor-pointer select-none overflow-hidden`}>

                      {/* Gradient top bar */}
                      <div className={`h-[3px] w-full bg-gradient-to-r ${st.bar} flex-shrink-0`} />

                      <div className="flex flex-col flex-1 p-5 sm:p-6 gap-4">

                        {/* Row 1: icon + status */}
                        <div className="flex items-start justify-between">
                          <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${st.pill}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${st.dot} animate-pulse`} />
                            {doc.status}
                          </span>
                        </div>

                        {/* Row 2: label + name */}
                        <div>
                          <p className="text-[10px] font-bold text-primary uppercase tracking-[0.12em] mb-1">
                            {doc.label}
                          </p>
                          <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                            {doc.fullName}
                          </h3>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-border/60" />

                        {/* Row 3: issued by */}
                        <div className="flex items-start gap-2.5">
                          <div className="p-1.5 rounded-lg bg-muted flex-shrink-0 mt-0.5">
                            <Globe2 className="w-3 h-3 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Issued by</p>
                            <p className="text-xs font-semibold text-foreground">{doc.issuedBy}</p>
                          </div>
                        </div>

                        {/* Row 4: note */}
                        <p className="text-xs text-muted-foreground leading-relaxed mt-auto">
                          {doc.note}
                        </p>

                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {/* Nav buttons */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                ref={prevRef}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 shadow-sm"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs text-muted-foreground">
                {authData.documents.length} documents
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

        {/* ── Bottom disclaimer ── */}
        <p className={`text-center text-xs text-muted-foreground mt-8 max-w-lg mx-auto leading-relaxed transition-all duration-700 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          All documents are original and valid. Exact expiry dates and reference numbers are shared privately with verified employers upon request.
        </p>

      </div>
    </section>
  );
}