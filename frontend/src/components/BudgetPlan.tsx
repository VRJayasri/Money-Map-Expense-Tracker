import {
  BadgeIndianRupee,
  Birdhouse,
  Bus,
  HandCoins,
  Handshake,
  HouseHeart,
  Shirt,
  Utensils,
} from "lucide-react";
import Card from "./ui/Card";
import type { Expense, PlanCardProps } from "../types/Plans";
import MonthDropdown from "./MonthSelector";
import { useState, useEffect } from "react";
import { api } from "../api";

const iconMap: Record<string, React.ReactNode> = {
  "Food & Dining": <Utensils />,
  Food: <Utensils />,
  Travel: <Bus />,
  Accessories: <Shirt />,
  "Friends Loan": <Handshake />,
  "Friend Loan": <Handshake />,
  Home: <HouseHeart />,
  Rent: <Birdhouse />,
  Savings: <HandCoins />,
  Investment: <BadgeIndianRupee />,
  FD: <BadgeIndianRupee />,
  SIP: <BadgeIndianRupee />,
  "Mutual Funds": <BadgeIndianRupee />,
};

const monthNameToNumber = (name: string): number =>
  new Date(`${name} 1, 2000`).getMonth() + 1;

//ExpenseItem

const ExpenseItem: React.FC<{ expense: Expense }> = ({ expense }) => (
  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-yellow-100/70 transition">
    <div className="flex items-center gap-2">
      <span className="p-1.5 bg-yellow-100 rounded-md text-[rgb(78,52,46)]">
        {expense.icon}
      </span>
      <span>{expense.label}</span>
    </div>
    <span className="font-medium">{expense.value}</span>
  </div>
);

// PlanCard

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  balanceLabel,
  balanceValue,
  secondaryLabel,
  secondaryValue,
  expenses,
  headerRight,
  footerField,
  footerValue,
}) => (
  <Card>
    <h2 className="text-lg font-semibold text-[rgb(78,52,46)] mb-4 flex items-center justify-between">
      <span>{title}</span>
      {headerRight}
    </h2>

    <div
      className={`mb-5 p-3 bg-white rounded-lg shadow-sm flex ${secondaryLabel ? "justify-between items-center" : ""}`}
    >
      <div>
        <p className="text-xs text-gray-500">{balanceLabel}</p>
        <p className="text-2xl font-bold text-green-700">{balanceValue}</p>
      </div>
      {secondaryLabel && secondaryValue && (
        <div className="text-right">
          <p className="text-xs text-gray-500">{secondaryLabel}</p>
          <p className="text-2xl font-bold text-amber-600">{secondaryValue}</p>
        </div>
      )}
    </div>

    <div className="space-y-2 text-sm text-gray-700">
      {expenses.length === 0 ? (
        <p className="text-center text-gray-400 py-4">No entries this month</p>
      ) : (
        expenses.map((expense, idx) => (
          <ExpenseItem key={idx} expense={expense} />
        ))
      )}
    </div>

    <div className="border-t mt-5 pt-4 flex justify-between font-semibold">
      <span>{footerField}</span>
      <span className="text-green-600">
        ₹{footerValue.toLocaleString("en-IN")}
      </span>
    </div>
  </Card>
);

//BudgetPlan

const currentYear = new Date().getFullYear();
const yearOptions = [currentYear - 1, currentYear, currentYear + 1];

const BudgetPlan = () => {
  const now = new Date();

  const [month, setMonth] = useState(
    now.toLocaleString("default", { month: "long" }),
  );
  const [year, setYear] = useState(now.getFullYear());

  //single batched state for each card
  const [planState, setPlanState] = useState({
    income: 0,
    total: 0,
    expenses: [] as Expense[],
    loading: true,
  });

  const [actualState, setActualState] = useState({
    balance: 0,
    totalSpent: 0,
    expenses: [] as Expense[],
    loading: true,
  });

  useEffect(() => {
    const monthNum = monthNameToNumber(month);

    api
      .getBudgetPlan(monthNum, year)
      .then((data) => {
        if (data.message) {
          setPlanState({ income: 0, total: 0, expenses: [], loading: false });
          return;
        }
        const total = data.categories.reduce(
          (s: number, c: { plannedAmount: number }) => s + c.plannedAmount,
          0,
        );
        setPlanState({
          income: data.income,
          total,
          expenses: data.categories.map(
            (cat: { label: string; plannedAmount: number }) => ({
              icon: iconMap[cat.label] ?? <BadgeIndianRupee />,
              label: cat.label,
              value: `₹${cat.plannedAmount.toLocaleString("en-IN")}`,
            }),
          ),
          loading: false,
        });
      })
      .catch(() => setPlanState((prev) => ({ ...prev, loading: false })));
  }, [month, year]);

  useEffect(() => {
    const monthNum = monthNameToNumber(month);

    api.getActuals(monthNum, year).then((data) => {
      setActualState({
        balance: data.balance,
        totalSpent: data.totalExpense + data.totalInvested,
        expenses: data.categories.map(
          (cat: { label: string; value: number }) => ({
            icon: iconMap[cat.label] ?? <BadgeIndianRupee />,
            label: cat.label,
            value: `₹${cat.value.toLocaleString("en-IN")}`,
          }),
        ),
        loading: false,
      });
    });
  }, [month, year]);

  return (
    <div className="p-6 space-y-6">
      <div className="w-full bg-yellow-100/70 shadow p-4">
        <h4 className="text-xl font-semibold text-gray-900">Plan</h4>
      </div>

      <div className="flex items-center gap-3">
        <MonthDropdown value={month} onChange={setMonth} />
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm
                     bg-white text-gray-700 focus:outline-none
                     focus:ring-2 focus:ring-yellow-300 cursor-pointer"
        >
          {yearOptions.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PlanCard
          title="Monthly Plan"
          balanceLabel="Income"
          balanceValue={
            planState.loading
              ? "..."
              : planState.income > 0
                ? `₹${planState.income.toLocaleString("en-IN")}`
                : "No plan yet"
          }
          secondaryLabel="Balance"
          secondaryValue={
            planState.loading
              ? "..."
              : `₹${(planState.income - planState.total).toLocaleString("en-IN")}`
          }
          footerField="Total Planned"
          footerValue={planState.total}
          expenses={planState.loading ? [] : planState.expenses}
        />

        <PlanCard
          title="Actual Done"
          balanceLabel="Balance"
          balanceValue={
            actualState.loading
              ? "..."
              : `₹${actualState.balance.toLocaleString("en-IN")}`
          }
          footerField="Total Spent"
          footerValue={actualState.totalSpent}
          expenses={actualState.loading ? [] : actualState.expenses}
        />
      </div>
    </div>
  );
};

export default BudgetPlan;
