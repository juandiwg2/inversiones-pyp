import type { VercelRequest, VercelResponse } from '@vercel/node'
import { classifyPrequalification } from '../src/features/prequalification/classification'
import { SECURITY_CONFIG } from '../src/config/security'
import { prequalificationSubmissionSchema } from '../src/schemas/submission.schema'
import { getClientIp, hashIp } from './_lib/ipHash'
import { normalizePhone } from './_lib/phone'
import { generatePublicCode } from './_lib/publicCode'
import { isRateLimited } from './_lib/rateLimit'
import { sanitizeText } from './_lib/sanitize'
import { getSupabaseAdmin } from './_lib/supabaseAdmin'

/**
 * Único punto de entrada para guardar una solicitud de precalificación.
 * Corre en el servidor (Vercel Serverless Function): valida de nuevo con Zod,
 * sanitiza texto libre, normaliza el teléfono, aplica antispam/rate limiting,
 * clasifica automáticamente y recién ahí inserta en Supabase con la
 * service_role key. El frontend nunca toca Supabase directamente.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'method_not_allowed' })
  }

  const parsed = prequalificationSubmissionSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({
      error: 'invalid_payload',
      issues: parsed.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    })
  }

  const data = parsed.data

  // Honeypot: si el campo trampa llega con contenido, es un bot. Respondemos
  // como si todo hubiese salido bien para no revelar la detección, pero no
  // guardamos nada.
  const honeypotValue = data[SECURITY_CONFIG.honeypotFieldName]
  if (typeof honeypotValue === 'string' && honeypotValue.length > 0) {
    return res.status(200).json({ status: 'received' })
  }

  try {
    const supabase = getSupabaseAdmin()
    const normalizedPhone = normalizePhone(data.phone)
    const ip = getClientIp(req)
    const ipHash = hashIp(ip, process.env.IP_HASH_SALT ?? '')

    const rateLimited = await isRateLimited(supabase, { normalizedPhone, ipHash })
    if (rateLimited) {
      return res.status(429).json({ error: 'rate_limited' })
    }

    // Protección contra doble envío: si esta idempotencyKey ya se procesó
    // (doble clic, reintento de red), devolvemos el resultado ya calculado en
    // vez de crear una solicitud duplicada.
    const { data: existing } = await supabase
      .from('prequalification_requests')
      .select('public_code, prequalification_result, whatsapp_enabled')
      .eq('idempotency_key', data.idempotencyKey)
      .maybeSingle()

    if (existing) {
      return res.status(200).json({
        status: 'ok',
        publicCode: existing.public_code,
        result: existing.prequalification_result,
        whatsappEnabled: existing.whatsapp_enabled,
      })
    }

    const classification = classifyPrequalification({
      birthDate: data.birthDate,
      locality: data.locality,
      incomeProofType: data.incomeProofType,
      seniorityMonths: data.seniorityMonths,
    })

    const publicCode = generatePublicCode()
    const whatsappEnabled = classification.result === 'compatible'
    const now = new Date().toISOString()
    const userAgentHeader = req.headers['user-agent']
    const userAgent = Array.isArray(userAgentHeader) ? userAgentHeader[0] : userAgentHeader

    const { error } = await supabase.from('prequalification_requests').insert({
      public_code: publicCode,
      idempotency_key: data.idempotencyKey,
      full_name: sanitizeText(data.fullName),
      birth_date: data.birthDate,
      locality: data.locality,
      phone: normalizedPhone,
      email: data.email ? sanitizeText(data.email) : null,
      employment_type: data.employmentType,
      activity_type: sanitizeText(data.activityType),
      seniority_months: data.seniorityMonths,
      monthly_income: data.monthlyIncome,
      income_proof_type: data.incomeProofType,
      requested_amount: data.requestedAmount,
      preferred_modality: data.preferredModality,
      funds_purpose: data.fundsPurpose,
      observations: data.observations ? sanitizeText(data.observations) : null,
      accepted_truthfulness: data.acceptedTruthfulness,
      accepted_truthfulness_at: now,
      accepted_consent: data.acceptedConsent,
      accepted_consent_at: now,
      utm_source: data.utmSource ? sanitizeText(data.utmSource) : null,
      utm_medium: data.utmMedium ? sanitizeText(data.utmMedium) : null,
      utm_campaign: data.utmCampaign ? sanitizeText(data.utmCampaign) : null,
      utm_term: data.utmTerm ? sanitizeText(data.utmTerm) : null,
      utm_content: data.utmContent ? sanitizeText(data.utmContent) : null,
      landing_path: data.landingPath ? sanitizeText(data.landingPath) : null,
      prequalification_result: classification.result,
      prequalification_reasons: classification.reasons,
      whatsapp_enabled: whatsappEnabled,
      ip_hash: ipHash,
      user_agent: userAgent ? sanitizeText(userAgent).slice(0, 300) : null,
    })

    if (error) {
      // No logueamos datos personales: solo el código de error de Postgres/Supabase.
      console.error('prequalification_insert_failed', { code: error.code })
      return res.status(500).json({ error: 'submission_failed' })
    }

    return res.status(201).json({
      status: 'ok',
      publicCode,
      result: classification.result,
      whatsappEnabled,
    })
  } catch (err) {
    console.error('prequalification_unexpected_error', {
      message: err instanceof Error ? err.message : 'unknown',
    })
    return res.status(500).json({ error: 'internal_error' })
  }
}
