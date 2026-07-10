/**
 * Opciones de selects del formulario. Cada catálogo define primero la tupla de
 * valores (usada por los esquemas Zod como enum) y después las etiquetas en
 * español (usadas por la UI). Agregar una opción nueva implica sumarla en ambos
 * lugares del mismo archivo, nunca en el componente que la consume.
 */

export const EMPLOYMENT_TYPE_VALUES = [
  'relacion_dependencia',
  'monotributista',
  'autonomo',
  'jubilado_pensionado',
  'otro',
] as const
export type EmploymentType = (typeof EMPLOYMENT_TYPE_VALUES)[number]

export const EMPLOYMENT_TYPE_OPTIONS: ReadonlyArray<{ value: EmploymentType; label: string }> = [
  { value: 'relacion_dependencia', label: 'Relación de dependencia (empleado/a)' },
  { value: 'monotributista', label: 'Monotributista' },
  { value: 'autonomo', label: 'Autónomo/a' },
  { value: 'jubilado_pensionado', label: 'Jubilado/a o pensionado/a' },
  { value: 'otro', label: 'Otro' },
]

export const INCOME_PROOF_TYPE_VALUES = [
  'recibo_sueldo',
  'constancia_monotributo',
  'resumen_bancario',
  'declaracion_jurada',
  'no_puede_comprobar',
] as const
export type IncomeProofType = (typeof INCOME_PROOF_TYPE_VALUES)[number]

/** Valor que dispara "not_compatible" en la clasificación automática. */
export const NO_INCOME_PROOF_VALUE: IncomeProofType = 'no_puede_comprobar'

export const INCOME_PROOF_TYPE_OPTIONS: ReadonlyArray<{ value: IncomeProofType; label: string }> = [
  { value: 'recibo_sueldo', label: 'Recibo de sueldo' },
  { value: 'constancia_monotributo', label: 'Constancia de monotributo' },
  { value: 'resumen_bancario', label: 'Resumen bancario' },
  { value: 'declaracion_jurada', label: 'Declaración jurada de ingresos' },
  { value: 'no_puede_comprobar', label: 'No puedo comprobar ingresos' },
]

export const MODALITY_VALUES = ['prestamo_personal', 'adelanto_efectivo', 'refinanciacion'] as const
export type Modality = (typeof MODALITY_VALUES)[number]

export const MODALITY_OPTIONS: ReadonlyArray<{ value: Modality; label: string; description: string }> = [
  {
    value: 'prestamo_personal',
    label: 'Préstamo personal',
    description: 'Monto fijo a devolver en cuotas.',
  },
  {
    value: 'adelanto_efectivo',
    label: 'Adelanto en efectivo',
    description: 'Disponibilidad inmediata de un adelanto sobre ingresos.',
  },
  {
    value: 'refinanciacion',
    label: 'Refinanciación de deudas',
    description: 'Consolidar deudas existentes en una sola cuota.',
  },
]

export const FUNDS_PURPOSE_VALUES = [
  'consumo',
  'vivienda',
  'salud',
  'emprendimiento',
  'pago_deudas',
  'otro',
] as const
export type FundsPurpose = (typeof FUNDS_PURPOSE_VALUES)[number]

export const FUNDS_PURPOSE_OPTIONS: ReadonlyArray<{ value: FundsPurpose; label: string }> = [
  { value: 'consumo', label: 'Consumo / gastos personales' },
  { value: 'vivienda', label: 'Vivienda o refacción' },
  { value: 'salud', label: 'Salud' },
  { value: 'emprendimiento', label: 'Emprendimiento o negocio' },
  { value: 'pago_deudas', label: 'Pago de deudas' },
  { value: 'otro', label: 'Otro' },
]
