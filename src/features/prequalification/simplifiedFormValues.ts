export interface SimplifiedRawValues {
  fullName: string
  birthDate: string
  requestedAmount: string
  jobOrActivity: string
  preferredModality: string
  acceptedConsent: boolean
}

export const INITIAL_SIMPLIFIED_VALUES: SimplifiedRawValues = {
  fullName: '',
  birthDate: '',
  requestedAmount: '',
  jobOrActivity: '',
  preferredModality: '',
  acceptedConsent: false,
}

export type SimplifiedFieldErrors = Partial<Record<keyof SimplifiedRawValues, string>>
