import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Statistics from "../pages/Statistics";
import MainLayout from "../layout/Main";

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
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
