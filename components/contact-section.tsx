"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Eye, EyeOff } from "lucide-react";
import {
  FaWhatsapp,
  FaEnvelope,
  FaLinkedin,
  FaMapMarkerAlt,
} from "react-icons/fa";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [showNumber, setShowNumber] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // WhatsApp logic (mobile + desktop support)
  const handleWhatsAppClick = () => {
    const phoneNumber = "9665482996756";
    const message = encodeURIComponent(
      "Hello! 👋\n\nI’d like to get in touch.\n\nHere are my details:\n• Full Name:\n• Company Name:\n• Message / Inquiry:\n\nThank you!"
    );

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const url = isMobile
      ? `whatsapp://send?phone=${phoneNumber}&text=${message}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    window.open(url, "_blank");
  };

  const email = "adnanrafiq7522@gmail.com";
  const location = "Saudi Arabia";
  const linkedin = "https://linkedin.com/in/adnanrafiq";

  const contactItems = [
    {
      key: "email",
      icon: FaEnvelope,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      iconClass: "text-primary",
    },
    {
      key: "location",
      icon: FaMapMarkerAlt,
      label: "Location",
      value: location,
      href: undefined,
      iconClass: "text-primary",
    },
    {
      key: "linkedin",
      icon: FaLinkedin,
      label: "LinkedIn",
      value: linkedin.replace("https://", ""),
      href: linkedin,
      iconClass: "text-primary",
    },
  ];

  return (
    <section id="contact" className="relative z-0 bg-muted/30 overflow-hidden">
      {/* Background texture — pointer-events-none so it never intercepts
          clicks or text selection on the content above it */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_40%,var(--color-primary)_0%,transparent_70%)] opacity-[0.07] dark:opacity-[0.12]" />

      <div className="container lg:px-36 md:px-16 px-4 mx-auto md:py-16 py-10 relative">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-[20px] md:text-[26px] font-bold text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="text-[12px] md:text-[14px] text-muted-foreground max-w-2xl mx-auto text-pretty">
            Feel free to reach out for collaborations, opportunities, or any
            safety and development inquiries. I’ll respond as soon as
            possible.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
          {/* Left Side: Contact Info */}
          <div className="flex flex-col h-full">
            <ul className="divide-y divide-border/60 border-t border-b border-border/60">
              {contactItems.map(({ key, icon: Icon, label, value, href, iconClass }) => {
                const content = (
                  <div className="group flex items-center gap-4 py-5">
                    <Icon className={`shrink-0 text-[18px] ${iconClass}`} />
                    <div className="min-w-0">
                      <p className="text-[13px] uppercase tracking-wide text-muted-foreground/70">
                        {label}
                      </p>
                      <p
                        className={`text-[15px] text-foreground truncate ${
                          href ? "group-hover:text-primary transition-colors" : ""
                        }`}
                      >
                        {value}
                      </p>
                    </div>
                  </div>
                );

                return (
                  <li key={key}>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}

              {/* WhatsApp row — kept separate for the reveal/hide toggle */}
              <li>
                <div className="group flex items-center gap-4 py-5">
                  <button
                    type="button"
                    onClick={handleWhatsAppClick}
                    aria-label="Message on WhatsApp"
                    className="shrink-0"
                  >
                    <FaWhatsapp className="text-[19px] text-[#25D366]" />
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] uppercase tracking-wide text-muted-foreground/70">
                      WhatsApp
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleWhatsAppClick}
                        className="text-[15px] text-foreground hover:text-[#25D366] transition-colors"
                      >
                        {showNumber ? "+92 307 7522229" : "Tap to reveal number"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowNumber(!showNumber)}
                        aria-label={showNumber ? "Hide number" : "Show number"}
                        className="text-muted-foreground hover:text-primary transition-colors focus:outline-none"
                      >
                        {showNumber ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Side: Contact Form */}
          <Card className="border border-border/60 shadow-sm bg-background">
            <CardHeader>
              <CardTitle className="font-serif text-[16px] md:text-xl">
                Send a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Input
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border border-border/60 bg-background"
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border border-border/60 bg-background"
                  />
                </div>
                <Input
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="border border-border/60 bg-background"
                />
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="border border-border/60 bg-background"
                />
                <Button
                  type="submit"
                  className="w-full group transition-all duration-300"
                >
                  <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <p className="m-8 text-[13px] text-muted-foreground/80">
              Prefer a quick chat? WhatsApp usually gets the fastest reply —
              email works well for anything more detailed.
            </p>
      </div>
    </section>
  );
}