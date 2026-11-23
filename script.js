/**
 * Personal Finance Tracker — main script
 * Week 2: add/delete transactions, totals, and localStorage persistence.
 * Budget, charts, and goals come in later weeks (see PLAN.md).
 */

// ===== Constants =====
const STORAGE_KEY = "financeTracker.v1";
const MAX_AMOUNT = 1_000_000_000;
const MAX_DESCRIPTION_LENGTH = 100;

const CATEGORIES = {
  expense: ["Food & Dining", "Groceries", "Housing", "Transportation", "Utilities",
            "Entertainment", "Shopping", "Health", "Education", "Other"],
  income: ["Salary", "Freelance", "Gifts", "Refunds", "Investments", "Other"],
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// ===== State =====
// All app data lives here and is saved to localStorage as one object.
const defaultState = () => ({
  transactions: [], // { id, type: "income" | "expense", amount, category, date, description, createdAt }
  budget: { monthlyLimit: 0 },
  goals: [],        // { id, name, target, saved }
});

let state = loadState();

// ===== Storage helpers =====
function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultState();

    const parsed = JSON.parse(saved);
    const merged = { ...defaultState(), ...parsed };
    // Drop anything malformed so one bad entry can't break the whole page.
    merged.transactions = Array.isArray(parsed.transactions)
      ? parsed.transactions.filter(isValidTransaction)
      : [];
    return merged;
  } catch (error) {
    // Missing, blocked, or corrupted storage: start fresh rather than crash.
    console.warn("Could not load saved data:", error);
    return defaultState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (error) {
    console.warn("Could not save data:", error);
    return false;
  }
}

function isValidTransaction(t) {
  return (
    t !== null &&
    typeof t === "object" &&
    typeof t.id === "string" &&
    (t.type === "income" || t.type === "expense") &&
    Number.isFinite(t.amount) &&
    t.amount > 0 &&
    typeof t.category === "string" &&
    isValidDateString(t.date)
  );
}

// ===== Utilities =====
function formatCurrency(amount) {
  return currencyFormatter.format(amount);
}

