import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideNav from "../components/SideNav";

const MainLayout = () => {
  return (
    <div className="flex h-screen">
      <div className="w-55 flex-shrink-0 h-screen overflow-y-auto">
        <SideNav />
      </div>
      <div className="flex flex-col flex-1 h-screen">
        <div className="flex-shrink-0 h-16 bg-white shadow z-10">
          <Header />
        </div>
        <main className="flex-1 overflow-y-auto p-6 bg-[rgb(215,204,200)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
