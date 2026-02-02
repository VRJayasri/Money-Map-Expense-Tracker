import { NavLink } from "react-router-dom";
import { useState } from "react";
import { ChartPie, House, Menu, Settings } from "lucide-react";

interface SideNavProps {
  defaultOpen?: boolean;
  isMobile?: boolean;
}

const SideNav = ({ isMobile = false }: SideNavProps) => {
  const [isOpen, setIsOpen] = useState(isMobile);

  return (
    <aside
      className={`h-screen bg-[rgb(78,52,46)] text-white p-4 transition-all duration-300 ${
        isOpen ? "w-56" : "w-20"
      }`}
    >
      <div className="flex items-center justify-between mb-10">
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded ${
              isActive
                ? "bg-[rgb(215,204,200)] text-black"
                : "hover:bg-[rgb(215,204,200)] hover:text-black"
            }`
          }
        >
          <House />
          {isOpen && <span>Home</span>}
        </NavLink>

        <NavLink
          to="/statistics"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded ${
              isActive
                ? "bg-[rgb(215,204,200)] text-black"
                : "hover:bg-[rgb(215,204,200)] hover:text-black"
            }`
          }
        >
          <ChartPie />
          {isOpen && <span>Statistics</span>}
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded ${
              isActive
                ? "bg-[rgb(215,204,200)] text-black"
                : "hover:bg-[rgb(215,204,200)] hover:text-black"
            }`
          }
        >
          <Settings />
          {isOpen && <span>Settings</span>}
        </NavLink>
      </nav>
    </aside>
  );
};

export default SideNav;
