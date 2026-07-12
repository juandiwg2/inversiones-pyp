import { describe, expect, it } from 'vitest'
import { simplifiedRequestSchema } from './simplifiedRequestSchema'

const VALID = {
  fullName: 'Juana Pérez',
  birthDate: '1990-01-01',
  monthlyIncome: 450_000,
  seniority: '2 años',
  requestedAmount: 200_000,
  locality: 'moron',
  preferredModality: 'semanal',
  acceptedConsent: true,
}

function yearsAgo(years: number): string {
  const date = new Date()
  date.setFullYear(date.getFullYear() - years)
  return date.toISOString().slice(0, 10)
}

describe('simplifiedRequestSchema', () => {
  it('accepts a fully valid submission', () => {
    expect(simplifiedRequestSchema.safeParse(VALID).success).toBe(true)
  })

  describe('birthDate', () => {
    it('accepts a valid adult birth date', () => {
      const result = simplifiedRequestSchema.safeParse({ ...VALID, birthDate: yearsAgo(30) })
      expect(result.success).toBe(true)
    })

    it('rejects someone under 18', () => {
      const result = simplifiedRequestSchema.safeParse({ ...VALID, birthDate: yearsAgo(17) })
      expect(result.success).toBe(false)
    })

    it('rejects a malformed date', () => {
      const result = simplifiedRequestSchema.safeParse({ ...VALID, birthDate: 'not-a-date' })
      expect(result.success).toBe(false)
    })
  })

  describe('monthlyIncome', () => {
    it('is required', () => {
      const { monthlyIncome: _omit, ...withoutIncome } = VALID
      const result = simplifiedRequestSchema.safeParse(withoutIncome)
      expect(result.success).toBe(false)
    })

    it('rejects zero', () => {
      const result = simplifiedRequestSchema.safeParse({ ...VALID, monthlyIncome: 0 })
      expect(result.success).toBe(false)
    })

    it('rejects negative values', () => {
      const result = simplifiedRequestSchema.safeParse({ ...VALID, monthlyIncome: -100 })
      expect(result.success).toBe(false)
    })

    it('accepts a positive value', () => {
      const result = simplifiedRequestSchema.safeParse({ ...VALID, monthlyIncome: 1 })
      expect(result.success).toBe(true)
    })
  })

  describe('seniority', () => {
    it('is required', () => {
      const result = simplifiedRequestSchema.safeParse({ ...VALID, seniority: '' })
      expect(result.success).toBe(false)
    })
  })

  describe('requestedAmount', () => {
    it('accepts the minimum amount ($100.000)', () => {
      const result = simplifiedRequestSchema.safeParse({ ...VALID, requestedAmount: 100_000 })
      expect(result.success).toBe(true)
    })

    it('accepts the maximum amount ($500.000)', () => {
      const result = simplifiedRequestSchema.safeParse({ ...VALID, requestedAmount: 500_000 })
      expect(result.success).toBe(true)
    })

    it('rejects amounts below the minimum', () => {
      const result = simplifiedRequestSchema.safeParse({ ...VALID, requestedAmount: 99_999 })
      expect(result.success).toBe(false)
    })

    it('rejects amounts above the maximum', () => {
      const result = simplifiedRequestSchema.safeParse({ ...VALID, requestedAmount: 500_001 })
      expect(result.success).toBe(false)
    })
  })

  describe('fullName', () => {
    it('is required', () => {
      const result = simplifiedRequestSchema.safeParse({ ...VALID, fullName: '' })
      expect(result.success).toBe(false)
    })
  })

  describe('locality', () => {
    it('is required', () => {
      const result = simplifiedRequestSchema.safeParse({ ...VALID, locality: '' })
      expect(result.success).toBe(false)
    })

    it('rejects a value outside the allowed list', () => {
      const result = simplifiedRequestSchema.safeParse({ ...VALID, locality: 'no-existe' })
      expect(result.success).toBe(false)
    })

    it('accepts the out-of-zone fallback option', () => {
      const result = simplifiedRequestSchema.safeParse({ ...VALID, locality: 'fuera_de_zona_oeste' })
      expect(result.success).toBe(true)
    })
  })

  describe('preferredModality', () => {
    it('is required', () => {
      const result = simplifiedRequestSchema.safeParse({ ...VALID, preferredModality: '' })
      expect(result.success).toBe(false)
    })

    it('accepts "diaria"', () => {
      const result = simplifiedRequestSchema.safeParse({ ...VALID, preferredModality: 'diaria' })
      expect(result.success).toBe(true)
    })

    it('accepts "semanal"', () => {
      const result = simplifiedRequestSchema.safeParse({ ...VALID, preferredModality: 'semanal' })
      expect(result.success).toBe(true)
    })

    it('rejects "quincenal"', () => {
      const result = simplifiedRequestSchema.safeParse({ ...VALID, preferredModality: 'quincenal' })
      expect(result.success).toBe(false)
    })

    it('rejects "mensual"', () => {
      const result = simplifiedRequestSchema.safeParse({ ...VALID, preferredModality: 'mensual' })
      expect(result.success).toBe(false)
    })
  })

  describe('acceptedConsent', () => {
    it('is required and must be true', () => {
      const result = simplifiedRequestSchema.safeParse({ ...VALID, acceptedConsent: false })
      expect(result.success).toBe(false)
    })
  })
})
