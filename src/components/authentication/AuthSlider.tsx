import { images } from "@/lib/imageProvider";
import Image from "../shared/Image";
import SlideCard from "./SlideCard";

export default function AuthSlider() {
  return (
    <div className="relative hidden lg:block">
      <Image
        src={images.authBackground}
        alt="Authentication background"
        fill
        priority
        className="h-full w-full bg-[#228E67] dark:brightness-[0.2] dark:grayscale"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#228E67] opacity-50 dark:to-[#1a4d3b]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-xl">
          <SlideCard />
        </div>
      </div>
    </div>
  );
}
