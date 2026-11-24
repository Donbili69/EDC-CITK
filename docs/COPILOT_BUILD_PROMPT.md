# EDC CITK frontend: blueprint-aligned build prompt

Frontend only, on mock data. Restates the frontend parts of the "EDC CITK Website
Project Blueprint". Standing rules live in `.github/copilot-instructions.md`.

## 0. How to use
1. Save `copilot-instructions.md` as `.github/copilot-instructions.md`. Copilot loads it automatically.
2. Open Copilot Chat in **agent mode**. Paste **Section 1** (session preamble), then paste **one task** from Section 4. Never ask for everything at once.
3. Run F1 and F2 first (lead). Then run tasks in any order that respects "Depends on".
4. Read the diff yourself before committing. If you cannot explain a line, do not submit it.

| ID | Task | Level | Depends on |
|---|---|---|---|
| F1 | Types, academic years, mock-data foundation | Lead | none |
| F2 | Shared UI: MediaImage, Alert, Search, Skeleton, Breadcrumbs, ResourceCard, AchievementCard | Lead | F1 |
| T1 | Achievements | 1 | F1, F2 |
| T2 | Alumni + profile | 1 | F1, F2 |
| T15 | Announcement banner (optional) | 1 | F1 |
| T3 | Initiatives + detail | 2 | F1, F2 |
| T4 | Connect hub + five forms | 2 | F2 |
| T5 | Resources | 2 | F1, F2 |
| T6 | Navigation: dropdowns, breadcrumbs, skip link | 2 | F2 |
| T7 | Animated impact stats | 2 | none |
| T14 | Event detail extras | 2 | F1 |
| T8 | Team + academic-year switcher + profile | 3 | F1, F2 |
| T9 | Gallery (Year > Event > Photos) | 3 | F1, F2 |
| T10 | Ecosystem interactive diagram | 3 | F1 |
| T13 | Ecosystem topic pages | 2 | T10 |
| T11 | Home completion (11 sections) | 2 | T1, T3, T7, T8 |
| T12 | Insights + article (optional for V1) | 2 | F1, F2 |
| Q | Final quality pass (a11y, performance, SEO, responsive, docs) | Lead | all |

## 1. Session preamble (paste first)
```text
You are working in the EDC CITK frontend repository (Next.js 16, React 19, TypeScript strict, Tailwind 3.4). Frontend only, mock data only. Follow .github/copilot-instructions.md exactly.

Before writing any code:
1. Read README.md, docs/TASKS.md, docs/TODO.md, docs/ROADMAP.md and docs/COPILOT_BUILD_PROMPT.md (Sections 2 and 3 especially).
2. Read the reference implementations: src/app/about/page.tsx (static page), src/components/sections/EventsExplorer.tsx and src/app/events/page.tsx (list + filters), src/app/events/[slug]/page.tsx (detail), src/components/sections/EventCard.tsx (shared card), src/lib/api/events.ts (data layer), tailwind.config.ts and src/app/globals.css (tokens).
3. Run `git status` and `git log --oneline -10`.
4. Reply with: (a) a 10-line summary of the architecture as you understand it, (b) the exact files you plan to create or change for the task, (c) any blueprint requirement you think is missing or conflicting. Then WAIT for me to say "go".

After "go": work in small steps, run `npm run typecheck && npm run lint && npm run build` after each step, never loosen lint or type rules, and finish with the Report format from Section 6.
```

## 2. Shared specifications

### 2.1 The questions every visitor must be able to answer fast
Who is EDC CITK? What is its purpose? When was it established? What has it done?
What is happening now? Who runs it? Who are its advisors, mentors, alumni? What
initiatives does it run? How can I participate? How can I collaborate?
Technical test: can the next EDC team take the site over without rebuilding it?

