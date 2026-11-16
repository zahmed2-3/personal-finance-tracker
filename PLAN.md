# Personal Finance Tracker — Project Plan

**Course:** TCSS 490 — Artifact 5 (Moonshot Project)
**Duration:** 5 weeks

## Project Goal

Build a browser-based Personal Finance Tracker that helps users understand and manage their money. Users can record income and expenses, set a monthly budget, see where their money goes through charts, and work toward savings goals. All data is stored locally in the browser with `localStorage`, so the app needs no server, no account, no paid API, and no real bank connection.

## Constraints

- Plain **HTML, CSS, and JavaScript** (no frameworks or build step required)
- Data persistence via **`localStorage`** only
- **No paid APIs** and **no real bank connections**
- Must work in modern desktop and mobile browsers (responsive)

## Features

| # | Feature | Description |
|---|---------|-------------|
| 1 | Transactions | Add, edit, and delete income and expense entries (amount, category, date, description) |
| 2 | Summary cards | Show total balance, total income, and total expenses |
| 3 | Monthly budget | Set a monthly spending limit and see progress toward it |
| 4 | Spending charts | Visualize spending by category and over time |
| 5 | Savings goals | Create goals with a target amount and track contributions |
| 6 | Persistence | Save all data to `localStorage` so it survives page reloads |
| 7 | Filtering (stretch) | Filter transactions by month, type, or category |
| 8 | Export/Import (stretch) | Back up data to a JSON/CSV file and restore it |

## Five-Week Development Plan

### Week 1 — Project Setup
- Create planning and documentation files (`PLAN.md`, `CLAUDE.md`, `LOG.md`, `README.md`)
- Build the dashboard layout in `index.html` with placeholders for every feature
- Create a modern, responsive stylesheet in `style.css`
- Set up the JavaScript structure in `script.js` (state object, storage helpers, render stubs)

### Week 2 — Transactions & Persistence
- Build the add-transaction form (type, amount, category, date, description)
- Validate input and show error messages
- Save and load transactions with `localStorage`
- Render the recent transactions list
- Calculate and display total balance, income, and expenses
- Allow deleting transactions

### Week 3 — Monthly Budget & Charts
- Let the user set and update a monthly budget
- Show a progress bar for spending vs. budget, with a warning when near or over the limit
- Add spending charts (category breakdown and monthly trend) — Chart.js via free CDN, or hand-drawn with `<canvas>`/SVG
- Update charts whenever transactions change

### Week 4 — Savings Goals & Polish
- Create, update, and delete savings goals
- Add contributions to goals and show progress
- Add transaction editing and filtering by month/category
- Improve accessibility (labels, keyboard navigation, color contrast)

### Week 5 — Testing, Stretch Goals & Final Presentation
- Test all features across browsers and screen sizes
- Fix bugs and handle edge cases (empty states, invalid/corrupted storage)
- Optional: export/import data, dark mode
- Finalize documentation and prepare the project presentation

## Success Criteria

- A user can add transactions and immediately see updated totals
- Data is still there after closing and reopening the browser
- The budget and savings goal progress are accurate
- Charts reflect the current data
- The layout works on both phone and desktop screens
