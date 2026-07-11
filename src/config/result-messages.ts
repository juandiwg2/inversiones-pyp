/**
 * Copys de las pantallas de resultado tras enviar el formulario. Centralizados
 * para que ningún componente redacte su propio texto: compatible/manual_review/
 * not_compatible nunca deben usar lenguaje de aprobación ni revelar las reglas
 * internas de clasificación.
 */
export const RESULT_MESSAGES = {
  compatible: {
    title: 'Tu solicitud fue registrada',
    body: 'Continuemos por WhatsApp para seguir con el proceso. Esto no implica la aprobación final: el resultado definitivo depende del análisis interno.',
  },
  manual_review: {
    title: 'Tu solicitud quedó en revisión',
    body: 'Tu caso requiere una revisión adicional de nuestro equipo. Vamos a contactarte a través de los datos que dejaste en el formulario.',
  },
  not_compatible: {
    title: 'Tu solicitud fue registrada',
    body: 'En este momento tu perfil no cumple con los requisitos necesarios para continuar con el proceso. Agradecemos tu interés en Inversiones PyP.',
  },
  received: {
    title: 'Recibimos tu solicitud',
    body: 'Estamos procesando la información enviada.',
  },
  rateLimited: {
    title: 'Detectamos varios intentos recientes',
    body: 'Por seguridad, esperá unos minutos antes de volver a intentarlo.',
  },
  serverError: {
    title: 'No pudimos registrar tu solicitud',
    body: 'Ocurrió un problema al procesar tu solicitud. Tus datos no se perdieron: podés intentar nuevamente en unos instantes.',
  },
} as const
