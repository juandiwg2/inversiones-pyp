import { SECURITY_CONFIG } from '../../config/security'
import styles from './HoneypotField.module.css'

interface HoneypotFieldProps {
  value: string
  onChange: (value: string) => void
}

/**
 * Campo trampa antispam. Debe quedar totalmente invisible e inalcanzable para
 * personas (fuera del flujo visual, del tabulado y de lectores de pantalla),
 * pero seguir presente en el DOM para que los bots que autocompletan todos
 * los inputs lo rellenen. Nunca debe ocultarse con display:none: algunos bots
 * lo detectan y lo saltean.
 */
export function HoneypotField({ value, onChange }: HoneypotFieldProps) {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      <label htmlFor={SECURITY_CONFIG.honeypotFieldName}>Sitio web</label>
      <input
        id={SECURITY_CONFIG.honeypotFieldName}
        name={SECURITY_CONFIG.honeypotFieldName}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}
