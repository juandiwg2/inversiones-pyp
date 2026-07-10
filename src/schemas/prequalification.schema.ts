import { z } from 'zod'
import { BUSINESS_RULES } from '../config/business-rules'
import {
  EMPLOYMENT_TYPE_VALUES,
  FUNDS_PURPOSE_VALUES,
  INCOME_PROOF_TYPE_VALUES,
  MODALITY_VALUES,
} from '../config/form-options'
import { LOCALITY_FORM_VALUES } from '../config/locations'

/** yyyy-mm-dd, formato nativo de <input type="date"> y de la columna `date` en Postgres. */
const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/

function calculateAge(birthDateIso: string, referenceDate: Date = new Date()): number {
  const birth = new Date(`${birthDateIso}T00:00:00`)
  let age = referenceDate.getFullYear() - birth.getFullYear()
  const hasHadBirthdayThisYear =
    referenceDate.getMonth() > birth.getMonth() ||
    (referenceDate.getMonth() === birth.getMonth() && referenceDate.getDate() >= birth.getDate())
  if (!hasHadBirthdayThisYear) age -= 1
  return age
}

const phoneSchema = z
  .string()
  .trim()
  .min(6, 'Ingresá un teléfono válido')
  .max(20, 'Ingresá un teléfono válido')
  .regex(/^[0-9+\s()-]+$/, 'El teléfono solo puede contener números y los símbolos + ( ) -')

const birthDateSchema = z
  .string()
  .regex(isoDateRegex, 'Fecha de nacimiento inválida')
  .refine((value) => !Number.isNaN(new Date(`${value}T00:00:00`).getTime()), {
    message: 'Fecha de nacimiento inválida',
  })
  .refine((value) => calculateAge(value) >= BUSINESS_RULES.minAge, {
    message: `Debés ser mayor de ${BUSINESS_RULES.minAge} años`,
  })
  .refine((value) => calculateAge(value) < 120, { message: 'Fecha de nacimiento inválida' })

export const prequalificationFormSchema = z.object({
  fullName: z.string().trim().min(3, 'Ingresá tu nombre y apellido').max(120),
  birthDate: birthDateSchema,
  locality: z.string().refine((value) => LOCALITY_FORM_VALUES.includes(value), {
    message: 'Seleccioná una localidad de la lista',
  }),
  phone: phoneSchema,
  email: z
    .union([z.string().trim().toLowerCase().email('Correo inválido'), z.literal('')])
    .optional(),
  employmentType: z.enum(EMPLOYMENT_TYPE_VALUES),
  activityType: z.string().trim().min(2, 'Contanos tu actividad').max(120),
  seniorityMonths: z.coerce
    .number({ message: 'Ingresá la antigüedad en meses' })
    .int('Ingresá un número entero de meses')
    .min(0, 'La antigüedad no puede ser negativa')
    .max(960, 'Ingresá un valor de antigüedad válido'),
  monthlyIncome: z.coerce
    .number({ message: 'Ingresá el ingreso mensual aproximado' })
    .min(0, 'El ingreso no puede ser negativo'),
  incomeProofType: z.enum(INCOME_PROOF_TYPE_VALUES),
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
  preferredModality: z.enum(MODALITY_VALUES),
  fundsPurpose: z.enum(FUNDS_PURPOSE_VALUES),
  observations: z.string().trim().max(500, 'Máximo 500 caracteres').optional().or(z.literal('')),
  acceptedTruthfulness: z.literal(true, {
    message: 'Debés declarar que la información es verídica',
  }),
  acceptedConsent: z.literal(true, {
    message: 'Debés otorgar el consentimiento para el análisis y contacto',
  }),
})

export type PrequalificationFormValues = z.infer<typeof prequalificationFormSchema>

export { calculateAge }
