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

const BudgetPlan = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="w-full bg-yellow-100/70 rounded-none shadow p-4">
        <h4 className="text-xl font-semibold text-left text-gray-900">Plans</h4>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          {/* Header */}
          <h2 className="text-lg font-semibold text-[rgb(78,52,46)] mb-4 flex items-center gap-2">
            Monthly Plan
            <span className="cursor-pointer hover:text-yellow-500">
              <Pencil className="w-4 h-4" />
            </span>
          </h2>

          {/* Income */}
          <div className="mb-5 p-3 bg-white rounded-lg shadow-sm">
            <p className="text-xs text-gray-500">Income</p>
            <p className="text-2xl font-bold text-green-700">₹8000</p>
          </div>

          {/* Expenses */}
          <div className="space-y-2 text-sm text-gray-700">
            {[
              { icon: <Utensils />, label: "Food", value: "₹500" },
              { icon: <Bus />, label: "Travel", value: "₹1,000" },
              { icon: <Shirt />, label: "Accessories", value: "₹1,500" },
              { icon: <Handshake />, label: "Friends loan", value: "₹0" },
              { icon: <HouseHeart />, label: "Home", value: "₹10,000" },
              { icon: <Birdhouse />, label: "Rent", value: "₹6,500" },
              { icon: <HandCoins />, label: "Savings", value: "₹2,500" },
              {
                icon: <BadgeIndianRupee />,
                label: "Investment",
                value: "₹600",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-yellow-100/70 transition"
              >
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-yellow-100 rounded-md text-[rgb(78,52,46)]">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Balance */}
          <div className="border-t mt-5 pt-4 flex justify-between font-semibold">
            <span>Balance</span>
            <span className="text-green-600">₹XXXX</span>
          </div>
        </Card>

        {/* Actual card */}
        <Card>
          {/* Header */}
          <h2 className="text-lg font-semibold text-[rgb(78,52,46)] mb-4 flex items-center gap-2">
            Actual done
            <span className="cursor-pointer hover:text-yellow-500">
              <Pencil className="w-4 h-4" />
            </span>
          </h2>

          {/* Income */}
          <div className="mb-5 p-3 bg-white rounded-lg shadow-sm">
            <p className="text-xs text-gray-500">Balance</p>
            <p className="text-2xl font-bold text-green-700">₹2000</p>
          </div>

          {/* Expenses */}
          <div className="space-y-2 text-sm text-gray-700">
            {[
              { icon: <Utensils />, label: "Food", value: "₹50" },
              { icon: <Bus />, label: "Travel", value: "₹100" },
              { icon: <Shirt />, label: "Accessories", value: "₹1,500" },
              { icon: <Handshake />, label: "Friends loan", value: "₹0" },
              { icon: <HouseHeart />, label: "Home", value: "₹10,000" },
              { icon: <Birdhouse />, label: "Rent", value: "₹6,500" },
              { icon: <HandCoins />, label: "Savings", value: "₹2,500" },
              {
                icon: <BadgeIndianRupee />,
                label: "Investment",
                value: "₹600",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-yellow-100/70 transition"
              >
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-yellow-100 rounded-md text-[rgb(78,52,46)]">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Balance */}
          <div className="border-t mt-5 pt-4 flex justify-between font-semibold">
            <span>Total Spend</span>
            <span className="text-green-600">₹XXXX</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BudgetPlan;
