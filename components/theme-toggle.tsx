"use client"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("theme") || "light"
    document.documentElement.classList.toggle("dark", stored === "dark")
    setTheme(stored)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
    setTheme(newTheme)
  }

  if (!mounted) return null

  return (
    <div className="relative inline-flex items-center cursor-pointer group" onClick={toggleTheme}>
      <div className="w-16 h-8 bg-muted border-2 border-border rounded-full flex items-center p-[2px] transition-all duration-300 ease-out group-hover:shadow-md group-hover:border-primary/30">
        <Sun
          className={`w-4 h-4 relative z-30 ml-1 transition-all duration-300 ${
            theme === "dark" ? "text-muted-foreground opacity-40" : "text-primary opacity-100"
          }`}
        />
        <Moon
          className={`w-4 h-4 z-30 mr-1 ml-auto transition-all duration-300 ${
            theme === "dark" ? "text-primary opacity-100" : "text-muted-foreground opacity-40"
          }`}
        />
        <span
          className={`absolute w-6 h-6 bg-primary rounded-full shadow-md transition-all duration-300 ease-out ${
            theme !== "dark" ? "translate-x-[2px]" : "translate-x-[34px]"
          } group-hover:shadow-lg`}
        />
      </div>
    </div>
  )
}

export default ThemeToggle
