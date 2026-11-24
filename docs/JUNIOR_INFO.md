# Welcome, frontend team

## The project
We are building the official website of **EDC CITK** (Entrepreneurship
Development Club (EDC), CITK). It is meant to be a long-term platform that
future EDC teams can keep updating, not a one-off page.

## Our part
**Frontend only.** The backend team is building the API and database
separately and it will take some time. Until it is ready we build every page
against **mock data** (JSON files in `src/lib/mock-data`). When the backend
is ready, only the functions in `src/lib/api` change. Your components will
not.

## Who is who
| Role | Name |
|---|---|
| Frontend lead | ____________________ |
| Backend lead | ____________________ |
| UI/UX designer | Alongbar |
| Approvers | Chief and Asst. Chief Convener |

### Frontend juniors: ____ people (2 to 3, to be confirmed)
| Slot | Name | First tasks |
|---|---|---|
| Dev A | ____________________ | T1 Achievements, then T2 Alumni |
| Dev B | ____________________ | T4 Connect forms, then T3 Initiatives |
| Dev C | ____________________ | T6 Navigation, then T7 Animated stats |

(Delete any slot that is not used. The lead may adjust assignments as you go.)

## Day 1
1. Install Node 24.
2. Clone the repo, then run `npm install`.
3. Run `cp .env.example .env.local`.
4. Run `npm run dev` and open http://localhost:3000.
5. Run `npm run typecheck` and `npm run lint`. Both should print nothing.
   Silence means success.
6. Read `README.md`, then `docs/TASKS.md` and `docs/TODO.md`.

## How we work
- One task = one branch = one pull request. Branch name: `feat/t1-achievements`.
- Copy the **reference pattern** named in your task. Don't invent a new one.
- Order for data: `lib/types` -> `lib/mock-data` -> `lib/api` -> `components/sections` -> `app/<route>/page.tsx`.
- Never hardcode content inside a component.
- Reuse `components/ui/*`. Don't style one-off buttons or inputs.
- Build for mobile first, then tablet and desktop. Tab through your page with the keyboard.
- Open the PR using the template. Wait for CI to pass and for the lead's review.
- Stuck for more than 30 minutes? Ask. Then write down what you learned.

## Please do not
- Touch backend code or add real network calls.
- Add new libraries without asking the lead.
- Hardcode colours. Use the design tokens in `tailwind.config.ts`.
- Merge your own pull request.

## What you will learn
Every task in `docs/TASKS.md` lists a "You learn" line. By the end you will
have covered data flow, filtering, forms, dynamic routes, accessibility,
interaction design and working in a team codebase.
