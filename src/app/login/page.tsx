"use client"

import { useActionState } from "react"
import Link from "next/link"
import { loginAction, quickLoginAction, type AuthState } from "@/lib/actions/auth"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Navbar } from "@/components/navbar"
import { LogIn, ArrowLeft, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const initialState: AuthState = {
  errors: {},
  message: "",
}

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState)

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
            <LogIn className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold">Iniciar sesión</h1>
            <p className="text-muted-foreground">Accede a tu cuenta de Kodigo Academy</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Bienvenido de vuelta</CardTitle>
              <CardDescription>Ingresa tus credenciales para acceder a tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Botón de acceso rápido para desarrollo */}
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800">Modo Desarrollo</span>
                </div>
                <p className="text-xs text-yellow-700 mb-3">Acceso rápido sin credenciales (solo para pruebas)</p>
                <form action={quickLoginAction}>
                  <Button
                    type="submit"
                    variant="outline"
                    className="w-full bg-yellow-100 hover:bg-yellow-200 border-yellow-300"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Acceso Rápido al Dashboard
                  </Button>
                </form>
              </div>

              {/* Formulario normal */}
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">O usa las credenciales de prueba:</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Email: <code className="bg-muted px-1 rounded">juan@example.com</code> | Password:{" "}
                    <code className="bg-muted px-1 rounded">123456789</code>
                  </p>
                </div>

                <form action={formAction} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      defaultValue="juan@example.com"
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
                      placeholder="Tu contraseña"
                      defaultValue="123456789"
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

                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Iniciando sesión..." : "Iniciar sesión"}
                  </Button>
                </form>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  ¿No tienes cuenta?{" "}
                  <Link href="/register" className="text-primary hover:underline">
                    Regístrate gratis
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
