"use client"

import { Button } from "@/components/ui/button"
import { Download, Mail } from "lucide-react"
import Image from "next/image"
import heroData from "@/data/hero.json"
import { useEffect, useState } from "react"
import { useTypewriter } from "./useTypewriter" // save the hook in hooks/useTypewriter.ts

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const typedText = useTypewriter(
    [
      " an experienced Safety Officer",
      " graduated in Computer Science",
      " NEBOSH Certified",
      " IOSH & OSHA Certified",
      " First Aid, Fire Safety, Work at Height Certified",
    ],
    100 // typing speed
  )

  const scrollToContact = () => {
    const element = document.querySelector("#contact")
    if (element) {
      const navHeight = 120
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset - navHeight
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="home" className="pt-32 pb-20 flex items-center justify-center flex-wrap bg-background">
      <div className="container lg:px-36 md:px-16 px-2 mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-8 lg:gap-[60px]">
          {/* Hero Content */}
          <div className="w-full lg:w-[60%] flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 px-1">
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-6xl font-bold text-foreground mb-4">
              {heroData.name}
            </h1>

            {/* ✅ Typewriter text */}
            <h2 className="text-[12px] sm:[16px] md:text-[19px] text-start  font-semibold text-primary mb-6 min-w-[250px] max-w-[400px] lg:max-w-[470px]">
            <span>I am</span>  {typedText}
              <span className="animate-pulse">|</span>
            </h2>

            <p className="text-sm sm:text-lg text-muted-foreground mb-4">{heroData.subtitle}</p>
            <p className="text-xs sm:text-base text-muted-foreground mb-8">{heroData.description}</p>

            <div className="flex gap-3 sm:gap-4 justify-center lg:justify-start">
              {heroData.buttons.map((button, index) => (
                <Button
                  key={index}
                  size="lg"
                  variant={button.type === "primary" ? "default" : "outline"}
                  onClick={button.action === "scrollToContact" ? scrollToContact : undefined}
                >
                  {button.icon === "Download" && <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />}
                  {button.icon === "Mail" && <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />}
                  {button.text}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex justify-center lg:justify-end order-1 lg:order-2 w-full lg:w-[30%]">
            <div className="w-52 h-52 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
              <Image
                src={heroData.profileImage || "/placeholder.svg"}
                alt={`${heroData.name} - ${heroData.title}`}
                width={320}
                height={320}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-out"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
