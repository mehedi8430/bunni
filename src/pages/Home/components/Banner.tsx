import Image from "@/components/shared/Image";
import { icons, images } from "@/lib/imageProvider";

export default function Banner() {
  return (
    <section className="relative w-full">
      <div className="absolute inset-x-0 top-0 -z-10 h-[550px] md:h-[720px] lg:h-[75%] xl:h-[75%]">
        <img
          src={images.banner}
          alt="Background Banner"
          className="object-cover object-center h-full w-full"
        />
      </div>
      <div className="container mx-auto mt-10 md:mt-20">
        <div className="text-center max-sm:px-5">
          <h1 className="text-2xl font-bold md:text-2xl lg:text-4xl xl:text-5xl">
            Invoicing Meets Simplicity — With Smart Payments & Presentations
          </h1>
          <p className="text-foreground/50 mt-4.5 md:px-20 md:text-lg lg:text-xl xl:text-xl">
            Send invoices, accept payments, manage customers, and create
            stunning business <br /> presentations — all in one powerful platform.
          </p>
          <button className="bg-primary mx-auto mt-8 flex cursor-pointer items-center justify-center gap-2 rounded-md px-8 py-2 text-white md:px-8 md:py-2 md:text-lg lg:px-10 lg:py-3 xl:px-16 xl:py-4">
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
            className="mx-auto h-auto w-[90%] rounded-lg object-center"
            priority
          />
        </div>
      </div>
    </section>
  );
}
