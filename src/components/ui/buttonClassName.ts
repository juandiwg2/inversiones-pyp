import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'whatsapp' | 'ghost'

export function buildButtonClassName(
  variant: ButtonVariant,
  fullWidthOnMobile: boolean | undefined,
  className?: string,
) {
  return [styles.button, styles[variant], fullWidthOnMobile ? styles.fullWidthOnMobile : '', className]
    .filter(Boolean)
    .join(' ')
}
