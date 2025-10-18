"use client";

import { Button } from "@/components/ui/button";
import { X, ShieldAlert } from "lucide-react";

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

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div
        className="
          relative bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl
          max-w-lg w-full
          animate-fadeIn
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
              This candidate has chosen not to publicly share their certificates.
              <br />
              Please contact them directly for verification.
            </p>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white text-sm"
              onClick={() =>
                window.open(
                  "https://wa.me/923001234567?text=Hello!%20I%20would%20like%20to%20verify%20your%20certificate.",
                  "_blank"
                )
              }
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

              {/* ✅ Scroll only inside image area */}
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
  );
}
