import { SECTION_IDS } from '../../lib/sectionIds'
import { LogoMark } from '../brand/LogoMark'
import { LinkButton } from '../ui/Button'
import { Container } from '../ui/Container'
import { CheckCircleIcon } from '../ui/icons'
import styles from './Hero.module.css'

const HIGHLIGHTS = [
  'Más de 5 años de experiencia.',
  'Montos de $100.000 a $500.000.',
  'Atención en Zona Oeste.',
  'Evaluación manual.',
]

export function Hero() {
  return (
    <section className={styles.hero}>
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Financiación responsable</p>
          <h1 className={styles.title}>Financiación para personas y negocios</h1>
          <p className={styles.subtitle}>
            Completá una solicitud breve y continuá por WhatsApp para que evaluemos tu caso.
          </p>
          <ul className={styles.facts}>
            {HIGHLIGHTS.map((item) => (
              <li key={item} className={styles.factItem}>
                <CheckCircleIcon className={styles.factIcon} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className={styles.ctaBlock}>
            <LinkButton href={`#${SECTION_IDS.form}`} variant="primary" fullWidthOnMobile>
              Solicitar evaluación
            </LinkButton>
            <p className={styles.disclaimer}>Enviar una solicitud no implica aprobación.</p>
          </div>
        </div>
        <div className={styles.visual} aria-hidden="true">
          <LogoMark className={styles.mark} />
        </div>
      </Container>
    </section>
  )
}
