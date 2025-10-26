import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Source_Sans_3, Playfair_Display, Rubik } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Adnan Rafiq – Professional Safety Officer",
  description:
    "Dedicated and proactive Safety Officer with over 5 years of experience in implementing workplace safety programs, conducting risk assessments, and ensuring compliance with international health and safety standards.",
  keywords: [
    "Safety Officer",
    "NEBOSH Certified",
    "Workplace Safety",
    "Fire Safety",
    "Risk Assessment",
    "Health and Safety",
    "Adnan Rafiq Safety Portfolio",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Adnan Rafiq – Safety Officer Portfolio",
    description:
      "Explore Adnan Rafiq’s professional experience, certifications, and safety management projects.",
    url: "https://adnan-portfolio-seven.vercel.app/",
    type: "website",
    images: [
      {
        url: "/profile-image.png",
        width: 1200,
        height: 630,
        alt: "Adnan Rafiq Safety Portfolio Preview",
      },
    ],
  },
  icons: {
    icon: "/adnan2.png",
  },
  generator: "Next.js 14",
  metadataBase: new URL("https://adnan-safety-portfolio.vercel.app"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${sourceSans.variable} ${playfairDisplay.variable} ${rubik.variable}`}
      >
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
