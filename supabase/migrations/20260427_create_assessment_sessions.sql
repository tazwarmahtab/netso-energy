create extension if not exists pgcrypto;

create table if not exists public.assessment_sessions (
  id uuid primary key default gen_random_uuid(),
  entry_point text not null check (entry_point in ('web_feasibility', 'calculator_handoff', 'whatsapp')),
  preferred_language text not null default 'en' check (preferred_language in ('en', 'bn')),
  route_source text,
  qualification_status text not null check (qualification_status in ('started', 'in_progress', 'awaiting_evidence', 'auto_qualified', 'needs_manual_review', 'not_qualified', 'inspection_pending', 'inspection_confirmed', 'closed')),
  inspection_review_state text not null check (inspection_review_state in ('not_requested', 'manual_review', 'inspection_pending', 'inspection_confirmed', 'declined', 'closed')),
  qualification_score integer check (qualification_score >= 0 and qualification_score <= 100),
  human_review_outcome text not null default 'pending' check (human_review_outcome in ('pending', 'confirmed', 'declined', 'closed')),
  contact_name text,
  phone text not null,
  preferred_channel text not null default 'whatsapp' check (preferred_channel in ('whatsapp', 'phone')),
  address text,
  answers jsonb not null default '{}'::jsonb,
  calculator_context jsonb,
  source_summary jsonb not null default '{}'::jsonb,
  last_whatsapp_message_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists assessment_sessions_phone_idx on public.assessment_sessions (phone);
create index if not exists assessment_sessions_entry_point_idx on public.assessment_sessions (entry_point);
create index if not exists assessment_sessions_qualification_status_idx on public.assessment_sessions (qualification_status);
create index if not exists assessment_sessions_route_source_idx on public.assessment_sessions (route_source);

create table if not exists public.assessment_evidence (
  id uuid primary key default gen_random_uuid(),
  assessment_session_id uuid not null references public.assessment_sessions(id) on delete cascade,
  evidence_kind text not null check (evidence_kind in ('roof_photo', 'electric_bill', 'voice_note', 'location_pin', 'document', 'other')),
  capture_channel text not null check (capture_channel in ('web_form', 'calculator', 'whatsapp')),
  review_status text not null default 'pending_review' check (review_status in ('pending_review', 'accepted', 'rejected')),
  file_url text,
  storage_path text,
  note text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists assessment_evidence_session_idx on public.assessment_evidence (assessment_session_id);

create table if not exists public.whatsapp_intake_events (
  id uuid primary key default gen_random_uuid(),
  assessment_session_id uuid references public.assessment_sessions(id) on delete set null,
  phone text not null,
  direction text not null check (direction in ('inbound', 'outbound', 'status')),
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  received_at timestamptz not null default now(),
  processed_at timestamptz
);

create index if not exists whatsapp_intake_events_phone_idx on public.whatsapp_intake_events (phone);
create index if not exists whatsapp_intake_events_session_idx on public.whatsapp_intake_events (assessment_session_id);

alter table public.assessment_sessions enable row level security;
alter table public.assessment_evidence enable row level security;
alter table public.whatsapp_intake_events enable row level security;

revoke all on table public.assessment_sessions from anon;
revoke all on table public.assessment_sessions from authenticated;
revoke all on table public.assessment_evidence from anon;
revoke all on table public.assessment_evidence from authenticated;
revoke all on table public.whatsapp_intake_events from anon;
revoke all on table public.whatsapp_intake_events from authenticated;
