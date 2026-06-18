import type { Metadata } from "next"
import { Cinzel, Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Rimuru AI — Open Source Anime-Themed Coding Agent",
    template: "%s | Rimuru AI",
  },
  description:
    "The open-source anime-themed frontend for OpenCode. Veldora and Veldora-Pro agents, no accounts, no subscriptions — pure coding power.",
  keywords: [
    "AI coding agent",
    "open source",
    "OpenCode",
    "anime theme",
    "developer tools",
    "coding assistant",
  ],
  authors: [{ name: "Rimuru AI" }],
  creator: "Rimuru AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Rimuru AI",
    title: "Rimuru AI — Absorb. Evolve. Ship.",
    description: "Open-source anime-themed frontend for OpenCode with Veldora and Veldora-Pro agents.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rimuru AI — Absorb. Evolve. Ship.",
    description: "Open-source anime-themed frontend for OpenCode.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
