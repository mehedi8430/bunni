import Image from "@/components/shared/Image";
import Translator from "@/components/shared/Translator";
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
                        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold mb-4 md:mb-7"><Translator text="features_heading" /></h1>
                        <p className="text-description md:text-lg lg:text-xl"><Translator text="features_description" /></p>
                    </div>
                    <div className="mt-3 md:mt-5 space-y-2 md:space-y-3 lg:space-y-6">
                        <div className="flex items-center gap-1.5">
                            <Image src={icons.check} alt="Check Icon" className="w-5 h-5 md:w-6 md:h-6" />
                            <span className="md:text-base lg:text-lg"><Translator text="features_bullet_1" /></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Image src={icons.check} alt="Check Icon" className="w-5 h-5 md:w-6 md:h-6" />
                            <span className="md:text-lg lg:text-xl"><Translator text="features_bullet_2" /></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Image src={icons.check} alt="Check Icon" className="w-5 h-5 md:w-6 md:h-6" />
                            <span className="md:text-lg lg:text-xl"><Translator text="features_bullet_3" /></span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
