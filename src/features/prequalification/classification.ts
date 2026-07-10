import { calculateAge } from '../../schemas/prequalification.schema'
import { BUSINESS_RULES } from '../../config/business-rules'
import { isLocalityAllowed } from '../../config/locations'
import { NO_INCOME_PROOF_VALUE } from '../../config/form-options'
import type { ClassificationOutcome, ClassificationReason } from '../../types/domain.types'

export interface ClassificationInput {
  birthDate: string
  locality: string
  incomeProofType: string
  seniorityMonths: number
}

/**
 * Única fuente de verdad para decidir compatible / manual_review / not_compatible.
 * Se ejecuta en el servidor (autoridad) y puede reutilizarse en el cliente para
 * feedback instantáneo, pero el resultado guardado siempre es el del servidor.
 *
 * Prioridad: cualquier motivo de not_compatible descarta la solicitud sin
 * importar la antigüedad. Si no hay motivos de not_compatible, la antigüedad
 * decide entre manual_review y compatible.
 */
export function classifyPrequalification(input: ClassificationInput): ClassificationOutcome {
  const disqualifyingReasons: ClassificationReason[] = []

  if (calculateAge(input.birthDate) < BUSINESS_RULES.minAge) {
    disqualifyingReasons.push('edad_minima_no_alcanzada')
  }
  if (!isLocalityAllowed(input.locality)) {
    disqualifyingReasons.push('zona_no_admitida')
  }
  if (input.incomeProofType === NO_INCOME_PROOF_VALUE) {
    disqualifyingReasons.push('sin_comprobacion_de_ingresos')
  }
  if (input.seniorityMonths < BUSINESS_RULES.seniorityMonths.notCompatibleBelowMonths) {
    disqualifyingReasons.push('antiguedad_insuficiente')
  }

  if (disqualifyingReasons.length > 0) {
    return { result: 'not_compatible', reasons: disqualifyingReasons }
  }

  if (input.seniorityMonths < BUSINESS_RULES.seniorityMonths.compatibleFromMonths) {
    return { result: 'manual_review', reasons: ['antiguedad_en_revision'] }
  }

  return { result: 'compatible', reasons: [] }
}
