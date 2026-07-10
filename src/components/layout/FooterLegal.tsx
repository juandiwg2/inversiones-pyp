import { Link } from 'react-router-dom'
import { BRAND } from '../../config/brand'

export function FooterLegal() {
  const year = new Date().getFullYear()

  return (
    <footer>
      <p>
        © {year} {BRAND.name}
      </p>
      <nav>
        <Link to="/politica-de-privacidad">Política de Privacidad</Link>
        {' · '}
        <Link to="/terminos-y-condiciones">Términos y Condiciones</Link>
      </nav>
    </footer>
  )
}
