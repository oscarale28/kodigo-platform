import { createBrowserClient } from '@supabase/ssr'

/**
 * Cliente de supabase para las operaciones del lado del cliente
 * @returns Instancia del cliente
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}