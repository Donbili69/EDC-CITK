# EDC CITK website: standing instructions for AI coding assistants

These rules apply to every request in this repository. If a request conflicts
with them, say so and ask before proceeding.

## 1. Project and scope
- Project: the official website and scalable digital platform of the
  Entrepreneurship Development Club (EDC), CITK. Everyday name: "EDC CITK".
  Institute: Central Institute of Technology Kokrajhar.
- Our scope is FRONTEND ONLY, built against typed mock data. Never create or
  modify backend code, database, authentication, RBAC enforcement, file upload,
  notification or audit-log code. Never add real network calls to a backend or
  external API. Never create `/admin` routes (blocked until the backend exists).
- The product is not a static brochure. Anything a future EDC team would want to
  update (events, team, achievements, alumni, resources, timeline, stats, text)
  must come from data in `src/lib/mock-data` through `src/lib/api`, never from JSX.

## 2. Source of truth and open items
- Source of truth: the "EDC CITK Website Project Blueprint". `docs/COPILOT_BUILD_PROMPT.md`
  restates the frontend requirements. If this repo and the blueprint disagree,
  the blueprint wins; flag the difference instead of silently choosing.
- Layouts are designed by Alongbar (UI/UX). If exports exist in `/design`, follow
  them for layout. Until then follow the blueprint's design brief (section 5 below).
- OPEN ITEM, founding date: the blueprint says 30 July 2022, the club says
  31 July 2022. The value lives ONLY in `siteConfig.established`
  (`src/lib/config/site.ts`) and the first entry of
  `src/lib/mock-data/timeline.json`. Never type the date anywhere else. Never
  change the value unless the lead tells you to.
- Real club content (vision, mission, objectives, members, numbers, photos) is
  not available yet. Use clearly labelled placeholders ("Placeholder: ...").
  Never invent real people, achievements, statistics, quotes or partner names.

## 3. Stack (do not change without lead approval)
- Next.js 16 (App Router, Turbopack), React 19, TypeScript (strict), Tailwind CSS 3.4.
  Do NOT upgrade Tailwind to v4. ESLint 9 flat config (`eslint.config.mjs`);
  `npm run lint` runs `eslint .`. Node 24 (see `.nvmrc`).
- No new dependencies. CSS and the platform cover animation, observers and
  dialogs. Framer Motion is optional in the blueprint, but only add it if the
  lead approves in writing.
- Route `params` and `searchParams` are Promises in Next 16: `await` them.
- Server components by default. Add `"use client"` only for state, effects,
  event handlers or browser APIs, and keep client components small and leaf-level.

## 4. Architecture and data flow
Always in this order: `src/lib/types` -> `src/lib/mock-data/*.json` ->
`src/lib/api/*.ts` -> `src/components/sections/*` -> `src/app/<route>/page.tsx`.
- `lib/types` mirrors the blueprint entities. One definition per shape.
- `lib/api` functions are `async`, return typed data, and have stable signatures.
  Later only their bodies change (mock -> real fetch). Components never import
  JSON directly.
- Shared primitives live in `components/ui`. Page sections live in
  `components/sections`. Layout shell in `components/layout`.
- Reuse before creating: `Button`, `Card`, `Badge`, `Modal`, `Tabs`, `Pagination`,
  `Input/Textarea/Select`, `EventCard`, `EventStatusBadge`. Extend shared
  components with backwards-compatible props; never fork a copy.
- Reference implementations to copy: static page `app/about/page.tsx`; list with
  filters `components/sections/EventsExplorer.tsx` + `app/events/page.tsx`; detail
  `app/events/[slug]/page.tsx`; data layer `lib/api/events.ts`.
- Navigation links come from ONE file: `src/lib/config/navigation.ts`. Never add
  a link to a route that does not exist.
- Academic years are first-class data (see the build prompt). Never hardcode a
  year, a team structure or a list of members in a component.

## 5. Design system rules (blueprint design brief)
- Feel: premium university x startup ecosystem. Professional, modern,
  intelligent, energetic, credible.
