export interface SimplifiedRawValues {
  fullName: string
  birthDate: string
  monthlyIncome: string
  seniority: string
  requestedAmount: string
  locality: string
  preferredModality: string
  acceptedConsent: boolean
}

export const INITIAL_SIMPLIFIED_VALUES: SimplifiedRawValues = {
  fullName: '',
  birthDate: '',
  monthlyIncome: '',
  seniority: '',
  requestedAmount: '',
  locality: '',
  preferredModality: '',
  acceptedConsent: false,
}

export type SimplifiedFieldErrors = Partial<Record<keyof SimplifiedRawValues, string>>
