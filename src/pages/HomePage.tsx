import { BRAND } from '../config/brand'

/**
 * Placeholder de la landing. Las secciones (Hero, Cómo funciona, Requisitos,
 * Modalidades, A quién está dirigido, FAQ, Formulario de precalificación) se
 * implementan en la siguiente etapa; esta página solo valida que el
 * enrutamiento y la arquitectura de carpetas compilan correctamente.
 */
export function HomePage() {
  return (
    <main>
      <h1>{BRAND.name}</h1>
      <p>Landing en construcción.</p>
    </main>
  )
}
