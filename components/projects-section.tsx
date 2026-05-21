"use client";

import { useEffect, useRef, useState } from "react";
import { Shield, BookOpen, FileSpreadsheet, Play, ExternalLink, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

/* ─── Project data (hardcoded for simplicity, or import from JSON) ─── */
const projects = [
  {
    icon: Shield,
    emoji: "🛡️",
    title: "Safety Management System",
    subtitle: "A digital system for managing all safety tasks in one place",
    what: "Instead of using paper forms and scattered files, this system lets safety officers log incidents, issue work permits, run inspections, and track compliance — all from a single screen.",
    why: "It saves time, reduces human error, and makes it easy for managers to see the full safety picture at a glance.",
    built: ["Admin & Officer login roles", "Digital incident reports", "Permit-to-Work online", "Inspection checklists", "Auto-generated compliance reports"],
    status: "Completed",
    year: "2023",
    tag: "Web Application",
    videoLink: "",
    liveLink: "",
  },
  {
    icon: BookOpen,
    emoji: "📱",
    title: "Safety Learning App",
    subtitle: "A mobile app to train workers on safety, anytime and anywhere",
    what: "This app delivers safety training through short videos and quizzes. Workers can learn on their phones without attending a physical class — useful for large teams spread across different locations.",
    why: "Traditional safety training is slow and hard to scale. This app lets organisations train more people, faster, with proof of completion.",
    built: ["Training videos & quizzes", "Progress tracking", "Certificate on completion", "Works offline", "Push notifications for updates"],
    status: "Completed",
    year: "2024",
    tag: "Mobile App",
    videoLink: "",
    liveLink: "",
  },
  {
    icon: FileSpreadsheet,
    emoji: "📊",
    title: "Automated Safety Toolkit",
    subtitle: "Smart Excel sheets that do the paperwork for you",
    what: "A set of pre-built Excel tools that automatically calculate risk scores, generate monthly safety reports, track incidents, and schedule inspections — without any manual data entry.",
    why: "Safety officers spend hours every week on repetitive paperwork. These tools cut that time dramatically, letting officers focus on actual safety work.",
    built: ["Auto risk assessment matrix", "Monthly KPI dashboard", "Incident log tracker", "Inspection scheduler", "Permit-to-Work template filler"],
    status: "In Active Use",
    year: "2022",
    tag: "Automation Tool",
    videoLink: "",
    liveLink: "",
  },
];

/* ─── Video Modal ─── */
function VideoModal({ url, title, onClose }: { url: string; title: string; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const isYoutube = url.includes("youtube") || url.includes("youtu.be");
  let embedUrl = url;
  if (isYoutube) {
    const id = url.includes("youtu.be")
      ? url.split("youtu.be/")[1]?.split("?")[0]
      : url.split("v=")[1]?.split("&")[0];
    embedUrl = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-3xl bg-background border border-border/60 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/60">
          <p className="text-sm font-semibold text-foreground truncate pr-4">{title} — Video Demo</p>
          <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="aspect-video bg-muted">
          {isYoutube
            ? <iframe src={embedUrl} title={title} className="w-full h-full" allow="autoplay; fullscreen" allowFullScreen />
            : <video src={url} controls autoPlay className="w-full h-full" />
          }
        </div>
      </div>
    </div>
  );
}

/* ─── Project Card ─── */
function ProjectCard({ project, index, isVisible }: { project: typeof projects[0]; index: number; isVisible: boolean }) {
  const [videoOpen, setVideoOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const Icon = project.icon;

  const isActive = project.status === "In Active Use";

  return (
    <>
      <div
        className={`group bg-background rounded-2xl border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1
          ${index === 0 ? "border-primary/40 hover:border-primary/60" : "border-border/60 hover:border-primary/30"}
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        {/* Top accent */}
        <div className={`h-1 w-full ${index === 0 ? "bg-gradient-to-r from-primary/50 via-primary to-primary/50" : "bg-border/40 group-hover:bg-primary/30 transition-colors duration-300"}`} />

        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <div className="text-3xl flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
              {project.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {project.tag}
                </span>
                <span className="text-[10px] text-muted-foreground">{project.year}</span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${isActive ? "bg-amber-500/10 text-amber-600 border border-amber-500/20" : "bg-primary/10 text-primary border border-primary/20"}`}>
                  <span className={`w-1 h-1 rounded-full ${isActive ? "bg-amber-500" : "bg-primary"} animate-pulse`} />
                  {project.status}
                </span>
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">{project.subtitle}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border/40 mb-4" />

          {/* What it does */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">What it does</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{project.what}</p>
          </div>

          {/* Why it matters */}
          <div className="mb-4 p-3.5 rounded-xl bg-primary/5 border border-primary/15">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">Why it matters</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{project.why}</p>
          </div>

          {/* What was built */}
          <div className="mb-5">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              Key Features
              <span className="text-[10px] text-muted-foreground font-normal ml-0.5">
                ({showAll ? "hide" : `show all ${project.built.length}`})
              </span>
            </button>
            <ul className="space-y-1.5">
              {(showAll ? project.built : project.built.slice(0, 3)).map((f, fi) => (
                <li key={fi} className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">{f}</span>
                </li>
              ))}
              {!showAll && project.built.length > 3 && (
                <li className="text-xs text-primary pl-5.5 cursor-pointer hover:underline" onClick={() => setShowAll(true)}>
                  + {project.built.length - 3} more…
                </li>
              )}
            </ul>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-border/40">
            {project.videoLink ? (
              <Button size="sm" onClick={() => setVideoOpen(true)} className="gap-1.5 text-xs h-8">
                <Play className="w-3 h-3" />
                Watch Demo
              </Button>
            ) : (
              <Button size="sm" variant="outline" disabled className="gap-1.5 text-xs h-8 text-muted-foreground opacity-60 cursor-not-allowed">
                <Play className="w-3 h-3" />
                Video Coming Soon
              </Button>
            )}
            {project.liveLink && (
              <Button size="sm" variant="outline" asChild className="gap-1.5 text-xs h-8 border-border/60 hover:border-primary/50">
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3 h-3" />
                  View Live
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      {videoOpen && project.videoLink && (
        <VideoModal url={project.videoLink} title={project.title} onClose={() => setVideoOpen(false)} />
      )}
    </>
  );
}

/* ─── Projects Section ─── */
export function ProjectsSection() {
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
    <section ref={sectionRef} id="projects" className="relative z-0 py-20 sm:py-28 bg-background overflow-hidden">
 <div className="absolute inset-0 z-2 pointer-events-none">
            <Image src="/Background Noise.svg" alt="" fill className="object-cover opacity-60" priority />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_40%,var(--color-primary)_0%,transparent_70%)] opacity-[0.07] dark:opacity-[0.12]" />
          </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">

        {/* Header */}
        <div className={`text-center mb-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-3">
            What I've Built
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Projects & Innovations
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed px-4">
            Real tools I built using my computer science skills to solve real safety problems — making the job easier for myself and other officers.
          </p>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto mt-5" />
        </div>

        {/* Differentiator callout */}
        <div className={`mb-10 flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-background border border-border/60 shadow-sm transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="text-2xl flex-shrink-0">💡</div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Why this makes me different</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Most safety officers focus only on field work. With a Computer Science degree, I also build the digital tools that make safety management more efficient.
              I've created apps, databases, and automated systems that reduce paperwork, improve reporting, and help teams work smarter — not harder.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} isVisible={isVisible} />
          ))}
        </div>

      </div>
    </section>
  );
}