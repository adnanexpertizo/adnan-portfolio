import { Linkedin, Mail, Phone } from "lucide-react"
import footerData from "@/data/footer.json"

export function Footer() {
  const iconMap = {
    Mail,
    Phone,
    Linkedin,
  }

  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-28">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="font-serif text-xl font-bold mb-2">{footerData.name}</h3>
            <p className="text-secondary-foreground/80">{footerData.title}</p>
          </div>

          <div className="flex items-center space-x-6">
            {footerData.socialLinks.map((link, index) => {
              const IconComponent = iconMap[link.icon as keyof typeof iconMap]
              return (
                <a
                  key={index}
                  href={link.url}
                  target={link.type === "linkedin" ? "_blank" : undefined}
                  rel={link.type === "linkedin" ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-center w-10 h-10 bg-secondary-foreground/10 rounded-full hover:bg-secondary-foreground/20 transition-colors duration-200"
                  aria-label={link.label}
                >
                  <IconComponent className="h-5 w-5" />
                </a>
              )
            })}
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-secondary-foreground/60 text-sm">
            © {new Date().getFullYear()} {footerData.name}. {footerData.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
