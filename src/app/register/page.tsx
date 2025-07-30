"use client"

import { useActionState } from "react"
import Link from "next/link"
import { registerAction, type AuthState } from "@/src/lib/actions/auth"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Alert, AlertDescription } from "@/src/components/ui/alert"
import { Navbar } from "@/src/components/navbar"
import { UserPlus, ArrowLeft, Info } from "lucide-react"

const initialState: AuthState = {
  errors: {},
  message: "",
}

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Link>
            <UserPlus className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold">Crear cuenta</h1>
            <p className="text-muted-foreground">Únete a Kodigo Academy y comienza tu carrera en programación</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Registro</CardTitle>
              <CardDescription>Ingresa tus datos para crear tu cuenta gratuita</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Información de desarrollo */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <Info className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Modo Desarrollo</span>
                </div>
                <p className="text-xs text-blue-700">
                  El registro funciona con datos dummy. Puedes usar cualquier email válido.
                </p>
              </div>

              <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Tu nombre completo"
                    disabled={isPending}
                    aria-describedby="name-error"
                  />
                  {state.errors?.name && (
                    <p id="name-error" className="text-sm text-destructive">
                      {state.errors.name[0]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    disabled={isPending}
                    aria-describedby="email-error"
                  />
                  {state.errors?.email && (
                    <p id="email-error" className="text-sm text-destructive">
                      {state.errors.email[0]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Mínimo 8 caracteres"
                    disabled={isPending}
                    aria-describedby="password-error"
                  />
                  {state.errors?.password && (
                    <p id="password-error" className="text-sm text-destructive">
                      {state.errors.password[0]}
                    </p>
                  )}
                </div>

                {state.errors?._form && (
                  <Alert variant="destructive">
                    <AlertDescription>{state.errors._form[0]}</AlertDescription>
                  </Alert>
                )}

                {state.success && (
                  <Alert>
                    <AlertDescription className="text-green-600">{state.message}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Creando cuenta..." : "Crear cuenta"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  ¿Ya tienes cuenta?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Inicia sesión
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
