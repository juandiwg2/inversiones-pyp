import { SECTION_IDS } from '../../lib/sectionIds'
import { Container } from '../ui/Container'
import { ClipboardIcon, InfoIcon, MessageIcon } from '../ui/icons'
import styles from './TrustSignals.module.css'

const SIGNALS = [
  {
    icon: ClipboardIcon,
    title: 'Más de 5 años de experiencia.',
    text: 'Acompañamos a personas y negocios de Zona Oeste.',
  },
  {
    icon: MessageIcon,
    title: 'Atención directa.',
    text: 'Continuás la conversación por WhatsApp.',
  },
  {
    icon: InfoIcon,
    title: 'Condiciones informadas antes de avanzar.',
    text: 'Sin sorpresas ni letra chica.',
  },
]

export function TrustSignals() {
  return (
    <section id={SECTION_IDS.trustSignals} className={styles.section}>
      <Container className={styles.grid}>
        {SIGNALS.map((signal) => (
          <div key={signal.title} className={styles.item}>
            <signal.icon className={styles.icon} />
            <p className={styles.itemTitle}>{signal.title}</p>
            <p className={styles.itemText}>{signal.text}</p>
          </div>
        ))}
      </Container>
    </section>
  )
}
