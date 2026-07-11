import { SECTION_IDS } from '../../lib/sectionIds'
import { LogoMark } from '../brand/LogoMark'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './WhyChooseUs.module.css'

const HIGHLIGHTS = [
  'Más de cinco años de experiencia.',
  'Evaluación individual de cada solicitud.',
  'Atención directa por WhatsApp.',
  'Condiciones informadas antes de avanzar.',
]

export function WhyChooseUs() {
  return (
    <section id={SECTION_IDS.whyChooseUs} className={styles.section}>
      <Container className={styles.inner}>
        <div className={styles.visual}>
          <LogoMark className={styles.mark} />
        </div>
        <div className={styles.content}>
          <SectionHeading
            eyebrow="Por qué elegirnos"
            title="Financiación con atención directa y responsable"
            align="left"
            tone="onDark"
          />
          <p className={styles.paragraph}>
            Inversiones PyP acompaña desde hace más de cinco años a personas, trabajadores, emprendedores y comercios
            de Zona Oeste. Cada solicitud se analiza de forma individual, teniendo en cuenta la información
            proporcionada y la capacidad de pago de cada persona.
          </p>
          <p className={styles.paragraph}>
            Nuestro objetivo es ofrecer un proceso claro, mantener una comunicación directa y explicar las condiciones
            antes de avanzar. No trabajamos con aprobaciones automáticas ni con condiciones iguales para todos.
          </p>
          <ul className={styles.list}>
            {HIGHLIGHTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