### 2.2 Routes (blueprint sitemap)
| Route | Blueprint node |
|---|---|
| `/` | Home |
| `/about` (ids: `vision-mission`, `objectives`, `journey`) | About: About EDC, Vision & Mission, Objectives, Our Journey / Timeline |
| `/events`, `/events/[slug]` | Events: Upcoming, Past, Event Details |
| `/initiatives`, `/initiatives/[slug]` | Initiatives, Initiative Details |
| `/ecosystem`, `/ecosystem/[topic]` | Ecosystem: Students, Ideas & Innovation, Mentorship, Industry Connect, Alumni, Entrepreneurship |
| `/team`, `/team/[id]` | Team: Faculty Mentors, Club's Advisors, Chief & Asst. Chief Convener, Core Body - Conveners, Teams - Incharges & Coordinators, Member Profile |
| `/alumni`, `/alumni/[id]` | Alumni, Alumni Profile |
| `/achievements` | Achievements |
| `/resources` | Resources: Documents, Guides, Templates, Other Resources |
| `/insights`, `/insights/[slug]` | Insights, Article / Post |
| `/gallery`, `/gallery/[year]`, `/gallery/[year]/[eventSlug]` | Gallery, Event Gallery |
| `/connect`, `/connect/join`, `/connect/collaborate`, `/connect/invite`, `/connect/mentor`, `/connect/contact` | Connect |
| Admin Dashboard | NOT built (blocked on backend) |

Blueprint note: not every item belongs in the main navbar. Main navbar: About,
Events, Initiatives, Ecosystem, Team, Achievements, Connect, plus a "Join EDC"
button. Footer carries everything, including Alumni, Resources, Insights, Gallery.

### 2.3 Entities (frontend view). Extend `src/lib/types/index.ts`
```ts
export type AcademicYearId = string; // stored "2026-27"; displayed "2026–27"
export interface AcademicYear { id: AcademicYearId; startYear: number; isCurrent: boolean }

export type TeamTier = "faculty-mentor" | "advisor" | "chief" | "convener" | "incharge" | "coordinator";
export interface Module { slug: string; name: string; description?: string }
// Member (extend existing): add tier: TeamTier; moduleSlug?: string; bio?: string;
// social?: { linkedin?: string; instagram?: string; email?: string }

export type ResourceCategory = "documents" | "guides" | "templates" | "other";
export interface Resource {
  id: string; title: string; description: string; category: ResourceCategory;
  fileUrl: string; fileType: "pdf" | "docx" | "xlsx" | "pptx" | "other";
  sizeKb?: number; publishedAt: string; academicYear?: AcademicYearId; tags: string[];
}
export interface Article {
  slug: string; title: string; excerpt: string; body: string[]; // paragraphs, plain text
  author: string; publishedAt: string; coverImage: string; tags: string[]; readingMinutes: number;
}
export interface GalleryMedia {
  id: string; type: "photo" | "video"; src: string; alt: string; caption?: string;
  eventSlug: string; academicYear: AcademicYearId;
}
export interface EcosystemTopic {
  slug: string; title: string; stage: number; summary: string; body: string[];
  nodeLabel: string; // label in the diagram, see T10
}
export interface Announcement { id: string; message: string; href?: string; startsAt: string; endsAt: string }

// Event (extend existing EventDetail): startTime?: string ("10:00"); endTime?: string;
// videos: { title: string; url: string }[]; results: { position: string; team: string; project?: string }[]
// Initiative (extend): academicYear: AcademicYearId; gallery: string[]; relatedResourceIds: string[]
// Achievement and AlumniProfile already exist; reuse them.

// Form payloads (UI only; mirrors blueprint entities JoinApplication, CollaborationRequest,
// WorkshopRequest, MentorRequest, ContactSubmission)
export interface JoinApplicationPayload { name: string; email: string; phone?: string; department: string; year: string; whyJoin: string }
export interface CollaborationRequestPayload { organization: string; contactName: string; email: string; collaborationType: string; message: string }
export interface WorkshopRequestPayload { institution: string; contactName: string; email: string; topic: string; proposedDate?: string; audienceSize?: number; message: string }
export interface MentorRequestPayload { name: string; email: string; expertise: string; organization?: string; linkedin?: string; availability: string; message: string }
export interface ContactPayload { name: string; email: string; subject: string; message: string }
```
Not needed in the frontend: User, Role, Admin, Notification, AuditLog, SiteSettings
admin fields, EventRegistration storage. Event registration is a link or button state only.

