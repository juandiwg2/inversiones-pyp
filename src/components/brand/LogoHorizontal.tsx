import { LogoMark } from './LogoMark'
import styles from './LogoHorizontal.module.css'

interface LogoHorizontalProps {
  className?: string
  markClassName?: string
  tone?: 'onDark'
}

/**
 * Isotipo + nombre de marca como texto real (no SVG-text): mejor para
 * lectores de pantalla, SEO y para heredar el color/tipografía del sitio sin
 * depender de que un font esté disponible dentro del SVG.
 */
export function LogoHorizontal({ className, markClassName, tone }: LogoHorizontalProps) {
  const base = tone === 'onDark' ? `${styles.wrap} ${styles.onDark}` : styles.wrap
  const wrapClassName = className ? `${base} ${className}` : base
  const iconClassName = markClassName ? `${styles.mark} ${markClassName}` : styles.mark

  return (
    <span className={wrapClassName}>
      <LogoMark className={iconClassName} aria-hidden="true" />
      <span className={styles.name}>Inversiones PyP</span>
    </span>
  )
}
