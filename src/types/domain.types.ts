import type { PrequalificationFormValues } from '../schemas/prequalification.schema'
import type { PrequalificationSubmission } from '../schemas/submission.schema'
import type { PrequalificationResult } from './database.types'

export type { PrequalificationFormValues, PrequalificationSubmission }
export type { PrequalificationResult, CommercialStatus } from './database.types'

export type ClassificationReason =
  | 'edad_minima_no_alcanzada'
  | 'zona_no_admitida'
  | 'sin_comprobacion_de_ingresos'
  | 'antiguedad_insuficiente'
  | 'antiguedad_en_revision'

export interface ClassificationOutcome {
  result: PrequalificationResult
  reasons: ClassificationReason[]
}
