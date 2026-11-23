# Personal Finance Tracker

A simple, browser-based personal finance tracker built with HTML, CSS, and JavaScript for TCSS 490 (Artifact 5 — Moonshot Project).

## What It Does

The finished app will let you:

- Track your **income and expenses**
- Set a **monthly budget** and see how much you have left
- View **spending charts** by category and over time
- Create **savings goals** and track your progress
- **Keep your data between visits** — everything is saved in your browser with `localStorage`

No account, server, paid API, or bank connection is needed. Your data never leaves your device.

> **Status:** Week 2 of 5 — you can add and delete income/expense transactions, see live totals, and your data is saved between visits. Budget, charts, and savings goals are still placeholders. Features are added week by week (see [PLAN.md](PLAN.md)).

## How to Run

**Option 1 — Open directly**
1. Download or clone this repository.
2. Double-click `index.html` (or drag it into a browser window).

**Option 2 — Local server (recommended for development)**
- In VS Code, install the **Live Server** extension, right-click `index.html`, and choose **Open with Live Server**, or
- Run `npx serve .` in the project folder and open the URL it prints.

## Project Files

| File | Purpose |
|------|---------|
| `index.html` | Dashboard page structure |
| `style.css` | Responsive styles |
| `script.js` | App logic and `localStorage` handling |
| `PLAN.md` | Goals, features, and five-week plan |
| `LOG.md` | Weekly progress log |
| `CLAUDE.md` | Instructions for Claude Code |

## Tech

- HTML5, CSS3 (Grid, Flexbox, custom properties), vanilla JavaScript (ES6+)
- `localStorage` for persistence
