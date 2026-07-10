/**
 * Integración con WhatsApp. El mensaje predefinido es el único texto que viaja
 * en la URL: nunca debe incluir nombre, localidad, monto, ingresos u otros
 * datos personales, solo el código público de la solicitud.
 */
export const WHATSAPP_CONFIG = {
  /** Número en formato internacional sin signos, ej: 5491122334455. */
  phoneNumber: import.meta.env.VITE_WHATSAPP_PHONE ?? '',
} as const

export function buildWhatsappMessage(publicCode: string): string {
  return [
    'Hola. Ya completé la evaluación inicial en la web de Inversiones PyP y quisiera continuar con el proceso.',
    '',
    `Código de solicitud: ${publicCode}`,
  ].join('\n')
}

export function buildWhatsappUrl(publicCode: string): string {
  const phone = WHATSAPP_CONFIG.phoneNumber.replace(/\D/g, '')
  const text = encodeURIComponent(buildWhatsappMessage(publicCode))
  return `https://wa.me/${phone}?text=${text}`
}
