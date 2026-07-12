import { z } from 'zod'
import { BUSINESS_RULES } from '../../config/business-rules'
import { MODALITY_VALUES } from '../../config/form-options'
import { LOCALITY_FORM_VALUES } from '../../config/locations'
import { calculateAge } from '../../schemas/prequalification.schema'

/**
 * Validación local del formulario breve (Parte A del nuevo alcance: sin
 * clasificación automática ni llamada al servidor todavía). Deliberadamente
 * separado de schemas/prequalification.schema.ts, que sigue siendo el
 * contrato del endpoint actual hasta que la Parte B (migración + API) sea
 * aprobada.
 */
const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/

export const simplifiedRequestSchema = z.object({
  fullName: z.string().trim().min(3, 'Ingresá tu nombre y apellido').max(120),
  birthDate: z
    .string()
    .regex(isoDateRegex, 'Fecha de nacimiento inválida')
    .refine((value) => !Number.isNaN(new Date(`${value}T00:00:00`).getTime()), {
      message: 'Fecha de nacimiento inválida',
    })
    .refine((value) => calculateAge(value) >= BUSINESS_RULES.minAge, {
      message: `Debés ser mayor de ${BUSINESS_RULES.minAge} años`,
    })
    .refine((value) => calculateAge(value) < 120, { message: 'Fecha de nacimiento inválida' }),
  monthlyIncome: z.coerce
    .number({ message: 'Ingresá tus ingresos aproximados' })
    .gt(0, 'Los ingresos deben ser mayores a $0'),
  seniority: z.string().trim().min(1, 'Contanos tu antigüedad laboral o comercial').max(120),
  requestedAmount: z.coerce
    .number({ message: 'Ingresá el monto solicitado' })
    .min(
      BUSINESS_RULES.minRequestedAmount,
      `El monto mínimo es $${BUSINESS_RULES.minRequestedAmount.toLocaleString('es-AR')}`,
    )
    .max(
      BUSINESS_RULES.maxRequestedAmount,
      `El monto máximo es $${BUSINESS_RULES.maxRequestedAmount.toLocaleString('es-AR')}`,
    ),
  locality: z.string().refine((value) => LOCALITY_FORM_VALUES.includes(value), {
    message: 'Seleccioná una localidad de la lista',
  }),
  preferredModality: z.enum(MODALITY_VALUES, { message: 'Seleccioná una opción' }),
  acceptedConsent: z.literal(true, {
    message: 'Debés aceptar la declaración para continuar',
  }),
})

export type SimplifiedRequestValues = z.infer<typeof simplifiedRequestSchema>
