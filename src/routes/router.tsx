import HomePage from "@/pages/Home";
import { createBrowserRouter } from "react-router";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <div>Error occurred</div>,
  },
]);
