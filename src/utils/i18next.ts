import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// Import multiple namespaces
import landingEn from "../locales/en/landing-page.json";
import sidebarEn from "../locales/en/sidebar.json";
import tableEn from "../locales/en/table.json";

// Spanish translations
import landingEs from "../locales/es/landing-page.json";
import sidebarEs from "../locales/es/sidebar.json";
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
      },
      es: {
        sidebar: sidebarEs,
        landing: landingEs,
        table: tableEs,
      },
    },
    fallbackLng: "en",
    ns: ["landing"],
    defaultNS: "landing",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
