/**
 * Personal Finance Tracker — main script
 * Week 1: basic structure only. Features are added in later weeks (see PLAN.md).
 */

// ===== Constants =====
const STORAGE_KEY = "financeTracker.v1";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// ===== State =====
// All app data lives here and is saved to localStorage as one object.
const defaultState = () => ({
  transactions: [], // { id, type: "income" | "expense", amount, category, date, description }
  budget: { monthlyLimit: 0 },
  goals: [],        // { id, name, target, saved }
});

let state = loadState();

// ===== Storage helpers =====
function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...defaultState(), ...JSON.parse(saved) } : defaultState();
  } catch (error) {
    // Missing, blocked, or corrupted storage: start fresh rather than crash.
    console.warn("Could not load saved data:", error);
    return defaultState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("Could not save data:", error);
  }
}

// ===== Utilities =====
function formatCurrency(amount) {
  return currencyFormatter.format(amount);
}

// ===== Calculations (Week 2) =====
function getTotals() {
  // TODO (Week 2): sum income and expenses from state.transactions.
  return { income: 0, expenses: 0, balance: 0 };
}

// ===== Render functions =====
function renderHeader() {
  const monthEl = document.getElementById("current-month");
  monthEl.textContent = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function renderSummary() {
  const { income, expenses, balance } = getTotals();
  document.getElementById("total-balance").textContent = formatCurrency(balance);
  document.getElementById("total-income").textContent = formatCurrency(income);
  document.getElementById("total-expenses").textContent = formatCurrency(expenses);
}

function renderBudget() {
  // TODO (Week 3): show spent vs. monthly limit and update the progress bar.
}

function renderTransactions() {
  // TODO (Week 2): list recent transactions from state.transactions.
}

function renderGoals() {
  // TODO (Week 4): list savings goals with progress bars.
}

function renderCharts() {
  // TODO (Week 3): draw category and monthly trend charts.
}

function render() {
  renderHeader();
  renderSummary();
  renderBudget();
  renderTransactions();
  renderGoals();
  renderCharts();
}

// ===== Event handlers =====
function setupEventListeners() {
  // TODO (Week 2+): add-transaction form, set budget, new goal, delete buttons.
}

// ===== Init =====
function init() {
  setupEventListeners();
  render();
}

document.addEventListener("DOMContentLoaded", init);
