// Image and Icon Assets Provider
import apple from "../assets/icons/apple.svg"; // Assuming you have an apple icon
import arrowLeft from "../assets/icons/arrow_left.svg"; // Example of another icon
import arrowRight from "../assets/icons/arrow_right.svg"; // Example of another icon
import check from "../assets/icons/check.svg";
import document from "../assets/icons/document.svg";
import file from "../assets/icons/file.svg";
import getPaid from "../assets/icons/getPaid.svg";
import google from "../assets/icons/google.svg";
import navLogo from "../assets/icons/Logo.svg";
import reportingFilter from "../assets/icons/reportingFilter.svg";
import requring from "../assets/icons/requring.svg";
import rightArrow from "../assets/icons/rightArrow.svg";
import success from "../assets/icons/success.svg"; // Assuming you have a success icon
import taskIcon1 from "../assets/icons/task_icon1.svg";
import taskIcon2 from "../assets/icons/task_icon2.svg";
import taskIcon3 from "../assets/icons/task_icon3.svg";
import threeStar from "../assets/icons/three_star.svg";
import user from "../assets/icons/user.svg";
import authBackground from "../assets/images/Background_Rectangles.svg";
import banner from "../assets/images/Banner.svg";
import chartCard from "../assets/images/chart_card.svg"; // Assuming you have a chard card icon
import dashboard from "../assets/images/Dashboard.png";
import myCard from "../assets/images/myCard.svg";
import placeholderImage from "../assets/images/placeholder.svg";
import sendMoney from "../assets/images/sendMoney.svg";

import customer from "../assets/icons/customer.svg";
import dashboard_icon from "../assets/icons/dashboard_icon.svg";
import invoice_settings from "../assets/icons/invoice_settings.svg";
import invoices from "../assets/icons/invoices.svg";
import notification from "../assets/icons/notification.svg";
import payment from "../assets/icons/payment.svg";
import payment_integration from "../assets/icons/payment_integration.svg";
import products from "../assets/icons/products.svg";
import profile_settings from "../assets/icons/profile_settings.svg";
import settings from "../assets/icons/settings.svg";
import subscription from "../assets/icons/subscription.svg";
import user_management from "../assets/icons/user_management.svg";

// Type definitions for better type safety
export interface IconAssets {
  taskIcon1: string;
  taskIcon2: string;
  taskIcon3: string;
  threeStar: string;
  navLogo: string;
  rightArrow: string;
  user: string;
  document: string;
  getPaid: string;
  check: string;
  file: string;
  requring: string;
  reportingFilter: string;
  invoices: string;
  customer: string;
  payment: string;
  products: string;
  dashboard_icon: string;
  invoice_settings: string;
  payment_integration: string;
  notification: string;
  profile_settings: string;
  subscription: string;
  user_management: string;
  settings: string;
  [key: string]: string;
}

export interface ImageAssets {
  [key: string]: string;
  placeholder: string;
  authBackground: string;
  banner: string;
  dashboard: string;
  myCard: string;
  sendMoney: string;
  chartCard: string; // Assuming you have a chard card image
  // Add more image types here as needed
}

export interface AssetCollection {
  icons: IconAssets;
  images: ImageAssets;
}

// Icons collection - typically smaller assets used for UI elements
export const icons: IconAssets = {
  google: google,
  apple: apple,
  arrowLeft: arrowLeft,
  arrowRight: arrowRight,
  taskIcon1,
  taskIcon2,
  taskIcon3,
  threeStar,
  navLogo: navLogo,
  rightArrow: rightArrow,
  user,
  document,
  getPaid,
  check,
  file,
  requring,
  reportingFilter,
  invoices,
  customer,
  payment,
  products,
  dashboard_icon,
  invoice_settings,
  payment_integration,
  notification,
  profile_settings,
  subscription,
  user_management,
  settings,
  success,

  // Add more icons here as needed
  // Example: user, settings, dashboard, etc.
};

// Images collection - typically larger assets used for content
export const images: ImageAssets = {
  placeholder: placeholderImage,
  authBackground: authBackground,
  chartCard: chartCard,
  banner: banner,
  dashboard: dashboard,
  myCard: myCard,
  sendMoney: sendMoney,
};

// Asset categories for better organization
export const assets: AssetCollection = {
  icons,
  images,
};

// Individual exports for backward compatibility
export { placeholderImage };

// Utility function to get asset by category and name
export const getAsset = (
  category: keyof AssetCollection,
  name: string,
): string | undefined => {
  return assets[category][name as keyof (typeof assets)[typeof category]];
};

// Utility function to get all assets of a specific category
export const getAssetsByCategory = (category: keyof AssetCollection) => {
  return assets[category];
};

// Utility function to check if an asset exists
export const hasAsset = (
  category: keyof AssetCollection,
  name: string,
): boolean => {
  return name in assets[category];
};

// Default export
export default assets;
