import { describe, expect, it } from 'vitest'
import { classifyPrequalification } from './classification'

const BASE = {
  birthDate: '1990-01-01',
  locality: 'moron',
  incomeProofType: 'recibo_sueldo',
  seniorityMonths: 24,
}

describe('classifyPrequalification', () => {
  it('returns compatible when every rule passes and seniority >= 12 months', () => {
    expect(classifyPrequalification(BASE)).toEqual({ result: 'compatible', reasons: [] })
  })

  it('returns manual_review when seniority is between 3 and 11 months', () => {
    expect(classifyPrequalification({ ...BASE, seniorityMonths: 6 })).toEqual({
      result: 'manual_review',
      reasons: ['antiguedad_en_revision'],
    })
  })

  it('returns not_compatible when under the minimum age, regardless of seniority', () => {
    const result = classifyPrequalification({ ...BASE, birthDate: '2015-01-01' })
    expect(result.result).toBe('not_compatible')
    expect(result.reasons).toContain('edad_minima_no_alcanzada')
  })

  it('returns not_compatible for a locality outside the allowed zone', () => {
    const result = classifyPrequalification({ ...BASE, locality: 'fuera_de_zona_oeste' })
    expect(result.result).toBe('not_compatible')
    expect(result.reasons).toContain('zona_no_admitida')
  })

  it('returns not_compatible when income cannot be proven, even with 24 months of seniority', () => {
    const result = classifyPrequalification({ ...BASE, incomeProofType: 'no_puede_comprobar' })
    expect(result.result).toBe('not_compatible')
    expect(result.reasons).toEqual(['sin_comprobacion_de_ingresos'])
  })

  it('returns not_compatible for seniority under 3 months', () => {
    const result = classifyPrequalification({ ...BASE, seniorityMonths: 1 })
    expect(result.result).toBe('not_compatible')
    expect(result.reasons).toContain('antiguedad_insuficiente')
  })
})
