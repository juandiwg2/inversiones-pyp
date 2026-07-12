/**
 * Textos legales. Los cuerpos de política de privacidad y términos son
 * placeholders pendientes de redacción/revisión por asesoría legal: no
 * publicar la landing en producción sin reemplazarlos.
 */
export const LEGAL_TEXT = {
  privacyPolicy: {
    /** Fecha de última versión revisada por asesoría legal. null mientras no haya revisión formal. */
    updatedAt: null as string | null,
    body: 'En Inversiones PyP recolectamos únicamente los datos que nos proporcionás en el formulario de solicitud: nombre completo, fecha de nacimiento, trabajo o actividad y monto solicitado. Estos datos se utilizan exclusivamente para analizar tu solicitud y contactarte por WhatsApp para continuar el proceso. No compartimos tu información con terceros. Podés solicitar la eliminación de tus datos escribiéndonos por los mismos medios de contacto. Este texto es una versión breve, pendiente de revisión final por asesoría legal.',
  },
  /** Texto exacto del checkbox obligatorio de declaración de veracidad (formulario anterior, en desuso). */
  truthfulnessDeclaration:
    'Declaro que la información proporcionada en este formulario es verídica y completa.',
  /** Texto exacto del checkbox obligatorio de consentimiento de análisis y contacto (formulario anterior, en desuso). */
  consentStatement:
    'Autorizo a Inversiones PyP a analizar mis datos y a contactarme por los medios indicados para continuar con el proceso de evaluación.',
  /** Único checkbox obligatorio del formulario breve: combina veracidad + consentimiento. */
  combinedConsentStatement:
    'Declaro que la información proporcionada es correcta y autorizo su uso para analizar mi solicitud y contactarme.',
  /** Aviso breve visible debajo del formulario. */
  dataUseNotice: 'Los datos se utilizan únicamente para analizar la solicitud y continuar el contacto por WhatsApp.',
  /** Aviso legal breve del footer (reemplaza a la página de Términos y Condiciones). */
  legalNotice: 'Enviar una solicitud no implica aprobación.',
} as const
