"use client"

import { Code } from "lucide-react"
import Link from "next/link"
import { Button } from "../components/ui/button"

export function Navbar() {

  return (
    <nav className="flex justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link href="/" className="flex items-center space-x-2">
        <Code className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">Kodigo Academy</span>
      </Link>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Link href="/login">
            <Button variant="ghost">Iniciar sesión</Button>
          </Link>
          <Link href="/register">
            <Button>Registrarse</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
