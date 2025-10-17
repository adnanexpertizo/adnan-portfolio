"use client";

import { Linkedin, Mail, Phone } from "lucide-react";
import footerData from "@/data/footer.json";

export function Footer() {
  const iconMap = {
    Mail,
    Phone,
    Linkedin,
  };

  return (
    <footer className="bg-background text-secondary-foreground py-10 md:py-12">
      <div className="container lg:px-36 md:px-16 px-4 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left Side: Name and Title */}
          <div className="text-center md:text-left">
            <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold mb-1">
              {footerData.name}
            </h3>
            <p className="text-secondary-foreground/80 text-sm sm:text-base">
              {footerData.title}
            </p>
          </div>

          {/* Right Side: Icons */}
          <div className="flex justify-center md:justify-end items-center space-x-4 sm:space-x-6">
            {footerData.socialLinks.map((link, index) => {
              const IconComponent = iconMap[link.icon as keyof typeof iconMap];
              return (
                <a
                  key={index}
                  href={link.url}
                  target={link.type === "linkedin" ? "_blank" : undefined}
                  rel={link.type === "linkedin" ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-secondary-foreground/10 rounded-full hover:bg-secondary-foreground/20 transition-all duration-300"
                  aria-label={link.label}
                >
                  <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Divider and Copyright */}
        <div className="border-t border-secondary-foreground/20 mt-8 pt-6 text-center">
          <p className="text-secondary-foreground/60 text-xs sm:text-sm">
            © {new Date().getFullYear()} {footerData.name}. {footerData.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
