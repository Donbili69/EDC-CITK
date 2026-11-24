# Junior task board

## How to work
- One task = one branch = one pull request. Use the PR template.
- Copy the **reference pattern** named in your task. Do not invent a new one.
- Data flow, always in this order: `lib/types` -> `lib/mock-data` ->
  `lib/api` -> `components/sections` -> `app/<route>/page.tsx`.
- Never hardcode content in a component. Reuse `components/ui/*`.
- Mobile first. Tab through your page with the keyboard.
- Stuck for more than 30 minutes? Ask. Then write down what you learned.
- Frontend only: no real network calls, no auth, no database.

## Reference patterns already built
| Need | Look at |
|---|---|
| Static content page | `app/about/page.tsx` |
| List + tabs + filters + pagination | `components/sections/EventsExplorer.tsx`, `app/events/page.tsx` |
| Detail page (`[slug]`) | `app/events/[slug]/page.tsx` |
| Shared card | `components/sections/EventCard.tsx` |
| Data access layer | `lib/api/events.ts` |

## Level 1 (first tasks)
**T1. Achievements page** (`/achievements`)
- Blueprint: categories (Competitions, Recognition, Innovation, Entrepreneurship, Collaborations, Institutional, Team/student). Database-driven.
- Build: `AchievementCard`, category tabs, academic-year filter, 8+ mock items across 2 years.
- Copy: Events listing. Type `Achievement` already exists.
- Done when: filters work, empty state shown, mobile layout checked, no hardcoded content.
- You learn: the full data flow, client-side filtering.

**T2. Alumni directory** (`/alumni`, `/alumni/[id]`)
- Blueprint: name, graduation year, department, EDC role/tenure, current position, organization, LinkedIn, optional message. Must support adding future batches.
- Build: `AlumniCard`, search by name, filter by graduation year, profile page.
- Copy: Events listing + Event detail. Type `AlumniProfile` exists.
- You learn: search input state, dynamic routes, `notFound()`.

## Level 2
**T3. Initiatives** (`/initiatives`, `/initiatives/[slug]`)
- Blueprint: initiatives are separate from events. Fields: title, description, objective, activities, related events, impact, gallery, related resources.
- Build: listing, detail, related events using `getRelatedEvents`. Reuse `EventCard`.
- You learn: connecting two data sets, reusing components.

**T4. Connect** (`/connect`)
- Blueprint: Join EDC, Collaborate, Invite/Workshop, Mentor With Us, Contact, each its own CTA and form.
- Build: hub page + five forms with `Input/Textarea/Select`. Native validation + clear error and success messages. Submit calls a placeholder in `lib/api/forms.ts` that just resolves; the backend dev replaces it later.
- You learn: form state, accessible labels and errors, separating UI from submission.

**T5. Resources** (`/resources`)
- Blueprint: Documents, Guides, Templates, Other. PDF/document support.
- Build: category tabs, `ResourceCard` with a download link to a placeholder file.
- You learn: tabs, file links, typing a new entity.

**T6. Navigation upgrades**
- Blueprint: dropdowns for nested sitemap groups; Breadcrumbs component; not every page in the main navbar.
- Build: desktop dropdown, mobile accordion, `Breadcrumbs` used on detail pages.
- You learn: keyboard-accessible menus, ARIA.

**T7. Animated impact stats**
- Blueprint: animated but subtle. Count up once when scrolled into view.
- Must respect `prefers-reduced-motion`. No animation library needed.
- You learn: IntersectionObserver, accessibility of motion.

## Level 3 (stronger juniors, with lead review)
**T8. Team page** (`/team`, `/team/[id]`)
- Blueprint: Advisors -> Chief & Asst. Chief Convener -> Conveners & In-charges -> Coordinators; academic-year selector; module filters; member cards; profile for all.
- Build: a tiered hierarchy visual (not a flat list), reusable `AcademicYearSwitcher`, `MemberCard`. Leadership stays visible when a module filter is on.
- Add a `tier` field to `Member`. Structure comes from EDC's real organisational data, never hardcoded.
- You learn: data-shaped UI, reusable controls.

**T9. Gallery** (`/gallery`, nested Year -> Event -> Photos)
- Blueprint: avoid one giant photo dump.
- Build: nested routes, photo grid, lightbox using `Modal`.
- You learn: nested dynamic routes, focus management.

**T10. Ecosystem page** (`/ecosystem`)
- Blueprint: interactive, not just text. Students -> Ideas -> EDC -> Mentorship -> Competitions -> Industry -> Startups -> Alumni.
- Build: interactive diagram (hover/click/keyboard to explore each node), mobile-friendly alternative.
- You learn: SVG or CSS layout, interaction design, accessibility.

**T11. Complete the Home page**
- Missing blueprint sections: short introduction, featured initiatives, recent/past events, achievements, advisors/faculty mentors preview.
- Depends on T1, T3, T8 data functions.
- You learn: composing a page from existing sections.

## Optional
**T12. Insights** (`/insights`, `/insights/[slug]`): article listing and article page. Optional for V1 per the blueprint.

## Added tasks
**T13. Ecosystem sub-pages** (`/ecosystem/[topic]`) (Level 2-3)
- Blueprint: Students, Ideas & Innovation, Mentorship, Industry Connect, Alumni, Entrepreneurship.
- Build: one dynamic route driven by an `EcosystemTopic` mock-data list, linked from the ecosystem diagram.
- Copy: Event detail page.
- You learn: one route template serving many pages.

**T14. Event detail extras** (Level 2)
- Blueprint: videos and winners/results on the event page.
- Build: extend `EventDetail` type and mock data, add two sections that hide when empty.
- You learn: evolving a type safely across data, API and UI.

**T15. Announcement banner** (Level 1, optional)
- Blueprint entity: Announcement.
- Build: dismissible banner above the navbar, driven by mock data.
- You learn: client state, small shared components.
