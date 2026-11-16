# Development Log

## Week 1 — Project Setup (2026-11-15)

### Goal
Set up the project structure, documentation, and a static dashboard layout. No real functionality yet.

### Completed
- **PLAN.md** — project goal, constraints, feature list, five-week plan, and success criteria
- **CLAUDE.md** — instructions for Claude Code, project structure, coding guidelines, planned data model
- **README.md** — project description and how to run it
- **LOG.md** — this log
- **index.html** — dashboard layout with placeholders for:
  - Total balance, income, and expenses (summary cards)
  - Monthly budget (progress bar)
  - Recent transactions (list + disabled "Add" button)
  - Savings goals (sample goal + disabled "New Goal" button)
  - Spending charts (two chart placeholders)
- **style.css** — modern, responsive layout using CSS variables, CSS Grid, and card components; adapts from one column on phones to a multi-column grid on desktop
- **script.js** — basic structure: `state` object, `loadState`/`saveState` helpers for `localStorage`, currency formatter, and stub render functions

### Decisions
- No frameworks or build tools — open `index.html` directly
- Single `state` object saved to `localStorage` under the key `financeTracker.v1`
- Placeholder buttons are disabled so it's clear they aren't functional yet

### Next Steps (Week 2)
- Build the add-transaction form with validation
- Save/load transactions with `localStorage`
- Calculate and display real totals
- Render and delete transactions
