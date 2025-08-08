// hooks/useAuth.js - Custom Hook
'use client'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

/**
 * Hook para manejar la autenticación de usuario del lado del cliente.
 */
export function useAuth() {
  const [user, setUser] = useState<{
    id: string
    email: string | undefined
    name: string
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient() // Browser client

  // Helper function to get user's name
  function getUserName(session: any) {
    return session.user.user_metadata.full_name
      ? session.user.user_metadata.full_name
      : session.user.email;
  }

  useEffect(() => {
    // Obtener sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session ? {
        id: session.user.id,
        email: session.user.email,
        name: getUserName(session),
      } : null)
      setLoading(false)
    })

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session ? {
          id: session.user.id,
          email: session.user.email,
          name: getUserName(session),
        } : null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading }
}