import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { SECTION_IDS } from '../../lib/sectionIds'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './HowItWorks.module.css'

const STEPS = [
  'Completás la solicitud.',
  'Se guarda la información.',
  'Continuás por WhatsApp.',
  'Revisamos el caso y te contactamos.',
]

/**
 * El recorrido se revela con IntersectionObserver a medida que cada paso entra
 * en viewport (rootMargin negativo = "cuando el paso cruza ~35% de la
 * pantalla"). `activeCount` solo crece: una vez revelado, un paso queda
 * marcado. Sin JS, todos los pasos y el texto siguen visibles en su estado
 * base (nada depende de JS para mostrarse, solo para animarse).
 */
export function HowItWorks() {
  const [activeCount, setActiveCount] = useState(0)
  const stepRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const index = Number((entry.target as HTMLElement).dataset.index)
          setActiveCount((prev) => Math.max(prev, index + 1))
        }
      },
      { rootMargin: '0px 0px -35% 0px', threshold: 0 },
    )

    for (const el of stepRefs.current) {
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id={SECTION_IDS.howItWorks} className={styles.section}>
      <Container>
        <SectionHeading eyebrow="Proceso" title="Cómo funciona" />
        <ol className={styles.timeline}>
          {STEPS.map((step, index) => {
            const isActive = index < activeCount
            const style = { '--step-progress': isActive ? 1 : 0 } as CSSProperties
            return (
              <li
                key={step}
                data-index={index}
                ref={(el) => {
                  stepRefs.current[index] = el
                }}
                className={isActive ? `${styles.step} ${styles.stepActive}` : styles.step}
                style={style}
              >
                <div className={styles.marker}>
                  <span className={styles.dot}>
                    <span className={styles.dotFill} />
                    <span className={styles.dotLabel}>{index + 1}</span>
                  </span>
                  {index < STEPS.length - 1 ? (
                    <span className={styles.line}>
                      <span className={styles.lineFill} />
                    </span>
                  ) : null}
                </div>
                <p className={styles.stepText}>{step}</p>
              </li>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}
