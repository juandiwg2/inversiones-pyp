/**
 * Identidad de marca. Único lugar para cambiar nombre, URL del sitio o datos de contacto.
 */
export const BRAND = {
  name: 'Inversiones PyP',
  shortName: 'PyP',
  tagline: 'Precalificación rápida y sin compromiso',
  siteUrl: import.meta.env.VITE_SITE_URL ?? 'https://inversionespyp.com.ar',
  contactEmail: 'contacto@inversionespyp.com.ar', // TODO: confirmar casilla de contacto real
  defaultLocale: 'es-AR',
} as const
