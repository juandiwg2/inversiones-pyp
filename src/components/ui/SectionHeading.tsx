import type { ReactNode } from 'react'
import styles from './SectionHeading.module.css'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: ReactNode
  align?: 'left' | 'center'
  tone?: 'default' | 'onDark'
}

export function SectionHeading({ eyebrow, title, description, align = 'center', tone = 'default' }: SectionHeadingProps) {
  const wrapperClass = [
    align === 'center' ? styles.headingCentered : styles.heading,
    tone === 'onDark' ? styles.onDark : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={wrapperClass}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h2 className={styles.title}>{title}</h2>
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  )
}
