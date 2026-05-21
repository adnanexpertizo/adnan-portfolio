"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import educationData from "@/data/education.json";
import Image from "next/image";

export function EducationSection() {
  const [swiperReady, setSwiperReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setSwiperReady(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();


  }, []);

  return (<section
    ref={sectionRef}
    id="education" className="relative z-0 bg-background overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 z-2 pointer-events-none">
        <Image src="/Background Noise.svg" alt="" fill className="object-cover opacity-60" priority />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_40%,var(--color-primary)_0%,transparent_70%)] opacity-[0.07] dark:opacity-[0.12]" />
      </div>
    <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4" />

    <div className="relative max-w-7xl mx-auto py-10 md:py-16 px-4 sm:px-8 lg:px-16">
      {/* Header */}
      <div
        className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
          }`}
      >
        <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-3">
          Academic Background
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
          {educationData.title}
        </h2>

        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
          {educationData.subtitle}
        </p>

        <div className="w-12 h-1 bg-primary rounded-full mx-auto mt-5" />
      </div>

      {/* Desktop Timeline */}
      <div className="hidden md:block relative">
        {/* Vertical line */}
        <div className="absolute left-[22px] top-4 bottom-4 w-px bg-gradient-to-b from-primary/40 via-border to-transparent" />

        <div className="space-y-8">
          {educationData.education.map((item, index) => (
            <div
              key={index}
              className={`relative flex gap-10 transition-all duration-700 ${isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
                }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              {/* Timeline icon */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-11 h-11 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center shadow-sm z-10">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
              </div>

              {/* Card */}
              <Card className="flex-1 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-border/60 hover:border-primary/40 bg-card shadow-sm overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-primary/40 via-primary to-primary/40" />

                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors">
                        {item.degree}
                      </h3>

                      <p className="text-sm font-medium text-primary mt-1">
                        {item.institution}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-muted-foreground flex-shrink-0">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="text-xs font-medium whitespace-nowrap">
                        {item.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Slider */}
      <div className="md:hidden">
        {swiperReady && (
          <div
            className={`transition-all duration-700 delay-300 ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
              }`}
          >
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={16}
              slidesPerView={1}
              centeredSlides={false}
              autoplay={{
                delay: 3200,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                // @ts-ignore
                swiper.params.navigation.prevEl = prevRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              breakpoints={{
                480: {
                  slidesPerView: 1
                },
                640: {
                  slidesPerView: 1,
                },
              }}
              className="pb-3"
            >
              {educationData.education.map((item, index) => (
                <SwiperSlide key={index} className="h-auto py-2">
                  <Card className="h-full  group border border-border/60 hover:border-primary/40 bg-card shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                    {/* Top gradient */}
                    <div className="h-1 w-full bg-gradient-to-r from-primary/40 via-primary to-primary/40" />

                    <CardContent className="p-5 flex flex-col min-h-[250px]">
                      {/* Icon */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-all duration-300">
                          <GraduationCap className="w-5 h-5 text-primary" />
                        </div>

                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-medium">
                            {item.period}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm text-foreground leading-snug group-hover:text-primary transition-colors">
                          {item.degree}
                        </h3>

                        <p className="text-xs font-medium text-primary mt-1 mb-3">
                          {item.institution}
                        </p>

                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-4 mt-7">
              <button
                ref={prevRef}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-border/60 bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 shadow-sm"
                aria-label="Previous education"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-xs text-muted-foreground">
                {educationData.education.length} qualifications
              </span>

              <button
                ref={nextRef}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-border/60 bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 shadow-sm"
                aria-label="Next education"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  </section>
  );
}
