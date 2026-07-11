import type { ImgHTMLAttributes } from 'react'

/**
 * Isotipo de Inversiones PyP: el archivo original tal cual, sin recorte,
 * relleno ni reinterpretación. Único recurso válido: public/brand/inversiones-pyp-logo-original.png
 */
export function LogoMark(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img src="/brand/inversiones-pyp-logo-original.png" alt="" {...props} />
}
