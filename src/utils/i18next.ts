import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// Import multiple namespaces
import landingEn from "../locales/en/landing-page.json";
import notificationEn from "../locales/en/notification.json";
import paymentEn from "../locales/en/payment.json";
import sidebarEn from "../locales/en/sidebar.json";
import subscriptionEn from "../locales/en/subscription.json";
import tableEn from "../locales/en/table.json";

// Spanish translations
import landingEs from "../locales/es/landing-page.json";
import notificationEs from "../locales/es/notification.json";
import paymentEs from "../locales/es/payment.json";
import sidebarEs from "../locales/es/sidebar.json";
import subscriptionEs from "../locales/es/subscription.json";
import tableEs from "../locales/es/table.json";

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
      },
      es: {
        sidebar: sidebarEs,
        landing: landingEs,
        table: tableEs,
        payment: paymentEs,
        notification: notificationEs,
        subscription: subscriptionEs,
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
