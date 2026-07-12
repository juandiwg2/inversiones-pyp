import { LogoMark } from './LogoMark'
import styles from './LogoHorizontal.module.css'

interface LogoHorizontalProps {
  className?: string
  markClassName?: string
  tone?: 'onDark'
  /**
   * El isotipo original es blanco sobre transparente: invisible sobre un
   * fondo blanco. `chip` lo apoya sobre un círculo navy (solo el fondo del
   * contenedor; el PNG en sí no se recorta, redibuja ni filtra) para usarlo
   * en el header, que se mantiene blanco.
   */
  chip?: boolean
}

/**
 * Isotipo + nombre de marca como texto real (no SVG-text): mejor para
 * lectores de pantalla, SEO y para heredar el color/tipografía del sitio sin
 * depender de que un font esté disponible dentro del SVG.
 */
export function LogoHorizontal({ className, markClassName, tone, chip }: LogoHorizontalProps) {
  const base = tone === 'onDark' ? `${styles.wrap} ${styles.onDark}` : styles.wrap
  const wrapClassName = className ? `${base} ${className}` : base

  const mark = chip ? (
    <span className={styles.chip}>
      <LogoMark
        className={markClassName ? `${styles.chipMark} ${markClassName}` : styles.chipMark}
        aria-hidden="true"
      />
    </span>
  ) : (
    <LogoMark className={markClassName ? `${styles.mark} ${markClassName}` : styles.mark} aria-hidden="true" />
  )

  return (
    <span className={wrapClassName}>
      {mark}
      <span className={styles.name}>Inversiones PyP</span>
    </span>
  )
}
