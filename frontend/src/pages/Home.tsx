import Dashboard from "../components/Dashboard";

const Home = () => {
  return (
    <div className="p-6 bg-yellow-200 space-y-6">
      <Dashboard />
      <div className="p-6 bg-yellow-200 space-y-6">
        {/* Header */}
        <div className="w-full bg-yellow-100/70 rounded-none shadow p-4">
          <h4 className="text-xl font-semibold text-left text-gray-900">
            Plans
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Home;
