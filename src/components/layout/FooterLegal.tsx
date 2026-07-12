import styles from './FooterLegal.module.css'

export function FooterLegal() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <p className={styles.copy}>© {year} Inversiones PyP. Todos los derechos reservados.</p>
      <p className={styles.poweredBy}>
        Powered by
        <a
          href="https://www.instagram.com/jota.logic?igsh=bDc1Z2UzdzJ5aHFs"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir Instagram de Jota Logic"
          className={styles.poweredByLink}
        >
          <img src="/brand/jota-logic.png" alt="Jota Logic" className={styles.poweredByLogo} />
        </a>
      </p>
    </footer>
  )
}
