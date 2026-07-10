import type { SupabaseClient } from '@supabase/supabase-js'
import { SECURITY_CONFIG } from '../../src/config/security'
import type { Database } from '../../src/types/database.types'

interface RateLimitParams {
  normalizedPhone: string
  ipHash: string
}

/**
 * Control de abuso simple basado en la propia tabla de solicitudes: cuenta
 * envíos recientes por teléfono y por IP (hasheada) dentro de una ventana de
 * tiempo. No requiere infraestructura adicional (Redis, etc.), acorde al
 * volumen esperado en esta primera etapa.
 */
export async function isRateLimited(
  supabase: SupabaseClient<Database>,
  { normalizedPhone, ipHash }: RateLimitParams,
): Promise<boolean> {
  const windowStart = new Date(
    Date.now() - SECURITY_CONFIG.rateLimit.windowMinutes * 60_000,
  ).toISOString()

  const [phoneResult, ipResult] = await Promise.all([
    supabase
      .from('prequalification_requests')
      .select('id', { count: 'exact', head: true })
      .eq('phone', normalizedPhone)
      .gte('created_at', windowStart),
    supabase
      .from('prequalification_requests')
      .select('id', { count: 'exact', head: true })
      .eq('ip_hash', ipHash)
      .gte('created_at', windowStart),
  ])

  const phoneSubmissions = phoneResult.count ?? 0
  const ipSubmissions = ipResult.count ?? 0

  return (
    phoneSubmissions >= SECURITY_CONFIG.rateLimit.maxSubmissionsPerPhone ||
    ipSubmissions >= SECURITY_CONFIG.rateLimit.maxSubmissionsPerIp
  )
}
