/**
 * Configuración antispam / rate limiting del endpoint de envío. Se consume
 * únicamente desde el servidor (api/), nunca desde el navegador.
 */
export const SECURITY_CONFIG = {
  /**
   * Nombre del campo trampa (honeypot). Debe llegar vacío en envíos legítimos:
   * está oculto visualmente en el formulario y los bots que autocompletan
   * todos los campos suelen rellenarlo.
   */
  honeypotFieldName: 'company_website',

  rateLimit: {
    windowMinutes: 10,
    maxSubmissionsPerPhone: 2,
    maxSubmissionsPerIp: 5,
  },
} as const
