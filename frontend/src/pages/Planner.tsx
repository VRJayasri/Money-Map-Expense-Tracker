import { useState, useEffect } from "react";

interface BudgetCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  type: "expense" | "saving";
  amount: string;
}

const defaultCategories: BudgetCategory[] = [
  {
    id: "food",
    label: "Food & Dining",
    icon: "🍽️",
    color: "#F97316",
    type: "expense",
    amount: "",
  },
  {
    id: "travel",
    label: "Travel",
    icon: "✈️",
    color: "#06B6D4",
    type: "expense",
    amount: "",
  },
  {
    id: "accessories",
    label: "Accessories",
    icon: "👜",
    color: "#EC4899",
    type: "expense",
    amount: "",
  },
  {
    id: "friends_loan",
    label: "Friends Loan",
    icon: "🤝",
    color: "#8B5CF6",
    type: "expense",
    amount: "",
  },
  {
    id: "home",
    label: "Home",
    icon: "🏠",
    color: "#10B981",
    type: "expense",
    amount: "",
  },
  {
    id: "rent",
    label: "Rent",
    icon: "🔑",
    color: "#EF4444",
    type: "expense",
    amount: "",
  },
  {
    id: "savings",
    label: "Savings",
    icon: "💰",
    color: "#F59E0B",
    type: "saving",
    amount: "",
  },
  {
    id: "investment",
    label: "Investment",
    icon: "📈",
    color: "#22C55E",
    type: "saving",
    amount: "",
  },
];

