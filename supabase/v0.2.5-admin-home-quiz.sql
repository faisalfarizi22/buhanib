-- v0.2.5 - Home quiz and assossiate admin extensions

create table if not exists public.home_quiz_results (
  id uuid primary key default gen_random_uuid(),
  answers jsonb not null default '[]'::jsonb,
  score integer not null,
  max_score integer not null default 50,
  page_path text not null default 'home:pain-point',
  user_agent text,
  created_at timestamptz not null default now()
);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'associate-documents',
  'associate-documents',
  false,
  10485760,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/rtf',
    'text/plain'
  ]
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

alter table public.coaches
  add column if not exists cv_url text,
  add column if not exists linkedin_url text,
  add column if not exists linkedin_summary text;

alter table public.inquiries
  add column if not exists follow_up_level integer not null default 0,
  add column if not exists follow_up_last_sent_at timestamptz,
  add column if not exists follow_up_last_email_id text,
  add column if not exists follow_up_paused boolean not null default false,
  add column if not exists follow_up_stop_reason text,
  add column if not exists follow_up_history jsonb not null default '[]'::jsonb;

alter table public.assessments
  add column if not exists result_follow_up_level integer not null default 0,
  add column if not exists result_follow_up_sent_at timestamptz,
  add column if not exists result_follow_up_email_id text,
  add column if not exists proposal_follow_up_level integer not null default 0,
  add column if not exists proposal_follow_up_sent_at timestamptz,
  add column if not exists proposal_follow_up_email_id text,
  add column if not exists follow_up_paused boolean not null default false,
  add column if not exists follow_up_stop_reason text,
  add column if not exists follow_up_history jsonb not null default '[]'::jsonb;

create table if not exists public.follow_up_events (
  id uuid primary key default gen_random_uuid(),
  target_type text not null check (target_type in ('inquiry', 'assessment')),
  target_id uuid not null,
  channel text not null default 'inquiry',
  level integer not null check (level in (1, 2, 3)),
  status text not null,
  email_id text,
  actor text,
  sent_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists home_quiz_results_created_at_idx
  on public.home_quiz_results (created_at desc);

create index if not exists coaches_category_idx
  on public.coaches (category);

create index if not exists inquiries_follow_up_due_idx
  on public.inquiries (follow_up_level, follow_up_last_sent_at, created_at);

create index if not exists assessments_result_follow_up_due_idx
  on public.assessments (result_follow_up_level, result_follow_up_sent_at, result_email_sent_at);

create index if not exists assessments_proposal_follow_up_due_idx
  on public.assessments (proposal_follow_up_level, proposal_follow_up_sent_at, proposal_sent_at);

create index if not exists follow_up_events_target_idx
  on public.follow_up_events (target_type, target_id, sent_at desc);
