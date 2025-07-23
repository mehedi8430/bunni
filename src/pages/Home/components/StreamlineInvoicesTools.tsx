import Image from "@/components/shared/Image";
import Translator from "@/components/shared/Translator";
import { images } from "@/lib/imageProvider";


export default function StreamlineInvoicesTools() {
    return (
        <section className="container mx-auto mb-16 md:mb-20 lg:mb-28 px-5">
            <div className="flex flex-col md:flex-row items-center md:gap-8 lg:gap-20 space-y-7">
                <div className="md:w-1/2 ">
                    <div className="">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold mb-4 md:mb-7"><Translator text="streamline_heading" /></h1>
                        <p className="text-description md:text-lg lg:text-xl"><Translator text="streamline_description" /></p>
                    </div>
                </div>
                <div className="md:w-1/2 ">
                    <Image src={images.sendMoney} alt="Send Money Feature" className="w-full h-full" />
                </div>
            </div>
        </section>
    )
}
