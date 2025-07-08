import DashboardLayout from "@/layout/DashboardLayout";
import DashboardPage from "@/pages/Dashboard";
import CustomerPage from "@/pages/Dashboard/Customer";
import InvoicesPage from "@/pages/Dashboard/Invoices";
import PaymentPage from "@/pages/Dashboard/Payment";
import ProductsPage from "@/pages/Dashboard/Products";
import HomePage from "@/pages/Home";
import SettingsPage from "@/pages/Settings";
import InvoiceSettingsPage from "@/pages/Settings/InvoiceSettings";
import NotificationPage from "@/pages/Settings/Notification";
import PaymentIntegrationPage from "@/pages/Settings/PaymentIntegration";
import ProfileSettingsPage from "@/pages/Settings/ProfileSettings";
import SubscriptionPage from "@/pages/Settings/Subscription";
import UserManagementPage from "@/pages/Settings/UserManagement";
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
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "invoices",
        element: <InvoicesPage />,
      },
      {
        path: "customer",
        element: <CustomerPage />,
      },
      {
        path: "payment",
        element: <PaymentPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "settings/profile",
        element: <ProfileSettingsPage />,
      },
      {
        path: "settings/invoice",
        element: <InvoiceSettingsPage />,
      },
      {
        path: "settings/user",
        element: <UserManagementPage />,
      },
      {
        path: "settings/subscription",
        element: <SubscriptionPage />,
      },
      {
        path: "settings/notification",
        element: <NotificationPage />,
      },
      {
        path: "settings/payment",
        element: <PaymentIntegrationPage />,
      },
    ],
  },
]);
