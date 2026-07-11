import type { ReactNode } from 'react'
import { ChevronDownIcon } from './icons'
import styles from './AccordionItem.module.css'

interface AccordionItemProps {
  question: string
  children: ReactNode
  groupName?: string
  tone?: 'onDark'
}

export function AccordionItem({ question, children, groupName, tone }: AccordionItemProps) {
  const itemClassName = tone === 'onDark' ? `${styles.item} ${styles.onDark}` : styles.item

  return (
    <details className={itemClassName} name={groupName}>
      <summary className={styles.summary}>
        <span>{question}</span>
        <ChevronDownIcon className={styles.chevron} />
      </summary>
      <div className={styles.panel}>{children}</div>
    </details>
  )
}
