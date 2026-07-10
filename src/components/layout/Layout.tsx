import type { ReactNode } from 'react'
import { FooterLegal } from './FooterLegal'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      {children}
      <FooterLegal />
    </div>
  )
}
