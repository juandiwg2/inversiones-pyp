import { useRef } from 'react'

/**
 * Genera una clave de idempotencia una única vez por instancia del formulario
 * y la mantiene estable entre reintentos (mismo error -> mismo envío lógico).
 * Solo se reemplaza llamando a `regenerate()`, que se usa al confirmar un
 * envío exitoso para que un futuro nuevo formulario no reutilice la clave.
 */
export function useIdempotencyKey(): { idempotencyKey: string; regenerate: () => string } {
  const ref = useRef(crypto.randomUUID())

  function regenerate(): string {
    ref.current = crypto.randomUUID()
    return ref.current
  }

  return { idempotencyKey: ref.current, regenerate }
}
