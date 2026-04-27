create extension if not exists pgcrypto;

create table if not exists public.lead_submissions (
  id uuid primary key default gen_random_uuid(),
  source text not null check (source in ('feasibility', 'calculator')),
  name text not null,
  phone text not null,
  address text,
  building_type text,
  roof_size text,
  monthly_bill_range text,
  calculator_bill_estimate numeric,
  calculator_area_estimate numeric,
  model_output jsonb,
  status text not null default 'new',
  whatsapp_status text not null default 'pending',
  whatsapp_notified_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.lead_submissions enable row level security;

revoke all on table public.lead_submissions from anon;
revoke all on table public.lead_submissions from authenticated;