### 2.4 Academic-year architecture
Blueprint: the site is a long-term archive. Each year (2026–27, 2027–28, 2028–29...)
has its own core team, events, initiatives, achievements, gallery and reports. Past
years stay archived and reachable.
- Source: `lib/mock-data/academic-years.json` (2024-25, 2025-26, 2026-27 current).
- `lib/api/academic-years.ts`: `getAcademicYears()` (newest first), `getCurrentAcademicYear()`.
- Every dated entity carries `academicYear`. Never derive it in a component.
- Adding a future year must need only new JSON/API data, no code change.

### 2.5 Mock-data volumes (enough to test pagination and filters)
Events 11 (exists), achievements >= 14 (all 7 categories, 3 years), alumni >= 15
(>= 4 graduation years, >= 4 departments), team members >= 30 (2026-27 and
2025-26, every tier, >= 5 modules), initiatives >= 5, resources >= 12 (all 4
categories), articles >= 6, gallery media >= 24 across >= 4 events, ecosystem
topics 6 (+ nodes, see T10). Include edge cases: no LinkedIn, long names, empty arrays.

### 2.6 API conventions
`async` functions, typed returns, no JSON import outside `lib/api`. List
functions take an optional filter object. Detail functions return `T | null`.
Pages call `notFound()` on null. Names: `getX`, `getXBySlug|Id`, `getRelatedX`,
`getFeaturedX(limit)`.

### 2.7 Responsive priorities (blueprint)
Design desktop -> tablet -> mobile, mobile is not a compressed desktop. Prioritise:
navigation, typography, event information, team browsing, forms, gallery, CTA buttons.

## 3. Foundations

### F1. Types, academic years, mock-data scaffolding (lead)
- Add all types in 2.3. Keep existing fields; make additions backwards compatible.
- Create `academic-years.json` + `lib/api/academic-years.ts`.
- Create mock JSON and `lib/api` modules (stable signatures, no UI yet) for: team
  (`getTeam(yearId)`, `getModules()`, `getMemberById`, `getLeadershipPreview(limit)`,
  `getAdvisorsPreview(limit)`), achievements, alumni, initiatives, resources,
  articles, gallery, ecosystem topics, announcements, forms (`submitForm` placeholder
  that resolves `{ ok: true }` after a short delay, never calls the network).
- Set all mock image fields to `""` (empty). Add to `lib/utils/format.ts`:
  `formatAcademicYear`, `formatTime`.
- Acceptance: build is green; no component imports JSON; every list has the volumes in 2.5.
- Commit: `feat(data): add types, academic years and mock data for all entities`

### F2. Shared UI (lead). `components/ui` unless noted
- `MediaImage`: wraps `next/image`; props `src?`, `alt`, `aspect` ("16/9" | "4/3" | "1/1" | "3/4"),
  `priority?`, `sizes?`. Empty `src` renders a token-styled placeholder block with the
  same aspect ratio (no layout shift). All images in the app use it.
- `Alert` (info | success | warning | error; `role="status"` or `role="alert"`).
- `SearchInput` (labelled, clear button, debounced `onChange`, `type="search"`).
- `Skeleton` primitives for card grids and text blocks.
- `Breadcrumbs` (nav landmark, `aria-current="page"`, optional BreadcrumbList JSON-LD).
- `ResourceCard`, `AchievementCard` in `components/sections`, same style as `EventCard`.
- Apply `MediaImage` to existing `EventCard` and the event detail banner.
- Acceptance: each component keyboard accessible, token colours only, example usage
  in a scratch route that is deleted before commit.
- Commit: `feat(ui): add MediaImage, Alert, SearchInput, Skeleton, Breadcrumbs, cards`

## 4. Tasks

### T1. Achievements (`/achievements`)
- Blueprint: database-driven; categories: Competitions, Recognition, Innovation,
  Entrepreneurship, Collaborations, Institutional achievements, Team/student achievements.
- Build: `AchievementsExplorer` (client; copy `EventsExplorer`): category filter (accessible
  tab/radio group with "All"), academic-year select, pagination (9 per page), empty state.
  Page header, `generateMetadata`, `loading.tsx`.
