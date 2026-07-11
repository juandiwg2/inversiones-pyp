import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { buildButtonClassName, type ButtonVariant } from './buttonClassName'

export type { ButtonVariant }

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  fullWidthOnMobile?: boolean
  icon?: ReactNode
  children: ReactNode
}

export function Button({
  variant = 'primary',
  fullWidthOnMobile,
  icon,
  children,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={buildButtonClassName(variant, fullWidthOnMobile, className)} {...rest}>
      {icon}
      <span>{children}</span>
    </button>
  )
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant
  fullWidthOnMobile?: boolean
  icon?: ReactNode
  children: ReactNode
}

export function LinkButton({
  variant = 'primary',
  fullWidthOnMobile,
  icon,
  children,
  className,
  ...rest
}: LinkButtonProps) {
  return (
    <a className={buildButtonClassName(variant, fullWidthOnMobile, className)} {...rest}>
      {icon}
      <span>{children}</span>
    </a>
  )
}
