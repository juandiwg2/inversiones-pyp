import { SECTION_IDS } from '../../lib/sectionIds'
import { Container } from '../ui/Container'
import styles from './TrustSignals.module.css'

const SIGNALS = [
  'Más de 5 años de experiencia',
  'Atención directa',
  'Evaluación individual',
  'Condiciones informadas antes de avanzar',
]

export function TrustSignals() {
  return (
    <div id={SECTION_IDS.trustSignals} className={styles.section}>
      <Container className={styles.row}>
        {SIGNALS.map((item) => (
          <span key={item} className={styles.item}>
            <span className={styles.bullet} aria-hidden="true" />
            {item}
          </span>
        ))}
      </Container>
    </div>
  )
}
