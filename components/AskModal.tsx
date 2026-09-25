"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Send, X, Bot } from "lucide-react";

interface AskModalProps {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
}

const FULL_ANSWER =
  "Adnan Rafiq is a NEBOSH Certified Safety Officer with 5+ years of professional experience.\n\n" +
  "Specialized in First Aid, Fire Safety, Risk Assessment, and Work at Height.\n\n" +
  "Skilled in safety training, incident investigation, and compliance auditing.\n\n" +
  "Dedicated to creating safer workplaces through proactive risk management and international HSE standards.";

export function AskModal({ openModal, setOpenModal }: AskModalProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSend = () => {
    if (!question.trim()) return;
    setAnswer("");
    setIsTyping(true);
    setOpenModal(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => {
    if (openModal && isTyping) {
      let i = 0;
      const interval = setInterval(() => {
        setAnswer(FULL_ANSWER.slice(0, i + 1));
        i++;
        if (i >= FULL_ANSWER.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 18);
      return () => clearInterval(interval);
    }
  }, [openModal, isTyping]);

  const close = () => {
    setOpenModal(false);
    setQuestion("");
    setAnswer("");
    setIsTyping(false);
  };

  return (
    <>
      {/* Input bar */}
      <div className="relative w-full max-w-md">
        <div className="flex items-center gap-2 pl-4 pr-2 py-2 rounded-full border border-border/60 bg-background/80 backdrop-blur-sm shadow-sm hover:border-primary/50 focus-within:border-primary/60 focus-within:shadow-md focus-within:shadow-primary/10 transition-all duration-300">
          <Bot className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Adnan anything..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none min-w-0"
          />
          <button
            onClick={handleSend}
            disabled={!question.trim()}
            className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-sm shadow-primary/30 hover:bg-primary/90 hover:shadow-md hover:shadow-primary/40 disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 hover:cursor-pointer"
            aria-label="Send"
          >
            <Send className="w-4 h-4 translate-x-[-1px]" />
          </button>
        </div>
      </div>

      {/* Modal — rendered via portal so it always centers on the real viewport,
          independent of any transformed ancestors in the page layout */}
      {mounted &&
        openModal &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[9999] p-4 animate-in fade-in duration-200"
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <div className="bg-background border border-border/60 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-2 duration-200">
              {/* Modal header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">Ask about Adnan</span>
                  {isTyping && (
                    <div className="flex gap-0.5 ml-1">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="w-1 h-1 rounded-full bg-primary animate-bounce"
                          style={{ animationDelay: `${i * 120}ms` }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={close}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="bg-primary text-primary-foreground text-sm rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-xs shadow-sm break-words">
                    {question}
                  </div>
                </div>

                {/* AI response */}
                {answer && (
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-foreground leading-relaxed whitespace-pre-line max-w-sm shadow-sm">
                      {answer}
                      {isTyping && (
                        <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse align-middle" />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}