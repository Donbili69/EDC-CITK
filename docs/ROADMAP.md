# Frontend roadmap

Frontend only. Backend, auth, the database and real API wiring belong to the
backend developer. We build against typed mock data in `lib/mock-data` and swap
the bodies of `lib/api` functions later.

Source of truth: the EDC CITK Website Project Blueprint. If this repo and the
blueprint disagree, the blueprint wins; raise it with the lead.

## Done (lead)
- Foundation: Next.js, TypeScript, Tailwind, ESLint/Prettier, CI
- UI kit: Button, Card, Badge, Modal, Tabs, Pagination, Input/Textarea/Select
- Layout: Navbar, Footer
- Reference patterns: About (static page), Events listing (list + filters +
  pagination), Event detail (detail page)
- Home: 6 of 11 blueprint sections
- Provisional dark theme on CSS-variable tokens

## Open tasks
See `docs/TODO.md` (master checklist and schedule), `docs/TASKS.md` (task briefs)
and `docs/JUNIOR_INFO.md` (team note).

## Lead-owned
- Align design tokens with the official brand and the Figma designs when
  they arrive (only `tailwind.config.ts` + `globals.css` should change)
- Code review and merges
- Decide ownership of Admin Login / Dashboard screens (blueprint Phase 2)

## Deferred to the end of the project
- Journey timeline redesign (keep the `TimelineMilestone` data contract;
  first entry is 30 July 2022)
- Tailwind 4 migration
- Light/dark toggle (light tokens already exist)
- Filters saved in the URL
- Replace all placeholder copy, numbers and images with real content
  (including confirming the club's full name in the footer)

## Decisions log
- **Brand:** navy blue represents EDC CITK. Default theme is neutral
  background + dark text + navy primary (`--signal`), with amber (`--spark`)
  as the single sparing accent. Dark theme exists but is optional/parked.
- **Design source:** layouts by Alongbar (UI/UX). He does not have the
  official Figma file on the EDC email account. We need his screens or an
  export so pages can be matched to his layout, not guessed.
- **Naming:** "EDC CITK" is the everyday name (institute norms, avoids typos).
  Use "Entrepreneurship Development Club (EDC), CITK" only in formal places.
  Both live in `lib/config/site.ts`.
- **Admin access (policy, not a build order):** Super Admin access for the
  main frontend developer and main backend developer; Admin access for the
  Chief and Asst. Chief Convener. Admin UI build is Phase 2 and depends on
  backend auth/API.
- **OPEN: founding date.** Blueprint says 30 July 2022; club says 31 July
  2022. Single source: `siteConfig.established` + first entry of
  `lib/mock-data/timeline.json`. Do not edit anywhere else.
