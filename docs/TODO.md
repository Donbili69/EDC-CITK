# EDC CITK Frontend: master to-do list

Scope: **frontend only, on mock data.** Backend, database, auth and real API
wiring belong to the backend developer and are out of scope here.
Source of truth: the EDC CITK Website Project Blueprint.

Legend: `[x]` done, `[ ]` open. `T#` = task brief in `docs/TASKS.md`.
Owner: **Lead** = frontend lead, **Dev A / B / C** = junior slots (names in
`docs/JUNIOR_INFO.md`).

---

## 0. Team setup (everyone, Week 1)
- [ ] Install Node 24, clone the repo, `npm install`, `cp .env.example .env.local`
- [ ] `npm run dev`, `npm run typecheck`, `npm run lint` all pass locally
- [ ] Read `README.md`, `docs/TASKS.md`, `docs/JUNIOR_INFO.md`
- [ ] Protect `main` on GitHub: pull request + passing CI + 1 review required
- [ ] Branch naming: `feat/<task-id>-<short-name>` (example: `feat/t1-achievements`)
- [ ] Create a GitHub Project board with one card per task
- [ ] Weekly 30-minute frontend sync (demo, blockers, next tasks)

## 1. Foundation (Lead)
- [x] Next.js + TypeScript + Tailwind, ESLint/Prettier, CI, husky hooks
- [x] Mock-data layer: `lib/types` -> `lib/mock-data` -> `lib/api`
- [x] UI kit: Button, Card, Badge, Modal, Tabs, Pagination, Input/Textarea/Select
- [x] Layout shell: Navbar (mobile menu), Footer
- [x] Error, loading and 404 pages; sitemap and robots
- [x] Navy brand theme on CSS-variable tokens
- [x] Central site config (`lib/config/site.ts`)
- [ ] **L1** Match layouts and tokens to Alongbar's designs (needs his screens)
- [ ] **L2** Build shared `Alert`, `Search` input and `Skeleton` components (needed by T2, T4)
- [ ] **L3** Add types + mock data for: Resource, Article, EcosystemTopic, Module, Announcement (so juniors are not blocked)
- [ ] **L4** Confirm founding date (30 vs 31 July 2022), then update `siteConfig` + `timeline.json`
- [ ] **L5** Collect real content from the Chief/Asst. Chief: vision, mission, objectives, team structure, stats, photos
- [ ] **L6** Review pull requests within 24 hours

## 2. Pages, in sitemap order

### Home (T11)
- [x] Hero / EDC identity
- [x] Impact statistics (static)
- [x] Upcoming events
- [x] EDC ecosystem strip
- [x] Team preview
- [x] Final CTA (Join / Collaborate / Connect)
- [ ] Short introduction
- [ ] Featured initiatives (needs T3)
- [ ] Recent / past events
- [ ] Achievements preview (needs T1)
- [ ] Advisors / faculty mentors preview (needs T8)

### About
- [x] About, Vision, Mission, Objectives, What EDC does
- [x] Journey timeline (current version, starts with the founding date)
- [ ] Replace placeholder copy with real text (L5)

### Events
- [x] Listing: Upcoming / Ongoing / Past tabs, year + category filters, pagination
- [x] Event detail: banner, date/venue, description, organizers, speakers, schedule, registration link, photos, report, related events
- [ ] **T14** Add videos and winners/results sections (type + mock data + UI)
- [ ] Past events stay reachable as an archive (verify after real data arrives)

### Initiatives (T3)
- [ ] Listing page
- [ ] Detail page: description, objective, activities, related events, impact, gallery, related resources

### Ecosystem
- [ ] **T10** Interactive diagram: Students -> Ideas -> EDC -> Mentorship -> Competitions -> Industry -> Startups -> Alumni
- [ ] **T13** Sub-pages: Students, Ideas & Innovation, Mentorship, Industry Connect, Alumni, Entrepreneurship

### Team (T8)
- [ ] Hierarchy: Advisors -> Chief & Asst. Chief Convener -> Conveners & In-charges -> Coordinators
- [ ] Faculty Mentors and Club's Advisors sections
- [ ] Academic-year selector (reusable `AcademicYearSwitcher`)
- [ ] Module/team filter (leadership stays visible)
- [ ] Member card and member profile page
- [ ] Optional LinkedIn / social links

### Alumni (T2)
- [ ] Directory with search and graduation-year filter
- [ ] Alumni profile page
- [ ] Supports adding future batches (data-driven, no hardcoding)

