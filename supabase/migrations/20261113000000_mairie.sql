-- =========================================================
-- Portail de la Commune de Bangangté : schéma, règles d'accès (RLS) et stockage
-- À exécuter une fois dans Supabase : SQL Editor > New query > coller > Run
-- (ou « supabase db push » avec la CLI).
-- =========================================================

create extension if not exists "pgcrypto";

-- ---------- Profils et rôles ----------
-- admin : tout, y compris les comptes et les réglages
-- editor : publie actualités, communiqués, agenda, projets, médias, contenus de la mairie
-- contributor : prépare des brouillons, publiés ensuite par un éditeur
-- none : compte sans droits (par défaut, tant qu'un administrateur n'a pas attribué de rôle)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'none' check (role in ('admin', 'editor', 'contributor', 'none')),
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'full_name', null))
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.my_role() returns text
language sql stable security definer set search_path = public as $$
  select coalesce((select role from public.profiles where id = auth.uid()), 'none');
$$;

create or replace function public.is_admin() returns boolean language sql stable as $$ select public.my_role() = 'admin' $$;
create or replace function public.is_editor() returns boolean language sql stable as $$ select public.my_role() in ('admin', 'editor') $$;
create or replace function public.is_staff() returns boolean language sql stable as $$ select public.my_role() in ('admin', 'editor', 'contributor') $$;

-- Mise à jour automatique de updated_at
create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

