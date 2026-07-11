import { isGa4Enabled, isGtmEnabled } from '../config/analytics'

declare global {
  interface Window {
    dataLayer?: unknown[]
  }
}

export type AnalyticsEventName =
  | 'prequalification_form_submit'
  | 'prequalification_result_compatible'
  | 'prequalification_result_manual_review'
  | 'prequalification_result_not_compatible'
  | 'prequalification_error'
  | 'prequalification_whatsapp_redirect'
  | 'whatsapp_click'

/**
 * Envía un evento anónimo a GTM/GA4 (via dataLayer). Nunca debe recibir datos
 * personales del solicitante: solo nombres de evento y parámetros no sensibles
 * (ej. el resultado de clasificación, que no identifica a nadie).
 */
export function trackEvent(name: AnalyticsEventName, params?: Record<string, string | number | boolean>): void {
  if (!isGtmEnabled && !isGa4Enabled) return
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ event: name, ...params })
}
