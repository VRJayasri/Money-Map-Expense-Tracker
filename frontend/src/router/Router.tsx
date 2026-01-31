import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Statistics from "../pages/Statistics";
import MainLayout from "../layout/Main";
import AddExpense from "../pages/AddExpense";

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
      { path: "/add-expense", element: <AddExpense /> },
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
