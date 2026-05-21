"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Award, Users, CheckCircle } from "lucide-react";
import aboutData from "@/data/about.json";
import { useEffect, useRef, useState } from "react";
import { AskModal } from "./AskModal";
import { useTypewriter } from "./useTypewriter";

const iconMap = { Shield, Award, Users, CheckCircle };

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const typedText = useTypewriter(
    [
      "an experienced Safety Officer",
      "NEBOSH Certified",
      "IOSH & OSHA Certified",
      "a Risk Assessment Expert",
      "First Aid & Fire Safety Certified",
    ],
    80
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => { });
        else video.pause();
      },
      { threshold: 0.5 }
    );
    obs.observe(video);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-16 sm:py-20 bg-muted/30 overflow-hidden">
      {/* Decorative background accent */}
      <div className="absolute top-0 right-0 w-72 h-72 lg:w-96 lg:h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* Section header */}
        <div
          className={`max-w-xl mb-12 sm:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-3">
            About Me
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {aboutData.title}
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Video card */}
          <div
            className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
          >
            <div className="relative rounded-2xl overflow-hidden border border-border/60 shadow-2xl shadow-primary/5 group">
              <video
                ref={videoRef}
                src="https://res.cloudinary.com/dpvsay7rw/video/upload/v1771599346/Adnan_Rafiq_-_Landscape_Portfolio_Rule_of_Thirds_jgo7qc.mp4"
                poster="https://res.cloudinary.com/dpvsay7rw/video/upload/v1771599346/so_0/Adnan_Rafiq_-_Landscape_Portfolio_Rule_of_Thirds_jgo7qc.jpg"
                muted
                loop
                playsInline
                preload="metadata"
                controls
                className="w-full h-56 sm:h-72 lg:h-80 object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
            </div>

            {/* Highlight cards below video */}

          </div>

          {/* Text content */}
          <div
            className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
          >
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-foreground mb-2">
              {aboutData.mainTitle}
            </h3>
            <p className="text-sm font-semibold text-primary mb-5 min-h-[1.25rem]">
              <span className="text-destructive">I am</span> {typedText}
              <span className="animate-pulse">|</span>
            </p>

            <div className="space-y-4 mb-8">
              {aboutData.description.map((para: string, i: number) => (
                <p key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>

        </div>
        {aboutData.highlights && (
          <div className="grid grid-cols-2 md:grid-cols-4 md:gap-3 gap-1 md:mt-4 mt-2">
            {aboutData.highlights.map((item: any, i: number) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap] || Shield;
              return (
                <div
                  key={i}
                  className={`flex items-center md:gap-3 gap-2  md:p-3 p-[3px] rounded-xl bg-background border border-border/60 shadow-sm transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  style={{ transitionDelay: `${300 + i * 100}ms` }}
                >
                  <div className="p-1.5 rounded-lg bg-primary/10 flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground leading-tight">{item.title}</p>
                    {item.value && <p className="text-[10px] text-muted-foreground">{item.value}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}