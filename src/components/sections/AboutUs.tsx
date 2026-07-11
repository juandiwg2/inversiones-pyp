import { SECTION_IDS } from '../../lib/sectionIds'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './AboutUs.module.css'

export function AboutUs() {
  return (
    <section id={SECTION_IDS.aboutUs} className={styles.section}>
      <Container>
        <SectionHeading eyebrow="Sobre Inversiones PyP" title="Quiénes somos" tone="onDark" />
        <div className={styles.body}>
          <p>
            Inversiones PyP es una empresa de financiación orientada a personas, trabajadores, emprendedores y
            negocios de Zona Oeste del Gran Buenos Aires.
          </p>
          <p>
            Desde hace más de cinco años, trabajamos analizando cada caso de manera personalizada y manteniendo una
            comunicación directa durante todo el proceso.
          </p>
          <p>
            Buscamos que cada persona conozca las condiciones y los pasos necesarios antes de tomar una decisión.
          </p>
        </div>
      </Container>
    </section>
  )
}
