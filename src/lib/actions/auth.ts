"use server"

import { registerSchema, loginSchema } from "@/lib/validations/auth"
import { redirect } from "next/navigation"

export type AuthState = {
  errors?: {
    name?: string[]
    email?: string[]
    password?: string[]
    _form?: string[]
  }
  message?: string
  success?: boolean
}

// Datos dummy para simular usuarios registrados
const DUMMY_USERS = [
  { id: "1", name: "Juan Pérez", email: "juan@example.com", password: "123456789" },
  { id: "2", name: "María García", email: "maria@example.com", password: "123456789" },
  { id: "3", name: "Carlos López", email: "carlos@example.com", password: "123456789" },
]

export async function registerAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const validatedFields = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Faltan campos requeridos. No se pudo crear la cuenta.",
    }
  }

  const { name, email, password } = validatedFields.data

  // Simular delay de API
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Verificar si el email ya existe (simulado)
  const existingUser = DUMMY_USERS.find((user) => user.email === email)
  if (existingUser) {
    return {
      errors: {
        email: ["Este email ya está registrado"],
      },
    }
  }

  // Simular registro exitoso
  console.log("Usuario registrado (dummy):", { name, email })

  return {
    success: true,
    message: "Cuenta creada exitosamente. Ya puedes iniciar sesión.",
  }
}

export async function loginAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Faltan campos requeridos.",
    }
  }

  const { email, password } = validatedFields.data

  // Simular delay de API
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Verificar credenciales con datos dummy
  const user = DUMMY_USERS.find((u) => u.email === email && u.password === password)

  if (!user) {
    return {
      errors: {
        _form: ["Credenciales inválidas"],
      },
    }
  }

  console.log("Login exitoso (dummy):", user)

  // Simular login exitoso y redirigir
  redirect("/dashboard")
}

// Acción para login rápido (solo para desarrollo)
export async function quickLoginAction(): Promise<void> {
  console.log("Login rápido activado")
  redirect("/dashboard")
}
