import { createClient } from "../supabase/server"
import { Tables } from "../supabase/types"

export const getActiveBootcamps = async (): Promise<Tables<'bootcamps'>[]> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('bootcamps')
    .select('*')
    .eq('is_active', true)

  if (error) {
    console.error("Error fetching bootcamps:", error)
    return []
  }

  return data || []
}

export const getFeaturedBootcamps = async (): Promise<Tables<'bootcamps'>[]> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('bootcamps')
    .select('*')
    .eq('is_active', true)
    .in('title', ['Fullstack Jr Developer', 'Java Developer', 'AI for Business'])
    .order('start_date', { ascending: true })

  if (error) {
    console.error("Error fetching featured bootcamps:", error)
    return []
  }

  return data || []
}