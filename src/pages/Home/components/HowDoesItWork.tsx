import SectionTitle from "@/components/shared/SectionTitle";
import HowDoesItWorkCard from "./HowDoesItWorkCard";
import { icons } from "@/lib/imageProvider";

export default function HowDoesItWork() {
    return (
        <section id="how-it-works" className="container mx-auto my-16 md:my-20 lg:my-28 px-5">
            {/* Section title */}
            <SectionTitle title="How Does It Work?" subtitle="From sign-up to getting paid—every step is built for speed, clarity, and control" />
            {/* Cards Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {/* First Card Instance */}
                <HowDoesItWorkCard
                    icon={
                        <img src={icons.user} alt="User Icon" className="w-8 h-8" />
                    }
                    title="Sign up with gmail or email"
                    description="Create your free account in seconds using your Gmail or any email address. No paperwork, no hassle."
                    classNameForIcon="bg-primary/10 p-4 rounded-full w-fit"
                    classNameForDescription="text-foreground01/70"
                />
                {/* Second Card Instance */}
                <HowDoesItWorkCard
                    icon={
                        <img src={icons.document} alt="Document Icon" className="w-8 h-8" />
                    }
                    title="Operations with Automation"
                    description="Enhance your operational efficiency with our AI-driven automated workflows."
                    classNameForIcon="bg-primary/10 p-4 rounded-full w-fit"
                    classNameForDescription="text-foreground01/70"
                />
                {/* Third Card Instance */}
                <HowDoesItWorkCard
                    icon={
                        <img src={icons.getPaid} alt="Get Paid Icon" className="w-8 h-8" />
                    }
                    title="Get Paid"
                    description="Enhance your operational efficiency with our AI-driven automated workflows."
                    classNameForIcon="bg-primary/10 p-4 rounded-full w-fit"
                    classNameForDescription="text-foreground01/70"
                />
            </div>
        </section>
    )
}
