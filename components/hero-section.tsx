"use client";

import { Button } from "@/components/ui/button";
import { Download, Mail, Volume2, VolumeX, X } from "lucide-react";
import Image from "next/image";
import heroData from "@/data/hero.json";
import { AskModal } from "./AskModal";
import { useState, useEffect } from "react";
import  CVTemplate  from "./CvTemplate";

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

  const [openModal, setOpenModal] = useState(false); // AskModal
  const [openCVModal, setOpenCVModal] = useState(false); // CV Modal
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // const newAudio = new Audio("/islamic-music-240169.mp3");
    const newAudio = new Audio("/interview.wav");
    newAudio.loop = true;
    newAudio.volume = 0.1;
    setAudio(newAudio);

    const autoPlay = async () => {
      try {
        await newAudio.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Autoplay blocked by browser:", err);
      }
    };
    autoPlay();

    return () => {
      newAudio.pause();
      newAudio.currentTime = 0;
    };
  }, []);

  const toggleMusic = async () => {
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Play blocked:", error);
      }
    }
  };

  if (!heroData || !heroData.name) {
    console.error("heroData is missing or invalid:", heroData);
    return <div>Error: Hero data not loaded</div>;
  }

  return (
    <section
      id="home"
      className="md:pt-40 pt-24 md:pb-20 pb-12 md:px-36 px-4 flex items-center justify-center flex-wrap bg-background mx-auto relative"
    >
      <div className="container px-2 mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-8 md:gap-[42px] lg:gap-[60px]">
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
                  onClick={() => {
                    console.log("🖱️ Button clicked:", button);
                    if (button.icon === "Download") {
                      setOpenCVModal(true);
                      console.log("✅ CV Modal Opened");
                    } else if (button.action === "scrollToContact") {
                      scrollToContact();
                    }
                  }}
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

      {/* 🧾 CUSTOM CV MODAL */}
      {openCVModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative bg-white rounded-2xl w-[95%] md:w-[80%] lg:w-[70%] max-h-[90vh] overflow-y-auto p-6 shadow-2xl animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setOpenCVModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 transition"
            >
              <X className="w-6 h-6" />
            </button>
            <CVTemplate />  
          </div>
        </div>
      )}

      {/* 🎵 Floating Music Button */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-5 md:right-5 left-4 md:left-auto z-40 bg-primary text-white md:p-3 p-2 rounded-full shadow-lg hover:scale-105 transition-transform"
        aria-label="Toggle background music"
      >
        {isPlaying ? (
          <Volume2 className="md:w-6 md:h-6 w-5 h-5" />
        ) : (
          <VolumeX className="md:w-6 md:h-6 w-5 h-5" />
        )}
      </button>
    </section>
  );
}
