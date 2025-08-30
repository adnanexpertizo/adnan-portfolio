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
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 pt-20 sm:pt-16"
    >
      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center justify-center">
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-start order-1 lg:order-1 mb-6 lg:mb-0">
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
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-out"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="text-center lg:text-left order-2 lg:order-2 px-1 xs:px-2 sm:px-0">
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
              className={`text-sm xs:text-base sm:text-lg text-muted-foreground mb-4 sm:mb-8 max-w-2xl mx-auto text-pretty transform transition-all duration-700 ease-out ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              {heroData.subtitle}
            </p>
            <p
              className={`text-xs xs:text-sm sm:text-base text-muted-foreground mb-4 sm:mb-8 max-w-2xl mx-auto text-pretty transform transition-all duration-700 ease-out ${
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
        </div>
      </div>
    </section>
  )
}