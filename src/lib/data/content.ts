import "server-only";
import { cache } from "react";
import { publicClient } from "@/lib/supabase/public";
import type { Album, CalEvent, Commission, Communique, Person, Post, Procedure, Project, Settings, Unit } from "./types";
import seedPosts from "@/content/seed/posts.json";
import seedCommuniques from "@/content/seed/communiques.json";
import seedEvents from "@/content/seed/events.json";
import seedPeople from "@/content/seed/people.json";
import seedUnits from "@/content/seed/units.json";
import seedCommissions from "@/content/seed/commissions.json";
import seedProcedures from "@/content/seed/procedures.json";
import seedProjects from "@/content/seed/projects.json";
import seedAlbums from "@/content/seed/albums.json";
import seedSettings from "@/content/seed/settings.json";

/*
 * Accès au contenu public.
 * Avec Supabase configuré : lecture en base (seul le contenu publié est visible, grâce aux règles RLS).
 * Sans Supabase (développement, première mise en ligne) : contenu de départ embarqué dans src/content/seed.
 * Dans le jeu de départ, les identifiants sont les slugs, ce qui permet les liens entre tables.
 */

const withId = <T extends { slug: string }>(rows: T[]) => rows.map((r) => ({ id: r.slug, ...r }));
const now = () => new Date().toISOString();
let warned = false;

const SEED = {
  posts: withId(seedPosts as Omit<Post, "id">[]) as Post[],
  communiques: withId(seedCommuniques as Omit<Communique, "id">[]) as Communique[],
  events: withId(seedEvents as Omit<CalEvent, "id">[]) as CalEvent[],
  people: withId(seedPeople as Omit<Person, "id">[]) as Person[],
  units: withId(seedUnits as Omit<Unit, "id">[]) as Unit[],
  commissions: (seedCommissions as Omit<Commission, "id">[]).map((c, i) => ({ id: `c${i + 1}`, ...c })) as Commission[],
  procedures: withId(seedProcedures as Omit<Procedure, "id">[]) as Procedure[],
  projects: withId(seedProjects as Omit<Project, "id">[]) as Project[],
  albums: withId(seedAlbums as Omit<Album, "id">[]) as Album[],
};

async function query<T>(table: string, build: (q: ReturnType<NonNullable<ReturnType<typeof publicClient>>["from"]>) => PromiseLike<{ data: unknown; error: unknown }>, fallback: () => T): Promise<T> {
  const sb = publicClient();
  if (!sb) return fallback();
  const { data, error } = await build(sb.from(table));
  if (error) {
    // Tables pas encore créées (migration non lancée) : on sert le contenu de départ, avec un seul avertissement.
    if ((error as { code?: string }).code === "PGRST205") {
      if (!warned) { warned = true; console.warn("[content] Tables Supabase absentes : lancez supabase/migrations/*.sql puis npm run db:seed. Contenu de départ affiché en attendant."); }
    } else console.error(`[content] ${table}:`, error);
    return fallback();
  }
  return (data ?? fallback()) as T;
}

export const isLive = () => publicClient() !== null;

// ---------- Actualités ----------
export async function getPosts(opts: { limit?: number; category?: string } = {}): Promise<Post[]> {
  return query<Post[]>("posts", (q) => {
    let b = q.select("*").eq("status", "published").lte("published_at", now()).order("published_at", { ascending: false });
    if (opts.category) b = b.eq("category", opts.category);
    if (opts.limit) b = b.limit(opts.limit);
    return b;
  }, () => {
    const rows = SEED.posts.filter((p) => !opts.category || p.category === opts.category);
    return opts.limit ? rows.slice(0, opts.limit) : rows;
  });
}

export async function getPost(slug: string): Promise<Post | null> {
  return query<Post | null>("posts", (q) => q.select("*").eq("slug", slug).eq("status", "published").maybeSingle(), () => SEED.posts.find((p) => p.slug === slug) ?? null);
}

export async function getFeaturedPosts(limit = 3): Promise<Post[]> {
  const all = await getPosts({ limit: 12 });
  const featured = all.filter((p) => p.featured);
  return [...featured, ...all.filter((p) => !p.featured)].slice(0, limit);
}

// ---------- Communiqués ----------
export async function getCommuniques(opts: { limit?: number; kind?: string } = {}): Promise<Communique[]> {
  return query<Communique[]>("communiques", (q) => {
    let b = q.select("*").eq("status", "published").lte("published_at", now()).order("urgent", { ascending: false }).order("published_at", { ascending: false });
    if (opts.kind) b = b.eq("kind", opts.kind);
    if (opts.limit) b = b.limit(opts.limit);
    return b;
  }, () => {
    const rows = [...SEED.communiques].filter((c) => !opts.kind || c.kind === opts.kind).sort((a, b) => b.published_at.localeCompare(a.published_at));
    return opts.limit ? rows.slice(0, opts.limit) : rows;
  });
}

export async function getCommunique(slug: string): Promise<Communique | null> {
  return query<Communique | null>("communiques", (q) => q.select("*").eq("slug", slug).eq("status", "published").maybeSingle(), () => SEED.communiques.find((c) => c.slug === slug) ?? null);
}

