import { Navbar } from "@/components/navbar"
import { Toaster } from "@/components/ui/sonner"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import "./globals.css"
import Footer from "@/components/landing/footer"

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
      <body className={`${inter.className} bg-background text-foreground antialiased min-h-screen flex items-center justify-center`}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-screen relative">
            {/* Prismatic Aurora Burst - Multi-layered Gradient */}
            <div
              className="fixed inset-0 z-0"
              style={{
                background: `
            radial-gradient(ellipse 120% 80% at 70% 20%, rgba(224, 93, 56, 0.15), transparent 50%),
            radial-gradient(ellipse 100% 60% at 30% 10%, rgba(196, 181, 253, 0.12), transparent 60%),
            radial-gradient(ellipse 90% 70% at 50% 0%, rgba(109, 40, 217, 0.18), transparent 65%),
            radial-gradient(ellipse 110% 50% at 80% 30%, rgba(167, 139, 250, 0.08), transparent 40%),
            var(--color-background)
          `,
              }}
            />
            <div className="relative z-10">
              <Navbar />
              {children}
              {auth}
              <Footer />
              <Toaster />
              
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