- Colour only through tokens in `tailwind.config.ts` / `globals.css`: `ink`,
  `paper`, `paper-dim`, `line`, `signal` (EDC navy, primary), `spark` (single
  accent, use sparingly), `panel` / `on-panel` (dark brand surfaces). No raw hex,
  no arbitrary colour values, no new colours.
- Type: Space Grotesk (display) and Inter (body) via the existing scale
  (`text-display-xl|lg|md`, `text-body|small|micro`). Clear hierarchy, one h1 per page.
- Avoid: generic college look, excessive cards, gradients, heavy animation,
  clutter, too many colours, template-like layouts.
- Motifs: left-aligned headlines, hairline borders, `.grid-field` only behind
  page heroes, `.bracket` only on genuinely featured items.
- Mobile first. Mobile is a designed layout, not a squeezed desktop. Breakpoints:
  base (mobile), `md` (tablet), `lg` (desktop). Check 360, 390, 768, 1024, 1280.

## 6. Code standards
- TypeScript strict with `noUncheckedIndexedAccess`. No `any`, no `@ts-ignore`,
  no `eslint-disable`, no non-null assertions without a justifying comment.
- Props are typed with named interfaces. Small components, one responsibility.
- No `dangerouslySetInnerHTML`. Render text as text. External links use
  `target="_blank" rel="noopener noreferrer"`.
- Dates through `formatDate`; academic years displayed with an en dash
  (`2026-27` stored, `2026–27` shown) via a helper in `lib/utils/format.ts`.
- Comments explain why, not what. No dead code, no commented-out code, no TODOs
  without an owner and a task ID.

## 7. Accessibility, performance, SEO, security (production bar)
- Accessibility (WCAG 2.1 AA): landmarks, a skip link, logical heading order,
  labelled form controls, visible focus, 4.5:1 text contrast, meaningful `alt`
  (empty alt only for decorative images), 44px touch targets, keyboard-complete
  interactions (tabs, menus, dialogs, carousels), `aria-live` for async messages,
  `prefers-reduced-motion` respected.
- Performance: server-render content, `next/image` for all images through the shared
  `MediaImage` component with explicit dimensions (no layout shift), `next/font`,
  lazy-load below the fold, no unnecessary client JS. Target Lighthouse >= 90 on
  Performance, Accessibility, Best Practices and SEO for Home and Events.
- SEO: unique `title` and `description` per page (`generateMetadata` for dynamic
  routes), canonical + Open Graph, semantic HTML, JSON-LD where specified, all
  dynamic slugs in `app/sitemap.ts`.
- Error handling: `notFound()` for unknown slugs, `loading.tsx` skeletons on list
  and detail segments, friendly empty states, form error states.
- Security: no secrets in `NEXT_PUBLIC_*`, validate all form input on the client
  (server validation belongs to the backend), no inline event-handler strings.

## 8. Mock data rules
- JSON shaped exactly like the future API response. Realistic volume: enough
  items to exercise pagination (> page size), filters, empty and edge cases
  (missing optional fields, long titles, empty arrays).
- Everything placeholder is labelled "Placeholder". Images are empty strings
  until real assets exist; `MediaImage` renders a token-styled placeholder.

## 9. Workflow
- One task = one branch (`feat/<task-id>-<name>`) = one pull request. Conventional
  commits (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`).
- Before finishing any step run: `npm run typecheck && npm run lint && npm run build`.
  Fix root causes; never loosen rules to make a check pass.
- Do not rewrite working files unnecessarily. Keep diffs minimal and reviewable.
- Finish every task with the Report format in `docs/COPILOT_BUILD_PROMPT.md`.
- The human must be able to explain every line. Add a short "What I built and
  why" to the pull request description.

## 10. Definition of done
Builds clean (typecheck, lint, build); mobile, tablet and desktop checked;
keyboard-only walkthrough passes; no hardcoded content; reuses shared components;
loading, empty and not-found states exist; metadata set; navigation updated;
docs/TODO.md checkbox ticked; PR description written.

## 11. Never do
Backend or admin work; new dependencies; Tailwind 4 migration; raw colours;
hardcoded dates, names or numbers; invented facts; dead links; copy-pasted
components; disabling lint or type rules; editing generated files
(`next-env.d.ts`, lockfile by hand).
