import { createHash } from 'node:crypto'
import type { VercelRequest } from '@vercel/node'

/** No guardamos la IP en texto plano: solo un hash con sal de servidor. */
export function hashIp(ip: string, salt: string): string {
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex')
}

export function getClientIp(req: VercelRequest): string {
  const forwardedFor = req.headers['x-forwarded-for']
  const forwardedValue = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor
  if (forwardedValue && forwardedValue.length > 0) {
    return forwardedValue.split(',')[0]?.trim() ?? 'unknown'
  }
  return req.socket?.remoteAddress ?? 'unknown'
}
