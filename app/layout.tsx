import type React from "react"
import type { Metadata } from "next"
import { Inter, Merriweather } from "next/font/google"
import { Analytics } from '@vercel/analytics/react'
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const merriweather = Merriweather({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-merriweather",
})

export const metadata: Metadata = {
  title: "Matt Atkins",
  description: "Building at the intersection of Hardware & Software",
  generator: 'v0.dev',
  alternates: {
    types: {
      'application/rss+xml': [
        { url: '/rss.xml', title: 'Matt Atkins - Blog RSS Feed' }
      ]
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
