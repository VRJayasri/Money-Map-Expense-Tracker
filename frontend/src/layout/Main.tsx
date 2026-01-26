import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideNav from "../components/SideNav";

const MainLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Side Navigation */}
      <SideNav />

      <div className="flex flex-col flex-1">
        <Header />

        <main className="flex-1 p-6 bg-yellow-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
