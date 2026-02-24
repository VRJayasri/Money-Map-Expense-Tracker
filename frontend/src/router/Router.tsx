import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Statistics from "../pages/Statistics";
import MainLayout from "../layout/Main";
import AddExpense from "../pages/AddExpense";
import AddInvest from "../pages/AddInvest";
import Planner from "../pages/Planner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
      {
        path: "planner",
        element: <Planner />,
      },
      { path: "/add-expense", element: <AddExpense /> },
      { path: "/add-invest", element: <AddInvest /> },
      {
        path: "settings",
        element: <Statistics />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
