import Card from "./ui/Card";

const BudgetPlan = () => {
  return (
    <div>
      <div className="w-full bg-yellow-100/70 rounded-none shadow p-4">
        <h4 className="text-xl font-semibold text-left text-gray-900">Plans</h4>
      </div>
      <div className="mt-6 bg-yellow-200 grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card>plan</Card>
        <Card>actual</Card>
      </div>
    </div>
  );
};

export default BudgetPlan;
