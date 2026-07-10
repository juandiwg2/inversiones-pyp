import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../../src/types/database.types'

let cachedClient: SupabaseClient<Database> | null = null

/**
 * Cliente de Supabase con la service_role key. Solo debe importarse desde
 * código que corre en el servidor (funciones en api/). Nunca debe llegar al
 * bundle del navegador: la clave se lee de una variable de entorno sin
 * prefijo VITE_, por lo que Vite jamás la incluye en el build del cliente.
 */
export function getSupabaseAdmin(): SupabaseClient<Database> {
  if (cachedClient) return cachedClient

  const url = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    throw new Error('Faltan las variables de entorno SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY')
  }

  cachedClient = createClient<Database>(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  })
  return cachedClient
}
