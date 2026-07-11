import type { PrequalificationSubmission } from '../../schemas/submission.schema'
import type { PrequalificationResult } from '../../types/domain.types'

export interface ValidationIssue {
  path: string
  message: string
}

export type PrequalifyClientResult =
  | { kind: 'success'; publicCode: string; result: PrequalificationResult; whatsappEnabled: boolean }
  | { kind: 'received' }
  | { kind: 'validation_error'; issues: ValidationIssue[] }
  | { kind: 'rate_limited' }
  | { kind: 'server_error' }

interface SuccessBody {
  status: 'ok'
  publicCode: string
  result: PrequalificationResult
  whatsappEnabled: boolean
}

interface ReceivedBody {
  status: 'received'
}

interface ValidationErrorBody {
  error: 'invalid_payload'
  issues: ValidationIssue[]
}

interface GenericErrorBody {
  error: 'method_not_allowed' | 'rate_limited' | 'submission_failed' | 'internal_error'
}

type ResponseBody = SuccessBody | ReceivedBody | ValidationErrorBody | GenericErrorBody

/** Único punto del cliente que habla con el servidor. Nunca toca Supabase directamente. */
export async function submitPrequalification(
  payload: PrequalificationSubmission,
): Promise<PrequalifyClientResult> {
  let response: Response
  try {
    response = await fetch('/api/prequalify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    return { kind: 'server_error' }
  }

  let body: ResponseBody
  try {
    body = (await response.json()) as ResponseBody
  } catch {
    return { kind: 'server_error' }
  }

  if (response.status === 429) {
    return { kind: 'rate_limited' }
  }

  if (response.status === 400 && 'error' in body && body.error === 'invalid_payload') {
    return { kind: 'validation_error', issues: body.issues }
  }

  if ('status' in body && body.status === 'ok') {
    return {
      kind: 'success',
      publicCode: body.publicCode,
      result: body.result,
      whatsappEnabled: body.whatsappEnabled,
    }
  }

  if ('status' in body && body.status === 'received') {
    return { kind: 'received' }
  }

  return { kind: 'server_error' }
}
