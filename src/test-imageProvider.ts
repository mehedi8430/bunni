// Test file to verify imageProvider functionality
import {
  assets,
  getAsset,
  getAssetsByCategory,
  hasAsset,
  icons,
  images,
} from "./lib/imageProvider";

// Test the different ways to access assets
console.log("=== ImageProvider Tests ===");

// Test 1: Direct access to icons and images
console.log("Icons:", icons);
console.log("Images:", images);

// Test 2: Access through assets object
console.log("Assets.icons:", assets.icons);
console.log("Assets.images:", assets.images);

// Test 3: Use utility functions
console.log("getAsset(icons, react):", getAsset("icons", "react"));
console.log(
  "getAsset(images, placeholder):",
  getAsset("images", "placeholder")
);

// Test 4: Check if assets exist
console.log("hasAsset(icons, react):", hasAsset("icons", "react"));
console.log(
  "hasAsset(images, nonexistent):",
  hasAsset("images", "nonexistent")
);

// Test 5: Get all assets by category
console.log("All icons:", getAssetsByCategory("icons"));
console.log("All images:", getAssetsByCategory("images"));

export default "imageProvider tests completed";
