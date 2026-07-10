import { LEGAL_TEXT } from '../config/legal'

export function PrivacyPolicyPage() {
  return (
    <main>
      <h1>Política de Privacidad</h1>
      <p>{LEGAL_TEXT.privacyPolicy.body}</p>
    </main>
  )
}
