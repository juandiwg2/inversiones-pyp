/**
 * Identificadores de analítica. Todos son públicos por naturaleza (viajan al
 * navegador), pero ninguna implementación debe enviarles datos personales del
 * solicitante: solo eventos anónimos (ej. "formulario_enviado", "resultado_compatible").
 */
export const ANALYTICS_CONFIG = {
  ga4MeasurementId: import.meta.env.VITE_GA4_MEASUREMENT_ID ?? '',
  gtmContainerId: import.meta.env.VITE_GTM_CONTAINER_ID ?? '',
  metaPixelId: import.meta.env.VITE_META_PIXEL_ID ?? '',
} as const

export const isGa4Enabled = ANALYTICS_CONFIG.ga4MeasurementId.length > 0
export const isGtmEnabled = ANALYTICS_CONFIG.gtmContainerId.length > 0
export const isMetaPixelEnabled = ANALYTICS_CONFIG.metaPixelId.length > 0
