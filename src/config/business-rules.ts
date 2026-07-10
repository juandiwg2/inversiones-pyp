/**
 * Reglas de negocio de precalificación. Fuente única de verdad: no deben repetirse
 * umbrales de edad, monto o antigüedad en componentes, esquemas Zod ni en el
 * endpoint de servidor. Todo lo que lea o valide estas reglas debe importar este módulo.
 *
 * Cambiar un valor acá cambia el comportamiento de todo el sistema (formulario,
 * validación de servidor y clasificación automática).
 */
export const BUSINESS_RULES = {
  /** Edad mínima habilitada para solicitar, en años cumplidos. */
  minAge: 18,

  currency: 'ARS',

  /** Monto mínimo y máximo solicitable, en ARS. */
  minRequestedAmount: 100_000,
  maxRequestedAmount: 500_000,

  seniorityMonths: {
    /** Antigüedad estrictamente menor a este valor => not_compatible. */
    notCompatibleBelowMonths: 3,
    /** Antigüedad en [notCompatibleBelowMonths, compatibleFromMonths) => manual_review. */
    compatibleFromMonths: 12,
  },
} as const

export type BusinessRules = typeof BUSINESS_RULES