- Data: `getAchievements(filters)`, `getAchievementCategories()`, `getFeaturedAchievements(limit)`.
- Acceptance: all 7 categories filterable, year filter works, empty state, 360px layout checked.
- Commit: `feat(achievements): add achievements page with filters`

### T2. Alumni (`/alumni`, `/alumni/[id]`)
- Blueprint fields: name, graduation year, department, EDC role/tenure, current position,
  organization, LinkedIn/professional link, optional alumni message. Must support future batches.
- Build: directory with `SearchInput` (name, organization), graduation-year and department
  filters (options derived from data, so new batches appear automatically), `AlumniCard`,
  pagination. Profile page with all fields, message block only when present, LinkedIn as external
  link, breadcrumbs, `generateStaticParams`, `notFound()`.
- Acceptance: adding a 2030 batch to JSON needs no code change.
- Commit: `feat(alumni): add alumni directory and profile`

### T15. Announcement banner (optional)
- Blueprint entity: Announcement. Build `AnnouncementBanner` (client) above the navbar: shows
  the active announcement (between `startsAt` and `endsAt`), optional link, dismiss button.
  Persist dismissal per announcement id in `localStorage` inside try/catch; render nothing until
  mounted (no hydration mismatch). `role="region"` with `aria-label="Announcement"`.
- Acceptance: hidden when none active; dismissal survives reload; keyboard dismissible.
- Commit: `feat(layout): add announcement banner`

### T3. Initiatives (`/initiatives`, `/initiatives/[slug]`)
- Blueprint: initiatives are separate from events. Fields: title, description, objective,
  activities, related events, impact, gallery, related resources.
- Build: listing (cards, year filter), detail page with those sections (hide empty ones),
  related events via `getRelatedEvents` + `EventCard`, related resources via `ResourceCard`,
  gallery via `MediaImage` grid, breadcrumbs, metadata, static params.
- Acceptance: every blueprint field renders from data; empty arrays do not break layout.
- Commit: `feat(initiatives): add initiatives listing and detail`

### T4. Connect (`/connect`, `/connect/*`)
- Blueprint CTAs, kept separate:
  Join EDC (for students); Collaborate With EDC (organizations, individuals, companies);
  Invite EDC (institutions, events, workshops); Become a Mentor (mentors, experts);
  Contact Us (general communication).
- Build: hub with five CTA cards (each states its audience); one route and one form per CTA
  using the payloads in 2.3 and `components/ui/Input`. Shared `FormShell` for layout, status and
  errors. Client validation (required, email format, optional phone/URL checks), inline field
  errors linked with `aria-describedby`, submit button disabled while pending, `submitForm()`
  placeholder, success `Alert` (`role="status"`) and error `Alert` (`role="alert"`), form resets
  on success. No network call, no storage of submissions.
- Acceptance: all five forms keyboard-completable; errors announced to screen readers; works at 360px.
- Commit: `feat(connect): add connect hub and five forms (UI only)`

### T5. Resources (`/resources`)
- Blueprint: Documents, Guides, Templates, Other Resources; PDF/document support and categorization
  (upload itself is backend/admin work; we only display and link).
- Build: `Tabs` for the four categories + "All", `SearchInput`, pagination, `ResourceCard` (title,
  description, file-type badge, size, year, download link). Add one tiny placeholder file at
  `public/files/placeholder.pdf` and point mock `fileUrl` at it. Links use the `download` attribute.
- Acceptance: category and search combine; file type and size shown; empty state.
- Commit: `feat(resources): add resources page`

### T6. Navigation (global)
- Build `lib/config/navigation.ts` as the ONE source for navbar and footer. Each item has an
  `enabled` flag; items whose route does not exist yet are not rendered. Each later task flips its flag.
- Navbar dropdown groups (blueprint sitemap): About (About EDC, Vision & Mission, Objectives, Our
  Journey: anchors on `/about`); Events (Upcoming `/events?status=upcoming`, Past `/events?status=past`;
  make `/events` read `searchParams` for the initial tab); Ecosystem (six topics); Team (Faculty Mentors,
  Club's Advisors, Chief & Asst. Chief Convener, Core Body - Conveners, Teams - Incharges & Coordinators:
  anchors on `/team`); Connect (five CTAs). Initiatives and Achievements are plain links.
