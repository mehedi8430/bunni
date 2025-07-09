// Image and Icon Assets Provider
import check from "../assets/icons/check.svg";
import document from "../assets/icons/document.svg";
import getPaid from "../assets/icons/getPaid.svg";
import navLogo from "../assets/icons/Logo.svg";
import rightArrow from "../assets/icons/rightArrow.svg";
import taskIcon1 from "../assets/icons/task_icon1.svg";
import taskIcon2 from "../assets/icons/task_icon2.svg";
import taskIcon3 from "../assets/icons/task_icon3.svg";
import threeStar from "../assets/icons/three_star.svg";
import user from "../assets/icons/user.svg";
import authBackground from "../assets/images/Background_Rectangles.svg";
import banner from "../assets/images/Banner.svg";
import dashboard from "../assets/images/Dashboard.png";
import myCard from "../assets/images/myCard.svg";
import placeholderImage from "../assets/images/placeholder.svg";
import sendMoney from "../assets/images/sendMoney.svg";
import reactIcon from "../assets/react.svg";

// Type definitions for better type safety
export interface IconAssets {
  react: string;
  [key: string]: string;
  navLogo: string;
  rightArrow: string;
  // Add more icon types here as needed
}

export interface ImageAssets {
  placeholder: string;
  authBackground: string;
  banner: string;
  dashboard: string;
  myCard: string;
  sendMoney: string;
  // Add more image types here as needed
}

export interface AssetCollection {
  icons: IconAssets;
  images: ImageAssets;
}

// Icons collection - typically smaller assets used for UI elements
export const icons: IconAssets = {
  react: reactIcon,
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
  // Add more icons here as needed
  // Example: user, settings, dashboard, etc.
};

// Images collection - typically larger assets used for content
export const images: ImageAssets = {
  placeholder: placeholderImage,
  authBackground: authBackground,
  banner: banner,
  dashboard: dashboard,
  myCard: myCard,
  sendMoney: sendMoney,
  // Add more images here as needed
  // Example: banners, avatars, backgrounds, etc.
};

// Asset categories for better organization
export const assets: AssetCollection = {
  icons,
  images,
};

// Individual exports for backward compatibility
export { placeholderImage, reactIcon };

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

/*
USAGE EXAMPLES:

1. Import specific assets:
   import { icons, images } from '@/lib/imageProvider';
   <img src={icons.react} alt="React" />
   <img src={images.placeholder} alt="Placeholder" />

2. Use utility functions:
   import { getAsset, hasAsset } from '@/lib/imageProvider';
   const reactIcon = getAsset('icons', 'react');
   const exists = hasAsset('images', 'placeholder');

3. Import all assets:
   import assets from '@/lib/imageProvider';
   <img src={assets.icons.react} alt="React" />
   <img src={assets.images.placeholder} alt="Placeholder" />

4. Get all assets of a category:
   import { getAssetsByCategory } from '@/lib/imageProvider';
   const allIcons = getAssetsByCategory('icons');
   const allImages = getAssetsByCategory('images');
*/

// Default export
export default assets;