### Achievements (T1)
- [ ] Category filters + academic-year filter
- [ ] Achievement card

### Resources (T5)
- [ ] Categories: Documents, Guides, Templates, Other
- [ ] Resource card with download link to placeholder file

### Insights (T12, optional for V1)
- [ ] Article listing
- [ ] Article detail page

### Gallery (T9)
- [ ] Structure: Gallery -> Year -> Event -> Photos/Videos
- [ ] Lightbox using `Modal`

### Connect (T4)
- [ ] Hub page with five separate CTAs
- [ ] Join EDC form (students)
- [ ] Collaborate form (organizations / companies)
- [ ] Invite / Workshop form (institutions)
- [ ] Become a Mentor form
- [ ] Contact form
- [ ] Validation, error and success states (UI only; submit calls a placeholder in `lib/api/forms.ts`)

### Navigation and shared UI (T6)
- [ ] Navbar dropdowns for nested groups; mobile accordion
- [ ] `Breadcrumbs` on detail pages
- [ ] Not every page in the main navbar (blueprint note)
- [ ] **T15 (optional)** Announcement banner

## 3. Signature elements
- [ ] Interactive ecosystem diagram (T10)
- [ ] Team structure as an organization visual (T8)
- [ ] Academic-year switcher across Team / Events / Achievements / Gallery (T8, then reuse)
- [ ] Animated impact stats, subtle, respects reduced motion (T7)
- [x] Dynamic event system
- [ ] **Journey timeline redesign** (end of project; keep the data contract)

## 4. Quality (continuous, final pass in Week 6)
- [ ] Every page checked mobile first, then tablet and desktop
- [ ] Keyboard-only walkthrough of every page; visible focus
- [ ] Colour contrast and heading order checked; images have alt text
- [ ] Performance: `next/image`, font loading, lazy-load below the fold, Lighthouse on Home and Events
- [ ] SEO: per-page titles and descriptions, dynamic sitemap entries for event/initiative/alumni slugs
- [ ] Error and empty states on every list and detail page
- [ ] README and component notes up to date
- [ ] Analytics: leave a clearly marked spot for the script (final tool chosen with backend lead)
- [ ] Optional, beyond the blueprint: a few smoke tests for the shared UI kit

## 5. Backend integration readiness (frontend side only; blocked until endpoints exist)
- [ ] Meeting with backend lead: endpoints, response shapes, pagination, error format, role names, media URLs, dev API URL, CORS
- [ ] Add a small shared fetch helper with error handling in `lib/api`
- [ ] Replace each `lib/api/*.ts` function body with a real call; signatures stay the same
- [ ] Add the media host to `images.remotePatterns` in `next.config.js`
- [ ] Connect forms to the real submit endpoints
- [ ] Admin Login and Dashboard UI (blueprint Phase 2; access: Super Admin for the main frontend and backend developers, Admin for Chief and Asst. Chief)

## 6. Launch prep
- [ ] Alongbar signs off the final look
- [ ] All placeholder copy, numbers and images replaced
- [ ] Decide frontend hosting and who deploys (with the backend lead)
- [ ] Domain, HTTPS, environment variables set
- [ ] Final review by the Chief and Asst. Chief
- [ ] Handover note so the next EDC team can take over

---

## Out of scope for this team
API and server code, database, authentication and RBAC enforcement, file
uploads, form storage, notifications, audit logs, backups.

## Suggested schedule (relative weeks; adjust to capacity)
| Week | Lead | Dev A | Dev B | Dev C |
|---|---|---|---|---|
| 1 | Setup, L2, L3, L1 | T1 Achievements | T4 Connect forms | T6 Navigation |
| 2 | Reviews, L4/L5 | T2 Alumni | T3 Initiatives | T7 Animated stats |
| 3 | Reviews | T9 Gallery (start) | T5 Resources | T14 Event extras |
| 4 | T8 Team (or review it) | T9 Gallery (finish) | T13 Ecosystem sub-pages | T10 Ecosystem diagram |
| 5 | Reviews | T11 Home completion | Polish + fixes | Polish + fixes |
| 6 | Quality pass (section 4) | Fixes | Fixes | Fixes |
| 7+ | Backend integration (section 5), timeline redesign, launch prep | | | |

With only two juniors, Dev C's tasks are split between Dev A and Dev B after
Week 3, and the schedule stretches by about two weeks.