-- ---------- Contenus ----------
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_fr text not null,
  title_en text,
  excerpt_fr text,
  excerpt_en text,
  body_fr text not null default '',
  body_en text,
  cover_url text,
  gallery jsonb not null default '[]'::jsonb,
  category text not null default 'vie_communale',
  status text not null default 'draft' check (status in ('draft', 'published')),
  featured boolean not null default false,
  published_at timestamptz not null default now(),
  source_url text,
  author_id uuid references auth.users (id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists posts_pub_idx on public.posts (status, published_at desc);

create table if not exists public.communiques (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  ref text,
  kind text not null default 'communique' check (kind in ('communique', 'avis', 'appel', 'marche', 'alerte', 'deliberation')),
  title_fr text not null,
  title_en text,
  body_fr text not null default '',
  body_en text,
  pdf_url text,
  urgent boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz not null default now(),
  expires_at timestamptz,
  author_id uuid references auth.users (id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_fr text not null,
  title_en text,
  description_fr text not null default '',
  description_en text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  date_label_fr text,
  date_label_en text,
  recurring boolean not null default false,
  location_fr text,
  location_en text,
  category text not null default 'institutionnel',
  organizer text not null default 'mairie' check (organizer in ('mairie', 'partenaire')),
  cover_url text,
  link text,
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published')),
  author_id uuid references auth.users (id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.people (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  role_fr text not null,
  role_en text,
  body text not null check (body in ('executif', 'conseil', 'administration')),
  rank int not null default 100,
  photo_url text,
  bio_fr text,
  bio_en text,
  unit_id uuid,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.units (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_fr text not null,
  name_en text,
  description_fr text,
  description_en text,
  parent_id uuid references public.units (id) on delete set null,
  head_id uuid references public.people (id) on delete set null,
  icon text not null default 'landmark',
  rank int not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.people drop constraint if exists people_unit_fk;
alter table public.people add constraint people_unit_fk foreign key (unit_id) references public.units (id) on delete set null;

create table if not exists public.commissions (
  id uuid primary key default gen_random_uuid(),
  name_fr text not null unique,
  name_en text,
  chair_id uuid references public.people (id) on delete set null,
  description_fr text,
  description_en text,
  rank int not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.procedures (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  theme text not null check (theme in ('etat_civil', 'urbanisme', 'commerce', 'hygiene', 'social', 'jeunesse')),
  title_fr text not null,
  title_en text,
  summary_fr text not null default '',
  summary_en text,
  documents_fr text[] not null default '{}',
  documents_en text[],
  fees_fr text,
  fees_en text,
  delay_fr text,
  delay_en text,
  where_fr text,
  where_en text,
  unit_id uuid references public.units (id) on delete set null,
  form_url text,
  rank int not null default 100,
  validated boolean not null default false,
  status text not null default 'published' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_fr text not null,
  title_en text,
  summary_fr text not null default '',
  summary_en text,
  body_fr text,
  body_en text,
  location text,
  funding text,
  budget text,
  progress text not null default 'planned' check (progress in ('planned', 'ongoing', 'done')),
  percent int check (percent between 0 and 100),
  cover_url text,
  gallery jsonb not null default '[]'::jsonb,
  started_on date,
  ended_on date,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.albums (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_fr text not null,
  title_en text,
  date date,
  cover_url text,
  photos jsonb not null default '[]'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'contact' check (kind in ('contact', 'signalement')),
  name text not null check (char_length(name) between 1 and 120),
  email text check (email is null or char_length(email) <= 160),
  phone text check (phone is null or char_length(phone) <= 40),
  subject text check (subject is null or char_length(subject) <= 120),
  body text not null check (char_length(body) between 1 and 4000),
  location text check (location is null or char_length(location) <= 200),
  status text not null default 'new' check (status in ('new', 'in_progress', 'closed')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists messages_status_idx on public.messages (status, created_at desc);

-- Déclencheurs updated_at
do $$
declare t text;
begin
  foreach t in array array['posts','communiques','events','people','units','commissions','procedures','projects','albums','messages','settings'] loop
    execute format('drop trigger if exists touch_%1$s on public.%1$s', t);
    execute format('create trigger touch_%1$s before update on public.%1$s for each row execute function public.touch_updated_at()', t);
  end loop;
end $$;

-- ---------- Règles d'accès (RLS) ----------
alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.communiques enable row level security;
alter table public.events enable row level security;
alter table public.people enable row level security;
alter table public.units enable row level security;
alter table public.commissions enable row level security;
alter table public.procedures enable row level security;
alter table public.projects enable row level security;
alter table public.albums enable row level security;
alter table public.settings enable row level security;
alter table public.messages enable row level security;

-- Profils : chacun lit le sien ; l'administrateur gère tout.
drop policy if exists "profiles self read" on public.profiles;
create policy "profiles self read" on public.profiles for select using (id = auth.uid() or public.is_admin());
drop policy if exists "profiles admin write" on public.profiles;
create policy "profiles admin write" on public.profiles for update using (public.is_admin()) with check (public.is_admin());
drop policy if exists "profiles admin delete" on public.profiles;
create policy "profiles admin delete" on public.profiles for delete using (public.is_admin() and id <> auth.uid());

-- Contenus avec brouillons : public = publié ; agents = tout lire ;
-- éditeurs = tout écrire ; contributeurs = créer et modifier des brouillons seulement.
do $$
declare t text;
begin
  foreach t in array array['posts','communiques','events','projects','albums'] loop
    execute format('drop policy if exists "%1$s public read" on public.%1$s', t);
    execute format($p$create policy "%1$s public read" on public.%1$s for select using (status = 'published' or public.is_staff())$p$, t);
    execute format('drop policy if exists "%1$s editor all" on public.%1$s', t);
    execute format('create policy "%1$s editor all" on public.%1$s for all using (public.is_editor()) with check (public.is_editor())', t);
    execute format('drop policy if exists "%1$s contributor insert" on public.%1$s', t);
    execute format($p$create policy "%1$s contributor insert" on public.%1$s for insert with check (public.is_staff() and status = 'draft')$p$, t);
    execute format('drop policy if exists "%1$s contributor update" on public.%1$s', t);
    execute format($p$create policy "%1$s contributor update" on public.%1$s for update using (public.is_staff() and status = 'draft') with check (public.is_staff() and status = 'draft')$p$, t);
  end loop;
end $$;

-- Contenus de référence (organigramme, démarches) : lecture publique, écriture éditeurs.
do $$
declare t text;
begin
  foreach t in array array['people','units','commissions','procedures'] loop
    execute format('drop policy if exists "%1$s public read" on public.%1$s', t);
    execute format('create policy "%1$s public read" on public.%1$s for select using (true)', t);
    execute format('drop policy if exists "%1$s editor all" on public.%1$s', t);
    execute format('create policy "%1$s editor all" on public.%1$s for all using (public.is_editor()) with check (public.is_editor())', t);
  end loop;
end $$;

-- Réglages : lecture publique, écriture administrateurs.
drop policy if exists "settings public read" on public.settings;
create policy "settings public read" on public.settings for select using (true);
drop policy if exists "settings admin write" on public.settings;
create policy "settings admin write" on public.settings for all using (public.is_admin()) with check (public.is_admin());

-- Messages : tout le monde peut écrire (formulaire public), seuls les agents lisent.
drop policy if exists "messages public insert" on public.messages;
create policy "messages public insert" on public.messages for insert to anon, authenticated with check (status = 'new' and notes is null);
drop policy if exists "messages staff read" on public.messages;
create policy "messages staff read" on public.messages for select using (public.is_staff());
drop policy if exists "messages staff update" on public.messages;
create policy "messages staff update" on public.messages for update using (public.is_staff()) with check (public.is_staff());
drop policy if exists "messages admin delete" on public.messages;
create policy "messages admin delete" on public.messages for delete using (public.is_admin());

-- ---------- Stockage des fichiers ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('media', 'media', true, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']),
  ('documents', 'documents', true, 20971520, array['application/pdf', 'image/jpeg', 'image/png'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "files public read" on storage.objects;
create policy "files public read" on storage.objects for select using (bucket_id in ('media', 'documents'));
drop policy if exists "files staff insert" on storage.objects;
create policy "files staff insert" on storage.objects for insert to authenticated with check (bucket_id in ('media', 'documents') and public.is_staff());
drop policy if exists "files staff update" on storage.objects;
create policy "files staff update" on storage.objects for update to authenticated using (bucket_id in ('media', 'documents') and public.is_staff());
drop policy if exists "files editor delete" on storage.objects;
create policy "files editor delete" on storage.objects for delete to authenticated using (bucket_id in ('media', 'documents') and public.is_editor());
