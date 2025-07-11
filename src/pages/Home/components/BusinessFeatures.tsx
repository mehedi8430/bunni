import Image from "@/components/shared/Image";
import { icons, images } from "@/lib/imageProvider";

export default function BusinessFeatures() {
    return (
        <section id="features" className="container mx-auto my-16 md:my-20 lg:my-28 px-5">
            <div className="flex flex-col-reverse md:flex-row items-center md:gap-8 lg:gap-20">
                <div className="md:w-1/2 mt-7 md:mt-0">
                    <Image src={images.myCard} alt="Business Feature" className="w-full h-full" />
                </div>
                <div className="md:w-1/2 ">
                    <div className="">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold mb-4 md:mb-7">Powerful Features for Your Business</h1>
                        <p className="text-description md:text-lg lg:text-2xl">Make payments easy and get a clear view of your finances. Just link your bank account and card to Milestone!</p>
                    </div>
                    <div className="mt-3 md:mt-5 space-y-2 md:space-y-3 lg:space-y-6">
                        <div className="flex items-center gap-1.5">
                            <Image src={icons.check} alt="Check Icon" className="w-6 h-6" />
                            <span className="md:text-lg lg:text-xl">No hidden fees.</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Image src={icons.check} alt="Check Icon" className="w-6 h-6" />
                            <span className="md:text-lg lg:text-xl">100% security. Guaranteed.</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Image src={icons.check} alt="Check Icon" className="w-6 h-6" />
                            <span className="md:text- lg:text-xl">No training or maintenance needed.</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
