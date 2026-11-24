# EDC CITK Website — Frontend

Next.js 14 (App Router) + TypeScript + Tailwind CSS.

## Setup

```bash
nvm install          # reads .nvmrc, installs/uses Node 24
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. A pre-commit hook (via husky + lint-staged) runs
automatically on `git commit` and lints/formats staged files — if it fails,
fix the reported issue and commit again.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (also what CI runs) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm run format` | Prettier, writes in place |

### CI

`.github/workflows/ci.yml` runs lint, typecheck, and build on every PR and
push to `main`. A PR with a red check should not be merged — this is the
backstop for mistakes the pre-commit hook didn't catch.

## How this project is organized

```
src/
  app/                 Pages (Next.js App Router — one folder per route)
  components/
    ui/                Shared primitives: Button, Card, Badge, Modal, Tabs,
                        Pagination, Input/Textarea/Select. Reuse these, never
                        style a one-off div or <input> when one of these fits.
    layout/             Navbar, Footer — do not duplicate these per page.
    sections/           Page-section building blocks (Hero, ImpactStats, etc).
                        A page is just these stacked in app/*/page.tsx.
  lib/
    types/              TypeScript interfaces matching the backend entities
                        in the project blueprint. This is the contract.
    mock-data/          JSON shaped exactly like future API responses.
    api/                Functions pages call to get data. Today these read
                        mock-data/*.json. When the backend is ready, only
                        these files change — not your components.
    config/site.ts      Site-wide constants (name, URL, socials). Read from
                        here, don't hardcode these strings elsewhere.
  app/loading.tsx       Shown while a page's data fetch is in flight.
  app/error.tsx         Catches render/fetch errors per route segment.
  app/not-found.tsx     Custom 404.
  app/sitemap.ts         Auto-generated sitemap.xml — extend when new
                        route groups (events, alumni...) go live.
  app/robots.ts          robots.txt, points at the sitemap.
```

## The one rule that matters most

**Never hardcode content inside a component.** If a page needs events,
team members, achievements, etc. — add it to `lib/mock-data`, fetch it
through a typed function in `lib/api`, and pass it into your component as a
prop. This is what lets us swap mock data for the real backend in Phase 2
without rewriting every page. Look at `app/page.tsx` for the pattern.

## Building a new page

1. Look at `src/app/about/page.tsx` — that's the minimal reference pattern.
2. If the page needs dynamic data, add types to `lib/types`, a JSON file to
   `lib/mock-data`, and a fetch function to `lib/api` — in that order.
3. Compose the page out of `components/sections/*` pieces. If a section
   will be reused elsewhere, build it as its own component; if it's truly
   one-off, it can live inline in the page file.
4. Use only `components/ui/*` for buttons, cards, and badges. If you need a
   variant that doesn't exist, add it to the shared component — don't
   fork a styled copy.

## Design tokens

Colors, type scale, and spacing all live in `tailwind.config.ts` and
`app/globals.css`. Don't introduce hex values or font sizes outside of
these files — extend them instead so the whole site stays consistent.

- `ink` — near-black text/background
- `paper` — warm neutral background
- `signal` — primary accent (links, primary actions)
- `spark` — secondary accent, used sparingly for highlights only
- `.bracket` (in globals.css) — the corner-accent motif, reserved for
  genuinely featured content, not applied to every card

## Before opening a PR

- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] Built and checked at mobile width first, then tablet/desktop
- [ ] No hardcoded content — data comes from `lib/api`
- [ ] Reused `components/ui` primitives rather than one-off styles
- [ ] Keyboard-tab through the page — focus state should always be visible
