"use client"

import { Button } from "@/components/ui/button"
import { signInWithGitHub } from "@/lib/actions/auth.actions"
import { SiGithub } from '@icons-pack/react-simple-icons'
import { Loader, LogIn } from "lucide-react"
import { useActionState } from "react"

export function LoginForm() {

  const [_state, formAction, isPending] = useActionState(signInWithGitHub, {})

  return (
    <form action={formAction} >
      <article className="text-center mb-4">
        <LogIn className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold">Ingresa a la plataforma</h1>
        <p className="text-muted-foreground">Escoge un método de acceso</p>
      </article>

      <Button
        disabled={isPending}
        type="submit"
        variant="outline"
        className="w-full"
      >
        {isPending
          ? <Loader className="h-4 w-4 animate-spin" />
          : <SiGithub />
        }
        GitHub
      </Button>
    </form>
  )
}