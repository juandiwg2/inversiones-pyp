import type { ImgHTMLAttributes } from 'react'

/**
 * Isotipo de Inversiones PyP: archivo fuente original completo (círculo,
 * letras y fondo azul originales), sin recorte por bounding box, sin
 * reconstrucción ni filtros. Único recurso válido:
 * public/brand/inversiones-pyp-logo-full.jpeg
 */
export function LogoMark(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img src="/brand/inversiones-pyp-logo-full.jpeg" alt="" {...props} />
}
