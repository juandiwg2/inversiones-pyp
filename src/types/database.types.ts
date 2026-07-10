/**
 * Tipos manuales que reflejan el esquema de Supabase definido en
 * supabase/migrations/20260710120000_init_schema.sql. Si el esquema cambia,
 * actualizar este archivo en el mismo commit que la migración.
 */
export type PrequalificationResult = 'compatible' | 'manual_review' | 'not_compatible'

export type CommercialStatus =
  | 'pending'
  | 'contacted'
  | 'in_progress'
  | 'approved'
  | 'rejected'
  | 'discarded'

// Alias de tipo (no interface): postgrest-js necesita un object type literal
// para poder inferir correctamente el resultado de `.select(...)`/`.maybeSingle()`;
// con una interface, esa inferencia colapsa silenciosamente a `never`.
export type PrequalificationRequestRow = {
  id: string
  public_code: string
  idempotency_key: string
  created_at: string
  updated_at: string

  full_name: string
  birth_date: string
  locality: string
  phone: string
  email: string | null

  employment_type: string
  activity_type: string
  seniority_months: number
  monthly_income: number
  income_proof_type: string
  requested_amount: number
  preferred_modality: string
  funds_purpose: string
  observations: string | null

  accepted_truthfulness: boolean
  accepted_truthfulness_at: string | null
  accepted_consent: boolean
  accepted_consent_at: string | null

  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_term: string | null
  utm_content: string | null
  landing_path: string | null

  prequalification_result: PrequalificationResult
  prequalification_reasons: string[]
  whatsapp_enabled: boolean

  commercial_status: CommercialStatus
  internal_notes: string | null

  ip_hash: string | null
  user_agent: string | null
}

export type PrequalificationRequestInsert = Omit<
  PrequalificationRequestRow,
  'id' | 'created_at' | 'updated_at' | 'commercial_status' | 'internal_notes'
> &
  Partial<
    Pick<
      PrequalificationRequestRow,
      'id' | 'created_at' | 'updated_at' | 'commercial_status' | 'internal_notes'
    >
  >

export type PrequalificationRequestUpdate = Partial<PrequalificationRequestRow>

export interface Database {
  public: {
    Tables: {
      prequalification_requests: {
        Row: PrequalificationRequestRow
        Insert: PrequalificationRequestInsert
        Update: PrequalificationRequestUpdate
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
  }
}
