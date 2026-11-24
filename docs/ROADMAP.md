# Frontend roadmap

Frontend only. Backend, auth, admin and real API wiring are owned by the backend developer.

## Done
- Project foundation, tooling, CI, upgraded to current Next.js
- UI kit: Button, Card, Badge, Modal, Tabs, Pagination, Input/Textarea/Select
- Layout shell: Navbar, Footer
- Home, About, Events (listing + detail)
- Dark theme (default), built on CSS variable tokens

## Next
1. Team page: hierarchy, academic-year selector, module filter, member cards
2. Member profile page (`/team/[id]`)
3. Alumni, Achievements
4. Initiatives (listing + detail)
5. Connect (five form UIs, no submit logic)
6. Gallery (Year > Event > Photos)
7. Ecosystem (interactive diagram)

## Deferred to the end of the project
- **Journey timeline redesign.** The current `JourneyTimeline` is a simple
  expandable list. A new design is planned once the rest of the site is done.
  Keep the data contract (`TimelineMilestone`, first entry 30 July 2022).
- Tailwind 4 migration (clears remaining dev-tooling audit warnings)
- Light/dark toggle (light tokens already exist under `data-theme="light"`)
- Filters saved in the URL (Events, later Team)
- Replace all placeholder copy and images with real content
