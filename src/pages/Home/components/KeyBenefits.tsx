import SectionTitle from "@/components/shared/SectionTitle";
import HowDoesItWorkCard from "./HowDoesItWorkCard";
import { icons } from "@/lib/imageProvider";


export default function KeyBenefits() {
    return (
        <section className="container mx-auto mb-16 md:mb-20 lg:mb-28 px-5">
           <SectionTitle title=" Key Benefits Section" subtitle="Stop wasting time on paperwork. Create and send professional invoices or estimates in just a few clicks with customizable templates." className="w-full lg:w-[68%] mx-auto" />
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                <HowDoesItWorkCard
                    icon={<img src={icons.file} alt="Document Icon" className="w-18 h-18" />}
                    title="Create & Send Invoices Fast"
                    description="Generate professional invoices or estimates in seconds — send via email, text, or link."
                    classNameForIcon="flex justify-center"
                    className="text-center p-10"
                    classNameForDescription="text-description"
                />
                <HowDoesItWorkCard
                    icon={<img src={icons.requring} alt="Document Icon" className="w-18 h-18" />}
                    title="Recurring Billing"
                    description="Set up auto-invoices with flexible schedules for subscriptions or repeat clients."
                    classNameForIcon="flex justify-center"
                    className="text-center p-10"
                    classNameForDescription="text-description"
                />
                <HowDoesItWorkCard
                    icon={<img src={icons.reportingFilter} alt="Document Icon" className="w-18 h-18" />}
                    title=" Smart Reporting Filters"
                    description="Track status, payment type, and invoice history with real-time filters."
                    classNameForIcon="flex justify-center"
                    className="text-center p-10"
                    classNameForDescription="text-description"
                />
           </div>
        </section>
    )
}
