/**
 * Sanitización básica de texto libre antes de guardarlo: quita etiquetas HTML
 * y caracteres de control, y recorta espacios. No reemplaza la validación de
 * forma/longitud, que ya hace Zod.
 */
// oxlint-disable-next-line no-control-regex -- intencional: elimina caracteres de control
const CONTROL_CHARS_REGEX = new RegExp('[\\u0000-\\u001F\\u007F]', 'g')

export function sanitizeText(value: string): string {
  return value
    .replace(/<[^>]*>/g, '')
    .replace(CONTROL_CHARS_REGEX, '')
    .trim()
}
