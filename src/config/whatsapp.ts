/**
 * Integración con WhatsApp. El mensaje se arma enteramente en el cliente a
 * partir de los datos del formulario breve: nombre, edad calculada, monto,
 * trabajo/actividad y modalidad. Nunca incluye la fecha de nacimiento
 * completa (solo la edad ya calculada) para reducir exposición innecesaria de
 * datos personales en la URL.
 */
export const WHATSAPP_CONFIG = {
  /** Número en formato internacional sin signos, ej: 5491122334455. */
  phoneNumber: import.meta.env.VITE_WHATSAPP_PHONE ?? '',
} as const

export interface WhatsappRequestData {
  fullName: string
  age: number
  requestedAmount: number
  jobOrActivity: string
  modalityLabel: string
}

export function buildWhatsappMessage(data: WhatsappRequestData): string {
  return [
    'Hola, quiero solicitar una evaluación en Inversiones PyP.',
    '',
    'DATOS DE LA SOLICITUD',
    '',
    `Nombre completo: ${data.fullName}`,
    `Edad: ${data.age} años`,
    `Monto solicitado: $${data.requestedAmount.toLocaleString('es-AR')}`,
    `Trabajo o actividad: ${data.jobOrActivity}`,
    `Modalidad preferida: ${data.modalityLabel}`,
    '',
    'Declaro que la información proporcionada es correcta.',
    '',
    'Quedo atento/a para continuar con la evaluación.',
  ].join('\n')
}

export function buildWhatsappUrl(data: WhatsappRequestData): string {
  const phone = WHATSAPP_CONFIG.phoneNumber.replace(/\D/g, '')
  const text = encodeURIComponent(buildWhatsappMessage(data))
  return `https://wa.me/${phone}?text=${text}`
}
