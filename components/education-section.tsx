import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import educationData from "@/data/education.json";

export function EducationSection() {
  return (
    <section id="education" className="relative py-20 sm:py-28 bg-background overflow-hidden">
      {/* Accent blob */}
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-3">
            Academic Background
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {educationData.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {educationData.subtitle}
          </p>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto mt-5" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — desktop only */}
          <div className="hidden sm:block absolute left-[22px] top-4 bottom-4 w-px bg-gradient-to-b from-primary/40 via-border to-transparent" />

          <div className="space-y-6 sm:space-y-8">
            {educationData.education.map((item, index) => (
              <div key={index} className="relative flex gap-6 sm:gap-10">
                {/* Timeline dot — desktop */}
                <div className="hidden sm:flex flex-col items-center flex-shrink-0">
                  <div className="w-11 h-11 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center shadow-sm z-10">
                    <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                </div>

                {/* Card */}
                <Card className="flex-1 group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border border-border/60 hover:border-primary/40 bg-card shadow-sm">
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3">
                      <div>
                        {/* Mobile: show icon inline */}
                        <div className="flex items-center gap-2 mb-1 sm:hidden">
                          <GraduationCap className="w-4 h-4 text-primary flex-shrink-0" />
                        </div>
                        <h3 className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
                          {item.degree}
                        </h3>
                        <p className="text-sm font-medium text-primary mt-0.5">{item.institution}</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground flex-shrink-0">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium whitespace-nowrap">{item.period}</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}