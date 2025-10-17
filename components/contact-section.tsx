"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Linkedin, Send } from "lucide-react";
import contactData from "@/data/contact.json";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

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

  return (
    <section id="contact" className="py-20 bg-muted/50">
      {/* ✅ Matching padding with Education & Experience sections */}
      <div className="container lg:px-36 md:px-16 px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-[20px] md:text-[26px] font-bold text-foreground mb-4">
            {contactData.title}
          </h2>
          <p className="text-[12px] md:text-[14px] text-muted-foreground max-w-2xl mx-auto text-pretty">
            {contactData.subtitle}
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="font-serif text-[16px] md:text-[22px] font-semibold text-foreground mb-6">
                Let's Connect
              </h3>
              <p className="text-[13px] md:text-[15px] text-muted-foreground mb-8 text-pretty">
                I'm always open to discussing new opportunities, safety
                consultations, or answering any questions about workplace
                safety. Feel free to reach out through any of the channels
                below.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: <Mail className="h-6 w-6 text-primary" />,
                  label: "Email",
                  value: contactData.contactInfo.email,
                },
                {
                  icon: <Phone className="h-6 w-6 text-primary" />,
                  label: "Phone",
                  value: contactData.contactInfo.phone,
                },
                {
                  icon: <MapPin className="h-6 w-6 text-primary" />,
                  label: "Location",
                  value: contactData.contactInfo.location,
                },
                {
                  icon: <Linkedin className="h-6 w-6 text-primary" />,
                  label: "LinkedIn",
                  value: contactData.contactInfo.linkedin,
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mr-4">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-muted-foreground text-[13px] md:text-[14px]">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <Card className="border-2 border-border/60 dark:border-border/80 shadow-lg  bg-muted/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-serif text-[16px] md:text-xl">
                Send a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {contactData.formFields.map((field) => (
                  <div key={field.name}>
                    {field.type === "textarea" ? (
                      <Textarea
                        name={field.name}
                        placeholder={field.placeholder}
                        rows={5}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleChange}
                        required={field.required}
                        className="border-2 border-border/60 bg-background"
                      />
                    ) : (
                      <Input
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleChange}
                        required={field.required}
                        className="border-2 border-border/60 bg-background"
                      />
                    )}
                  </div>
                ))}
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
