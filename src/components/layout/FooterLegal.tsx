import { Link } from 'react-router-dom'
import { LogoHorizontal } from '../brand/LogoHorizontal'
import { LEGAL_TEXT } from '../../config/legal'
import { Container } from '../ui/Container'
import styles from './FooterLegal.module.css'

export function FooterLegal() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <div>
          <LogoHorizontal tone="onDark" />
          <p className={styles.disclaimer}>{LEGAL_TEXT.legalNotice}</p>
        </div>
        <nav className={styles.links} aria-label="Legal">
          <Link to="/politica-de-privacidad">Política de Privacidad</Link>
        </nav>
        <p className={styles.copy}>© {year} Inversiones PyP</p>
      </Container>
    </footer>
  )
}
