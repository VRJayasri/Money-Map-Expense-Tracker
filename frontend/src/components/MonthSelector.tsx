import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const months = [
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

interface MonthDropdownProps {
  value: string;
  onChange: (month: string) => void;
}

const MonthDropdown = ({ value, onChange }: MonthDropdownProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-48">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-lg border border-gray-100  bg-transparent   px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
      >
        {value || "Select Month"}
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-lg border border-gray-100   bg-yellow-100 shadow-lg">
          {months.map((month) => (
            <li
              key={month}
              onClick={() => {
                onChange(month);
                setOpen(false);
              }}
              className={`cursor-pointer px-4 py-2 text-sm hover:bg-yellow-50
                ${value === month ? "bg-yellow-100 font-medium text-yellow-700" : "text-gray-700"}`}
            >
              {month}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MonthDropdown;
