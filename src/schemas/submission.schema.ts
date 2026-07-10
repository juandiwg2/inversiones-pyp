import { z } from 'zod'
import { SECURITY_CONFIG } from '../config/security'
import { prequalificationFormSchema } from './prequalification.schema'
import { utmSchema } from './utm.schema'

/**
 * Payload completo que viaja del cliente al endpoint de servidor: datos del
 * formulario + UTM + metadatos técnicos (clave de idempotencia y honeypot).
 * Es el único esquema que el servidor debe usar para validar `req.body`.
 */
export const prequalificationSubmissionSchema = prequalificationFormSchema.merge(utmSchema).extend({
  /** uuid generado en el cliente antes de enviar; protege contra doble envío. */
  idempotencyKey: z.string().uuid(),
  /** Campo trampa antispam: debe llegar vacío. Ver SECURITY_CONFIG.honeypotFieldName. */
  [SECURITY_CONFIG.honeypotFieldName]: z.string().max(200).optional().or(z.literal('')),
})

export type PrequalificationSubmission = z.infer<typeof prequalificationSubmissionSchema>
