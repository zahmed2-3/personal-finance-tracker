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

---

## Week 2 — Transactions & Persistence (2026-11-22)

### Goal
Let users add and delete income/expense transactions, see live totals, and keep their data after refreshing.

### Completed
- **Add Transaction form** (`index.html`, `script.js`)
  - Expense/Income toggle; the category list switches to match the selected type
  - Inputs for amount, date (defaults to today), category, and optional description (max 100 characters)
  - Validation with inline error messages: amount required, greater than 0, at most 2 decimal places, no negatives or "1e3"-style input; category and date required; impossible dates (e.g. Feb 30) rejected
  - After adding, the amount and description clear but type and date stay, which makes entering several transactions faster; a short confirmation message appears
- **Transaction History**
  - Shows every entry, newest date first (entries on the same day show the most recently added first)
  - Each row shows description (or category if none), category, date, and a colored +/− amount
  - Entry count in the header; empty-state message when there are no transactions
  - Built with `textContent`, so HTML typed into a description is shown as text, not run
- **Automatic totals** — income, expenses, and balance update after every add/delete. Math is done in whole cents to avoid floating-point errors (0.10 + 0.20 shows $0.30). A negative balance shows in red.
- **localStorage persistence** — transactions save on every change and load on page start. Corrupted JSON or malformed entries are ignored instead of breaking the page. Changes made in another tab are picked up automatically.
- **Delete** — ✕ button on each row with a confirmation prompt
- **Mobile**
  - 44px-tall inputs and buttons for touch; 16px input text so iOS doesn't zoom in
  - Amount and date fields sit side by side on tablets, stacked on phones
  - Form appears right after the summary cards on phones (moved the Budget card below the history)
  - Desktop: form and history side by side; long histories scroll inside the card

### Testing
Wrote a headless-Chrome test page (not part of the project) that drives the real app in an iframe. **46/46 checks passed**, covering:
- Empty initial state and today's date as the default
- Every validation error, and that invalid input doesn't add a transaction
- Adding income and expenses, correct totals (including 0.1 + 0.2), category switching
- Sort order, date display, HTML-injection safety
- Data surviving a page reload, delete (confirm and cancel), delete surviving a reload
- Negative balance styling, recovery from corrupted storage, no JavaScript errors

Also checked screenshots at 390px (phone) and 1280px (desktop).

### Bugs Found & Fixed
- **Page wider than phone screens** — a long description (set to not wrap) stretched the grid column, making the page 730px wide on a 390px screen. Fixed by using `minmax(0, 1fr)` grid columns; verified no horizontal scrolling at 390px and 320px.
- **Same-day sort order** — entries added within the same millisecond could show oldest-first. Fixed by sorting on insertion order instead of timestamps.

### Next Steps (Week 3)
- Set and save a monthly budget; show spent vs. limit with a progress bar and warnings
- Spending charts: by category and monthly trend
