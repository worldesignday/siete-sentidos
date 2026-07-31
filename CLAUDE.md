# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Marketing landing page (in Spanish, locale `es_CO`) for **Siete Sentidos**, a summer camp ("Campo de Verano 2026"). Built with **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui**, animated with **Motion** and iconed with **lucide-react**. All page copy is **content-managed**: it lives in a JSON document stored in **Vercel Blob** and is edited through a protected admin panel — no code changes needed to update text, prices, weeks, testimonials or FAQ. Deploy target is **Vercel**; production domain is `sietesentidosexperienciasensorial.com`. Package manager: **pnpm**.

The previous static HTML site is archived in **`legacy-static/`** (not served, kept for reference).

## Running locally

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm build          # production build
pnpm seed           # sube content/seed-content.json a Vercel Blob (necesita BLOB_READ_WRITE_TOKEN)
pnpm exec tsc --noEmit   # typecheck
```

Env vars (see `.env.example`): `BLOB_READ_WRITE_TOKEN` (from a Vercel Blob store — get it locally with `vercel link && vercel env pull .env.local`), `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`. Without a Blob token the site falls back to the local seed content, so `pnpm dev` works offline.

## Content / CMS architecture

- **Single source of truth for the shape:** `lib/schema.ts` — one Zod schema (`contentSchema`) for the whole site; `SiteContent` type is inferred from it. Add/rename any content field here first.
- **Seed content:** `content/seed-content.json` — the initial copy (extracted from the old HTML). Used as the offline fallback and as the payload for `pnpm seed`.
- **Storage:** `lib/blob.ts` — reads/writes the JSON at the stable Blob path `content/site-content.json` (`putContent` overwrites it; `getContentBlobUrl` resolves the current URL with a cache-busting `?v=`).
- **Reads:** `lib/content.ts#getContent()` — fetches the Blob JSON fresh (`no-store`), validates with Zod, falls back to `seedContent`. Wrapped in React `cache()` for per-request dedupe. Both `app/page.tsx` and `app/layout.tsx` (`generateMetadata`) consume it; the home is `export const dynamic = "force-dynamic"` so edits appear immediately.
- **Public sections:** `components/sections/*` — one server component per section (`Header`, `Hero`, `PainPoints`, `Methodology`, `DaySchedule`, `Weeks`, `Testimonials`, `Founder`, `Pricing`, `Faq`, `ReservationForm`, `Footer`, `MobileCta`), each receiving its slice of `SiteContent`. `components/reveal.tsx` is the Motion scroll-in wrapper.

## Admin panel (`/admin`)

- **Auth:** shared password (`ADMIN_PASSWORD`) → HMAC-signed session cookie. Logic in `lib/auth.ts` (Web Crypto, works in both Node and the edge proxy). `proxy.ts` (Next 16's renamed middleware) guards `/admin/*` except `/admin/login`.
- **Editor:** `components/admin/admin-editor.tsx` — one big react-hook-form bound to the whole content object with the Zod resolver; nested arrays via `useFieldArray`. Field primitives in `components/admin/fields.tsx`.
- **Save:** `app/admin/actions.ts#saveContentAction` (Server Action) validates with Zod, `putContent()` to Blob. Login/logout actions live in the same file.

## Styling system

- Tailwind v4 via `@tailwindcss/postcss`; entry is `app/globals.css` (shadcn "base-nova" style — note shadcn UI primitives here are **Base UI**, not Radix, so component APIs differ, e.g. Accordion has no `type`/`collapsible`, Select's `onValueChange` yields `string | null`).
- **Brand tokens** (colors + fonts) live in the `@theme` block in `app/globals.css` — `--color-brand-orange`, `--color-brand-purple`, `--color-whatsapp-green`, `--font-display` (Poppins), `--font-body` (Inter). Reference via `bg-brand-orange`, `font-display`, etc. **Change brand colors there**, not scattered hex values. Fonts are loaded with `next/font/google` in `app/layout.tsx`.
- Images live in `public/images/`; the founder photo is remote (Unsplash) — remote hosts are allowlisted in `next.config.ts`.

## Conventions

- **Conversion is WhatsApp-driven**: CTAs use `lib/whatsapp.ts#waLink(number, message)` with the number and messages coming from content (`site.whatsappNumber`, per-plan/reservation messages). Preserve this when editing CTAs.
- Content is Spanish — keep copy, `lang="es"`, and locale consistent. Absolute URLs (`canonicalUrl`, `ogImage`) point at the production domain.

## Deploying to Vercel

1. Import the repo in Vercel (framework auto-detected as Next.js).
2. Create a **Blob store** on the project (exposes `BLOB_READ_WRITE_TOKEN` automatically).
3. Set env vars: `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`.
4. Run `pnpm seed` once (locally with the pulled token, or as a one-off) to populate the content blob.
5. Point the production domain and update `canonicalUrl`/`ogImage` in the content if needed.
