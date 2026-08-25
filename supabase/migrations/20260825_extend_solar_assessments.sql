alter table public.assessment_sessions
  add column if not exists solar_assessment_version text,
  add column if not exists solar_confidence text,
  add column if not exists solar_opportunity_band text,
  add column if not exists solar_opportunity_score integer;

alter table public.assessment_sessions
  add constraint assessment_sessions_solar_confidence_check
  check (solar_confidence is null or solar_confidence in ('high', 'medium', 'low'));

alter table public.assessment_sessions
  add constraint assessment_sessions_solar_opportunity_score_check
  check (solar_opportunity_score is null or (solar_opportunity_score >= 0 and solar_opportunity_score <= 100));

create index if not exists assessment_sessions_solar_opportunity_idx on public.assessment_sessions (solar_opportunity_band, solar_opportunity_score);