/** Dernier communiqué urgent encore valable, publié il y a moins de 30 jours (alerte flottante). */
export async function getActiveUrgent(): Promise<Communique | null> {
  const limit = Date.now() - 1000 * 60 * 60 * 24 * 30;
  const items = await getCommuniques({ limit: 6 });
  return items.find((c) => c.urgent && isActive(c) && Date.parse(c.published_at) > limit) ?? null;
}

/** Communiqué urgent encore valable (affiché en bandeau). */
export function isActive(c: Communique) {
  return !c.expires_at || c.expires_at >= now();
}

// ---------- Agenda ----------
export async function getEvents(): Promise<CalEvent[]> {
  return query<CalEvent[]>("events", (q) => q.select("*").eq("status", "published").order("starts_at", { ascending: true }), () => [...SEED.events].sort((a, b) => a.starts_at.localeCompare(b.starts_at)));
}

export async function getEvent(slug: string): Promise<CalEvent | null> {
  return query<CalEvent | null>("events", (q) => q.select("*").eq("slug", slug).eq("status", "published").maybeSingle(), () => SEED.events.find((e) => e.slug === slug) ?? null);
}

const WEEKDAYS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

/**
 * Prochaine occurrence d'un rendez-vous récurrent :
 * « Chaque jeudi » dans le libellé = hebdomadaire, sinon annuel (même jour l'année suivante).
 */
export function nextOccurrence(e: CalEvent, from = new Date()): CalEvent {
  if (!e.recurring) return e;
  const start = new Date(e.starts_at);
  const end = e.ends_at ? new Date(e.ends_at) : null;
  const span = end ? end.getTime() - start.getTime() : 0;
  if ((end ?? start) >= from) return e;
  const weekly = WEEKDAYS.findIndex((d) => new RegExp(`chaque\\s+${d}`, "i").test(e.date_label_fr ?? ""));
  const next = new Date(start);
  if (weekly >= 0) {
    next.setFullYear(from.getFullYear(), from.getMonth(), from.getDate());
    while (next.getDay() !== weekly || next < from) next.setDate(next.getDate() + 1);
  } else {
    while (next.getTime() + span < from.getTime()) next.setFullYear(next.getFullYear() + 1);
  }
  return { ...e, starts_at: next.toISOString(), ends_at: end ? new Date(next.getTime() + span).toISOString() : null };
}

/** Événements à venir (ou en cours), dans l'ordre chronologique, rendez-vous récurrents reportés à leur prochaine date. */
export async function getUpcomingEvents(limit?: number): Promise<CalEvent[]> {
  const t = new Date();
  const rows = (await getEvents())
    .map((e) => nextOccurrence(e, t))
    .filter((e) => new Date(e.ends_at ?? e.starts_at).getTime() >= t.getTime() - 1000 * 60 * 60 * 12)
    .sort((a, b) => a.starts_at.localeCompare(b.starts_at));
  return limit ? rows.slice(0, limit) : rows;
}

// ---------- La Mairie ----------
export async function getPeople(body?: Person["body"]): Promise<Person[]> {
  return query<Person[]>("people", (q) => {
    let b = q.select("*").eq("active", true).order("rank", { ascending: true });
    if (body) b = b.eq("body", body);
    return b;
  }, () => SEED.people.filter((p) => !body || p.body === body).sort((a, b) => a.rank - b.rank));
}

export async function getUnits(): Promise<Unit[]> {
  return query<Unit[]>("units", (q) => q.select("*").order("rank", { ascending: true }), () => SEED.units);
}

export async function getCommissions(): Promise<Commission[]> {
  return query<Commission[]>("commissions", (q) => q.select("*").order("rank", { ascending: true }), () => SEED.commissions);
}

// ---------- Services ----------
export async function getProcedures(): Promise<Procedure[]> {
  return query<Procedure[]>("procedures", (q) => q.select("*").eq("status", "published").order("theme").order("rank"), () => SEED.procedures);
}

export async function getProcedure(slug: string): Promise<Procedure | null> {
  return query<Procedure | null>("procedures", (q) => q.select("*").eq("slug", slug).eq("status", "published").maybeSingle(), () => SEED.procedures.find((p) => p.slug === slug) ?? null);
}

// ---------- Projets ----------
export async function getProjects(): Promise<Project[]> {
  const order = { ongoing: 0, planned: 1, done: 2 } as const;
  const rows = await query<Project[]>("projects", (q) => q.select("*").eq("status", "published").order("updated_at", { ascending: false }), () => SEED.projects);
  return [...rows].sort((a, b) => order[a.progress] - order[b.progress]);
}

export async function getProject(slug: string): Promise<Project | null> {
  return query<Project | null>("projects", (q) => q.select("*").eq("slug", slug).eq("status", "published").maybeSingle(), () => SEED.projects.find((p) => p.slug === slug) ?? null);
}

// ---------- Photothèque ----------
export async function getAlbums(): Promise<Album[]> {
  return query<Album[]>("albums", (q) => q.select("*").eq("status", "published").order("date", { ascending: false }), () => SEED.albums);
}

// ---------- Réglages ----------
export const getSettings = cache(async function getSettings(): Promise<Settings> {
  const base = seedSettings as Settings;
  const sb = publicClient();
  if (!sb) return base;
  const { data, error } = await sb.from("settings").select("key,value");
  if (error || !data) return base;
  const merged: Record<string, unknown> = { ...base };
  for (const row of data as { key: string; value: unknown }[]) merged[row.key] = row.value;
  return merged as Settings;
});
