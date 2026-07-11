import { SECTION_IDS } from '../../lib/sectionIds'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { CheckCircleIcon, InfoIcon } from '../ui/icons'
import styles from './Requirements.module.css'

const REQUIREMENTS = [
  'Ser mayor de 18 años.',
  'Tener una actividad laboral o comercial.',
  'Contar con capacidad para afrontar los pagos.',
  'Proporcionar información correcta.',
  'Toda solicitud queda sujeta a revisión manual.',
]

export function Requirements() {
  return (
    <section id={SECTION_IDS.requirements} className={styles.section}>
      <Container>
        <SectionHeading eyebrow="Antes de solicitar" title="Requisitos" />
        <ul className={styles.list}>
          {REQUIREMENTS.map((item) => (
            <li key={item} className={styles.item}>
              <CheckCircleIcon className={styles.icon} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className={styles.note}>
          <InfoIcon className={styles.noteIcon} />
          <p>Cumplir estos puntos no garantiza la aceptación de la solicitud: cada caso queda sujeto a revisión manual.</p>
        </div>
      </Container>
    </section>
  )
}
