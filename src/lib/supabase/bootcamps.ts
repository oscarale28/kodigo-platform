'use server'

import { createClient } from '@/lib/supabase/client' 


//Para crear un cliente de Supabase que se utilizará para interactuar con la base de datos.
export async function getBootcampsFromDB() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('bootcamps')
    .select('*')
    .eq('is_active', true)

  if (error) {
    console.error('Error al cargar bootcamps:', error)
    return []
  }

  return data
}

