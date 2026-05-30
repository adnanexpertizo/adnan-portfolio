"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ShieldCheck, FileText, Users, AlertTriangle,
  Flame, ArrowUpFromLine, ClipboardList,
  Laptop, FileSpreadsheet, Smartphone, BarChart3,
} from "lucide-react";

/* ─── Safety skill cards ─── */
const safetySkills = [
  { icon: ShieldCheck, label: "Risk Assessment" },
  { icon: AlertTriangle, label: "Incident Investigation" },
  { icon: ClipboardList, label: "Safety Auditing" },
  { icon: Flame, label: "Fire Safety" },
  { icon: ArrowUpFromLine, label: "Work at Height" },
  { icon: FileText, label: "Permit to Work" },
  { icon: Users, label: "Safety Training" },
  { icon: ShieldCheck, label: "Emergency Response" },
];

/* ─── Tech advantage cards — plain English ─── */
const techImpact = [
  {
    icon: FileSpreadsheet,
    title: "Automated Paperwork",
    plain: "Built smart Excel sheets that fill in risk reports automatically — saving hours of manual work every week for the whole team.",
  },
  {
    icon: Laptop,
    title: "Built a Safety System",
    plain: "Created a web-based system where officers can log incidents, raise permits, and track compliance — all from one screen.",
  },
  {
    icon: Smartphone,
    title: "Safety Learning App",
    plain: "Designed a mobile app that delivers safety training videos and quizzes, so workers can learn anywhere, anytime.",
  },
  {
    icon: BarChart3,
    title: "Live Safety Dashboards",
    plain: "Set up visual dashboards that show safety performance at a glance — no need to dig through spreadsheets.",
  },
];

/* ─── Standards list ─── */
const standards = [
  "NEBOSH IGC", "OSHA 30-Hour", "IOSH Managing Safely",
  "ISO 45001 Awareness", "HSE Legislation", "PPE Management",
];

export function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative py-16 sm:py-20 bg-muted/30 overflow-hidden">
      {/* Decorative background accent */}
      <div className="absolute top-0 right-0 w-72 h-72 lg:w-96 lg:h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/4" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className={`text-center mb-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-3">What I Bring</span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-4">Skills & Expertise</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Strong safety fundamentals — and a technology edge that makes me more effective than the average safety officer.
          </p>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto mt-5" />
        </div>

        {/* ── Block 1: Core Safety Skills ── */}
        <div className={`mb-10 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-base sm:text-lg text-foreground">Core Safety Skills</h3>
              <p className="text-xs text-muted-foreground">Hands-on HSE expertise from the field</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:gap-3 gap-2">
            {safetySkills.map(({ icon: Icon, label }, i) => (
              <div
                key={label}
                className={`flex items-center md:gap-3 gap-2 md:p-3.5 p-1 rounded-xl bg-background border border-border/60 hover:border-primary/40 hover:bg-primary/5 hover:-translate-y-0.5 transition-all duration-200 cursor-default ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${150 + i * 55}ms` }}
              >
                <div className="p-1.5 rounded-lg bg-primary/10 flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-foreground leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Block 3: Tech advantage ── */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {/* Callout banner */}
          <div className="hover:scale-105 duration-1000 mb-6 p-4 sm:p-5 rounded-2xl border border-primary/64 bg-background flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 flex-shrink-0 mt-0.5">
              <Laptop className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-base sm:text-lg text-foreground mb-1 ">
                My Technology Advantage
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                What makes me different from other HSE officers is my unique combination of{" "}
                <span className="text-foreground font-medium">Safety and Technology skills</span>.
                Along with professional safety qualifications, I also have a{" "}
                <span className="text-foreground font-medium">Computer Science background</span>,
                which helps me build digital systems, automate reporting, and make safety
                management faster, smarter, and more efficient.
              </p>
            </div>
          </div>

          {/* 4 tech impact cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {techImpact.map(({ icon: Icon, title, plain }, i) => (
              <div
                key={title}
                className={`group flex gap-4 p-5 rounded-2xl border border-primary/42 bg-background hover:border-primary/40 hover:bg-background hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${400 + i * 80}ms` }}
              >
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 flex-shrink-0 h-fit group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground mb-1.5 group-hover:text-primary transition-colors">
                    {title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{plain}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
} 