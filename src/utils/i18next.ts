import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// Import multiple namespaces
import landingEn from "../locales/en/landing-page.json";
import paymentEn from "../locales/en/payment.json";
import sidebarEn from "../locales/en/sidebar.json";
import tableEn from "../locales/en/table.json";
import productsEn from "../locales/en/products.json";
import invoiceSettinjgsEn from "../locales/en/invoice-setting.json";

// Spanish translations
import landingEs from "../locales/es/landing-page.json";
import paymentEs from "../locales/es/payment.json";
import sidebarEs from "../locales/es/sidebar.json";
import tableEs from "../locales/es/table.json";
import productsEs from "../locales/es/products.json";
import invoiceSettinjgsEs from "../locales/es/invoice-setting.json";

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
        products: productsEn,
        invoice_settings: invoiceSettinjgsEn,
      },
      es: {
        sidebar: sidebarEs,
        landing: landingEs,
        table: tableEs,
        payment: paymentEs,
        products: productsEs,
        invoice_settings: invoiceSettinjgsEs,
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
