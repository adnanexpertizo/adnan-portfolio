"use client";

import { Button } from "@/components/ui/button";
import { X, ShieldAlert } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface CertificateModalProps {
  certificate: any;
  isOpen: boolean;
  onClose: () => void;
  permission: boolean;
}

export function CertificateModal({
  certificate,
  isOpen,
  onClose,
  permission,
}: CertificateModalProps) {
  if (!isOpen) return null;

  // ✅ Universal WhatsApp handler (mobile + desktop)
  const handleWhatsAppClick = () => {
    const phoneNumber = "923077522229";
    const message = encodeURIComponent(
      "Hello! 👋\n\nI’d like to verify your certificate.\n\nHere are my details:\n• Full Name:\n• Company Name:\n• Designation:\n• Purpose of Verification:\n\nThank you!"
    );

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const url = isMobile
      ? `whatsapp://send?phone=${phoneNumber}&text=${message}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    window.open(url, "_blank");
  };

  return (
    <>
      {/* Certificate Modal */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 px-4">
        <div
          className="
            relative bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl
            max-w-lg w-full animate-fadeIn
          "
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Permission Required */}
          {!permission ? (
            <div className="flex flex-col items-center justify-center text-center p-10">
              <ShieldAlert className="w-12 h-12 text-yellow-500 mb-3" />
              <h2 className="text-lg font-semibold mb-2">Permission Required</h2>
              <p className="text-sm text-muted-foreground mb-5">
                For privacy reasons, my certificates are not publicly shared.
                <br />
                To verify them, please reach out directly via WhatsApp and include
                your <strong>Name</strong>, <strong>Company Name</strong>,{" "}
                <strong>Designation</strong>, and <strong>Purpose</strong> of
                verification.
              </p>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white text-sm"
                onClick={handleWhatsAppClick}
              >
                Contact on WhatsApp
              </Button>
            </div>
          ) : (
            <>
              {/* Certificate Details */}
              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-3">
                  {certificate?.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {certificate?.issuingBody} • {certificate?.year}
                </p>

                {/* Scrollable Certificate */}
                <div
                  className="
                    rounded-lg overflow-hidden border shadow-inner
                    max-h-[60vh] overflow-y-auto
                    scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent
                  "
                >
                  <img
                    src={certificate?.image || "/placeholder-certificate.jpg"}
                    alt={certificate?.title}
                    className="w-full object-contain"
                  />
                </div>

                <div className="mt-6 flex justify-center">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="border-2 border-border hover:bg-primary hover:text-white text-sm"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-4 md:right-5 z-40 bg-green-500 text-white md:p-3 p-2 rounded-full shadow-lg hover:bg-green-600 hover:scale-105 transition-transform"
      >
        <FaWhatsapp className="md:w-6 md:h-6 w-5 h-5" />
      </button>
    </>
  );
}
