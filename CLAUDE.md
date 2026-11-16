# CLAUDE.md

Instructions for Claude Code when working in this repository.

## Project Overview

A Personal Finance Tracker website for TCSS 490 (Artifact 5, five-week Moonshot project). Users track income and expenses, set a monthly budget, view spending charts, and create savings goals. All data is saved in the browser with `localStorage`.

See `PLAN.md` for the feature list and weekly roadmap, and `LOG.md` for progress so far.

## Hard Rules

- Use **plain HTML, CSS, and JavaScript** only. No frameworks (React, Vue, etc.) and no build tools.
- Persist data with **`localStorage`** only. No backend or database.
- **Never** use paid APIs or connect to real bank accounts.
- A free charting library loaded from a CDN (e.g. Chart.js) is acceptable when charts are built in Week 3.
- Only build features scheduled for the current week unless the user asks otherwise.
- After completing work, add an entry to `LOG.md`.

## Project Structure

```
personal-finance-tracker/
├── index.html    # Dashboard markup (summary cards, budget, transactions, goals, charts)
├── style.css     # All styles; CSS variables at the top, responsive grid layout
├── script.js     # App logic: state, storage helpers, rendering, event handlers
├── PLAN.md       # Project goal, features, five-week plan
├── LOG.md        # Weekly development log
├── README.md     # Project description and how to run it
└── CLAUDE.md     # This file
```

## Running the Project

Open `index.html` in a browser. No install or build step. For live reload, use the VS Code "Live Server" extension or `npx serve .`.

## Coding Guidelines

### General
- Keep code simple and readable — this is a student project and should be easy to explain.
- Use clear, descriptive names (`totalExpenses`, `renderTransactions`).
- Add short comments explaining *why*, not *what*.

### HTML
- Use semantic elements (`header`, `main`, `section`, `form`, `button`).
- Every form input needs a `<label>`.
- Use `id` attributes for elements JavaScript updates; use classes for styling.

### CSS
- Define colors, spacing, and radii as CSS variables in `:root`.
- Mobile-first: base styles for small screens, `@media (min-width: ...)` for larger ones.
- Use CSS Grid/Flexbox for layout; avoid fixed pixel widths on containers.
- Keep class names lowercase and hyphenated (`summary-card`, `goal-list`).

### JavaScript
- Use `const`/`let` (never `var`), arrow functions where appropriate, and template literals.
- Keep all app data in a single `state` object; save it with `saveState()` after every change.
- Separate concerns: data functions change `state`, render functions update the DOM.
- Wrap `localStorage` reads in `try/catch` and fall back to default state if data is missing or corrupt.
- Store money as numbers; format with `Intl.NumberFormat` only when displaying.
- Never insert user input with `innerHTML` unescaped — use `textContent` or escape it.
- Generate IDs with `crypto.randomUUID()` (fallback to `Date.now()` if needed).

### Data Model (planned)
```js
state = {
  transactions: [{ id, type: "income" | "expense", amount, category, date, description }],
  budget: { monthlyLimit: 0 },
  goals: [{ id, name, target, saved }]
}
```

## Workflow

1. Read `PLAN.md` and `LOG.md` to see what week it is and what's done.
2. Implement the requested features.
3. Test in the browser (including after a page reload to confirm persistence).
4. Update `LOG.md` with what was completed and what's next.
