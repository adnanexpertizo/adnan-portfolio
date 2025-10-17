import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Calendar } from "lucide-react"
import educationData from "@/data/education.json"

export function EducationSection() {
  return (
    <section id="education" className="py-[40px] bg-muted/50">
      <div className="container lg:px-[90px] md:px-[64px] px-[8px] mx-auto">
        <div className="text-center mb-[32px]">
          <h2 className="font-serif text-[20px] md:text-[28px] font-bold text-foreground mb-[16px]">
            {educationData.title}
          </h2>
          <p className="md:text-[16px] text-[12px] sm:text-[18px] text-muted-foreground max-w-2xl mx-auto text-pretty">
            {educationData.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[32px] top-0 bottom-0 w-0.5 bg-border hidden sm:block"></div>

            <div className="space-y-[32px]">
              {educationData.education.map((item, index) => (
                <div key={index} className="relative flex items-start">
                  {/* Timeline dot */}
                  <div className="hidden sm:flex absolute left-[24px] w-[16px] h-[16px] bg-primary rounded-full border-[4px] border-background shadow-lg"></div>

                  <Card className="w-full sm:ml-[64px] hover:shadow-lg transition-all duration-300 border-2 border-border/80 hover:border-primary/60 bg-card shadow-md dark:border-border/80 dark:hover:border-primary/70 dark:shadow-lg dark:hover:shadow-xl dark:bg-muted/50 backdrop-blur-sm">
                    <CardContent className="p-[24px]">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-[16px]">
                        <div className="flex items-center mb-[8px] sm:mb-0">
                          <GraduationCap className="h-[20px] w-[20px] text-primary mr-[8px]" />
                          <h3 className="font-semibold text-foreground text-[12px] sm:text-[14px]">{item.degree}</h3>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-[16px] w-[16px] mr-[4px]" />
                          <span className="text-[12px] sm:text-[14px]">{item.period}</span>
                        </div>
                      </div>
                      <p className="text-primary font-medium mb-[12px] text-[12px] md:text-[14px]">{item.institution}</p>
                      <p className="text-muted-foreground text-pretty text-[12px] md:text-[14px]">{item.description}</p>
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