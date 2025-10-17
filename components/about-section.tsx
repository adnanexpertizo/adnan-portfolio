"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Award, Users, CheckCircle } from "lucide-react";
import Image from "next/image";
import aboutData from "@/data/about.json";
import { useEffect, useRef, useState } from "react";
import { AskModal } from "./AskModal";
import { useTypewriter } from "./useTypewriter";
export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const iconMap = {
    Shield,
    Award,
    Users,
    CheckCircle,
  };

  const typedText = useTypewriter(
    [
      " an experienced Safety Officer",
      " graduated in Computer Science",
      " NEBOSH Certified",
      " IOSH & OSHA Certified",
      " First Aid, Fire Safety, Work at Height Certified",
    ],
    100
  );

  useEffect(() => {
    setIsVisible(true);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          aboutData.highlights.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards((prev) => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }, index * 150);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
 className="relative py-[40px] bg-muted/50 overflow-hidden md:py-20 py-10 "
    >
      <div className="container lg:px-[144px] md:px-[64px] px-[8px] mx-auto">
        <div className="text-center mb-[32px]">
          <h2
            className={`font-serif text-[24px] lg:text-[28px] font-bold text-foreground mb-[16px] transform transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            {aboutData.title}
          </h2>
         
        </div>

        <div className="grid lg:grid-cols-2 gap-[32px] items-center mb-[40px]">
          <div className="order-2 lg:order-1">
            <Card
              className={`overflow-hidden hover:shadow-2xl transition-all duration-700 ease-out transform ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0"
              } border-2 border-border/80 hover:border-primary/60 bg-card shadow-lg dark:border-border/80 dark:hover:border-primary/70 dark:shadow-xl dark:hover:shadow-2xl dark:bg-card/98 backdrop-blur-sm`}
              style={{ transitionDelay: "400ms" }}
            >
              <CardContent className="p-0">
                <Image
                  src={aboutData.workImage || "/placeholder.svg"}
                  alt="Adnan Rafiq at work"
                  width={600}
                  height={600}
                  className="w-full h-[250px] md:h-[330px] object-cover transition-transform duration-700 ease-out"
                />
              </CardContent>
            </Card>
          </div>

          <div
            className={`order-1 lg:order-2 px-[8px] transform transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <h3 className="font-serif text-[16px] md:text-[20px]  font-semibold text-foreground mb-[6px]">
              {aboutData.mainTitle}
            </h3>
             <h2 className="text-[12px] sm:[16px] md:text-[16px] text-start font-semibold text-primary mb-2 min-w-[250px] max-w-[400px] lg:max-w-[470px]">
            <span className="text-[#CD312D]">I am</span> {typedText}
            <span className="animate-pulse">|</span>
          </h2>
            {aboutData.description.map((paragraph, index) => (
              <p
                key={index}
                className="text-[12px] md:text-[16px] text-muted-foreground mb-[9px] text-pretty"
              >
                {paragraph}
              </p>
            ))}

            <div className="flex flex-wrap gap-[8px]">
              {aboutData.skills.map((skill, index) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className={`text-[11px] md:text-[13px] transition-all duration-300 ease-out transform ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  } border border-border/60 hover:border-primary/50 dark:border-border/70 dark:hover:border-primary/60`}
                  style={{ transitionDelay: `${800 + index * 100}ms` }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-[8px] sm:gap-[16px]">
          {aboutData.highlights.map((highlight, index) => {
            const IconComponent =
              iconMap[highlight.icon as keyof typeof iconMap];
            return (
              <Card
                key={index}
                className={`text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ease-out border-2 border-border/80 hover:border-primary/60 bg-card shadow-lg dark:border-border/80 dark:hover:border-primary/70 dark:shadow-xl dark:hover:shadow-2xl dark:bg-card/98 backdrop-blur-sm group transform ${
                  visibleCards[index]
                    ? "translate-y-0 opacity-100 scale-100"
                    : "translate-y-4 opacity-0 scale-95"
                }`}
                style={{ transitionDelay: `${1000 + index * 150}ms` }}
              >
                <CardContent className=" p-[10px] sm:p-[18px]">
                  <div className="inline-flex items-center justify-center md:w-[44px] md:h-[44px] w-[35px] h-[35px] bg-primary/10 rounded-lg mb-[12px] dark:bg-primary/20 transition-all duration-300 ease-out">
                    <IconComponent className="md:h-[22px] md:w-[22px] w-[16px] h-[16px] text-primary transition-transform duration-300" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-[8px] text-[12px] md:text-[15px]">
                    {highlight.title}
                  </h4>
                  <p className="md:text-[14px] text-[12px] text-muted-foreground text-pretty">
                    {highlight.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div> */}
      </div>
    </section>
  );
}
