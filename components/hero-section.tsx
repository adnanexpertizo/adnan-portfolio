"use client";

import { Button } from "@/components/ui/button";
import { Download, Mail, Volume2, VolumeX, ChevronDown } from "lucide-react";
import Image from "next/image";
import heroData from "@/data/hero.json";
import { AskModal } from "./AskModal";
import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";

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
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMusicButton, setShowMusicButton] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);

  // 🎵 Initialize background audio
  useEffect(() => {
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

  // 🎵 Toggle play/pause
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

  // 🎵 Show floating buttons after scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowMusicButton(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 👇 Show "Scroll Down" hint briefly
  useEffect(() => {
    const showTimeout = setTimeout(() => setShowScrollHint(true), 5000);
    const hideTimeout = setTimeout(() => setShowScrollHint(false), 15000);
    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  // ✅ WhatsApp redirect handler
  const handleWhatsAppClick = () => {
    const phoneNumber = "923077522229";
    const message = encodeURIComponent(
      `Hello! I would like to get in touch with you.\n\nPlease provide the following details:\n• Your Full Name:\n• Company Name:\n• Designation:\n• Purpose of Contact:\n\nThank you!`
    );

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    const url = isMobile
      ? `whatsapp://send?phone=${phoneNumber}&text=${message}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    window.open(url, "_blank");
  };

  // ✅ Handle CV download directly from heroData.cvLink
  const handleDownloadCV = () => {
    const cvLink = heroData.cvLink || "/Adnan_Rafiq_CV.pdf";
    const link = document.createElement("a");
    link.href = cvLink;
    link.download = "Adnan_Rafiq_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!heroData || !heroData.name) {
    console.error("heroData is missing or invalid:", heroData);
    return <div>Error: Hero data not loaded</div>;
  }

  return (
    <section
      id="home"
      className="md:pt-40 min-h-[85vh] pt-24 md:pb-20 pb-12 md:px-36 px-4 flex items-center justify-center flex-wrap bg-background mx-auto relative"
    >
      <div className="container px-2 mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-8 md:gap-[42px] lg:gap-[60px]">
          {/* LEFT SECTION */}
          <div className="w-full lg:w-[60%] flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 px-1">
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-6xl font-bold text-foreground mb-4">
              {heroData.name}
            </h1>

            <p className="text-sm sm:text-lg font-semibold text-muted-foreground mb-4">
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
                    if (button.icon === "Download") {
                      handleDownloadCV();
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
            <div className="w-56 h-56 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl relative">
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

      {/* 🎵 Floating Music + WhatsApp Buttons */}
      {showMusicButton && (
        <>
          {/* Music Button */}
          <button
            onClick={toggleMusic}
            className="fixed bottom-5 left-4 cursor-pointer md:left-5 z-40 bg-primary text-white md:p-3 p-2 rounded-full shadow-lg hover:scale-105 transition-transform"
            aria-label="Toggle background music"
          >
            {isPlaying ? (
              <Volume2 className="md:w-6 md:h-6 w-5 h-5" />
            ) : (
              <VolumeX className="md:w-6 md:h-6 w-5 h-5" />
            )}
          </button>

          {/* WhatsApp Button */}
          <button
            onClick={handleWhatsAppClick}
            className="fixed bottom-5 right-4 cursor-pointer md:right-5 z-40 bg-green-500 text-white md:p-3 p-2 rounded-full shadow-lg hover:bg-green-600 hover:scale-105 transition-transform"
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp className="md:w-6 md:h-6 w-5 h-5" />
          </button>
        </>
      )}

      {/* 👇 Scroll Hint Animation */}
      {showScrollHint && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center">
          <div className="flex flex-col items-center space-y-1">
            <span className="arrow-green block w-4 h-4 border-b-2 border-r-2 rotate-45 animate-arrow1"></span>
            <span className="arrow-green block w-4 h-4 border-b-2 border-r-2 rotate-45 animate-arrow2"></span>
            <span className="arrow-green block w-4 h-4 border-b-2 border-r-2 rotate-45 animate-arrow3"></span>
          </div>
        </div>
      )}


    </section>
  );
}
