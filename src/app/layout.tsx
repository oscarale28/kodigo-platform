import { Navbar } from "@/components/navbar"
import { Toaster } from "@/components/ui/sonner"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kodigo Academy - Bootcamps de Programación",
  description: "Aprende programación con los mejores bootcamps de Kodigo Academy",
}

export default function RootLayout({
  children,
  auth
}: {
  children: React.ReactNode
  auth: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-100">
          <Navbar />
          {children}
          {auth}
          <Toaster />
        </div>
      </body>
    </html>
  )
}
