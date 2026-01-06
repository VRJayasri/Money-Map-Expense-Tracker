import { NavLink } from "react-router-dom";
import { useState } from "react";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`h-screen bg-yellow-900 text-white p-4 transition-all duration-300 ${
        isOpen ? "w-56" : "w-16"
      }`}
    >
      {/* Top Section */}
      <div className="flex items-center justify-between mb-6">
        {isOpen && <h2 className="text-lg font-semibold">Menu</h2>}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xl font-bold"
        >
          ☰
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded ${
              isActive ? "bg-yellow-600" : "hover:bg-green-700"
            }`
          }
        >
          🏠
          {isOpen && <span>Home</span>}
        </NavLink>

        <NavLink
          to="/statistics"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded ${
              isActive ? "bg-yellow-600" : "hover:bg-green-700"
            }`
          }
        >
          📊
          {isOpen && <span>Statistics</span>}
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded ${
              isActive ? "bg-yellow-600" : "hover:bg-green-700"
            }`
          }
        >
          ⚙️
          {isOpen && <span>Settings</span>}
        </NavLink>
      </nav>
    </aside>
  );
};

export default SideNav;
