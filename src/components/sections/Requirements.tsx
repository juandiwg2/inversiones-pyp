import { BUSINESS_RULES } from '../../config/business-rules'
import { SECTION_IDS } from '../../lib/sectionIds'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { CheckCircleIcon } from '../ui/icons'
import styles from './Requirements.module.css'

const REQUIREMENTS = [
  'Ser mayor de 18 años.',
  'Tener actividad comercial.',
  'Contar con ingresos demostrables.',
  'Contar con una cuenta bancaria o billetera virtual para transferencias.',
]

export function Requirements() {
  return (
    <section id={SECTION_IDS.requirements} className={styles.section}>
      <Container className={styles.inner}>
        <div className={styles.left}>
          <SectionHeading eyebrow="Antes de solicitar" title="Requisitos" align="left" tone="onDark" />
          <div className={styles.amountsRule} />
          <p className={styles.amounts}>
            Montos disponibles: entre ${BUSINESS_RULES.minRequestedAmount.toLocaleString('es-AR')} y $
            {BUSINESS_RULES.maxRequestedAmount.toLocaleString('es-AR')}.
          </p>
        </div>
        <ul className={styles.list}>
          {REQUIREMENTS.map((item) => (
            <li key={item} className={styles.item}>
              <CheckCircleIcon className={styles.icon} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
