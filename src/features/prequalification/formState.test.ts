import { describe, expect, it } from 'vitest'
import { INITIAL_SUBMISSION_STATE, submissionReducer } from './formState'

describe('submissionReducer', () => {
  it('starts idle', () => {
    expect(INITIAL_SUBMISSION_STATE).toEqual({ status: 'idle' })
  })

  it('moves from idle to submitting on SUBMIT', () => {
    const next = submissionReducer({ status: 'idle' }, { type: 'SUBMIT' })
    expect(next).toEqual({ status: 'submitting' })
  })

  it('ignores a second SUBMIT while already submitting (double-submit guard)', () => {
    const submitting = submissionReducer({ status: 'idle' }, { type: 'SUBMIT' })
    const next = submissionReducer(submitting, { type: 'SUBMIT' })
    expect(next).toBe(submitting)
  })

  it('moves to success with the classification result on SUCCESS', () => {
    const next = submissionReducer(
      { status: 'submitting' },
      { type: 'SUCCESS', result: 'compatible', publicCode: 'PYP-ABC123', whatsappEnabled: true },
    )
    expect(next).toEqual({
      status: 'success',
      result: 'compatible',
      publicCode: 'PYP-ABC123',
      whatsappEnabled: true,
    })
  })

  it('moves to rate_limited on RATE_LIMITED', () => {
    expect(submissionReducer({ status: 'submitting' }, { type: 'RATE_LIMITED' })).toEqual({
      status: 'rate_limited',
    })
  })

  it('moves to error with a message on ERROR, without losing to a terminal state', () => {
    const next = submissionReducer({ status: 'submitting' }, { type: 'ERROR', message: 'algo falló' })
    expect(next).toEqual({ status: 'error', message: 'algo falló' })
  })

  it('moves to received on RECEIVED (honeypot silent-accept path)', () => {
    expect(submissionReducer({ status: 'submitting' }, { type: 'RECEIVED' })).toEqual({ status: 'received' })
  })

  it('RESET returns to idle from any state', () => {
    const fromError = submissionReducer({ status: 'error', message: 'x' }, { type: 'RESET' })
    expect(fromError).toEqual({ status: 'idle' })
  })
})
