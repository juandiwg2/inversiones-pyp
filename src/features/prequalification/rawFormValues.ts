export interface RawFormValues {
  fullName: string
  birthDate: string
  locality: string
  phone: string
  email: string
  employmentType: string
  activityType: string
  seniorityMonths: string
  monthlyIncome: string
  incomeProofType: string
  requestedAmount: string
  preferredModality: string
  fundsPurpose: string
  observations: string
  acceptedTruthfulness: boolean
  acceptedConsent: boolean
}

export const INITIAL_RAW_FORM_VALUES: RawFormValues = {
  fullName: '',
  birthDate: '',
  locality: '',
  phone: '',
  email: '',
  employmentType: '',
  activityType: '',
  seniorityMonths: '',
  monthlyIncome: '',
  incomeProofType: '',
  requestedAmount: '',
  preferredModality: '',
  fundsPurpose: '',
  observations: '',
  acceptedTruthfulness: false,
  acceptedConsent: false,
}

export type FieldErrors = Partial<Record<keyof RawFormValues, string>>
