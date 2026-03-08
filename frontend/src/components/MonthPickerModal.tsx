import { useState } from "react";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface Props {
  onConfirm: (month: number, year: number) => void;
  onCancel: () => void;
}

const MonthPickerModal: React.FC<Props> = ({ onConfirm, onCancel }) => {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1); // 1-12
  const [year, setYear] = useState(now.getFullYear());

  const years = [now.getFullYear(), now.getFullYear() + 1];

  return (
    // Backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm mx-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          Save Budget Plan
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Choose which month this plan is for
        </p>

        {/* Month select */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Month
          </label>
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="w-full rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-yellow-50"
          >
            {MONTHS.map((m, i) => (
              <option key={m} value={i + 1}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Year select */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Year
          </label>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-yellow-50"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-lg border text-gray-600 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(month, year)}
            className="flex-1 py-2.5 rounded-lg bg-yellow-300 text-gray-900 font-medium hover:bg-yellow-400 transition"
          >
            Save Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonthPickerModal;
