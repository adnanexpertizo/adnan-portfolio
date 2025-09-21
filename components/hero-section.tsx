"use client"

import { Button } from "@/components/ui/button"
import { Download, Mail } from "lucide-react"
import Image from "next/image"
import heroData from "@/data/hero.json"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToContact = () => {
    const element = document.querySelector("#contact")
    if (element) {
      const navHeight = 120
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - navHeight
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <section
      id="home"
      className="py-32 flex items-center justify-center flex-wrap bg-background"
    >
      <div className="container lg:px-36 md:px-16 px-2 mx-auto">
        {/* Use flex on large screens for 70/30 split, grid for mobile/tablet */}
        <div className="flex flex-wrap items-center justify-between gap-8 lg:gap-[60px]">
          {/* Profile Image - 30% on large screens */}
          

          {/* Hero Content - 70% on large screens */}
          <div className="w-full lg:w-[60%] text-center lg:text-left order-2 lg:order-2 px-1 xs:px-2 sm:px-0">
            <h1
              className={`font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4 text-balance leading-tight transform transition-all duration-700 ease-out ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              {heroData.name}
            </h1>
            <h2
              className={`text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold text-primary mb-3 sm:mb-6 transform transition-all duration-700 ease-out ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              {heroData.title}
            </h2>
            <p
              className={`text-sm xs:text-base sm:text-lg text-muted-foreground mb-4 sm:mb-8 mx-auto text-pretty transform transition-all duration-700 ease-out ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              {heroData.subtitle}
            </p>
            <p
              className={`text-xs xs:text-sm sm:text-base text-muted-foreground mb-4 sm:mb-8 mx-auto text-pretty transform transition-all duration-700 ease-out ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              {heroData.description}
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start transform transition-all duration-700 ease-out ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              {heroData.buttons.map((button, index) => (
                <Button
                  key={index}
                  size="lg"
                  variant={button.type === "primary" ? "default" : "outline"}
                  onClick={button.action === "scrollToContact" ? scrollToContact : undefined}
                  className={`group w-full sm:w-auto ${button.type === "outline" ? "bg-transparent border-2 border-border/80 hover:border-primary/60 dark:border-border/80 dark:hover:border-primary/70" : ""} text-sm xs:text-base transition-all duration-300 ease-out hover:shadow-lg`}
                >
                  {button.icon === "Download" && (
                    <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300" />
                  )}
                  {button.icon === "Mail" && (
                    <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300" />
                  )}
                  {button.text}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex justify-center lg:justify-start order-1 lg:order-1 mb-6 lg:mb-0 w-full lg:w-[30%]">
            <div className="relative">
              <div
                className={`w-40 h-40 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl transform transition-all duration-700 ease-out ${
                  isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-98"
                }`}
              >
                <Image
                  src={heroData.profileImage || "/placeholder.svg"}
                  alt={`${heroData.name} - ${heroData.title}`}
                  width={320}
                  height={320}
                  className="w-full border border-red-500 h-full object-cover hover:scale-105 transition-transform duration-500 ease-out"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}