import ConfirmationCodeForm from "@/components/authentication/ConfirmationCodeForm";
import ForgotPasswordForm from "@/components/authentication/ForgotPasswordForm";
import { LoginForm } from "@/components/authentication/LoginForm";
import RegistrationForm from "@/components/authentication/RegistrationForm";
import ResetYourPasswordForm from "@/components/authentication/ResetYourPasswordForm";
import VerificationCodeForm from "@/components/authentication/VerificationCodeForm";
import AddPhoneNumber from "@/components/businessSetup/AddPhoneNumber";
import BusinessInformationForm from "@/components/businessSetup/BusinessInformationForm";
import DetailCompanyNameForm from "@/components/businessSetup/DetailCompanyNameForm";
import WhatWouldLikeToDoForm from "@/components/businessSetup/WhatWouldLikeToDoForm";
import AuthLayout from "@/layout/AuthLayout";
import BusinessInformationLayout from "@/layout/BusinessInformationLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import DashboardPage from "@/pages/Dashboard";
import CreateInvoiceTemplatePage from "@/pages/Dashboard/CreateInvoiceTemplatePage";
import PreviewTemplate from "@/pages/Dashboard/CreateInvoiceTemplatePage/Components/PreviewTemplate";
import CustomerPage from "@/pages/Dashboard/Customer";
import InvoicesPage from "@/pages/Dashboard/Invoices";
import InvoiceTemplatesPage from "@/pages/Dashboard/InvoiceTemplatesPage";
import NotificationPageForMobile from "@/pages/Dashboard/NotificationPageForMobile";
import PaymentPage from "@/pages/Dashboard/Payment";
import ProductsPage from "@/pages/Dashboard/Products";
import HomePage from "@/pages/Home";
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
        path: "invoices/templates",
        element: <InvoiceTemplatesPage />,
      },
      {
        path: "template",
        element: <CreateInvoiceTemplatePage />,
        children: [
          // This is the default route for the template preview
          {
            path: "invoice/:id",
            element: <PreviewTemplate />,
          },
        ],
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
      {
        path: "notifications",
        element: <NotificationPageForMobile />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    errorElement: <div>Error occurred</div>,
    children: [
      {
        index: true,
        element: <LoginForm />,
      },

      {
        path: "register",
        element: <RegistrationForm />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordForm />,
      },
      {
        path: "verification/:token/:email",
        element: <VerificationCodeForm />,
      },
      {
        path: "confirmation-code",
        element: <ConfirmationCodeForm />,
      },
      {
        path: "reset-password",
        element: <ResetYourPasswordForm />,
      },
    ],
  },

  {
    path: "business-setup",
    element: <BusinessInformationLayout />,
    errorElement: <div>Error occurred</div>,
    children: [
      {
        index: true,
        element: <BusinessInformationForm />,
      },
      {
        path: "1",
        element: <DetailCompanyNameForm />,
      },
      {
        path: "2",
        element: <WhatWouldLikeToDoForm />,
      },
      {
        path: "add-phone-number",
        element: <AddPhoneNumber />,
      },
    ],
  },
]);
