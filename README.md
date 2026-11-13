# Commune de Bangangté : site officiel de la Mairie

Official website of the Commune de Bangangté (Ndé, West Cameroon), centred on the Mairie: news, official notices, events, formalities, projects, the executive, the council and the administration. The town's history, culture and tourism pages are kept under **Découvrir**.

Live: https://bangangte.skyengpro.site

Next.js 16 (App Router, TypeScript) running on **Cloudflare Workers** via OpenNext, with **Supabase** for content, staff logins and file storage. French and English, light and dark themes.

```bash
npm install
cp .env.example .env.local   # then fill in the Supabase values
npm run dev                  # http://localhost:3000 (staff area: /admin)
```

Without Supabase settings the site still runs, using the starting content in `src/content/seed/`.

## Site map
- **Accueil** `/`: Mairie-first home (latest news, notices, next events, quick access to formalities, the mayor, projects, then Discover).
- **La Mairie**: `/mairie`, `/mairie/maire`, `/mairie/executif`, `/mairie/conseil`, `/mairie/administration` (org chart), `/mairie/historique`, `/projets`.
- **Informations**: `/actualites`, `/communiques`, `/agenda`, `/galerie`.
- **Services**: `/services` (formalities by theme), `/services/[slug]`, `/services/signaler` (report a problem), `/contact`.
- **Découvrir**: `/ville`, `/histoire`, `/personnalites`, `/nature`, `/culture`, `/sejourner`.
- **Espace agents**: `/admin`.

## Supabase setup (once)
1. **Schema**: in Supabase, open *SQL Editor > New query*, paste all of `supabase/migrations/20261113000000_mairie.sql`, then *Run*. It creates the tables, row-level security, roles and the `media` and `documents` storage buckets. It is safe to run again.
2. **Starting content**: `npm run db:seed` loads the content from `src/content/seed/` (55 news items, notices, events, people, departments, formalities, projects). It updates rows by slug and never deletes anything.
3. **Auth URLs**: in *Authentication > URL Configuration*, set the Site URL to `https://bangangte.skyengpro.site` and add `http://localhost:3000/**` and `https://bangangte.skyengpro.site/**` to the redirect URLs, so that invitation and password links work.
4. **First administrator**: in *Authentication > Users*, add a user (email and password), then in the SQL editor run:
   ```sql
   update public.profiles set role = 'admin' where email = 'name@example.com';
   ```
   After that, invite the other staff from `/admin/utilisateurs`.

### Roles
| Role | Can do |
|---|---|
| `admin` | Everything, including site settings and user accounts |
| `editor` | Create, edit, publish and delete all content and files |
| `contributor` | Prepare drafts (an editor publishes them) |
| `none` | No access (default for new accounts) |

The rules are enforced in the database (RLS), not just in the interface.

## Staff area (`/admin`)
- **Actualités, Communiqués, Agenda, Projets, Albums photos**: lists with search and filters, an editor with French and English tabs, rich text, a main photo, a photo gallery, a PDF attachment, drafts and scheduled publishing.
- **La Mairie**: elected officials and staff, departments (org chart), council committees, formalities.
- **Messages**: contact form messages and problem reports from residents (new, in progress, done), with internal notes.
- **Médiathèque**: every photo and document. Photos are resized and compressed in the browser before upload.
- **Réglages** (admin): contact details, opening hours, the mayor's message and a site-wide alert.
- **Utilisateurs** (admin): invite staff by email and assign roles.

A notice marked **urgent** shows as an alert on every page for 30 days, or until its deadline.

## Where things live
- `src/app/(site)/`: public pages. `src/app/admin/`: staff area. `src/app/api/`: contact form and invitations.
- `src/lib/data/content.ts`: reads published content from Supabase, with a fallback to `src/content/seed/`.
- `src/lib/data/types.ts`: content model (categories, notice types, project status).
- `src/app/admin/_lib/resources.ts`: the dashboard's content types and fields. Add a field here and the editor shows it.
- `src/components/mairie.tsx`: cards and lists for news, notices, events, people and projects.
- `src/app/globals.css` (design system) and `src/app/mairie.css` (new public components), `src/app/admin/admin.css`.
- `docs/research/`: source research (Facebook archive of 220 posts, findings) and `docs/PLAN-mairie.md`.

Images in content can be uploaded photos (Supabase Storage URLs) or photos already on the site, stored as `img:<key>` (see `src/lib/images.ts`).

## Deploying (Cloudflare Workers)
```bash
npx wrangler login                                   # once
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY    # once: server-side secret
npm run cf:deploy                                    # opennextjs-cloudflare build + deploy
```
`NEXT_PUBLIC_*` values are built into the site from `.env.local` at build time. Config is in `wrangler.jsonc` and `open-next.config.ts`. `npm run cf:preview` runs the Worker locally.

The site is set to `noindex` in `src/app/layout.tsx` until the Mairie approves the content.

## Before going live
- The Mairie should validate the executive, councillors, org chart, opening hours and each formality sheet (tick "fiche validée" in the dashboard).
- Replace placeholder portraits with official photos (dashboard > La Mairie > Élus et responsables).
- Confirm rights for photos reused from the commune's Facebook page and for `public/images/local/`.
- Email notifications for new messages are not set up yet: messages are only stored in the dashboard.
