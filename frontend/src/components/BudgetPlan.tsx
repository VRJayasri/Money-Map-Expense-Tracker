import {
  BadgeIndianRupee,
  Birdhouse,
  Bus,
  HandCoins,
  Handshake,
  HouseHeart,
  Pencil,
  Shirt,
  Utensils,
} from "lucide-react";
import Card from "./ui/Card";
import type { Expense } from "../types/Plans";
import MonthDropdown from "./MonthSelector";
import { useState } from "react";

interface PlanCardProps {
  title: string;
  balanceLabel: string;
  balanceValue: string;
  expenses: Expense[];
  headerRight?: React.ReactNode;
}

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

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  balanceLabel,
  balanceValue,
  expenses,
  headerRight,
}) => (
  <Card>
    {/* Header */}
    <h2 className="text-lg font-semibold text-[rgb(78,52,46)] mb-4 flex items-center justify-between">
      <span>{title}</span>
      {headerRight}
    </h2>

    {/* Balance */}
    <div className="mb-5 p-3 bg-white rounded-lg shadow-sm">
      <p className="text-xs text-gray-500">{balanceLabel}</p>
      <p className="text-2xl font-bold text-green-700">{balanceValue}</p>
    </div>

    {/* Expenses */}
    <div className="space-y-2 text-sm text-gray-700">
      {expenses.map((expense, idx) => (
        <ExpenseItem key={idx} expense={expense} />
      ))}
    </div>

    {/* Footer */}
    <div className="border-t mt-5 pt-4 flex justify-between font-semibold">
      <span>{balanceLabel === "Income" ? "Balance" : "Total Spend"}</span>
      <span className="text-green-600">₹XXXX</span>
    </div>
  </Card>
);

const BudgetPlan = () => {
  const currentMonth = new Date().toLocaleString("default", {
    month: "long",
  });
  const [month, setMonth] = useState(currentMonth);

  const monthlyExpenses: Expense[] = [
    { icon: <Utensils />, label: "Food", value: "₹500" },
    { icon: <Bus />, label: "Travel", value: "₹1,000" },
    { icon: <Shirt />, label: "Accessories", value: "₹1,500" },
    { icon: <Handshake />, label: "Friends loan", value: "₹0" },
    { icon: <HouseHeart />, label: "Home", value: "₹10,000" },
    { icon: <Birdhouse />, label: "Rent", value: "₹6,500" },
    { icon: <HandCoins />, label: "Savings", value: "₹2,500" },
    { icon: <BadgeIndianRupee />, label: "Investment", value: "₹600" },
  ];

  const actualExpenses: Expense[] = [
    { icon: <Utensils />, label: "Food", value: "₹50" },
    { icon: <Bus />, label: "Travel", value: "₹100" },
    { icon: <Shirt />, label: "Accessories", value: "₹1,500" },
    { icon: <Handshake />, label: "Friends loan", value: "₹0" },
    { icon: <HouseHeart />, label: "Home", value: "₹10,000" },
    { icon: <Birdhouse />, label: "Rent", value: "₹6,500" },
    { icon: <HandCoins />, label: "Savings", value: "₹2,500" },
    { icon: <BadgeIndianRupee />, label: "Investment", value: "₹600" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="w-full bg-yellow-100/70 shadow p-4">
        <h4 className="text-xl font-semibold text-gray-900">Plan</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PlanCard
          title="Monthly Plan"
          balanceLabel="Income"
          balanceValue="₹8000"
          expenses={monthlyExpenses}
          headerRight={
            <button className="hover:text-yellow-500">
              <Pencil className="w-4 h-4" />
            </button>
          }
        />

        <PlanCard
          title="Actual Done"
          balanceLabel="Balance"
          balanceValue="₹2000"
          expenses={actualExpenses}
          headerRight={
            <div className="flex items-center gap-2 text-sm cursor-pointer">
              <MonthDropdown value={month} onChange={setMonth} />
            </div>
          }
        />
      </div>
    </div>
  );
};

export default BudgetPlan;
