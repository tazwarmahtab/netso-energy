create extension if not exists pgcrypto;

-- Private bill extraction drafts: parsed client bills pending explicit user confirmation.
create table if not exists public.bill_extraction_drafts (
  id uuid primary key default gen_random_uuid(),
  public_id text not null unique,
  assessment_session_id uuid references public.assessment_sessions(id) on delete set null,
  phone text,
  storage_path text,
  billing_period text,
  billing_demand_kva numeric,
  sanctioned_demand_kva numeric,
  monthly_consumption_kwh numeric,
  exported_energy_kwh numeric,
  settlement_balance_kwh numeric,
  net_metering_observed boolean not null default false,
  confirmed_by_user boolean not null default false,
  extraction_source text not null default 'manual' check (extraction_source in ('manual', 'ocr', 'api')),
  created_at timestamptz not null default now(),
  confirmed_at timestamptz
);

create index if not exists bill_extraction_drafts_session_idx on public.bill_extraction_drafts (assessment_session_id);
create index if not exists bill_extraction_drafts_phone_idx on public.bill_extraction_drafts (phone);

alter table public.bill_extraction_drafts enable row level security;

revoke all on table public.bill_extraction_drafts from anon;
revoke all on table public.bill_extraction_drafts from authenticated;
