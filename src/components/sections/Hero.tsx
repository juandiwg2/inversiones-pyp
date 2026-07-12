import { SECTION_IDS } from '../../lib/sectionIds'
import { LogoMark } from '../brand/LogoMark'
import { LinkButton } from '../ui/Button'
import { Container } from '../ui/Container'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero}>
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Financiación responsable</p>
          <h1 className={styles.title}>
            Financiación para
            <br />
            comerciantes y <em className={styles.accent}>negocios</em>
          </h1>
          <p className={styles.subtitle}>
            Completá una solicitud breve y continuá por WhatsApp para que evaluemos tu actividad comercial.
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
          <div className={styles.visualPanel}>
            <LogoMark className={styles.mark} />
          </div>
          <p className={styles.visualCaption}>Atención en Zona Oeste</p>
        </div>
      </Container>
    </section>
  )
}
