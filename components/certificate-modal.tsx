"use client";

import { Button } from "@/components/ui/button";
import { X, ShieldAlert, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface CertificateModalProps {
  certificate: any;
  isOpen: boolean;
  onClose: () => void;
  permission: boolean;
}

export function CertificateModal({ certificate, isOpen, onClose, permission }: CertificateModalProps) {
  if (!isOpen) return null;

  const handleWhatsApp = () => {
    const phone = "923077522229";
    const msg = encodeURIComponent(
      "Hello! 👋\n\nI'd like to verify your certificate.\n\n• Full Name:\n• Company Name:\n• Designation:\n• Purpose:\n\nThank you!"
    );
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    window.open(
      isMobile ? `whatsapp://send?phone=${phone}&text=${msg}` : `https://web.whatsapp.com/send?phone=${phone}&text=${msg}`,
      "_blank"
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        role="dialog"
        aria-modal="true"
        aria-label="Certificate modal"
      >
        <div className="bg-background border border-border/60 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
            <h2 className="text-sm font-semibold text-foreground">Certificate Verification</h2>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {!permission ? (
            /* Permission required state */
            <div className="flex flex-col items-center text-center p-8">
              <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-5">
                <ShieldAlert className="w-7 h-7 text-amber-500" />
              </div>
              <h3 className="font-semibold text-base text-foreground mb-2">Permission Required</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-sm">
                Certificates are not publicly shared for privacy. To verify, reach out via WhatsApp with your{" "}
                <span className="text-foreground font-medium">name</span>,{" "}
                <span className="text-foreground font-medium">company</span>,{" "}
                <span className="text-foreground font-medium">designation</span>, and{" "}
                <span className="text-foreground font-medium">purpose</span>.
              </p>
              <Button
                onClick={handleWhatsApp}
                className="gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white border-0 shadow-lg shadow-green-500/20 hover:shadow-green-500/30 hover:-translate-y-0.5 transition-all duration-200"
              >
                <FaWhatsapp className="w-4 h-4" />
                Contact on WhatsApp
              </Button>
            </div>
          ) : (
            /* Certificate view state */
            <div className="p-5">
              <div className="text-center mb-4">
                <h3 className="font-semibold text-base text-foreground">{certificate?.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{certificate?.issuingBody} · {certificate?.year}</p>
              </div>
              <div className="rounded-xl overflow-hidden border border-border/60 max-h-[55vh] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/30">
                <img
                  src={certificate?.image || "/placeholder-certificate.jpg"}
                  alt={certificate?.title}
                  className="w-full object-contain"
                />
              </div>
              <div className="flex justify-center mt-5">
                <Button variant="outline" onClick={onClose} className="border-border/60 hover:border-primary/50">
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating WhatsApp */}
      <button
        onClick={handleWhatsApp}
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-4 z-[60] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
        style={{ backgroundColor: "#25D366" }}
      >
        <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </>
  );
}