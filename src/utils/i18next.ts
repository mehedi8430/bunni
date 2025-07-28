import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// Import multiple namespaces
import addCustomerModalEn from "../locales/en/add-customer-modal.json";
import addMemberModalEn from "../locales/en/add-member-modal.json";
import addPaymentModalEn from "../locales/en/add-payment-modal.json";
import addProductModalEn from "../locales/en/add-product-modal.json";
import createDiscountModalEn from "../locales/en/create-discount-modal.json";
import editPaymentModalEn from "../locales/en/edit-payment-modal.json";
import invoiceSettinjgsEn from "../locales/en/invoice-setting.json";
import landingEn from "../locales/en/landing-page.json";
import notificationEn from "../locales/en/notification.json";
import paymentScheduleModalEn from "../locales/en/payment-schedule-modal.json";
import paymentEn from "../locales/en/payment.json";
import productsEn from "../locales/en/products.json";
import sidebarEn from "../locales/en/sidebar.json";
import subscriptionEn from "../locales/en/subscription.json";
import tableEn from "../locales/en/table.json";
import userManagementEn from "../locales/en/user_management.json";
import viewCustomerModalEn from "../locales/en/view-customer-modal.json";
import viewPaymentDetailsModalEn from "../locales/en/view-payment-details-modal.json";
import virtualTerminalModalEn from "../locales/en/virtual-terminal-modal.json";

// Spanish translations
import addCustomerModalEs from "../locales/es/add-customer-modal.json";
import addMemberModalEs from "../locales/es/add-member-modal.json";
import addPaymentModalEs from "../locales/es/add-payment-modal.json";
import addProductModalEs from "../locales/es/add-product-modal.json";
import createDiscountModalEs from "../locales/es/create-discount-modal.json";
import editPaymentModalEs from "../locales/es/edit-payment-modal.json";
import invoiceSettinjgsEs from "../locales/es/invoice-setting.json";
import landingEs from "../locales/es/landing-page.json";
import notificationEs from "../locales/es/notification.json";
import paymentScheduleModalEs from "../locales/es/payment-schedule-modal.json";
import paymentEs from "../locales/es/payment.json";
import productsEs from "../locales/es/products.json";
import sidebarEs from "../locales/es/sidebar.json";
import subscriptionEs from "../locales/es/subscription.json";
import tableEs from "../locales/es/table.json";
import userManagementEs from "../locales/es/user_management.json";
import viewCustomerModalEs from "../locales/es/view-customer-modal.json";
import viewPaymentDetailsModalEs from "../locales/es/view-payment-details-modal.json";
import virtualTerminalModalEs from "../locales/es/virtual-terminal-modal.json";

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
        add_customer_modal: addCustomerModalEn,
        view_customer_modal: viewCustomerModalEn,
        notification: notificationEn,
        subscription: subscriptionEn,
        add_member_modal: addMemberModalEn,
        payment_schedule_modal: paymentScheduleModalEn,
        virtual_terminal_modal: virtualTerminalModalEn,
        add_payment_modal: addPaymentModalEn,
        user_management: userManagementEn,
        edit_payment_modal: editPaymentModalEn,
        view_payment_details_modal: viewPaymentDetailsModalEn,
        add_product_modal: addProductModalEn,
        create_discount_modal: createDiscountModalEn,
      },
      es: {
        sidebar: sidebarEs,
        landing: landingEs,
        table: tableEs,
        payment: paymentEs,
        products: productsEs,
        invoice_settings: invoiceSettinjgsEs,
        add_customer_modal: addCustomerModalEs,
        view_customer_modal: viewCustomerModalEs,
        notification: notificationEs,
        subscription: subscriptionEs,
        add_member_modal: addMemberModalEs,
        payment_schedule_modal: paymentScheduleModalEs,
        virtual_terminal_modal: virtualTerminalModalEs,
        add_payment_modal: addPaymentModalEs,
        user_management: userManagementEs,
        edit_payment_modal: editPaymentModalEs,
        view_payment_details_modal: viewPaymentDetailsModalEs,
        add_product_modal: addProductModalEs,
        create_discount_modal: createDiscountModalEs,
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
