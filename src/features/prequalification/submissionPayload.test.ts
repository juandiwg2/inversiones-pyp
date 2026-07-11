import { describe, expect, it } from 'vitest'
import { SECURITY_CONFIG } from '../../config/security'
import type { PrequalificationFormValues } from '../../schemas/prequalification.schema'
import { buildSubmissionPayload } from './submissionPayload'

const FORM_VALUES: PrequalificationFormValues = {
  fullName: 'Ana Pérez',
  birthDate: '1990-01-01',
  locality: 'moron',
  phone: '1122334455',
  email: '',
  employmentType: 'relacion_dependencia',
  activityType: 'Administrativa',
  seniorityMonths: 24,
  monthlyIncome: 800000,
  incomeProofType: 'recibo_sueldo',
  requestedAmount: 200000,
  preferredModality: 'mensual',
  fundsPurpose: 'consumo',
  observations: '',
  acceptedTruthfulness: true,
  acceptedConsent: true,
}

describe('buildSubmissionPayload', () => {
  it('merges form values, UTM and idempotency key into a single submission payload', () => {
    const payload = buildSubmissionPayload(
      FORM_VALUES,
      { utmSource: 'google', utmMedium: 'cpc' },
      'idempotency-key-123',
      '',
    )

    expect(payload).toMatchObject({
      fullName: 'Ana Pérez',
      locality: 'moron',
      utmSource: 'google',
      utmMedium: 'cpc',
      idempotencyKey: 'idempotency-key-123',
    })
  })

  it('places the honeypot value under the centrally configured field name', () => {
    const payload = buildSubmissionPayload(FORM_VALUES, {}, 'key', 'bot-filled-value')

    expect(payload[SECURITY_CONFIG.honeypotFieldName]).toBe('bot-filled-value')
  })

  it('does not mutate the original form values object', () => {
    const original = { ...FORM_VALUES }
    buildSubmissionPayload(FORM_VALUES, { utmSource: 'x' }, 'key', '')

    expect(FORM_VALUES).toEqual(original)
  })
})
