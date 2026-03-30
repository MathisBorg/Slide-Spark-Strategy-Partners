import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { Providers } from "@/components/providers"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata = {
  title: "Spark — Launch Strategy Q2 2026",
  description: "1 Launch Per Week. Partners Welcome.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased overflow-hidden`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
