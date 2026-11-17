# Plan: re-centre the site on the Mairie de Bangangté, plus an admin dashboard

Status: **implemented on branch `feat/mairie-portal`** (13 Nov 2026). Supabase schema and seed still to be run on the live project (see README). Research behind it: [research/mairie-findings.md](research/mairie-findings.md) and [research/facebook/posts.json](research/facebook/posts.json) (220 posts).

## 1. Goal
The site becomes the **official portal of the Commune de Bangangté**. The Mairie, its news, communiqués, events, services and people are what visitors see first. The tourism, history and culture content stays but moves under one lighter "Découvrir Bangangté" section. CELCOM publishes content itself from a dashboard, without a developer.

Audiences, in priority order: residents (procedures, notices), the Mairie's institutional partners and the press, the diaspora and investors, then visitors.

## 2. Information architecture

### New main menu
| Menu | Pages |
|---|---|
| **Accueil** | Mairie-first home page (see below) |
| **La Mairie** | `/mairie` overview · `/mairie/maire` (the mayor's message and biography) · `/mairie/executif` (mayor and 4 deputies) · `/mairie/conseil` (councillors and commissions) · `/mairie/administration` (org chart: SG, services and heads) · `/mairie/historique` (past mayors, awards, partners) |
| **Actualités** | `/actualites` (filterable list) · `/actualites/[slug]` (article with photo gallery) |
| **Communiqués** | `/communiques` (official notices, calls for applications, tenders, alerts, with PDF downloads) |
| **Agenda** | `/agenda` (the Mairie's events first, then cultural events). The existing page is reused and fed from the database |
| **Services** | `/services` (procedures by theme) · `/services/[slug]` (required documents, fees, service, delay) · `/services/signaler` (report a problem) |
| **Projets** | `/projets` (BIP projects and partnerships, with status: planned, in progress or delivered, and photos) |
| **Découvrir Bangangté** | One menu that groups the existing ville, histoire, personnalités, nature, culture, séjourner and galerie pages, unchanged |
| **Contact** | Existing page, completed (hours, phone/WhatsApp, email) and with a working form |

Moved under Découvrir, nothing deleted: every current page keeps its URL.

### New home page (top to bottom)
1. Hero: the town hall, a short line from the mayor, buttons for "Démarches" and "Contacter la mairie"
2. **À la une**: the 3 latest news items (from the database)
3. **Communiqués**: the 3 latest official notices, with an "urgent" badge
4. **Quick access**: civil records, planning, markets, jobs, report a problem
5. **Upcoming events**: from the database, with a countdown for the main one
6. **The exécutif**: the mayor and 4 deputies, linking to /mairie
7. **Ongoing projects**: 3 cards
8. **Jeudi Propre and programmes**: a strip for the recurring programmes
9. **Découvrir Bangangté**: a short version of today's home page (sights, culture, COMENGA)
10. Footer: hours, contacts, social links (the correct Facebook page)

## 3. Content model (Supabase)
All visible text is stored in both languages (`*_fr`, `*_en`), matching how CELCOM already posts. The English text is optional: if it is empty, the French shows.

| Table | Key fields |
|---|---|
| `posts` (actualités) | slug, title_fr/en, excerpt_fr/en, body_fr/en (rich text), cover_image, category (enum: vie_communale, jeudi_propre, projets, social, education, jeunesse, sport, culture, institutionnel, cooperation), published_at, status (draft/published), featured, source_url (FB permalink) |
| `communiques` | ref_number, title, body, type (communiqué, avis, appel à candidature, alerte, marché public), pdf_file, published_at, expires_at, urgent |
| `events` | title, description, starts_at, ends_at, location, category, cover_image, organizer (mairie or partner), status |
| `media` | file path in Storage, alt_fr/en, caption, credit, linked post/event/project, album |
| `albums` | title, date, cover |
| `people` | name, role_fr/en, body (exécutif, conseil, administration), rank/order, photo, bio, commission ids, active_from/to |
| `services_admin` | service units (SG, Recette, Hygiène…) with head (`people`), parent unit for the org chart, contacts |
| `procedures` | slug, title, theme, description, required_docs (list), fees, delay, unit_id, downloadable forms |
| `projects` | title, description, location (groupement), funding source (BIP, FEICOM, KfW…), budget, status, start/end, images |
| `messages` | contact and report-a-problem submissions (name, email/phone, subject, body, status), viewable in the dashboard |
| `settings` | hours, phone, email, social links, the mayor's message, home page hero text |

**Storage buckets:** `media` (public, images), `documents` (public PDFs: communiqués, forms), `private` (attachments from citizen reports).

**Security (RLS):** anyone can read published rows; only authenticated staff can write. Roles in a `profiles` table:
- `admin`: everything, including users and settings
- `editor` (CELCOM): news, communiqués, events, media, projects
- `contributor`: drafts only, published by an editor

`messages` are readable only by admins and editors.

## 4. Admin dashboard (`/admin`)
- **Sign-in** with Supabase Auth (email and password, or magic link). Accounts are created by invitation only, with no public sign-up.
- **Tableau de bord:** counts, recent drafts, unread messages, shortcuts
- **Actualités:** list with filters; editor with title, FR/EN tabs, rich text, cover, multi-photo upload (drag and drop, resized client-side before upload), category, publish date, draft/publish, live preview
- **Communiqués:** form plus PDF upload, urgent flag, expiry
- **Agenda:** event form with dates and location
- **Médiathèque:** albums and bulk photo upload, alt text and credit
- **Mairie:** manage people (executive, council, administration), the org chart order, commissions
- **Services and procedures:** edit the procedure sheets
- **Projets:** status, images, funding
- **Messages:** inbox for the contact form and problem reports, with a status (new, in progress, closed)
- **Paramètres:** hours, contacts, home page hero, the mayor's message; **Utilisateurs** (admins only)

The dashboard is French-first (CELCOM works in French), uses the site's design system, and works on a phone, since much posting happens from the field.

## 5. Technical architecture

### Decision: leave the static export, run Next.js on Cloudflare Workers (OpenNext)
Today `output: "export"` produces pure static HTML, so new content would only appear after a rebuild. Recommended:

- `@opennextjs/cloudflare` on the **same Cloudflare Worker and domain**
- Public pages are **server-rendered from Supabase and cached** (ISR, `revalidate` about 60 s). Publishing in the dashboard also calls `revalidatePath` so changes appear immediately. Pages stay fast, readable by Google, and shareable on WhatsApp and Facebook with proper previews (Open Graph image per article).
- Existing static pages (histoire, nature…) stay static, so they are unchanged.
- `/admin` is client-rendered behind auth (Supabase SSR helpers, middleware protecting `/admin`).

Rejected alternative: keep the static export and fetch from Supabase in the browser. It is simpler to host, but news pages would be empty for search engines and link previews, and article URLs would need workarounds.

### Libraries (kept minimal)
- `@supabase/supabase-js`, `@supabase/ssr`
- Rich text editor: **Tiptap**, storing HTML sanitised on the server
- Image resizing before upload: `browser-image-compression`
- Forms and validation: `zod`
- No CSS framework: the admin reuses `globals.css` tokens

### Bilingual approach
Keep the existing `<T fr en>` mechanism, where both languages are rendered and CSS switches between them. Database content renders through the same component, so the language toggle keeps working with no new routing.

### Environments
- Supabase project: prod (plus an optional staging project)
- `.env`: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (public). The service-role key only goes in Worker secrets, for server actions such as revalidation and invitations.
- SQL migrations in `supabase/migrations/` (schema, RLS policies, storage policies), plus `supabase/seed.sql`

## 6. Initial content (seed)
From the research, loaded into Supabase so the site launches full rather than empty:
- **Exécutif** (5 people), **known councillors** (about 10) and commissions, **administration** (SG GATCHOU NJAMEN, service heads)
- **About 40 key news items** chosen from the 220 Facebook posts (Jul 2025 to Nov 2026), with the FB link as the source. Photos come from the Mairie's originals; FB CDN links expire, so they are not used.
- **Communiqués** found (calls for applications for the leisure park and green space, alerts, traffic plan)
- **Projects:** stadium phase 3, Ngam and Nkong bridges, La Braise market halls, classrooms (Bitchoua, Peup), solar lighting, ville fontaine
- **Procedures:** a first set (birth, marriage and death certificates, building permit, trading permit, market pitch) marked "to be validated by the Mairie"
- Agenda: the existing `events.ts` content, migrated

A small import script turns `posts.json` into draft `posts` rows, so CELCOM can review, fix and publish the rest from the dashboard.

## 7. Phases
| # | Phase | Delivers |
|---|---|---|
| 1 | **Platform switch** | OpenNext on Cloudflare; the existing site renders identically; deployment pipeline works |
| 2 | **Supabase foundation** | Schema, RLS, storage buckets, typed data-access layer, seed |
| 3 | **Public Mairie pages** | New nav, new home page, /mairie sub-pages, actualités, communiqués, agenda (from DB), services and procedures, projets; Découvrir grouped |
| 4 | **Admin dashboard** | Auth and roles, CRUD for every content type, media upload, preview, revalidation on publish |
| 5 | **Citizen interaction** | Working contact form and problem reports stored in `messages`, plus email notification to the Mairie |
| 6 | **Content and launch** | Import and curate posts, validate with CELCOM, real photos, remove `noindex`, sitemap and Open Graph, hand-over guide for CELCOM |

Each phase is a separate PR that can be deployed.

## 8. Needed from you or the Mairie
Decided 13 Nov 2026: the user creates the Supabase project and provides the keys. **Existing photos are used for now**, with Mairie originals later. **Email notifications are deferred**: messages are stored in the dashboard only.

1. **Supabase project** (who owns it: you or the Mairie?) and keys
2. **Cloudflare access** for the Worker switch (same account as today)
3. **CELCOM accounts**: who gets admin and who gets editor
4. **Validation** of the exécutif, councillors, the org chart, the receveur's name, hours, procedures and fees
5. **Photos**: originals of the executive, the town hall and recent events, plus permission to reuse their Facebook photos
6. **Notification email address** for contact and report messages
7. Is the communal radio (92.7 FM) still active?

## 9. Open questions
- Should the dashboard also **cross-post to Facebook** (Meta API)? This is possible later but adds app-review work. It is out of scope for now.
- Domain: stay on `bangangte.skyengpro.site` or move to a commune domain (communedebangangte.net is offline and could be revived)?
- Should the mayor appear prominently (photo and message on the home page)? Recommended, but it is a political choice for the Mairie, especially with the 2027 municipal elections approaching.
