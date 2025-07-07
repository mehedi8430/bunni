import DashboardLayout from "@/layout/DashboardLayout";
import HomePage from "@/pages/Home";
import { createBrowserRouter } from "react-router";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <div>Error occurred</div>,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <div>Error occurred</div>,
  },
]);
