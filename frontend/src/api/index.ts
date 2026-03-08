const BASE = "http://localhost:5000/api";

const now = new Date();
const currentMonth = now.getMonth() + 1;
const currentYear = now.getFullYear();

export const api = {
  getDashboard: () =>
    fetch(`${BASE}/dashboard?month=${currentMonth}&year=${currentYear}`)
      .then(r => r.json()),

  updateIncome: (monthlyIncome: number) =>
    fetch(`${BASE}/user/income`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ monthlyIncome }),
    }).then(r => r.json()),

  addExpense: (data: object) =>
    fetch(`${BASE}/expenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(r => r.json()),

  addInvestment: (data: object) =>
    fetch(`${BASE}/investments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(r => r.json()),

  getActuals: (month: number, year: number) =>
    fetch(`${BASE}/actuals?month=${month}&year=${year}`)
      .then(r => r.json()),

       saveBudgetPlan: (data: object) =>
    fetch(`${BASE}/budgetplan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(r => r.json()),

  getBudgetPlan: (month: number, year: number) =>
    fetch(`${BASE}/budgetplan?month=${month}&year=${year}`)
      .then(r => r.json()),
};