- Desktop dropdown: button with `aria-expanded`/`aria-controls`, opens on click (hover optional),
  `Esc` closes and returns focus, click outside closes, arrow keys optional. Mobile: full-height menu
  with accordion groups, body scroll lock, 44px targets, focus trap, `Esc` closes.
- Add: skip-to-content link, `aria-current="page"` on active links, ids on `/about` sections.
  Use `Breadcrumbs` on every detail page.
- Acceptance: keyboard-only navigation works end to end; no dead links; navbar and footer both
  read the same config.
- Commit: `feat(nav): shared navigation config, dropdowns, skip link, breadcrumbs`

### T7. Animated impact stats (Home, About)
- Blueprint: animated but subtle. Build `StatCounter` (client): count up once when 40% visible
  (`IntersectionObserver`), ~1.2s ease-out, final value in the server-rendered markup (works without
  JS), `prefers-reduced-motion` shows the final value instantly, tabular numerals. No library.
- Replace the static values in `ImpactStats` using it.
- Acceptance: no layout shift, no re-run on scroll, screen readers read the final number.
- Commit: `feat(home): animate impact stats`

### T14. Event detail extras
- Blueprint event page: cover/banner, title, date & time, venue, description, organizers,
  speakers/guests, schedule, registration, photos, videos, winners/results, report, related events.
- Add: `startTime/endTime` ("10:00 AM - 1:00 PM IST" when present), videos (external links with titles,
  no third-party embeds), winners/results table, registration states (open / closed / past), JSON-LD
  `Event` structured data, `MediaImage` banner. Past events stay fully reachable as an archive.
- Update mock events (some with and some without these fields).
- Acceptance: sections hide when data is empty; JSON-LD validates.
- Commit: `feat(events): add time, videos, results and structured data`

### T8. Team (`/team`, `/team/[id]`)
- Blueprint hierarchy: Club's Advisors -> Chief & Asst. Chief Convener -> Conveners & In-charges ->
  Coordinators / Team Members; plus Faculty Mentors. Exact members come from data, never hardcoded.
- Page sections in order with anchor ids: `faculty-mentors`, `advisors`, `chief-conveners`, `conveners`,
  `teams` (in-charges and coordinators grouped by module).
- Features: academic-year selector, module/team filter, member cards with role and department/year where
  relevant, optional social links, member profile for everyone.
- State lives in the URL: `/team?year=2026-27&module=media`. The page is a server component reading
  `searchParams`. `AcademicYearSwitcher` and the module filter render as `Link`s (SSR, shareable,
  accessible). Default year = current. Leadership tiers stay visible when a module filter is active; the
  filter applies to conveners, in-charges and coordinators.
- Visual: a clean organisation visualisation, not a flat list. On `md+` tiers are horizontal bands joined by
  hairline connectors, with larger cards for chiefs. On mobile, tiers stack with headings and no connectors.
- `MemberCard` is the single card. Profile: photo (`MediaImage`), name, role, module, department/year, bio,
  social links, breadcrumbs, back link, `generateStaticParams`, `notFound()`.
- Home previews: switch `getTeamPreview` to `getLeadershipPreview`.
- Acceptance: switching years changes the team; a year with no data shows an empty state; adding a year
  needs no code change; keyboard works.
- Commit: `feat(team): add team hierarchy, academic-year switcher and profiles`

### T9. Gallery (`/gallery`, `/gallery/[year]`, `/gallery/[year]/[eventSlug]`)
- Blueprint: avoid one giant photo dump. Structure Gallery -> Year -> Event -> Photos/Videos.
- Build: years overview (counts + cover), year page listing events with media, event gallery grid with a
  lightbox built on `Modal` (arrow keys, `Esc`, focus trap and return, counter "3 / 12", required `alt`,
  captions). Photos lazy-load inside aspect-ratio boxes. Videos open the external URL (no embeds).
- Acceptance: three levels navigable by keyboard; breadcrumbs on each level; no layout shift.
- Commit: `feat(gallery): add year > event > media gallery with lightbox`

### T10. Ecosystem diagram (`/ecosystem`)
- Blueprint, one of the signature elements: interactive, not just text. Flow, in this order:
  Students -> Ideas -> EDC -> Mentorship -> Competitions -> Industry -> Startups -> Alumni.
