import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main>
      <h1>Página no encontrada</h1>
      <p>La página que buscás no existe o fue movida.</p>
      <Link to="/">Volver al inicio</Link>
    </main>
  )
}
