"use server"

import { createClient } from "@/lib/supabase/server"
import { headers } from "next/headers"
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

/**
 * Inicia sesión con GitHub y redirige al usuario.
 * @returns  {Promise<AuthState>} Estado de autenticación con posibles errores.
 * Si hay un error, se devuelve un objeto con los errores.
 * Si la autenticación es exitosa, redirige al usuario a la URL de callback.
 */
export const signInWithGitHub = async (): Promise<AuthState> => {
  const supabase = await createClient()

  // Obtener el origen dinámicamente desde los headers
  const headersList = await headers()
  const host = headersList.get('host')
  const protocol = headersList.get('x-forwarded-proto') || 'http'
  const origin = `${protocol}://${host}`

  const callbackUrl = `${origin}/auth/callback`

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: callbackUrl
    }
  })

  if (error) {
    console.log("Auth Error: ", error)
    return {
      errors: {
        _form: ["Error al iniciar sesión con GitHub"],
      },
    }
  }

  redirect(data.url)
}


/**
 * Obtiene el usuario autenticado (server-side).
 * @returns {Promise<User | null>} El usuario autenticado o null si no hay sesión.
 */
export async function getUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
