import { LogoHorizontal } from '../brand/LogoHorizontal'
import { SECTION_IDS } from '../../lib/sectionIds'
import { LinkButton } from '../ui/Button'
import { Container } from '../ui/Container'
import styles from './Header.module.css'

const NAV_LINKS = [
  { href: `#${SECTION_IDS.howItWorks}`, label: 'Cómo funciona' },
  { href: `#${SECTION_IDS.requirements}`, label: 'Requisitos' },
  { href: `#${SECTION_IDS.faq}`, label: 'Preguntas frecuentes' },
]

export function Header() {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <a href="#top" className={styles.brandLink} aria-label="Inversiones PyP, ir al inicio">
          <LogoHorizontal />
        </a>
        <nav className={styles.nav} aria-label="Secciones de la página">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>
        <LinkButton href={`#${SECTION_IDS.form}`} variant="primary" className={styles.cta}>
          Solicitar evaluación
        </LinkButton>
      </Container>
    </header>
  )
}
