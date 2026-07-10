-- Inversiones PyP — esquema inicial de solicitudes de precalificación.
-- Esta tabla NO debe ser accesible desde el frontend público. Toda lectura y
-- escritura se hace exclusivamente desde la función de servidor (api/prequalify)
-- usando la service_role key, que nunca se expone al navegador.

create extension if not exists pgcrypto;

create type public.prequalification_result as enum ('compatible', 'manual_review', 'not_compatible');

create type public.commercial_status as enum (
  'pending',
  'contacted',
  'in_progress',
  'approved',
  'rejected',
  'discarded'
);

create table public.prequalification_requests (
  id uuid primary key default gen_random_uuid(),

  -- Código público mostrado al solicitante (ej. en WhatsApp). No revela datos personales.
  public_code text not null unique,
  -- uuid generado en el cliente antes de enviar. Protege contra doble envío / doble clic.
  idempotency_key text not null unique,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Datos personales del solicitante.
  full_name text not null,
  birth_date date not null,
  locality text not null,
  phone text not null,
  email text,

  -- Situación laboral / financiera declarada.
  employment_type text not null,
  activity_type text not null,
  seniority_months integer not null check (seniority_months >= 0),
  monthly_income numeric(12, 2) not null check (monthly_income >= 0),
  income_proof_type text not null,
  requested_amount numeric(12, 2) not null check (requested_amount >= 0),
  preferred_modality text not null,
  funds_purpose text not null,
  observations text,

  -- Consentimientos obligatorios, cada uno con su fecha de aceptación.
  accepted_truthfulness boolean not null default false,
  accepted_truthfulness_at timestamptz,
  accepted_consent boolean not null default false,
  accepted_consent_at timestamptz,

  -- Atribución de marketing. Nunca debe contener datos personales.
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  landing_path text,

  -- Resultado automático de precalificación (calculado en el servidor a partir
  -- de las reglas de negocio centralizadas). Es distinto e independiente del
  -- estado comercial manual futuro.
  prequalification_result public.prequalification_result not null,
  prequalification_reasons jsonb not null default '[]'::jsonb,
  whatsapp_enabled boolean not null default false,

  -- Estado del proceso comercial manual (para el futuro panel administrativo).
  -- Empieza en 'pending' y es independiente del resultado automático.
  commercial_status public.commercial_status not null default 'pending',
  internal_notes text,

  -- Metadatos técnicos antiabuso. No se guarda la IP en texto plano.
  ip_hash text,
  user_agent text,

  constraint accepted_truthfulness_requires_timestamp check (
    (accepted_truthfulness = false) or (accepted_truthfulness_at is not null)
  ),
  constraint accepted_consent_requires_timestamp check (
    (accepted_consent = false) or (accepted_consent_at is not null)
  )
);

comment on table public.prequalification_requests is
  'Solicitudes de precalificación enviadas desde la landing. Insertadas y leídas únicamente por la función de servidor (service role). RLS habilitado sin políticas: acceso denegado por defecto para anon y authenticated.';
comment on column public.prequalification_requests.prequalification_result is
  'Resultado automático calculado en el servidor a partir de config/business-rules.ts. No confundir con commercial_status.';
comment on column public.prequalification_requests.commercial_status is
  'Estado del proceso comercial manual, gestionado a futuro desde un panel administrativo. Independiente del resultado automático.';
comment on column public.prequalification_requests.internal_notes is
  'Notas internas del equipo comercial (futuro panel administrativo). Nunca visible para el solicitante.';
comment on column public.prequalification_requests.ip_hash is
  'Hash SHA-256 (con sal de servidor) de la IP de origen. Se usa solo para control de abuso/rate limiting; la IP en texto plano no se almacena.';

create index prequalification_requests_created_at_idx on public.prequalification_requests (created_at desc);
create index prequalification_requests_phone_created_at_idx on public.prequalification_requests (phone, created_at desc);
create index prequalification_requests_ip_hash_created_at_idx on public.prequalification_requests (ip_hash, created_at desc);
create index prequalification_requests_commercial_status_idx on public.prequalification_requests (commercial_status);
create index prequalification_requests_result_idx on public.prequalification_requests (prequalification_result);

-- Mantiene updated_at sincronizado en cada UPDATE (por ejemplo, cuando el
-- futuro panel administrativo cambie commercial_status o internal_notes).
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger prequalification_requests_set_updated_at
before update on public.prequalification_requests
for each row
execute function public.set_updated_at();

-- RLS: la tabla queda cerrada por defecto. No se define ninguna política para
-- anon ni authenticated, por lo que ambos roles no pueden leer ni escribir.
-- La función de servidor usa la service_role key, que Supabase exceptúa de RLS.
alter table public.prequalification_requests enable row level security;
alter table public.prequalification_requests force row level security;