function generateId() {
  if (window.crypto && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

// Today's date as "YYYY-MM-DD" in the user's local time zone
// (toISOString() would use UTC and can be off by a day in the evening).
function todayString() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function isValidDateString(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  // Rejects impossible dates like 2026-02-30, which Date would roll over.
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

// Parse "YYYY-MM-DD" as a local date so it displays on the right day.
function formatDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ===== Data functions =====
function addTransaction({ type, amount, category, date, description }) {
  state.transactions.push({
    id: generateId(),
    type,
    amount,
    category,
    date,
    description,
    createdAt: Date.now(),
  });
  return saveState();
}

function deleteTransaction(id) {
  state.transactions = state.transactions.filter((t) => t.id !== id);
  return saveState();
}

// Newest date first; same-day entries show the most recently added first.
// The array is stored in the order entries were added, so reversing it and
// then doing a stable sort by date keeps that newest-first order within a day.
function getSortedTransactions() {
  return [...state.transactions].reverse().sort((a, b) => b.date.localeCompare(a.date));
}

function getTotals() {
  // Add in whole cents to avoid floating-point errors (0.1 + 0.2 !== 0.3).
  let incomeCents = 0;
  let expenseCents = 0;
  for (const t of state.transactions) {
    const cents = Math.round(t.amount * 100);
    if (t.type === "income") incomeCents += cents;
    else expenseCents += cents;
  }
  return {
    income: incomeCents / 100,
    expenses: expenseCents / 100,
    balance: (incomeCents - expenseCents) / 100,
  };
}

// ===== Form handling =====
function getSelectedType() {
  return document.querySelector('input[name="type"]:checked').value;
}

function populateCategories(type) {
  const select = document.getElementById("category");
  select.replaceChildren();

  const placeholder = new Option("Select a category", "");
  placeholder.disabled = true;
  placeholder.selected = true;
  select.add(placeholder);

  for (const name of CATEGORIES[type]) {
    select.add(new Option(name, name));
  }
}

// Returns { values, errors }. errors maps field id -> message.
function validateForm(form) {
  const type = getSelectedType();
  const rawAmount = form.amount.value.trim();
  const category = form.category.value;
  const date = form.date.value;
  const description = form.description.value.trim().slice(0, MAX_DESCRIPTION_LENGTH);
  const errors = {};

  const amount = Number(rawAmount);
  if (rawAmount === "") {
    errors.amount = "Please enter an amount.";
  } else if (!/^(\d+\.?\d*|\.\d+)$/.test(rawAmount) || amount <= 0) {
    // Plain digits only: rejects negatives, "1e3", etc.
    errors.amount = "Amount must be a number greater than 0.";
  } else if (/\.\d{3,}$/.test(rawAmount)) {
    errors.amount = "Use at most 2 decimal places.";
  } else if (amount > MAX_AMOUNT) {
    errors.amount = "Amount is too large.";
  }

  if (!CATEGORIES[type].includes(category)) {
    errors.category = "Please choose a category.";
  }

  if (!date) {
    errors.date = "Please choose a date.";
  } else if (!isValidDateString(date)) {
    errors.date = "Please enter a valid date.";
  }

  return {
    values: { type, amount: Math.round(amount * 100) / 100, category, date, description },
    errors,
  };
}

function showErrors(errors) {
  for (const field of ["amount", "category", "date"]) {
    const input = document.getElementById(field);
    const message = errors[field] || "";
    document.getElementById(`${field}-error`).textContent = message;
    input.setAttribute("aria-invalid", message ? "true" : "false");
  }
}

let statusTimer;
function showStatus(message, isError = false) {
  const status = document.getElementById("form-status");
  status.textContent = message;
  status.style.color = isError ? "var(--color-expense)" : "";
  clearTimeout(statusTimer);
  statusTimer = setTimeout(() => { status.textContent = ""; }, 3000);
}

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const { values, errors } = validateForm(form);
  showErrors(errors);

  const firstError = Object.keys(errors)[0];
  if (firstError) {
    document.getElementById(firstError).focus();
    return;
  }

  const saved = addTransaction(values);
  render();

  // Reset for the next entry but keep the type and date — handy when
  // entering several transactions from the same day.
  form.amount.value = "";
  form.description.value = "";
  populateCategories(values.type);
  form.amount.focus();

  showStatus(
    saved
      ? `${values.type === "income" ? "Income" : "Expense"} of ${formatCurrency(values.amount)} added.`
      : "Added, but it couldn't be saved to this browser.",
    !saved
  );
}

function handleTypeChange() {
  populateCategories(getSelectedType());
  showErrors({});
}

function handleListClick(event) {
  const button = event.target.closest(".btn-delete");
  if (!button) return;

  const transaction = state.transactions.find((t) => t.id === button.dataset.id);
  if (!transaction) return;

  const label = transaction.description || transaction.category;
  if (!confirm(`Delete "${label}" (${formatCurrency(transaction.amount)})?`)) return;

  deleteTransaction(transaction.id);
  render();
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
  const balanceEl = document.getElementById("total-balance");
  balanceEl.textContent = formatCurrency(balance);
  balanceEl.classList.toggle("negative", balance < 0);
  document.getElementById("total-income").textContent = formatCurrency(income);
  document.getElementById("total-expenses").textContent = formatCurrency(expenses);
}

function renderBudget() {
  // TODO (Week 3): show spent vs. monthly limit and update the progress bar.
}

function createTransactionItem(t) {
  // Built with textContent (not innerHTML) so user text can't inject HTML.
  const li = document.createElement("li");
  li.className = "transaction-item";

  const details = document.createElement("div");
  details.className = "transaction-details";

  const title = document.createElement("p");
  title.className = "transaction-title";
  title.textContent = t.description || t.category;

  const meta = document.createElement("p");
  meta.className = "transaction-meta";
  meta.textContent = `${t.category} · ${formatDate(t.date)}`;

  details.append(title, meta);

  const amount = document.createElement("span");
  amount.className = `transaction-amount ${t.type}`;
  amount.textContent = `${t.type === "income" ? "+" : "−"}${formatCurrency(t.amount)}`;

  const del = document.createElement("button");
  del.type = "button";
  del.className = "btn-delete";
  del.dataset.id = t.id;
  del.setAttribute("aria-label", `Delete ${title.textContent}, ${formatCurrency(t.amount)}`);
  del.textContent = "✕";

  li.append(details, amount, del);
  return li;
}

function renderTransactions() {
  const list = document.getElementById("transaction-list");
  const sorted = getSortedTransactions();

  list.replaceChildren(...sorted.map(createTransactionItem));
  document.getElementById("transactions-empty").hidden = sorted.length > 0;
  document.getElementById("transaction-count").textContent =
    `${sorted.length} ${sorted.length === 1 ? "entry" : "entries"}`;
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
  document.getElementById("transaction-form").addEventListener("submit", handleFormSubmit);
  document.querySelectorAll('input[name="type"]').forEach((radio) =>
    radio.addEventListener("change", handleTypeChange)
  );
  document.getElementById("transaction-list").addEventListener("click", handleListClick);

  // Pick up changes made in another tab of the same site.
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) {
      state = loadState();
      render();
    }
  });
}

// ===== Init =====
function init() {
  populateCategories(getSelectedType());
  document.getElementById("date").value = todayString();
  setupEventListeners();
  render();
}

document.addEventListener("DOMContentLoaded", init);
