"use client";

import { Button } from "@/components/ui/button";
import { Download, Mail } from "lucide-react";
import Image from "next/image";
import heroData from "@/data/hero.json";
import { AskModal } from "./AskModal";
import { useState } from "react";

export function HeroSection() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      const navHeight = 120;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  };
  const [openModal, setOpenModal] = useState(false);
  return (
    <section
      id="home"
      className="md:pt-40 pt-24  md:pb-20 pb-12 md:px-36 md:px-16 flex items-center justify-center flex-wrap bg-background mx-auto"
    >
      <div className="container px-2 mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-8 md:gap-[42px] lg:gap-[60px] ">
          {/* LEFT SECTION */}
          <div className="w-full lg:w-[60%] flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 px-1">
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-6xl font-bold text-foreground mb-4">
              {heroData.name}
            </h1>

            <p className="text-sm sm:text-lg text-muted-foreground mb-4">
              {heroData.subtitle}
            </p>
            <p className="text-xs sm:text-base text-muted-foreground mb-8">
              {heroData.description}
            </p>
            <div className="flex justify-start w-full">
              <AskModal openModal={openModal} setOpenModal={setOpenModal} />
            </div>

            <div className="flex gap-3 sm:gap-4 justify-center lg:justify-start mt-6">
              {heroData.buttons.map((button, index) => (
                <Button
                  key={index}
                  size="lg"
                  variant={button.type === "primary" ? "default" : "outline"}
                  onClick={
                    button.action === "scrollToContact"
                      ? scrollToContact
                      : undefined
                  }
                >
                  {button.icon === "Download" && (
                    <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                  {button.icon === "Mail" && (
                    <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                  {button.text}
                </Button>
              ))}
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex justify-center md:justify-end order-1 lg:order-2 w-full lg:w-[30%]">
            <div className="w-56 h-56 lg:w-76 lg:h-76 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl relative">
              <Image
                src={heroData.profileImage || "/placeholder.svg"}
                alt={`${heroData.name} - ${heroData.title}`}
                layout="fill"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
