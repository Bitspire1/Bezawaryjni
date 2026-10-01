# Bezawaryjni — project notes

Next.js 16 (Turbopack) + TinaCMS + Tailwind v4 static site.

## Commands

- `pnpm dev` — TinaCMS dev server + `next dev` (Tina data layer uses port 9000; if a dev server is already running, `pnpm build` fails on that port — run `npx next build` directly instead, the generated client is already committed)
- `pnpm build` — `tinacms build && next build && node scripts/inline-css.mjs`
- `pnpm test` — Vitest + Testing Library
- `pnpm lint` / `npx tsc --noEmit` — lint / typecheck

## Structure

- `src/app/(site)/` — public routes (`/`, `/polityka-prywatnosci`) sharing `layout.tsx` with Header/Footer/WhatsApp/Analytics
- `src/app/(preview)/preview/` — Tina preview routes (client Tina data); wrapper components receive `isPreview`
- `src/components/` — `sections/` (page sections), `layout/` (Header/Footer), `pages/` (wrappers), `features/` (CountUp, Lightbox), `contact/`, `widgets/` (WhatsApp), `analytics/`, `ui/` (Scale* primitives)
- `src/lib/` — pure helpers: `tinaField` (local impl, no tinacms import), `previewHref`, `localMedia` (maps `assets.tina.io/<id>/...` back to local `/public` files), `navItems`

## Performance decisions (keep in mind when editing)

- No client-side font packages — `system-ui` stack; Geist was removed (was loaded but never applied)
- No framer-motion / react-icons — CSS transitions (`fx-*` classes in globals.css) and inline SVGs
- `content-visibility: auto` (`.cv-auto`) on below-fold sections — keep overlays portaled to `document.body` when adding fixed-position UI inside those sections
- `Analytics` injects gtag on first interaction or after 6 s — do not revert to `next/script lazyOnload` without re-measuring
- `WhatsAppLazy` loads the widget chunk on `requestIdleCallback`; its CSS lives in `widgets/whatsapp.css` (lazy chunk, not the critical stylesheet)
- `scripts/inline-css.mjs` — post-build step that inlines the render-blocking stylesheet into prerendered HTML (`experimental.optimizeCss` is a no-op under Turbopack). Safe to re-run; only rewrites `data-precedence` stylesheet links.
- Hero image uses `quality={60}` under a 65 % overlay — `images.qualities` in `next.config.ts` must contain 60
- `prefetch={false}` on Header/Footer Links — both pages are tiny and static