export default function Planner() {
  const [categories, setCategories] =
    useState<BudgetCategory[]>(defaultCategories);
  const [income, setIncome] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = categories.reduce((sum, cat) => {
    const val = parseFloat(cat.amount) || 0;
    return sum + val;
  }, 0);

  const expenses = categories
    .filter((c) => c.type === "expense")
    .reduce((sum, c) => sum + (parseFloat(c.amount) || 0), 0);

  const savingsTotal = categories
    .filter((c) => c.type === "saving")
    .reduce((sum, c) => sum + (parseFloat(c.amount) || 0), 0);

  const incomeVal = parseFloat(income) || 0;
  const balance = incomeVal - total;
  const balancePercent =
    incomeVal > 0 ? Math.min((total / incomeVal) * 100, 100) : 0;

  const handleChange = (id: string, value: string) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, amount: value } : cat)),
    );
  };

  const expenseCategories = categories.filter((c) => c.type === "expense");
  const savingCategories = categories.filter((c) => c.type === "saving");

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      {/* Ambient background orbs */}
      <div
        className="absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }}
      />
      <div
        className="absolute bottom-[-10%] right-[-5%] w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #2563eb, transparent)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, #f59e0b, transparent)",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <div
          className={`text-center mb-10 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div
            className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "#a78bfa",
              border: "1px solid rgba(167,139,250,0.3)",
            }}
          >
            ◆ Monthly Budget Planner
          </div>
          <h1
            className="text-5xl font-black mb-2 tracking-tight"
            style={{
              background:
                "linear-gradient(135deg, #fff 30%, #a78bfa 80%, #60a5fa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-1px",
            }}
          >
            Calculate Your Financial Plan
          </h1>
        </div>

        {/* Income + Balance Summary Card */}
        <div
          className={`rounded-2xl p-6 mb-6 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Income Input */}
            <div>
              <label
                className="text-xs font-semibold tracking-widest uppercase mb-2 block"
                style={{ color: "#a78bfa" }}
              >
                Monthly Income
              </label>
              <div className="relative">
                <span
                  className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-lg"
                  style={{ color: "#a78bfa" }}
                >
                  ₹
                </span>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder="0.00"
                  className="w-full rounded-xl pl-10 pr-4 py-3 text-white font-bold text-lg focus:outline-none transition-all"
                  style={{
                    background: "rgba(167,139,250,0.1)",
                    border: "1.5px solid rgba(167,139,250,0.3)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = "1.5px solid #a78bfa";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border =
                      "1.5px solid rgba(167,139,250,0.3)";
                  }}
                />
              </div>
            </div>

            {/* Progress bar */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span style={{ color: "rgba(255,255,255,0.5)" }}>
                  Total Allocated
                </span>
                <span className="font-bold text-white">
                  ₹{total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div
                className="w-full h-2 rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.1)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${balancePercent}%`,
                    background:
                      balance < 0
                        ? "linear-gradient(90deg, #ef4444, #f97316)"
                        : "linear-gradient(90deg, #7c3aed, #2563eb)",
                  }}
                />
              </div>
              <div
                className="flex justify-between text-xs"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                <span>0</span>
                <span>{balancePercent.toFixed(0)}% used</span>
                <span>₹{incomeVal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Balance */}
            <div className="text-center md:text-right">
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-1"
                style={{ color: balance >= 0 ? "#22c55e" : "#ef4444" }}
              >
                {balance >= 0 ? "✓ Remaining" : "⚠ Over Budget"}
              </p>
              <p
                className="text-3xl font-black"
                style={{ color: balance >= 0 ? "#4ade80" : "#f87171" }}
              >
                ₹
                {Math.abs(balance).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expenses Section */}
          <div
            className={`transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-1 h-6 rounded-full"
                style={{
                  background: "linear-gradient(180deg, #ef4444, #f97316)",
                }}
              />
              <h2
                className="font-bold text-base tracking-wide"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                Expenses
              </h2>
              <span
                className="ml-auto text-sm font-bold"
                style={{ color: "#f87171" }}
              >
                ₹
                {expenses.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {expenseCategories.map((cat, i) => (
                <CategoryRow
                  key={cat.id}
                  cat={cat}
                  index={i}
                  mounted={mounted}
                  onChange={handleChange}
                />
              ))}
            </div>
          </div>

          {/* Savings Section */}
          <div
            className={`transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-1 h-6 rounded-full"
                style={{
                  background: "linear-gradient(180deg, #22c55e, #059669)",
                }}
              />
              <h2
                className="font-bold text-base tracking-wide"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                Savings & Investments
              </h2>
              <span
                className="ml-auto text-sm font-bold"
                style={{ color: "#4ade80" }}
              >
                ₹
                {savingsTotal.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {savingCategories.map((cat, i) => (
                <CategoryRow
                  key={cat.id}
                  cat={cat}
                  index={i}
                  mounted={mounted}
                  onChange={handleChange}
                />
              ))}
            </div>

            {/* Breakdown Card */}
            <div
              className="mt-6 rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Allocation Breakdown
              </p>
              {categories.map((cat) => {
                const val = parseFloat(cat.amount) || 0;
                const pct = total > 0 ? (val / total) * 100 : 0;
                return (
                  <div key={cat.id} className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: "rgba(255,255,255,0.6)" }}>
                        {cat.icon} {cat.label}
                      </span>
                      <span style={{ color: cat.color, fontWeight: 700 }}>
                        {pct.toFixed(1)}%
                      </span>
                    </div>
                    <div
                      className="w-full h-1 rounded-full overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.07)" }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: cat.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Total Footer */}
        <div
          className={`mt-6 rounded-2xl p-6 transition-all duration-700 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(37,99,235,0.3))",
            border: "1px solid rgba(167,139,250,0.4)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-1"
                style={{ color: "#a78bfa" }}
              >
                Total Planned Budget
              </p>
              <p
                className="text-4xl font-black text-white"
                style={{ letterSpacing: "-1px" }}
              >
                ₹{total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="flex gap-6 text-center">
              <div>
                <p
                  className="text-xs mb-1"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  Expenses
                </p>
                <p className="font-bold text-lg" style={{ color: "#f87171" }}>
                  ₹
                  {expenses.toLocaleString("en-IN", {
                    minimumFractionDigits: 0,
                  })}
                </p>
              </div>
              <div
                className="w-px"
                style={{ background: "rgba(255,255,255,0.15)" }}
              />
              <div>
                <p
                  className="text-xs mb-1"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  Savings
                </p>
                <p className="font-bold text-lg" style={{ color: "#4ade80" }}>
                  ₹
                  {savingsTotal.toLocaleString("en-IN", {
                    minimumFractionDigits: 0,
                  })}
                </p>
              </div>
              <div
                className="w-px"
                style={{ background: "rgba(255,255,255,0.15)" }}
              />
              <div>
                <p
                  className="text-xs mb-1"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  Balance
                </p>
                <p
                  className="font-bold text-lg"
                  style={{ color: balance >= 0 ? "#4ade80" : "#f87171" }}
                >
                  ₹
                  {balance.toLocaleString("en-IN", {
                    minimumFractionDigits: 0,
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        <p
          className="text-center text-xs mt-6"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          Plan your finances. Own your future. ✦
        </p>
      </div>
    </div>
  );
}

function CategoryRow({
  cat,
  index,
  mounted,
  onChange,
}: {
  cat: BudgetCategory;
  index: number;
  mounted: boolean;
  onChange: (id: string, value: string) => void;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className="group flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-500"
      style={{
        background: focused
          ? "rgba(255,255,255,0.08)"
          : "rgba(255,255,255,0.04)",
        border: focused
          ? `1px solid ${cat.color}55`
          : "1px solid rgba(255,255,255,0.07)",
        transitionDelay: `${index * 40}ms`,
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(10px)",
      }}
    >
      {/* Icon bubble */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
        style={{
          background: `${cat.color}22`,
          border: `1px solid ${cat.color}44`,
        }}
      >
        {cat.icon}
      </div>

      {/* Label */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate">{cat.label}</p>
        <p className="text-xs" style={{ color: cat.color, opacity: 0.8 }}>
          {cat.type === "expense" ? "Expense" : "Wealth building"}
        </p>
      </div>

      {/* Amount Input */}
      <div className="relative w-36 flex-shrink-0">
        <span
          className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold transition-colors duration-200"
          style={{ color: focused ? cat.color : "rgba(255,255,255,0.3)" }}
        >
          ₹
        </span>
        <input
          type="number"
          min="0"
          value={cat.amount}
          onChange={(e) => onChange(cat.id, e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="0.00"
          className="w-full rounded-xl pl-8 pr-3 py-2 text-sm text-right font-bold focus:outline-none transition-all duration-200"
          style={{
            background: focused ? `${cat.color}15` : "rgba(255,255,255,0.05)",
            border: focused
              ? `1.5px solid ${cat.color}`
              : "1.5px solid rgba(255,255,255,0.1)",
            color: cat.amount ? "white" : "rgba(255,255,255,0.3)",
          }}
        />
      </div>
    </div>
  );
}
