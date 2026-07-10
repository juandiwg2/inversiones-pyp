import { LEGAL_TEXT } from '../config/legal'

export function TermsPage() {
  return (
    <main>
      <h1>Términos y Condiciones</h1>
      <p>{LEGAL_TEXT.termsAndConditions.body}</p>
    </main>
  )
}
