import { SECURITY_CONFIG } from '../../config/security'
import type { PrequalificationFormValues } from '../../schemas/prequalification.schema'
import type { PrequalificationSubmission } from '../../schemas/submission.schema'
import type { UtmValues } from '../../schemas/utm.schema'

/**
 * Combina los valores del formulario con UTM, clave de idempotencia y el
 * campo honeypot en el payload exacto que espera el servidor. Es la única
 * función que arma este objeto: evita repetir esta transformación en cada
 * punto que envíe el formulario.
 */
export function buildSubmissionPayload(
  formValues: PrequalificationFormValues,
  utm: UtmValues,
  idempotencyKey: string,
  honeypotValue: string,
): PrequalificationSubmission {
  return {
    ...formValues,
    ...utm,
    idempotencyKey,
    [SECURITY_CONFIG.honeypotFieldName]: honeypotValue,
  }
}
