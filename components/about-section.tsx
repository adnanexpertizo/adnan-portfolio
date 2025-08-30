"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Award, Users, CheckCircle } from "lucide-react"
import Image from "next/image"
import aboutData from "@/data/about.json"
import { useEffect, useRef, useState } from "react"

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleCards, setVisibleCards] = useState<boolean[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  const iconMap = {
    Shield,
    Award,
    Users,
    CheckCircle,
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          aboutData.highlights.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards((prev) => {
                const newVisible = [...prev]
                newVisible[index] = true
                return newVisible
              })
            }, index * 150)
          })
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-16 sm:py-20 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2
            className={`font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 transform transition-all duration-1000 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {aboutData.title}
          </h2>
          <p
            className={`text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty px-4 sm:px-0 transform transition-all duration-1000 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            {aboutData.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
          <div className="order-2 lg:order-1">
            <Card
              className={`overflow-hidden hover:shadow-2xl transition-all duration-700 ease-out transform ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
              } border-2 border-border/80 hover:border-primary/60 bg-card shadow-lg dark:border-border/80 dark:hover:border-primary/70 dark:shadow-xl dark:hover:shadow-2xl dark:bg-card/98 backdrop-blur-sm`}
              style={{ transitionDelay: "400ms" }}
            >
              <CardContent className="p-0">
                <Image
                  src={aboutData.workImage || "/placeholder.svg"}
                  alt="Adnan Rafiq at work"
                  width={600}
                  height={400}
                  className="w-full h-48 sm:h-64 object-cover transition-transform duration-700 ease-out"
                />
              </CardContent>
            </Card>
          </div>

          <div
            className={`order-1 lg:order-2 px-2 sm:px-0 transform transition-all duration-1000 ease-out ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-foreground mb-4 sm:mb-6">
              {aboutData.mainTitle}
            </h3>
            {aboutData.description.map((paragraph, index) => (
              <p key={index} className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 text-pretty">
                {paragraph}
              </p>
            ))}

            <div className="flex flex-wrap gap-2">
              {aboutData.skills.map((skill, index) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className={`text-xs sm:text-sm transition-all duration-300 ease-out transform ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  } border border-border/60 hover:border-primary/50 dark:border-border/70 dark:hover:border-primary/60`}
                  style={{ transitionDelay: `${800 + index * 100}ms` }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {aboutData.highlights.map((highlight, index) => {
            const IconComponent = iconMap[highlight.icon as keyof typeof iconMap]
            return (
              <Card
                key={index}
                className={`text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ease-out border-2 border-border/80 hover:border-primary/60 bg-card shadow-lg dark:border-border/80 dark:hover:border-primary/70 dark:shadow-xl dark:hover:shadow-2xl dark:bg-card/98 backdrop-blur-sm group transform ${
                  visibleCards[index] ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
                }`}
                style={{ transitionDelay: `${1000 + index * 150}ms` }}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg mb-3 sm:mb-4 dark:bg-primary/20 transition-all duration-300 ease-out">
                    <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-primary transition-transform duration-300" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">{highlight.title}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground text-pretty">{highlight.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
