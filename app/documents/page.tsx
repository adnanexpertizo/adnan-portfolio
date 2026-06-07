"use client";

import ThemeToggle from "@/components/theme-toggle";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import heroData from "@/data/hero.json";

const SECTIONS = [
    { id: "all", label: "All Documents", emoji: "📄", page: 1 },
    { id: "experience", label: "Experience Certificates", emoji: "🏢", page: 2 },
    { id: "education", label: "Educational Degrees", emoji: "🎓", page: 3 },
    { id: "certification", label: "Professional Certifications", emoji: "🏅", page: 4 },
    { id: "training", label: "Training Certificates", emoji: "🔧", page: 5 },
    { id: "identity", label: "Identity & Supporting", emoji: "🪪", page: 6 },
];

const PDF_PATH = "/docs/HSE-Portfolio-Documents.pdf";

export default function DocsPage() {
    const [selected, setSelected] = useState(SECTIONS[0]);
    const [src, setSrc] = useState(`${PDF_PATH}#page=1&toolbar=0&navpanes=0&scrollbar=1&view=FitH`);

    const jumpTo = (section: typeof SECTIONS[number]) => {
        setSelected(section);
        setSrc(`${PDF_PATH}#page=${section.page}&toolbar=0&navpanes=0&scrollbar=1&view=FitH`);
    };

    return (
        <div className="bg-background text-foreground flex flex-col" style={{ height: "100svh", transition: "none" }}>


            {/* ── Header ── */}
            <header className="sticky top-0 z-50 shrink-0 border-b border-border bg-background/80 backdrop-blur-md px-4 py-3 flex items-center gap-4">
                <Link href="/" className="shrink-0">
                    <div className="relative w-28 h-8 sm:w-40 sm:h-10">
                        <Image src={heroData.logo} alt="Logo" fill className="object-contain object-left" />
                    </div>
                </Link>

                <div className="h-4 w-px bg-border" />

                <Link href="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="hidden sm:inline">Back to Home</span>
                </Link>

                <div className="ml-auto pl-2 border-l border-border/60">
                    <ThemeToggle />
                </div>
            </header>

            {/* ── Mobile: horizontal section bar ── */}
            <div className="md:hidden shrink-0 border-b border-border bg-background overflow-x-auto">
                <div className="flex gap-1 px-3 py-2 w-max">
                    {SECTIONS.map((s) => {
                        const isActive = selected.id === s.id;
                        return (
                            <button
                                key={s.id}
                                onClick={() => jumpTo(s)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap border transition-all
                                    ${isActive
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-secondary text-muted-foreground border-border hover:text-foreground hover:border-primary/40"
                                    }`}
                            >
                                <span>{s.emoji}</span>
                                {s.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ── Body: sidebar + viewer ── */}
            <div className="flex flex-1 overflow-hidden  r">

                {/* Desktop sidebar */}
                <aside className="hidden md:flex flex-col gap-1 w-68 shrink-0 border-r border-border overflow-y-auto py-4 px-2">
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground px-2 mb-2">
                        Sections
                    </p>
                    {SECTIONS.map((s) => {
                        const isActive = selected.id === s.id;
                        return (
                            <button
                                key={s.id}
                                onClick={() => jumpTo(s)}
                                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-left transition-all border
                                    ${isActive
                                        ? "bg-primary/10 text-primary border-primary/30 font-medium"
                                        : "text-muted-foreground border-transparent hover:bg-secondary hover:text-foreground"
                                    }`}
                            >
                                <span className="text-base">{s.emoji}</span>
                                <span className="leading-tight">{s.label}</span>
                                {isActive && (
                                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                )}
                            </button>
                        );
                    })}
                </aside>

                {/* PDF viewer */}
                <object
                key={src}
                    data={src}
                    type="application/pdf"
                    className=" md:w-[700px] lg:w-[900px] m-auto  w-full "
                    style={{ height: "100%" }}
                >
                    <p className="text-center text-muted-foreground text-sm mt-20">
                        Your browser cannot display the PDF.{" "}
                        <a href={PDF_PATH} className="text-primary underline">Download it here.</a>
                    </p>
                </object>

            </div>
        </div>
    );
}