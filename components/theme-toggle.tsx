"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", stored === "dark");
    setTheme(stored);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    setTheme(newTheme);
  };

  if (!mounted) return null;

  return (
    <div
      className="relative inline-flex items-center cursor-pointer group"
      onClick={toggleTheme}
    >
      <div className="md:w-16 md:h-8 w-14 h-7 bg-muted border-2 border-border rounded-full flex items-center p-[2px] transition-all duration-300 ease-out group-hover:shadow-md group-hover:border-primary/30 relative overflow-hidden">
        {/* Sun Icon */}
        <Sun
          className={`md:w-4 md:h-4 w-3 h-3 relative z-30 ml-1 transition-all duration-300 ${
            theme === "dark"
              ? "text-foreground"
              : "bg-primary text-white opacity-100"
          }`}
        />
        {/* Moon Icon */}
        <Moon
          className={`md:w-4 md:h-4 w-3 h-3 z-30 mr-1 ml-auto transition-all duration-300 ${
            theme === "dark"
              ? "bg-primary text-white opacity-100"
              : "text-foreground"
          }`}
        />

        {/* Toggle Circle */}
        <span
          className={`absolute rounded-full bg-primary shadow-md transition-all duration-500 ease-out group-hover:shadow-lg
            md:w-6 md:h-6 w-5 h-5
            ${
              theme === "dark"
                ? "translate-x-[28px] md:translate-x-[33px]"
                : "translate-x-[1px]"
            }
          `}
        />
      </div>
    </div>
  );
};

export default ThemeToggle;
