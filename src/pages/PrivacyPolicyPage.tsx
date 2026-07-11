import { Container } from '../components/ui/Container'
import { LEGAL_TEXT } from '../config/legal'
import styles from './LegalPage.module.css'

export function PrivacyPolicyPage() {
  return (
    <Container as="article" className={styles.page}>
      <h1 className={styles.title}>Política de Privacidad</h1>
      {LEGAL_TEXT.privacyPolicy.updatedAt ? (
        <p className={styles.updatedAt}>Última actualización: {LEGAL_TEXT.privacyPolicy.updatedAt}</p>
      ) : (
        <p className={styles.pendingNotice}>
          Contenido base pendiente de revisión legal. Este texto es un placeholder y debe reemplazarse antes de
          publicar la landing en producción.
        </p>
      )}
      <p className={styles.body}>{LEGAL_TEXT.privacyPolicy.body}</p>
    </Container>
  )
}
