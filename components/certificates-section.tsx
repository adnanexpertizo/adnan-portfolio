"use client"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Calendar, Building, Eye } from "lucide-react"
import { CertificateModal } from "./certificate-modal"
import certificatesData from "@/data/certificates.json"

export function CertificatesSection() {
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [visibleCards, setVisibleCards] = useState<boolean[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Stagger card animations
          certificatesData.certificates.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards((prev) => {
                const newVisible = [...prev]
                newVisible[index] = true
                return newVisible
              })
            }, index * 200)
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

  const handleViewCertificate = (cert: any) => {
    setSelectedCertificate(cert)
    setIsModalOpen(true)
  }

  return (
    <section ref={sectionRef} id="certificates" className="py-20 bg-muted/30 overflow-hidden">
      <div className="container  lg:px-36 md:px-16 px-2 mx-auto">
        <div className="text-center mb-16">
          <h2
            className={`font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4 transform transition-all duration-1000 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {certificatesData.title}
          </h2>
          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto text-pretty transform transition-all duration-1000 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            {certificatesData.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {certificatesData.certificates.map((cert, index) => (
            <Card
              key={index}
              className={`group transition-all duration-500 ease-out relative overflow-hidden border-2 border-border/80 hover:border-primary/60 bg-card shadow-lg hover:shadow-xl dark:border-border/80 dark:hover:border-primary/70 dark:shadow-xl dark:hover:shadow-2xl dark:bg-card/98 backdrop-blur-sm transform hover:-translate-y-1 ${
                visibleCards[index] ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
            >
              <CardHeader className="pb-4 relative z-10">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-primary/10 rounded-lg mr-3 transition-all duration-300 group-hover:bg-primary/20 dark:bg-primary/20 dark:group-hover:bg-primary/30 border border-primary/20 dark:border-primary/30">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <Badge
                      variant="secondary"
                      className="text-xs transition-colors duration-300 group-hover:bg-primary/10 dark:bg-secondary/80 dark:group-hover:bg-primary/20"
                    >
                      {cert.category}
                    </Badge>
                  </div>
                  <Badge variant={cert.status === "Active" ? "default" : "secondary"} className="text-xs">
                    {cert.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300 text-balance">
                  {cert.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 relative z-10">
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                    <Building className="h-4 w-4 mr-2" />
                    <span className="text-sm">{cert.issuingBody}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">Issued {cert.year}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 transition-all duration-300 bg-transparent border-2 border-border/80 hover:border-primary/60 hover:bg-primary hover:text-primary-foreground dark:border-border/80 dark:hover:border-primary/70 dark:bg-transparent dark:hover:bg-primary"
                  onClick={() => handleViewCertificate(cert)}
                >
                  <Eye className="h-4 w-4" />
                  View Certificate
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <CertificateModal certificate={selectedCertificate} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
