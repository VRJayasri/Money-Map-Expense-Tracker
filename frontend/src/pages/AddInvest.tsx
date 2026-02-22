import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type FormErrors = {
  category?: string;
  amount?: string;
  paymentMethod?: string;
};

const categories = ["FD", "SIP", "Mutual Funds", "Others"];
const applications = ["Jupyter", "Uptox", "others"];

const AddInvest = () => {
  const [category, setCategory] = useState("");
  const [app, setApp] = useState("");

  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const balance = 12000;
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!category) newErrors.category = "Category is required";
    if (!amount) newErrors.amount = "Amount is required";
    if (!paymentMethod) newErrors.paymentMethod = "Payment method is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    console.log({
      category,
      amount: Number(amount),
      notes,
      paymentMethod,
    });

    setCategory("");
    setAmount("");
    setNotes("");
    setPaymentMethod("");
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className=" bg-[rgb(255,255,240)] rounded-2xl shadow-md border  border-gray-100 p-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-lg mb-3 text-gray-600
      hover:text-black transition"
        >
          <ArrowLeft />
        </button>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Invest</h2>
            <p className="text-sm text-gray-500 mt-1">
              Available Balance:{" "}
              <span className="font-medium text-green-600">₹ {balance}</span>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 ">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1 ">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-yellow-100/70"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 ">
                App <span className="text-red-500">*</span>
              </label>
              <select
                value={app}
                onChange={(e) => setApp(e.target.value)}
                className="w-full rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-yellow-100/70"
              >
                <option value="">Invested app</option>
                {applications.map((application) => (
                  <option key={application} value={application}>
                    {application}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category}</p>
              )}
            </div>
            {/* Amount */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Amount <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="₹ Enter amount"
                className="w-full rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-yellow-100/70"
              />
              {errors.amount && (
                <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description / Notes
            </label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add a short note about this expense"
              className="w-full rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2  focus:ring-yellow-300 resize-none"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Payment Method <span className="text-red-500">*</span>
            </label>

            <div className="flex gap-6">
              {["Online", "Others"].map((method) => (
                <label
                  key={method}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg border cursor-pointer
                  ${
                    paymentMethod === method
                      ? "border-yellow-400 bg-yellow-50"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="text-sm font-medium">{method}</span>
                </label>
              ))}
            </div>

            {errors.paymentMethod && (
              <p className="text-red-500 text-xs mt-1">
                {errors.paymentMethod}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-10 py-2.5 rounded-lg bg-yellow-300 text-black font-medium
              hover:bg-yellow-400 transition shadow-sm"
            >
              Invested
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInvest;
