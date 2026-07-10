/**
 * Textos legales. Los cuerpos de política de privacidad y términos son
 * placeholders pendientes de redacción/revisión por asesoría legal: no
 * publicar la landing en producción sin reemplazarlos.
 */
export const LEGAL_TEXT = {
  privacyPolicy: {
    /** Fecha de última versión revisada. null mientras el texto sea placeholder. */
    updatedAt: null as string | null,
    body: 'PENDIENTE: texto de Política de Privacidad a redactar y revisar con asesoría legal antes de publicar.',
  },
  termsAndConditions: {
    updatedAt: null as string | null,
    body: 'PENDIENTE: texto de Términos y Condiciones a redactar y revisar con asesoría legal antes de publicar.',
  },
  /** Texto exacto del checkbox obligatorio de declaración de veracidad. */
  truthfulnessDeclaration:
    'Declaro que la información proporcionada en este formulario es verídica y completa.',
  /** Texto exacto del checkbox obligatorio de consentimiento de análisis y contacto. */
  consentStatement:
    'Autorizo a Inversiones PyP a analizar mis datos y a contactarme por los medios indicados para continuar con el proceso de evaluación.',
} as const
