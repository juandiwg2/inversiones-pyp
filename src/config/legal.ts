/**
 * Textos legales. El texto de la declaración de consentimiento es un
 * placeholder pendiente de redacción/revisión por asesoría legal: no
 * publicar la landing en producción sin reemplazarlo.
 */
export const LEGAL_TEXT = {
  /** Texto exacto del checkbox obligatorio de declaración de veracidad (formulario anterior, en desuso). */
  truthfulnessDeclaration:
    'Declaro que la información proporcionada en este formulario es verídica y completa.',
  /** Texto exacto del checkbox obligatorio de consentimiento de análisis y contacto (formulario anterior, en desuso). */
  consentStatement:
    'Autorizo a Inversiones PyP a analizar mis datos y a contactarme por los medios indicados para continuar con el proceso de evaluación.',
  /** Único checkbox obligatorio del formulario breve: combina veracidad + consentimiento. */
  combinedConsentStatement:
    'Declaro que la información proporcionada es correcta y autorizo su uso para analizar mi solicitud y contactarme.',
  /** Aviso legal breve del footer (reemplaza a la página de Términos y Condiciones). */
  legalNotice: 'Enviar una solicitud no implica aprobación.',
} as const
