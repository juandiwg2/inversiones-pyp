import { Link } from 'react-router-dom'
import { buildButtonClassName } from '../components/ui/buttonClassName'
import { Container } from '../components/ui/Container'
import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  return (
    <Container as="section" className={styles.page}>
      <h1 className={styles.title}>Página no encontrada</h1>
      <p className={styles.body}>La página que buscás no existe o fue movida.</p>
      <Link to="/" className={buildButtonClassName('primary', false)}>
        Volver al inicio
      </Link>
    </Container>
  )
}
