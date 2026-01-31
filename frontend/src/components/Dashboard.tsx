import { Link } from "react-router-dom";
import Card from "./ui/Card";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="w-full bg-yellow-100/70 rounded-none shadow p-4">
        <h4 className="text-xl font-semibold text-left text-amber-950">
          Dashboard
        </h4>
      </div>

      {/* Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <h1 className="text-sm font-serif mb-1  text-gray-600">Income</h1>
          <h3 className="text-lg font-mono">₹ 8,000</h3>
        </Card>

        <Card className="p-4 hover:shadow-lg transition">
          <h1 className="text-sm font-serif mb-1  text-gray-600">Expense</h1>

          <div className="flex items-center justify-between">
            <h3 className="text-lg font-mono">₹8,000</h3>

            <Link
              to="/add-expense"
              className="px-4 py-1.5 text-sm font-medium rounded-full
                 bg-yellow-400 text-gray-900
                 hover:bg-yellow-500 active:scale-95 transition"
            >
              + Add
            </Link>
          </div>
        </Card>

        <Card>
          <h1 className="text-sm font-serif mb-1 text-gray-600">Balance</h1>
          <h3 className="text-lg font-mono text">₹ 8,000</h3>
        </Card>

        <Card>
          <h1 className="text-sm font-serif mb-1  text-gray-600">Invested</h1>
          <h3 className="text-lg font-mono">₹ 8,000</h3>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
