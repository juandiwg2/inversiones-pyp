/**
 * Normalización básica de teléfonos argentinos a formato internacional
 * (+549...). No es un parser completo tipo libphonenumber (se evita sumar una
 * dependencia pesada para esto); cubre el caso común de números ingresados
 * con o sin 0/15 y con o sin código de país.
 */
export function normalizePhone(rawPhone: string): string {
  let digits = rawPhone.replace(/\D/g, '')

  if (digits.startsWith('54')) {
    digits = digits.slice(2)
  }
  digits = digits.replace(/^0+/, '')
  // El "15" de celular local (ej. 011-15-xxxx-xxxx) no aplica en formato internacional.
  digits = digits.replace(/^(\d{2,4})15/, '$1')

  return `+54${digits}`
}
