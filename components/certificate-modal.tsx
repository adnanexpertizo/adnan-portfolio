"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Award, X, ShieldAlert, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export interface CertificateData {
  title: string;
  issuingBody: string;
  year: string | number;
  image: string;
  category?: string;
}

interface CertificateModalProps {
  cert: CertificateData;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function CertificateModal({ cert, index, total, onClose, onPrev, onNext }: CertificateModalProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Reset when a different certificate is opened
  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [cert]);

  // Lock background scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Keyboard: Escape to close, arrows to navigate
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  const contactOnWhatsApp = () => {
    const phone = "9665482996756";
    const msg = encodeURIComponent(
      `🛡️ Certificate Verification Request\n\n` +
      `Certificate: "${cert.title}"\n\n` +
      `My Details:\n- Name:\n- Company:\n- Designation:\n- Purpose:\n\nThank you!`
    );
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    window.open(
      isMobile
        ? `whatsapp://send?phone=${phone}&text=${msg}`
        : `https://web.whatsapp.com/send?phone=${phone}&text=${msg}`,
      "_blank"
    );
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6"
      style={{ backgroundColor: "rgba(10, 14, 12, 0.75)", backdropFilter: "blur(10px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={cert.title}
    >
      {/* Prev — outside the card, gallery-style */}
      <button
        onClick={onPrev}
        aria-label="Previous certificate"
        className="hidden sm:flex absolute left-4 lg:left-10 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center border border-white/15 bg-white/5 text-white hover:bg-white/15 hover:border-white/30 transition-all duration-200 backdrop-blur-sm"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={onNext}
        aria-label="Next certificate"
        className="hidden sm:flex absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center border border-white/15 bg-white/5 text-white hover:bg-white/15 hover:border-white/30 transition-all duration-200 backdrop-blur-sm"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div
        className="w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        style={{ maxHeight: "calc(100dvh - 48px)" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center flex-shrink-0">
            <Award className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground leading-tight truncate">{cert.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {cert.issuingBody} &nbsp;·&nbsp; {cert.year}
            </p>
          </div>
          <span className="text-[11px] font-medium text-muted-foreground bg-muted border border-border rounded-full px-2 py-0.5 flex-shrink-0">
            {index + 1}/{total}
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        {!error ? (
          <div className="relative flex-1 overflow-y-auto min-h-0 bg-muted/40 flex items-center justify-center p-4 sm:p-6">
            {!loaded && (
              <div className="flex flex-col items-center gap-2.5 py-10">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-xs text-muted-foreground">Loading certificate…</p>
              </div>
            )}
            <img
              src={cert.image}
              alt={cert.title}
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
              draggable={false}
              className={`max-h-[65vh] w-auto max-w-full rounded-lg border border-border shadow-md select-none transition-opacity duration-300 ${
                loaded ? "opacity-100" : "opacity-0 absolute pointer-events-none"
              }`}
            />

            {/* Prev/next on mobile, inline since the outer gallery arrows are hidden below sm */}
            <button
              onClick={onPrev}
              aria-label="Previous certificate"
              className="sm:hidden absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-background/80 border border-border shadow-sm text-foreground"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onNext}
              aria-label="Next certificate"
              className="sm:hidden absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-background/80 border border-border shadow-sm text-foreground"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center px-6 py-10">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4">
              <ShieldAlert className="w-7 h-7 text-amber-500" />
            </div>
            <h3 className="font-semibold text-sm text-foreground mb-2">Not publicly available</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5 max-w-xs">
              This certificate is shared only on verified request. Message on WhatsApp with your{" "}
              <span className="text-foreground font-medium">name</span>,{" "}
              <span className="text-foreground font-medium">company</span>, and{" "}
              <span className="text-foreground font-medium">purpose</span>.
            </p>
            <Button onClick={contactOnWhatsApp} className="gap-2 text-white border-0" style={{ backgroundColor: "#25D366" }}>
              <FaWhatsapp className="w-4 h-4" /> Contact on WhatsApp
            </Button>
          </div>
        )}

        {/* Footer */}
        {!error && loaded && (
          <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-t border-border flex-shrink-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span className="text-xs text-muted-foreground truncate">
                Issued by <span className="text-foreground font-medium">{cert.issuingBody}</span>
              </span>
            </div>
            <Button size="sm" variant="outline" onClick={contactOnWhatsApp} className="text-xs gap-1.5 h-7 px-3 flex-shrink-0">
              <FaWhatsapp className="w-3 h-3" /> Verify
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}