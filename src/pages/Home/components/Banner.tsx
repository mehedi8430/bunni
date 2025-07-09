import { icons, images } from "@/lib/imageProvider";
import Navbar from "./Navbar";
import Image from "@/components/shared/Image";


export default function Banner() {
    return (
        <section className="w-full relative">
                <div className="h-[550px] md:h-[720px] lg:h-[75%] xl:h-[75%] absolute top-0 inset-x-0 -z-1 bg-cover bg-center" style={{ backgroundImage: `url(${images.banner})`}}></div>
                <Navbar />
                <div className="container mx-auto mt-3 md:mt-20">
                    <div className="text-center max-sm:px-5">
                        <h1 className="text-2xl md:text-3xl lg:text-5xl xl:text-7xl font-bold">Invoicing Meets Simplicity — With Smart Payments & Presentations</h1>
                        <p className="md:text-xl lg:text-2xl xl:text-3xl text-foreground/50 md:px-10 mt-4.5">Send invoices, accept payments, manage customers, and create stunning business presentations — all in one powerful platform.</p>
                        <button className="mt-8 px-8 md:px-16 lg:px-20 xl:px-24 py-3 md:py-4 lg:py-5 xl:py-7 bg-primary text-white rounded-md md:text-xl cursor-pointer">Get Started <Image src={icons.rightArrow} alt="Right Arrow" className="inline-block ml-2" /></button>
                    </div>
                    <div className="mt-8 md:mt-16 lg:mt-20 xl:mt-24">
                        <Image src={images.dashboard} alt="Banner Background" className="w-[90%] mx-auto h-full" />
                    </div>
                </div>
            </section>
    )
}
