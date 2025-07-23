import SectionTitle from "@/components/shared/SectionTitle";
import HowDoesItWorkCard from "./HowDoesItWorkCard";
import { icons } from "@/lib/imageProvider";
import { useTranslation } from "react-i18next";

export default function HowDoesItWork() {
    const { t } = useTranslation();
    
    const workSteps = [
        {
            id: 'signup',
            icon: icons.user,
            iconAlt: 'User Icon',
            titleKey: 'signup_step_title',
            descriptionKey: 'signup_step_description'
        },
        {
            id: 'operations',
            icon: icons.document,
            iconAlt: 'Document Icon',
            titleKey: 'operations_step_title',
            descriptionKey: 'operations_step_description'
        },
        {
            id: 'get-paid',
            icon: icons.getPaid,
            iconAlt: 'Get Paid Icon',
            titleKey: 'get_paid_step_title',
            descriptionKey: 'get_paid_step_description'
        }
    ];

    return (
        <section id="how-it-works" className="container mx-auto my-16 md:my-20 lg:my-28 px-5">
            {/* Section title */}
            <SectionTitle title={t("how_does_it_work")} subtitle={t("how_does_it_work_subtitle")} />
            {/* Cards Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {workSteps.map((step) => (
                    <HowDoesItWorkCard
                        key={step.id}
                        icon={
                            <img src={step.icon} alt={step.iconAlt} className="w-8 h-8" />
                        }
                        title={t(step.titleKey)}
                        description={t(step.descriptionKey)}
                        classNameForIcon="bg-primary/10 p-4 rounded-full w-fit"
                        classNameForDescription="text-foreground01/70"
                    />
                ))}
            </div>
        </section>
    )
}
