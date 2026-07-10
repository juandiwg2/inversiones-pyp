import { randomInt } from 'node:crypto'

/** Sin caracteres ambiguos (0/O, 1/I) para que sea fácil de leer y dictar. */
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const CODE_LENGTH = 8

export function generatePublicCode(): string {
  let suffix = ''
  for (let i = 0; i < CODE_LENGTH; i++) {
    suffix += CODE_ALPHABET[randomInt(0, CODE_ALPHABET.length)]
  }
  return `PYP-${suffix}`
}
