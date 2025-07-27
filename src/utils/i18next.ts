import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// Import multiple namespaces
// import actionsEn from "../locales/en/actions.json";
import sidebarEn from "../locales/en/sidebar.json";
// import tableEn from "../locales/en/table.json";

// import actionsEs from "../locales/es/actions.json";
import sidebarEs from "../locales/es/sidebar.json";
// import tableEs from "../locales/es/table.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        sidebar: sidebarEn,
      },
      es: {
        sidebar: sidebarEs,
      },
    },
    fallbackLng: "en",
    ns: ["sidebar", "table", "actions"],
    defaultNS: "sidebar",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
