"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import experienceData from "@/data/experience.json";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [swiperReady, setSwiperReady] = useState(false);

  useEffect(() => {
    setSwiperReady(true);
  }, []);

  // Animate cards when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          experienceData.experiences.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards((prev) => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }, index * 200);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-20 overflow-hidden bg-background relative"
    >
      <div className="container lg:px-36 md:px-16 px-4 mx-auto relative">
        {/* Header */}
        <div className="text-center mb-10">
          <h2
            className={`font-serif text-[20px] md:text-[26px] font-bold text-foreground mb-4 transform transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            {experienceData.title}
          </h2>
          <p
            className={`text-[12px] md:text-[14px] text-muted-foreground md:max-w-2xl mx-auto text-pretty transform transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            {experienceData.subtitle}
          </p>
        </div>

        {/* Swiper Section */}
        <div className="relative">
          {swiperReady && (
            <Swiper
              modules={[Navigation, Autoplay]}
              loop={true}
              autoplay={{
                delay: 4000,
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
              spaceBetween={24}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 16 },
                1100: { slidesPerView: 2, spaceBetween: 24 },
              }}
              className="my-10"
            >
              {experienceData.experiences.map((exp, index) => (
                <SwiperSlide key={index} className="flex">
                  <Card
                    className={`flex flex-col justify-between my-10 h-full min-h-[420px] max-h-[420px] transition-all duration-500 ease-out group border-2 border-border/80 hover:border-primary/60 dark:border-border/80 dark:hover:border-primary/70 shadow-lg hover:shadow-xl bg-muted/40 backdrop-blur-sm transform hover:-translate-y-1 ${
                      visibleCards[index]
                        ? "translate-x-0 opacity-100"
                        : "translate-x-6 opacity-0"
                    }`}
                    style={{ transitionDelay: `${600 + index * 200}ms` }}
                  >
                    <CardContent className="p-2 md:p-4 lg:p-8 flex flex-col h-full">
                      {/* Top Info */}
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4 md:mb-6">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <Briefcase className="h-4 w-4 md:h-5 md:w-5 text-primary mr-2 transition-transform duration-300 group-hover:scale-105" />
                            <h3 className="font-serif text-[11px] md:text-[14px] font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                              {exp.title}
                            </h3>
                          </div>
                          <p className="text-[11px] md:text-[14px] font-medium text-primary mb-2">
                            {exp.company}
                          </p>
                          <div className="flex flex items-center justify-between gap-1 sm:gap-4 text-muted-foreground">
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                              <span className="text-[11px] md:text-[13px]">
                                {exp.location}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                              <span className="text-[11px] md:text-[13px]">
                                {exp.period}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className="mt-3 lg:mt-0 transition-colors duration-300 group-hover:bg-primary/15 border border-border/60 hover:border-primary/50 text-[10px] md:text-[12px] py-1 px-2"
                        >
                          {exp.type}
                        </Badge>
                      </div>

                      {/* Responsibilities */}
                      <div className="">
                        <h4 className="font-semibold text-foreground mb-2 md:mb-4 group-hover:text-primary transition-colors text-[11px] md:text-[14px] duration-300">
                          Key Responsibilities:
                        </h4>
                        <ul className="space-y-1 md:space-y-2 pr-2 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/40 scrollbar-track-transparent max-h-[200px]">
                          {exp.responsibilities.map((responsibility, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full mt-1.5 md:mt-2 mr-2 md:mr-3 flex-shrink-0"></div>
                              <span className="text-muted-foreground text-[11px] md:text-[13px] text-pretty group-hover:text-foreground transition-colors duration-300">
                                {responsibility}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* Floating Navigation Buttons (Always visible) */}
          {/* <button
            ref={prevRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background/90 hover:bg-primary hover:text-white transition-all shadow-md"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            ref={nextRef}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background/90 hover:bg-primary hover:text-white transition-all shadow-md"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button> */}
        </div>
      </div>
    </section>
  );
}
