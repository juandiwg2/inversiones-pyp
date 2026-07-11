import type { ReactNode } from 'react'
import { FooterLegal } from './FooterLegal'
import { Header } from './Header'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div id="top">
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <FooterLegal />
    </div>
  )
}
