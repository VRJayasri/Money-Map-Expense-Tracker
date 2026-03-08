import { Link } from "react-router-dom";
import Card from "./ui/Card";
import { useState, useEffect } from "react";
import { api } from "../api";

const Dashboard = () => {
  const [income, setIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);
  const [balance, setBalance] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all dashboard data in one call
  useEffect(() => {
    api.getDashboard().then((data) => {
      setIncome(data.income);
      setTotalExpense(data.totalExpense);
      setTotalInvested(data.totalInvested);
      setBalance(data.balance);
      setInputValue(String(data.income));
      setLoading(false);
    });
  }, []);

  const handleIncomeUpdate = async () => {
    const newIncome = Number(inputValue) || 0;
    const data = await api.updateIncome(newIncome);
    setIncome(data.monthlyIncome);
    // Recalculate balance locally — no need to re-fetch everything
    setBalance(data.monthlyIncome - totalExpense - totalInvested);
    setIsEditing(false);
  };

  if (loading) return <div className="p-6 text-gray-400">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="w-full bg-yellow-100/70 rounded-none shadow p-4">
        <h4 className="text-xl font-semibold text-left text-amber-950">
          Dashboard
        </h4>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* Income Card */}
        <Card>
          <h1 className="text-sm font-serif mb-1 text-gray-600">Income</h1>
          <div className="flex items-center justify-between">
            {isEditing ? (
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onBlur={handleIncomeUpdate}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleIncomeUpdate();
                  if (e.key === "Escape") {
                    setInputValue(String(income));
                    setIsEditing(false);
                  }
                }}
                autoFocus
                className="text-lg font-mono w-28 border-b-2 border-amber-400 bg-transparent outline-none"
              />
            ) : (
              <h3 className="text-lg font-mono">
                ₹ {income.toLocaleString("en-IN")}
              </h3>
            )}
            <button
              onClick={() => {
                setInputValue(String(income));
                setIsEditing(true);
              }}
              className="p-1.5 rounded-full hover:bg-yellow-100 text-gray-400 hover:text-amber-700 transition"
            >
              {/* same pencil SVG as before */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                  strokeLinecap="round"
                />
                <path
                  d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </Card>

        {/* Expense Card */}
        <Card>
          <h1 className="text-sm font-serif mb-1 text-gray-600">Expense</h1>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-mono">
              ₹ {totalExpense.toLocaleString("en-IN")}
            </h3>
            <Link
              to="/add-expense"
              className="px-4 py-1.5 text-sm font-medium rounded-full bg-yellow-400 text-gray-900 hover:bg-yellow-500 active:scale-95 transition"
            >
              + Add
            </Link>
          </div>
        </Card>

        {/* Balance Card */}
        <Card>
          <h1 className="text-sm font-serif mb-1 text-gray-600">Balance</h1>
          <h3
            className={`text-lg font-mono ${balance < 0 ? "text-red-500" : ""}`}
          >
            ₹ {balance.toLocaleString("en-IN")}
          </h3>
        </Card>

        {/* Invested Card */}
        <Card>
          <h1 className="text-sm font-serif mb-1 text-gray-600">Invested</h1>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-mono">
              ₹ {totalInvested.toLocaleString("en-IN")}
            </h3>
            <Link
              to="/add-invest"
              className="px-4 py-1.5 text-sm font-medium rounded-full bg-yellow-400 text-gray-900 hover:bg-yellow-500 active:scale-95 transition"
            >
              + Add
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
