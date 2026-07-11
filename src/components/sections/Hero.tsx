import { SECTION_IDS } from '../../lib/sectionIds'
import { LogoMark } from '../brand/LogoMark'
import { LinkButton } from '../ui/Button'
import { Container } from '../ui/Container'
import { CheckCircleIcon } from '../ui/icons'
import styles from './Hero.module.css'

const KEY_FACTS = [
  'Más de cinco años de experiencia.',
  'Evaluación personalizada.',
  'Atención directa.',
  'Condiciones informadas antes de avanzar.',
]

export function Hero() {
  return (
    <section className={styles.hero}>
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Financiación responsable</p>
          <h1 className={styles.title}>Soluciones de financiación evaluadas de forma personalizada</h1>
          <p className={styles.subtitle}>
            Evaluamos cada solicitud de manera individual para ofrecer una atención clara, directa y adaptada a cada
            situación.
          </p>
          <ul className={styles.facts}>
            {KEY_FACTS.map((fact) => (
              <li key={fact} className={styles.factItem}>
                <CheckCircleIcon className={styles.factIcon} />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
          <div className={styles.ctaBlock}>
            <LinkButton href={`#${SECTION_IDS.form}`} variant="primary" fullWidthOnMobile>
              Solicitar evaluación
            </LinkButton>
            <p className={styles.disclaimer}>
              Enviar una solicitud no implica aprobación ni genera ningún compromiso.
            </p>
          </div>
        </div>
        <aside className={styles.sidebar} aria-hidden="true">
          <LogoMark className={styles.sidebarMark} />
          <p className={styles.sidebarCaption}>Cada caso se analiza de forma individual.</p>
        </aside>
      </Container>
    </section>
  )
}
