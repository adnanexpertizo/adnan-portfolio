"use client";

import ThemeToggle from "@/components/theme-toggle";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import heroData from "@/data/hero.json"

const SECTIONS = [
    { id: "all", label: "All Documents", emoji: "📄", page: 1 },
    { id: "experience", label: "Experience Certificates", emoji: "🏢", page: 2 },
    { id: "education", label: "Educational Degrees", emoji: "🎓", page: 4 },
    { id: "certification", label: "Professional Certifications", emoji: "🏅", page: 5 },
    { id: "training", label: "Training Certificates", emoji: "🔧", page: 7 },
    { id: "identity", label: "Identity & Supporting", emoji: "🪪", page: 8 },
];

const PDF_PATH = "/docs/HSE-Portfolio-Documents.pdf";

export default function DocsPage() {
    const [selected, setSelected] = useState(SECTIONS[0]);
    const [src, setSrc] = useState(`${PDF_PATH}#page=1&toolbar=0&navpanes=0&scrollbar=1&view=FitH`);

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const section = SECTIONS.find((s) => s.id === e.target.value)!;
        setSelected(section);
        setSrc(`${PDF_PATH}#page=${section.page}&toolbar=0&navpanes=0&scrollbar=1&view=FitH`);
    };

    return (
        <div className="bg-background text-foreground flex flex-col min-h-screen">
            <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md px-4 py-3 flex items-center gap-4">
                <Link href="/" className="flex items-center gap-2 shrink-0">
                    <button
                        className="relative w-28 h-8 sm:w-40 sm:h-10 flex-shrink-0 focus:outline-none"
                        aria-label="Go to home"
                    >
                        <Image src={heroData.logo} alt="Logo" fill className="object-contain object-left" />
                    </button>
                </Link>
                <div className="h-4 w-px bg-border" />
                <Link
                    href="/"
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Home
                </Link>
                <div className="ml-auto flex items-center gap-3">
                    <span className="text-sm text-muted-foreground hidden sm:block">Jump to:</span>
                    <div className="relative">
                        <select
                            value={selected.id}
                            onChange={handleSelect}
                            className="appearance-none bg-secondary border border-border text-foreground text-sm rounded-lg pl-3 pr-8 py-2 outline-none focus:border-primary cursor-pointer"
                        >
                            {SECTIONS.map((s) => (
                                <option key={s.id} value={s.id}>{s.emoji}  {s.label}</option>
                            ))}
                        </select>
                        <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                <div className="ml-2 pl-2 border-l border-border/60">
                    <ThemeToggle />
                </div>
            </header>
            <object
                key={src}
                data={src}
                type="application/pdf"
                className="w-full md:w-[70%] m-auto flex-1"
                style={{ height: "calc(100svh - 57px)" }}
            >
                <p className="text-center text-muted-foreground text-sm mt-20">
                    Your browser cannot display the PDF.{" "}
                    <a href={PDF_PATH} className="text-primary underline">Download it here.</a>
                </p>
            </object>

        </div>
    );
}