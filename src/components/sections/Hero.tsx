import { SECTION_IDS } from '../../lib/sectionIds'
import { LogoMark } from '../brand/LogoMark'
import { LinkButton } from '../ui/Button'
import { Container } from '../ui/Container'
import styles from './Hero.module.css'

const TRUST_ITEMS = [
  'Más de 5 años de experiencia.',
  'Atención personalizada.',
  'Respuesta por WhatsApp.',
  'Transferencias bancarias.',
]

export function Hero() {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.top}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Financiación para comercios</p>
            <h1 className={styles.title}>Capital para impulsar tu actividad comercial</h1>
            <p className={styles.subtitle}>
              Evaluamos cada caso de forma individual para comerciantes, emprendedores y negocios de Zona Oeste.
            </p>
            <div className={styles.ctaRow}>
              <LinkButton href={`#${SECTION_IDS.form}`} variant="primary">
                Solicitar evaluación
                <span className={styles.ctaArrow} aria-hidden="true">
                  →
                </span>
              </LinkButton>
            </div>
            <p className={styles.disclaimer}>Enviar una solicitud no implica aprobación.</p>
          </div>

          <div className={styles.visual} aria-hidden="true">
            <span className={styles.visualLine} />
            <p className={styles.visualText}>Evaluación individual para comercios y negocios.</p>
            <LogoMark className={styles.mark} />
          </div>
        </div>

        <div className={styles.trustBand}>
          {TRUST_ITEMS.map((item) => (
            <div key={item} className={styles.trustItem}>
              <span className={styles.trustMark} aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
