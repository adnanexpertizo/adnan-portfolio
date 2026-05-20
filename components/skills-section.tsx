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
  { icon: ShieldCheck,     label: "Risk Assessment" },
  { icon: AlertTriangle,   label: "Incident Investigation" },
  { icon: ClipboardList,   label: "Safety Auditing" },
  { icon: Flame,           label: "Fire Safety" },
  { icon: ArrowUpFromLine, label: "Work at Height" },
  { icon: FileText,        label: "Permit to Work" },
  { icon: Users,           label: "Safety Training" },
  { icon: ShieldCheck,     label: "Emergency Response" },
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
    <section ref={sectionRef} id="skills" className="relative py-20 sm:py-28 bg-background overflow-hidden">
      {/* Soft background glow */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image src="/Background Noise.svg" alt="" fill className="object-cover opacity-60" priority />
            {/* Subtle radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_40%,var(--color-primary)_0%,transparent_70%)] opacity-[0.07] dark:opacity-[0.12]" />
          </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">

        {/* ── Header ── */}
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-3">What I Bring</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">Skills & Expertise</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Strong safety fundamentals — and a technology edge that makes me more effective than the average safety officer.
          </p>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto mt-5" />
        </div>

        {/* ── Block 1: Core Safety Skills ── */}
        <div className={`mb-14 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-base sm:text-lg text-foreground">Core Safety Skills</h3>
              <p className="text-xs text-muted-foreground">Hands-on HSE expertise from the field</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {safetySkills.map(({ icon: Icon, label }, i) => (
              <div
                key={label}
                className={`flex items-center gap-3 p-3.5 rounded-xl bg-muted/60 border border-border/60 hover:border-primary/40 hover:bg-primary/5 hover:-translate-y-0.5 transition-all duration-200 cursor-default ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
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

        {/* ── Block 2: Standards ── */}
        <div className={`mb-14 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
              <ClipboardList className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-base sm:text-lg text-foreground">Standards & Frameworks</h3>
              <p className="text-xs text-muted-foreground">International safety regulations I work with daily</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {standards.map((s, i) => (
              <div
                key={s}
                className={`px-4 py-2 rounded-full border border-primary/25 bg-primary/8 text-primary text-sm font-medium hover:bg-primary/15 transition-all duration-200 cursor-default ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                style={{ transitionDelay: `${260 + i * 50}ms` }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* ── Block 3: Tech advantage ── */}
        <div className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {/* Callout banner */}
          <div className="mb-6 p-4 sm:p-5 rounded-2xl border border-primary/25 bg-primary/5 flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 flex-shrink-0 mt-0.5">
              <Laptop className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-base sm:text-lg text-foreground mb-1">
                My Technology Advantage
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I hold a <span className="text-foreground font-medium">Computer Science degree</span> alongside my safety qualifications.
                This means I can build tools, automate paperwork, and create digital systems that make safety management
                faster and easier —{" "}
                <span className="text-foreground font-medium">something most safety officers simply cannot do.</span>
              </p>
            </div>
          </div>

          {/* 4 tech impact cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {techImpact.map(({ icon: Icon, title, plain }, i) => (
              <div
                key={title}
                className={`group flex gap-4 p-5 rounded-2xl border border-border/60 bg-muted/40 hover:border-primary/40 hover:bg-background hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
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