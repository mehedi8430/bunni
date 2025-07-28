import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// Import multiple namespaces
import addCustomerModalEn from "../locales/en/add-customer-modal.json";
import addMemberModalEn from "../locales/en/add-member-modal.json";
import landingEn from "../locales/en/landing-page.json";
import notificationEn from "../locales/en/notification.json";
import paymentEn from "../locales/en/payment.json";
import sidebarEn from "../locales/en/sidebar.json";
import subscriptionEn from "../locales/en/subscription.json";
import tableEn from "../locales/en/table.json";
import viewCustomerModalEn from "../locales/en/view-customer-modal.json";

// Spanish translations
import addCustomerModalEs from "../locales/es/add-customer-modal.json";
import addMemberModalEs from "../locales/es/add-member-modal.json";
import landingEs from "../locales/es/landing-page.json";
import notificationEs from "../locales/es/notification.json";
import paymentEs from "../locales/es/payment.json";
import sidebarEs from "../locales/es/sidebar.json";
import subscriptionEs from "../locales/es/subscription.json";
import tableEs from "../locales/es/table.json";
import viewCustomerModalEs from "../locales/es/view-customer-modal.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        sidebar: sidebarEn,
        landing: landingEn,
        table: tableEn,
        payment: paymentEn,
        notification: notificationEn,
        subscription: subscriptionEn,
        add_customer_modal: addCustomerModalEn,
        view_customer_modal: viewCustomerModalEn,
        add_member_modal: addMemberModalEn,
      },
      es: {
        sidebar: sidebarEs,
        landing: landingEs,
        table: tableEs,
        payment: paymentEs,
        notification: notificationEs,
        subscription: subscriptionEs,
        add_customer_modal: addCustomerModalEs,
        view_customer_modal: viewCustomerModalEs,
        add_member_modal: addMemberModalEs,
      },
    },
    fallbackLng: "en",
    ns: ["landing", "table", "payment"],
    defaultNS: "landing",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
