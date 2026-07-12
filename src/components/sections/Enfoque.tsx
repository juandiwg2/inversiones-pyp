import { SECTION_IDS } from '../../lib/sectionIds'
import { Container } from '../ui/Container'
import styles from './Enfoque.module.css'

export function Enfoque() {
  return (
    <section id={SECTION_IDS.enfoque} className={styles.section}>
      <Container className={styles.inner}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>Enfoque</p>
          <h2 className={styles.title}>Cada solicitud se analiza de forma individual</h2>
          <div className={styles.rule} />
        </div>
        <div className={styles.body}>
          <p className={styles.quote}>Cada caso se revisa según su propia situación.</p>
          <p className={styles.paragraph}>
            En Inversiones PyP revisamos cada caso según la información proporcionada y la capacidad de pago. No
            trabajamos con aprobaciones automáticas ni condiciones iguales para todos.
          </p>
        </div>
      </Container>
    </section>
  )
}
