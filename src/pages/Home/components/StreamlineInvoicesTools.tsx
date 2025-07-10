import Image from "@/components/shared/Image";
import { images } from "@/lib/imageProvider";


export default function StreamlineInvoicesTools() {
    return (
        <section className="container mx-auto mb-16 md:mb-20 lg:mb-28 px-5">
            <div className="flex flex-col md:flex-row items-center md:gap-8 lg:gap-20 space-y-7">
                <div className="md:w-1/2 ">
                    <div className="">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold mb-4 md:mb-7">Streamline invoices. Discover tools for management.</h1>
                        <p className="text-description md:text-lg lg:text-2xl">Experience seamless invoicing and payment solutions for your business needs. Manage invoices, handle payments in multiple currencies, and track customers—all in one place. Signing up is easy, and creating invoices and processing payments takes just a few clicks. Enjoy managing multiple businesses with our intuitive tools to streamline your workflow.</p>
                    </div>
                </div>
                <div className="md:w-1/2 ">
                    <Image src={images.sendMoney} alt="Send Money Feature" className="w-full h-full" />
                </div>
            </div>
        </section>
    )
}
