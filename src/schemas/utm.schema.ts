import { z } from 'zod'

/** Parámetros de atribución de marketing. Nunca deben contener datos personales. */
export const utmSchema = z.object({
  utmSource: z.string().trim().max(120).optional().or(z.literal('')),
  utmMedium: z.string().trim().max(120).optional().or(z.literal('')),
  utmCampaign: z.string().trim().max(120).optional().or(z.literal('')),
  utmTerm: z.string().trim().max(120).optional().or(z.literal('')),
  utmContent: z.string().trim().max(120).optional().or(z.literal('')),
  landingPath: z.string().trim().max(300).optional().or(z.literal('')),
})

export type UtmValues = z.infer<typeof utmSchema>
