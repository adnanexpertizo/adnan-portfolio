"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Send,
  Eye,
  EyeOff,
  MessageCircle,
} from "lucide-react";

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

  const whatsappNumber = "03077522229";
  const whatsappLink = `https://wa.me/9663077522229`; // Saudi country code 966
  const email = "adnanrafiq7522@gmail.com";
  const location = "Saudi Arabia";
  const linkedin = "https://linkedin.com/in/adnanrafiq"; // you can adjust this

  return (
    <section id="contact" className="py-20 bg-muted/50">
      <div className="container lg:px-36 md:px-16 px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-[20px] md:text-[26px] font-bold text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="text-[12px] md:text-[14px] text-muted-foreground max-w-2xl mx-auto text-pretty">
            Feel free to reach out for collaborations, opportunities, or any
            safety and development inquiries. I’ll respond as soon as possible.
          </p>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left: Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-serif text-[16px] md:text-[22px] font-semibold text-foreground mb-6">
                Let's Connect
              </h3>
              <p className="text-[13px] md:text-[15px] text-muted-foreground mb-8 text-pretty">
                I'm always open to discussing new opportunities, development
                projects, or workplace safety consultations.
              </p>
            </div>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mr-4">
                  <Mail className="h-6 w-6 text-primary" />
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
<div className="flex items-center">
  <div className="flex items-center justify-center w-12 h-12 bg-[#25D366]/20 rounded-lg mr-4 hover:bg-[#25D366]/30 transition">
    {/* Official WhatsApp SVG icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      fill="#25D366"
      className="w-6 h-6"
    >
      <path d="M380.9 97.1C339 55.1 283.2 32 224.6 32 106 32 10.7 127.3 10.7 245.9c0 42.4 11.1 83.8 32.2 120.1L0 480l117.5-42.5c35.1 19.2 74.7 29.3 114.9 29.3h.1c118.6 0 213.9-95.3 213.9-213.9 0-58.6-23.1-114.4-65.1-156.4zM224.6 426.2h-.1c-36.4 0-72.2-9.8-103.4-28.3l-7.4-4.4-69.8 25.3 24-71.9-4.8-7.5c-19.5-30.6-29.8-66.2-29.8-102.7 0-106.6 86.8-193.4 193.5-193.4 51.7 0 100.4 20.2 137 56.9 36.6 36.7 56.8 85.4 56.8 137 0 106.6-86.8 193.5-193.5 193.5zm107.7-143.5c-5.9-2.9-35-17.2-40.4-19.2-5.4-2-9.4-2.9-13.4 2.9-3.9 5.9-15.4 19.2-18.8 23.1-3.4 3.9-6.9 4.4-12.8 1.5-5.9-2.9-24.8-9.2-47.2-29.4-17.5-15.6-29.4-34.9-32.8-40.8-3.4-5.9-.4-9.1 2.6-12 2.7-2.7 5.9-6.9 8.8-10.3 2.9-3.4 3.9-5.9 5.9-9.8 2-3.9 1-7.3-.5-10.2-1.5-2.9-13.4-32.4-18.4-44.4-4.8-11.5-9.7-9.9-13.4-10.1-3.4-.2-7.3-.2-11.2-.2s-10.2 1.5-15.6 7.3c-5.4 5.9-20.4 19.9-20.4 48.5s20.9 56.3 23.8 60.1c2.9 3.9 41.2 62.9 99.8 88.2 13.9 6 24.7 9.6 33.1 12.3 13.9 4.4 26.6 3.8 36.6 2.3 11.2-1.7 35-14.3 40-28.2 5-13.9 5-25.8 3.4-28.2-1.7-2.3-5.4-3.8-11.3-6.6z" />
    </svg>
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
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[13px] md:text-[14px] text-muted-foreground hover:text-green-600 transition-colors"
    >
      {showNumber ? whatsappNumber : "•••••••••••"}
    </a>
  </div>
  </div>

              {/* Location */}
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mr-4">
                  <MapPin className="h-6 w-6 text-primary" />
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
                  <Linkedin className="h-6 w-6 text-primary" />
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
          </div>

          {/* Right: Contact Form */}
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
