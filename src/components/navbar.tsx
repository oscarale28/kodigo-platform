"use client"

import { useAuth } from "@/hooks/use-auth"
import { createClient } from "@/lib/supabase/client"
import { Code } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "../components/ui/button"

export function Navbar() {
  const { user } = useAuth()
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.replace('/')
  }

  return (
    <nav className="sticky top-0 z-50 flex justify-between p-4 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
      <Link href="/" className="flex items-center space-x-2">
        <Code className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">Kodigo Academy</span>
      </Link>

      <div className="flex items-center space-x-2">

        {user ? (
          <Button variant="outline" onClick={handleSignOut}>
            Cerrar sesión
          </Button>
        ) : (
          <Link href="/login">
            <Button>Ingresar</Button>
          </Link>
        )}
      </div>
    </nav >
  )
}