- Build: `EcosystemDiagram` (client). Eight nodes as buttons. Selecting a node shows a detail panel
  (title, summary, link to the matching topic page or section). Node to topic map: Students ->
  students; Ideas -> ideas-innovation; EDC -> `/about`; Mentorship -> mentorship; Competitions ->
  `/events` (Competition category); Industry -> industry-connect; Startups -> entrepreneurship;
  Alumni -> alumni. Show a feedback arrow from Alumni back to Students (the loop).
- Keyboard: roving tabindex, arrow keys move, `Enter/Space` select, `aria-pressed`, visible focus.
  Mobile: vertical stepper with the same panel. Motion subtle and disabled under reduced motion.
  CSS/SVG only. Update the Home ecosystem strip to link here.
- Acceptance: all eight nodes in blueprint order; works with keyboard and touch.
- Commit: `feat(ecosystem): add interactive ecosystem diagram`

### T13. Ecosystem topic pages (`/ecosystem/[topic]`)
- Six topics: Students, Ideas & Innovation, Mentorship, Industry Connect, Alumni, Entrepreneurship.
- One template: title, summary, body paragraphs, "What EDC does here", related links (events, initiatives,
  resources), previous/next topic navigation, breadcrumbs, `generateStaticParams`, `notFound()`.
- Commit: `feat(ecosystem): add ecosystem topic pages`

### T11. Home completion (`/`)
Order, per blueprint: 1 Hero / EDC identity, 2 Short introduction, 3 Impact statistics, 4 Featured
initiatives, 5 Upcoming events, 6 Recent/past events, 7 EDC ecosystem, 8 Achievements, 9 Team preview,
10 Advisors/faculty mentors preview, 11 Final CTA (Join / Collaborate / Connect).
- Dynamic: statistics, events, initiatives, achievements, team preview. Add `getFeaturedInitiatives`,
  `getRecentEvents`, `getFeaturedAchievements`, `getAdvisorsPreview`.
- Hero answers "who, what, since when" immediately (founding date from `siteConfig`).
- A section with no data is omitted (except hero and final CTA). Each section links to its page.
- Acceptance: all 11 sections render from data; Lighthouse >= 90 on mobile.
- Commit: `feat(home): complete all eleven blueprint sections`

### T12. Insights (`/insights`, `/insights/[slug]`) (optional for V1)
- Blueprint: lightweight blog/CMS-style: entrepreneurship articles, EDC updates, event learnings, startup
  knowledge, student stories.
- Build: listing with tag filter, `SearchInput`, pagination; article page with title, author, date, reading
  time, cover, paragraphs from `body: string[]` (no HTML injection), tags, related articles, `Article`
  JSON-LD, breadcrumbs, static params.
- Commit: `feat(insights): add articles listing and article page`

## 5. Final quality pass (Q, lead)
- Accessibility: keyboard-only walkthrough of every route; screen-reader spot check; contrast; heading order;
  run an automated audit (Lighthouse + axe) and fix every serious finding.
- Performance: Lighthouse >= 90 mobile on Home, Events, Team; fonts, images, client JS bundle reviewed.
- SEO: metadata on every route; JSON-LD (Organization on Home, Event, Article, BreadcrumbList); `app/sitemap.ts`
  includes every dynamic slug (events, initiatives, alumni, team members, articles, gallery, ecosystem topics).
- Responsive: verify 360, 390, 768, 1024, 1280, 1536 on every route; no horizontal scroll.
- Consistency: no raw colours, no duplicate components, no dead links, `enabled` flags match shipped routes.
- Docs: update README, tick `docs/TODO.md`, add `docs/COMPONENTS.md` listing each shared component and its props.
- Not in this pass (blocked on backend): admin UI, real form submission, real API wiring.

## 6. Report format (end of every task)
1. Files created / changed (grouped).
2. Commands run and their results (typecheck, lint, build).
3. How each acceptance criterion was met.
4. Deviations from this prompt or the blueprint, and why.
5. Open questions for the lead.
6. "What I built and why": five lines a junior can say out loud in review.
