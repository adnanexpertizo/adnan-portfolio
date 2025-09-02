"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, MapPin } from "lucide-react"
import experienceData from "@/data/experience.json"
import { useEffect, useRef, useState } from "react"

export function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleCards, setVisibleCards] = useState<boolean[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Stagger experience card animations
          experienceData.experiences.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards((prev) => {
                const newVisible = [...prev]
                newVisible[index] = true
                return newVisible
              })
            }, index * 300)
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
    <section ref={sectionRef} id="experience" className="py-20 overflow-hidden">
      <div className="containerlg:px-36 md:px-16 px-2 mx-auto">
        <div className="text-center mb-16">
          <h2
            className={`font-serif text-[20px] sm:text-[28px] font-bold text-foreground mb-4 transform transition-all duration-1000 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {experienceData.title}
          </h2>
          <p
            className={`text-[12px] md:text-[14px] text-muted-foreground md:max-w-2xl mx-auto text-pretty transform transition-all duration-1000 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            {experienceData.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8 relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary to-primary/50 hidden md:block"></div>

          {experienceData.experiences.map((exp, index) => (
            <div key={index} className="relative">
              {/* Timeline dot */}
              <div
                className={`absolute left-2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg hidden md:block transform transition-all duration-500 ease-out ${
                  visibleCards[index] ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
                style={{ transitionDelay: `${400 + index * 200}ms` }}
              ></div>

              <Card
                className={`ml-0 md:ml-12 transition-all duration-500 ease-out group border-2 border-border/80 hover:border-primary/60 dark:border-border/80 dark:hover:border-primary/70 shadow-lg hover:shadow-xl dark:shadow-xl dark:hover:shadow-2xl dark:bg-card/98 backdrop-blur-sm transform hover:-translate-y-1 ${
                  visibleCards[index] ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                }`}
                style={{ transitionDelay: `${600 + index * 200}ms` }}
              >
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Briefcase className="h-5 w-5 text-primary mr-2 transition-transform duration-300 group-hover:scale-105" />
                        <h3 className="font-serif text-[12px] md:text-[14px] font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                          {exp.title}
                        </h3>
                      </div>
                      <p className="text-[12px] md:text-[14px] font-medium text-primary mb-2">{exp.company}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-muted-foreground">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-[12px]">{exp.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="text-[12px]">{exp.period}</span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className="mt-4 lg:mt-0 transition-colors duration-300 group-hover:bg-primary/15 border border-border/60 hover:border-primary/50 dark:border-border/70 dark:hover:border-primary/60"
                    >
                      {exp.type}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-4 group-hover:text-primary transition-colors text-[12px] md:text-[14px] duration-300">
                      Key Responsibilities:
                    </h4>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-muted-foreground text-[12px] md:text-[14px] text-pretty group-hover:text-foreground transition-colors duration-300">
                            {responsibility}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
