import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Calendar } from "lucide-react"
import educationData from "@/data/education.json"

export function EducationSection() {
  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">{educationData.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">{educationData.subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden sm:block"></div>

            <div className="space-y-8">
              {educationData.education.map((item, index) => (
                <div key={index} className="relative flex items-start">
                  {/* Timeline dot */}
                  <div className="hidden sm:flex absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"></div>

                  <Card className="w-full sm:ml-16 hover:shadow-lg transition-all duration-300 border-2 border-border/80 hover:border-primary/60 bg-card shadow-md dark:border-border/80 dark:hover:border-primary/70 dark:shadow-lg dark:hover:shadow-xl dark:bg-card/98 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <div className="flex items-center mb-2 sm:mb-0">
                          <GraduationCap className="h-5 w-5 text-primary mr-2" />
                          <h3 className="font-semibold text-foreground text-lg">{item.degree}</h3>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="text-sm">{item.period}</span>
                        </div>
                      </div>
                      <p className="text-primary font-medium mb-3">{item.institution}</p>
                      <p className="text-muted-foreground text-pretty">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
