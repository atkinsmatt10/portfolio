import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"
import { GeistSans } from "geist/font/sans"

import { ThemeProvider } from "@/components/theme-provider"

import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mattatkins.net"),
  title: "Matt Atkins | Product Leader",
  description:
    "The professional and personal timeline of Matt Atkins, a product leader building at the intersection of hardware and software.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Matt Atkins | Product Leader",
    description:
      "A career timeline spanning data, connected homes, access control, and Team Nate the Great.",
    url: "/",
    siteName: "Matt Atkins",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
