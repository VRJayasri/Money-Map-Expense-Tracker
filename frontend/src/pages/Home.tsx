import BudgetPlan from "../components/BudgetPlan";
import Dashboard from "../components/Dashboard";

const Home = () => {
  return (
    <div>
      <Dashboard />
      <div className="p-6 bg-yellow-200 space-y-6">
        {/* Header */}
        <BudgetPlan />
      </div>
    </div>
  );
};

export default Home;
