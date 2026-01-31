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
          <h3 className="text-lg font-mono">₹ 8000</h3>
        </Card>

        <Card>
          <h1 className="text-sm font-serif mb-1  text-gray-600">Expense</h1>
          <h3 className="text-lg font-mono">₹ 8000</h3>
        </Card>

        <Card>
          <h1 className="text-sm font-serif mb-1 text-gray-600">Balance</h1>
          <h3 className="text-lg font-mono text">₹ 8000</h3>
        </Card>

        <Card>
          <h1 className="text-sm font-serif mb-1  text-gray-600">Invested</h1>
          <h3 className="text-lg font-mono">₹ 8000</h3>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
