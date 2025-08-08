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
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex w-[min(100%-2rem,1200px)] items-center justify-between rounded-lg bg-transparent px-4 py-2 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-background/30">
      <Link href="/" className="flex items-center space-x-2">
        <Code className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">Kodigo Academy</span>
      </Link>

      <div className="flex items-center space-x-2">

        {user ? (
          <Button variant="secondary" onClick={handleSignOut}>
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
