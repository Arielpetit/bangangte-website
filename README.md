# Bangangté — site web (Next.js)

Site officiel de la Commune de Bangangté (Ndé, Ouest Cameroun). En ligne : https://bangangte.skyengpro.site

Next.js 16 (App Router, TypeScript). French and English, light and dark themes. Every page is static.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

URL options for testing: `?lang=en`, `?theme=dark`.

## Pages
`/` home · `/ville` · `/histoire` · `/personnalites` · `/nature` · `/culture` · `/agenda` · `/sejourner` · `/mairie` · `/contact` (form + Google Maps) · `/credits`

Navigation (`src/lib/nav.ts`): Découvrir (ville, histoire, personnalités), Visiter (nature, culture, séjourner, agenda), Mairie, Contact.

## Where things live
- `src/lib/images.ts`: every photo (Wikimedia Commons, free licences) with author and licence; the credits page is generated from it.
- `src/lib/people.ts`: notable people (37, in five groups).
- `src/lib/sites.ts`: the 29 tourist sites, grouped into town, around Bangangté and the wider Ndé.
- `src/components/ui.tsx`: `<T fr en>` bilingual text, images, page hero, icons.
- `src/components/Header.tsx`: menu with dropdown panels, mobile drawer, language and theme buttons.
- `src/app/globals.css`: design system (ndop indigo, highland green, gold, camwood).

## Adding photos (no code needed)
Drop a file in `public/images/` and rebuild:
- **People**: `public/images/people/<slug>.jpg`. Slugs are in `src/lib/people.ts`, e.g. `eric-niat.jpg`, `isaac-ngahane.jpg`. The photo replaces the initials.
- **Sights without a photo**: `public/images/sites/<slug>.jpg`, e.g. `chutes-ntaveu.jpg`, `mbwregoum.jpg`, `chute-baba.jpg`. The sight moves from the list into the photo cards.
- **Town hall**: `public/images/local/hotel-de-ville.png` (already provided).

Only use photos you have permission to publish, and add a credit.

## Before going live
1. Contact form (`src/components/Interactive.tsx`): connect it to the town hall's email (e.g. Formspree or an API route). It does not send anything yet.
2. Town hall phone, email and opening hours on `/contact`.
3. Confirm dates marked "à confirmer" and hotel contacts.

## Deploying (Cloudflare Workers)
The site is a static export (`output: "export"`) served by a Cloudflare Worker with static assets, at `bangangte.skyengpro.site`.
```bash
npx wrangler login      # once
npm run cf:deploy       # next build + wrangler deploy
```
Config is in `wrangler.jsonc` (custom domain, assets from `out/`). The site is set to `noindex` in `src/app/layout.tsx` until the town hall approves the content.

## Logo and photos
- The commune's coat of arms is `public/images/logo.png` (header, footer, Mairie page) and `src/app/icon.png` (browser tab).
- Photos in `public/images/local/` (town hall, new market) are not freely licensed: confirm the rights before making the repository public.
