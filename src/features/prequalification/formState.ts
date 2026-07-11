import type { PrequalificationResult } from '../../types/domain.types'

export type SubmissionState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; result: PrequalificationResult; publicCode: string; whatsappEnabled: boolean }
  | { status: 'received' }
  | { status: 'rate_limited' }
  | { status: 'error'; message: string }

export type SubmissionEvent =
  | { type: 'SUBMIT' }
  | { type: 'SUCCESS'; result: PrequalificationResult; publicCode: string; whatsappEnabled: boolean }
  | { type: 'RECEIVED' }
  | { type: 'RATE_LIMITED' }
  | { type: 'ERROR'; message: string }
  | { type: 'RESET' }

export const INITIAL_SUBMISSION_STATE: SubmissionState = { status: 'idle' }

/**
 * Máquina de estados pura del envío del formulario. `SUBMIT` es un no-op si ya
 * está `submitting`: es la protección contra doble envío a nivel de estado,
 * independiente de que el botón también quede deshabilitado en la UI.
 */
export function submissionReducer(state: SubmissionState, event: SubmissionEvent): SubmissionState {
  switch (event.type) {
    case 'SUBMIT':
      return state.status === 'submitting' ? state : { status: 'submitting' }
    case 'SUCCESS':
      return {
        status: 'success',
        result: event.result,
        publicCode: event.publicCode,
        whatsappEnabled: event.whatsappEnabled,
      }
    case 'RECEIVED':
      return { status: 'received' }
    case 'RATE_LIMITED':
      return { status: 'rate_limited' }
    case 'ERROR':
      return { status: 'error', message: event.message }
    case 'RESET':
      return { status: 'idle' }
  }
}
