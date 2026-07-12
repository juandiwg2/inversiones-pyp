import { describe, expect, it } from 'vitest'
import { simplifiedRequestSchema } from './simplifiedRequestSchema'

const VALID = {
  fullName: 'Juana Pérez',
  birthDate: '1990-01-01',
  requestedAmount: 200_000,
  jobOrActivity: 'Comercio',
  preferredModality: 'mensual',
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

  describe('jobOrActivity', () => {
    it('is required', () => {
      const result = simplifiedRequestSchema.safeParse({ ...VALID, jobOrActivity: '' })
      expect(result.success).toBe(false)
    })
  })

  describe('preferredModality', () => {
    it('is required', () => {
      const result = simplifiedRequestSchema.safeParse({ ...VALID, preferredModality: '' })
      expect(result.success).toBe(false)
    })

    it('rejects a value outside the allowed list', () => {
      const result = simplifiedRequestSchema.safeParse({ ...VALID, preferredModality: 'anual' })
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
