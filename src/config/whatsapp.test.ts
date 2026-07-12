import { describe, expect, it } from 'vitest'
import { WHATSAPP_CONFIG, buildWhatsappMessage, buildWhatsappUrl, type WhatsappRequestData } from './whatsapp'

const SAMPLE: WhatsappRequestData = {
  fullName: 'Juana Pérez',
  age: 34,
  monthlyIncome: 450000,
  seniority: '2 años',
  requestedAmount: 300000,
  locality: 'Morón',
  modalityLabel: 'Semanal',
}

describe('buildWhatsappMessage', () => {
  it('matches the exact agreed copy, formatted with the request data', () => {
    const message = buildWhatsappMessage(SAMPLE)
    expect(message).toBe(
      [
        'Hola, quiero solicitar una evaluación en Inversiones PyP.',
        '',
        'DATOS DE LA SOLICITUD',
        '',
        'Nombre completo: Juana Pérez',
        'Edad: 34 años',
        'Ingresos aproximados: $450.000',
        'Antigüedad laboral/comercial: 2 años',
        'Monto solicitado: $300.000',
        'Localidad: Morón',
        'Modalidad preferida: Semanal',
        '',
        'Declaro que la información proporcionada es correcta.',
        '',
        'Quedo atento/a para continuar con la evaluación.',
      ].join('\n'),
    )
  })

  it('never includes the birth date, only the already-calculated age', () => {
    const message = buildWhatsappMessage(SAMPLE)
    expect(message).not.toMatch(/\d{4}-\d{2}-\d{2}/)
    expect(message).toContain('Edad: 34 años')
  })

  it('never includes fields outside the agreed data set', () => {
    const message = buildWhatsappMessage(SAMPLE)
    const lines = message.split('\n').filter((line) => line.includes(':'))
    expect(lines).toHaveLength(7)
  })
})

describe('buildWhatsappUrl', () => {
  it('builds a wa.me URL with the message URL-encoded', () => {
    const url = buildWhatsappUrl(SAMPLE)
    expect(url.startsWith('https://wa.me/')).toBe(true)

    const [, query] = url.split('?text=')
    const decoded = decodeURIComponent(query)
    expect(decoded).toContain('Nombre completo: Juana Pérez')
    expect(decoded).toContain('Monto solicitado: $300.000')
  })

  it('targets the approved production destination number', () => {
    expect(WHATSAPP_CONFIG.phoneNumber).toBe('5491127964094')
    expect(buildWhatsappUrl(SAMPLE)).toBe(
      `https://wa.me/5491127964094?text=${encodeURIComponent(buildWhatsappMessage(SAMPLE))}`,
    )
  })
})
