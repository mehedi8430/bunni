import Image from "@/components/shared/Image";
import { icons, images } from "@/lib/imageProvider";
import Navbar from "./Navbar";

export default function Banner() {
  return (
    <section className="relative w-full">
      <div className="absolute inset-x-0 top-0 -z-10 h-[550px] overflow-hidden md:h-[720px] lg:h-[75%] xl:h-[75%]">
        <Image
          src={images.banner}
          alt="Background Banner"
          fill
          priority
          className="object-cover object-center"
        />
      </div>
      <Navbar />
      <div className="container mx-auto mt-3 md:mt-20">
        <div className="text-center max-sm:px-5">
          <h1 className="text-2xl font-bold md:text-3xl lg:text-5xl xl:text-7xl">
            Invoicing Meets Simplicity — With Smart Payments & Presentations
          </h1>
          <p className="text-foreground/50 mt-4.5 md:px-10 md:text-xl lg:text-2xl xl:text-3xl">
            Send invoices, accept payments, manage customers, and create
            stunning business presentations — all in one powerful platform.
          </p>
          <button className="bg-primary mx-auto mt-8 flex cursor-pointer items-center justify-center gap-2 rounded-md px-8 py-3 text-white md:px-16 md:py-4 md:text-xl lg:px-20 lg:py-5 xl:px-24 xl:py-7">
            Get Started
            <Image
              src={icons.rightArrow}
              alt="Right Arrow"
              width={20}
              height={20}
              priority
            />
          </button>
        </div>
        <div className="mt-8 md:mt-16 lg:mt-20 xl:mt-24">
          <Image
            src={images.dashboard}
            alt="Dashboard Preview"
            width={1200}
            height={800}
            className="mx-auto h-auto w-[90%] rounded-lg object-center shadow-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
}
