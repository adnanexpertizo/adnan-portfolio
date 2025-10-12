// AskModal.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Send } from "lucide-react";

interface AskModalProps {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
}

export function AskModal({ openModal, setOpenModal }: AskModalProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const fullAnswer =
    "Adnan Rafiq is a NEBOSH Certified Safety Officer with 5+ years of professional experience.\n" +
    "Specialized in First Aid, Fire Safety, Risk Assessment, and Work at Height practices.\n" +
    "Skilled in safety training, incident investigation, and compliance auditing.\n" +
    "Dedicated to creating safer workplaces through proactive risk management.";

  const handleSend = () => {
    if (!question.trim()) return;
    setAnswer("");
    setOpenModal(true);
  };

  useEffect(() => {
    if (openModal) {
      let i = 0;
      const interval = setInterval(() => {
        setAnswer(fullAnswer.slice(0, i + 1));
        i++;
        if (i >= fullAnswer.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [openModal]);

  const close = () => {
    setOpenModal(false);
    setQuestion("");
    setAnswer("");
  };

  return (
    <>
      <div className="relative w-full max-w-md">
        {/* Animated Border Wrapper with theme color */}
        <div
          className="rounded-full p-[2px] bg-gradient-to-r from-primary to-primary/70 
                  animate-[gradientShift_6s_linear_infinite] focus-within:shadow-sm 
                  focus-within:shadow-primary/10 transition"
        >
          <div className="relative">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full pr-12 pl-4 py-3 rounded-full bg-background 
                   text-sm text-foreground placeholder-transparent 
                   focus:outline-none"
            />
            {!question && (
              <span
                className="absolute left-4 top-1/2 -translate-y-1/2 
                         text-muted-foreground text-sm pointer-events-none 
                         typing-placeholder"
              >
                Ask Adnan anything...
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleSend}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full 
               bg-primary text-primary-foreground hover:bg-primary/90 
               transition transform hover:scale-105 
               "
          aria-label="Send"
        >
          <Send size={20} className="rotate-45" />
        </button>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg relative overflow-hidden animate-fadeIn p-6">
            <button
              onClick={close}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white transition"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-sm text-gray-700 dark:text-gray-200 w-fit shadow-sm">
                {question}
              </div>

              <div className="bg-white/5 dark:bg-white/2 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm text-gray-800 dark:text-gray-100 text-left whitespace-pre-line leading-relaxed shadow-inner">
                {answer}
                <span className="animate-pulse">▋</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
