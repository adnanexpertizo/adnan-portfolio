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

  // ✅ WhatsApp logic (mobile + desktop support)
  const handleWhatsAppClick = () => {
    const phoneNumber = "923077522229";
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

  return (
    <section id="contact" className="py-20 bg-muted/50">
      <div className="container lg:px-36 md:px-16 px-4 mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-[20px] md:text-[26px] font-bold text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="text-[12px] md:text-[14px] text-muted-foreground max-w-2xl mx-auto text-pretty">
            Feel free to reach out for collaborations, opportunities, or any
            safety and development inquiries. I’ll respond as soon as possible.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Side: Contact Info */}
          <div className="space-y-8">
            {/* Desktop version */}
            <div className="hidden md:block space-y-6">
              {/* Email */}
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mr-4">
                  <FaEnvelope className="text-primary text-[22px]" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <a
                    href={`mailto:${email}`}
                    className="text-muted-foreground text-[13px] md:text-[14px] hover:text-primary transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center cursor-pointer">
                <div
                  onClick={handleWhatsAppClick}
                  className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mr-4 hover:bg-[#25D366]/30 transition"
                >
                  <FaWhatsapp className="text-[#25D366] text-[24px]" />
                </div>
                <div>
                  <p className="font-medium text-foreground flex items-center gap-2">
                    WhatsApp
                    <button
                      type="button"
                      onClick={() => setShowNumber(!showNumber)}
                      className="focus:outline-none"
                    >
                      {showNumber ? (
                        <EyeOff className="w-4 h-4 text-muted-foreground hover:text-primary transition" />
                      ) : (
                        <Eye className="w-4 h-4 text-muted-foreground hover:text-primary transition" />
                      )}
                    </button>
                  </p>
                  <button
                    onClick={handleWhatsAppClick}
                    className="text-[13px] md:text-[14px] text-muted-foreground hover:text-green-600 transition-colors"
                  >
                    {showNumber ? "0307 7522229" : "•••••••••••"}
                  </button>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mr-4">
                  <FaMapMarkerAlt className="text-primary text-[22px]" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Location</p>
                  <p className="text-muted-foreground text-[13px] md:text-[14px]">
                    {location}
                  </p>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mr-4">
                  <FaLinkedin className="text-primary text-[22px]" />
                </div>
                <div>
                  <p className="font-medium text-foreground">LinkedIn</p>
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground text-[13px] md:text-[14px] hover:text-primary transition-colors"
                  >
                    {linkedin}
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile version — Only icons */}
            <div className="flex md:hidden items-center justify-around gap-4">
              <a
                href={`mailto:${email}`}
                className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition"
              >
                <FaEnvelope className="text-primary text-[22px]" />
              </a>

              <button
                onClick={handleWhatsAppClick}
                className="p-3 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 transition"
              >
                <FaWhatsapp className="text-[#25D366] text-[24px]" />
              </button>

              <div className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition">
                <FaMapMarkerAlt className="text-primary text-[22px]" />
              </div>

              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition"
              >
                <FaLinkedin className="text-primary text-[22px]" />
              </a>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <Card className="border-2 border-border/60 dark:border-border/80 shadow-lg bg-muted/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-serif text-[16px] md:text-xl">
                Send a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border-2 border-border/60 bg-background"
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-2 border-border/60 bg-background"
                />
                <Input
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="border-2 border-border/60 bg-background"
                />
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="border-2 border-border/60 bg-background"
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
      </div>
    </section>
  );
}
