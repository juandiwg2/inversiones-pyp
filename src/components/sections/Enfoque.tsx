import { SECTION_IDS } from '../../lib/sectionIds'
import { Container } from '../ui/Container'
import styles from './Enfoque.module.css'

export function Enfoque() {
  return (
    <section id={SECTION_IDS.enfoque} className={styles.section}>
      <Container className={styles.inner}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>Enfoque</p>
          <h2 className={styles.title}>Nuestro enfoque</h2>
          <div className={styles.rule} />
        </div>
        <div className={styles.body}>
          <p className={styles.quote}>En Inversiones PyP analizamos cada solicitud de manera individual.</p>
          <p className={styles.paragraph}>
            Buscamos comprender la realidad de cada comercio antes de avanzar con cualquier propuesta. Nuestro
            objetivo es ofrecer un proceso claro, directo y sin vueltas innecesarias.
          </p>
        </div>
      </Container>
    </section>
  )
}
