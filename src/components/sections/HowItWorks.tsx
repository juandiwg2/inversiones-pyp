import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { SECTION_IDS } from '../../lib/sectionIds'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './HowItWorks.module.css'

const STEPS = [
  'Completás la solicitud.',
  'Revisamos la información.',
  'Continuás por WhatsApp.',
  'Te contactamos para informarte si es posible avanzar.',
]

/**
 * La cadena visual completa (punto → línea → punto → línea...) se trata
 * como CELLS tramos iguales a lo largo de `progress` (0–1), así el primer
 * punto también arranca en 0 y se llena gradualmente en vez de encenderse
 * de golpe. cellIndex de cada punto i = 2*i; de cada línea i = 2*i + 1.
 */
const CELLS = STEPS.length * 2 - 1

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value))
}

/**
 * El progreso se recalcula en cada scroll a partir de la posición real del
 * timeline respecto del viewport (sin estado que solo crezca), así el
 * llenado avanza al bajar y retrocede al subir.
 */
export function HowItWorks() {
  const timelineRef = useRef<HTMLOListElement | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = timelineRef.current
    if (!el) return

    let frame = 0

    function update() {
      frame = 0
      const target = timelineRef.current
      if (!target) return
      const rect = target.getBoundingClientRect()
      const referenceY = window.innerHeight * 0.65
      const raw = rect.height > 0 ? (referenceY - rect.top) / rect.height : 0
      setProgress(clamp01(raw))
    }

    function onScrollOrResize() {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)

    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const globalUnits = progress * CELLS

  return (
    <section id={SECTION_IDS.howItWorks} className={styles.section}>
      <Container>
        <SectionHeading eyebrow="Proceso" title="Cómo funciona" tone="onDark" />
        <ol className={styles.timeline} ref={timelineRef}>
          {STEPS.map((step, index) => {
            const dotFill = clamp01(globalUnits - index * 2)
            const lineFill = index < STEPS.length - 1 ? clamp01(globalUnits - (index * 2 + 1)) : 0
            const style = { '--process-progress': dotFill } as CSSProperties
            return (
              <li key={step} className={styles.step} style={style}>
                <div className={styles.marker}>
                  <span className={styles.dot}>
                    <span className={styles.dotFill} />
                  </span>
                  {index < STEPS.length - 1 ? (
                    <span className={styles.line}>
                      <span className={styles.lineFill} style={{ '--process-progress': lineFill } as CSSProperties} />
                    </span>
                  ) : null}
                </div>
                <div className={styles.content}>
                  <span className={styles.stepLabel}>Paso {String(index + 1).padStart(2, '0')}</span>
                  <p className={styles.stepText}>{step}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}
