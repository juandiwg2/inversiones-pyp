declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export type MetaPixelEventName = 'ViewContent' | 'Lead' | 'Contact'

/**
 * Dispara un evento estándar de Meta Pixel sin parámetros: nunca debe
 * recibir datos personales del solicitante (nombre, ingresos, fecha de
 * nacimiento, localidad), solo el nombre del evento.
 */
export function trackMetaPixelEvent(name: MetaPixelEventName): void {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  window.fbq('track', name)
}
