# Magnum Editions — Catalogue Concept

A Next.js (App Router) + TypeScript rebuild of the Magnum Editions listing page as an
animated, switchable portfolio: a full-screen **Dome** view (react-bits' `DomeGallery`,
adapted to TypeScript and wired to plate/photographer data) and an **iTunes-style
CoverFlow "Reel"** view, grouped by photographer, with 3D depth as you move off-center.

## Run it

```bash
npm install
npm run dev
```

Requires network access to `fonts.googleapis.com` at build time (for Fraunces / Work
Sans / IBM Plex Mono via `next/font/google`) — this sandbox's egress proxy blocks that
domain, so `npm run build` couldn't be verified end-to-end here. `npx tsc --noEmit` and
`npx eslint .` both pass cleanly, so the only remaining step is a normal `next build` on
a machine with open internet.

## What's new in this pass

- **Dome plate detail** — opening a plate in the Dome view now shows its title, plate
  number, photographer, and price, plus a "View this plate →" link that opens a
  dedicated (intentionally plain-text) page at `/plate/[id]` — see
  `app/plate/[id]/page.tsx`. Pricing is placeholder, generated deterministically per
  plate id in `lib/data.ts` (`priceForPlate` / `formatPrice`) — swap for real pricing
  from your product feed.
- **Hidden coffee-table layer** — `components/CoffeeTableReveal.tsx` mounts a
  full-viewport image, invisible by default, revealed as a soft spotlight that follows
  the cursor (`mask-image` + pointermove). Disabled on touch devices (no hover). Swap
  the placeholder image for a real coffee-table/book photograph when you have one.
- **Scroll-driven hero** — `components/HeroIntro.tsx` replaces the old static hero.
  It pins a 100vh stage for a 320vh scroll range: a blank screen with a "Scroll" cue,
  then ~26 coffee beans fall and settle near the bottom as you scroll, then the
  headline/copy fades and rises into place. All driven by scroll position (no
  `Math.random()` — a seeded generator keeps the bean layout stable across server and
  client renders), with a `prefers-reduced-motion` fallback that shows the finished
  hero immediately, no animation.

## Structure

- `lib/data.ts` — the plate/photographer dataset. Every image currently points at
  `picsum.photos` (grayscale placeholders) so the repo runs standalone. Swap `src` for
  real CDN URLs (e.g. `store.magnumphotos.com/cdn/shop/files/...`) to go live — the
  shape (`plateNo`, `year`, `location`, `edition`) is designed to match a real product
  feed.
- `components/DomeGallery.tsx` + `.css` — the sphere gallery (drag to rotate, click a
  plate to open it full-screen with a catalogue caption).
- `components/ReelGallery.tsx` — one CoverFlow row per photographer: drag, click a side
  card, or use the arrow buttons / arrow keys to move the active plate to center.
- `components/ViewToggle.tsx` — the Dome/Reel switch in the sticky control bar.
- `app/page.tsx` + `app/globals.css` — hero, control bar, footer, and all design tokens.

## Notes for going live

- Real photographs: point `lib/data.ts` at your product feed and consider swapping the
  raw `<img>` tags for `next/image` with `remotePatterns` set for your CDN host — kept
  as plain `<img>` here because `DomeGallery` clones/repositions image nodes directly in
  the DOM for the open/close animation.
- The photographer names, notes, and captions in `lib/data.ts` are placeholders written
  for this concept — replace with the real catalogue copy before publishing.
