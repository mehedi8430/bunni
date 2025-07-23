import SectionTitle from "@/components/shared/SectionTitle";
import HowDoesItWorkCard from "./HowDoesItWorkCard";
import { icons } from "@/lib/imageProvider";
import { useTranslation } from "react-i18next";


export default function KeyBenefits() {
    const { t } = useTranslation();
    return (
        <section className="container mx-auto mb-10 md:mb-12 lg:mb-16 px-5">
           <SectionTitle title={t("key_benefits_title")} subtitle={t("key_benefits_subtitle")} className="w-full lg:w-[68%] mx-auto" />
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                <HowDoesItWorkCard
                    icon={<img src={icons.file} alt="Document Icon" className="w-10 h-10 md:w-14 md:h-14" />}
                    title={t("key_benefit_1_title")}
                    description={t("key_benefit_1_description")}
                    classNameForIcon="flex justify-center"
                    className="text-center p-10"
                    classNameForDescription="text-description"
                />
                <HowDoesItWorkCard
                    icon={<img src={icons.requring} alt="Document Icon" className="w-10 h-10 md:w-14 md:h-14" />}
                    title={t("key_benefit_2_title")}
                    description={t("key_benefit_2_description")}
                    classNameForIcon="flex justify-center"
                    className="text-center p-10"
                    classNameForDescription="text-description"
                />
                <HowDoesItWorkCard
                    icon={<img src={icons.reportingFilter} alt="Document Icon" className="w-10 h-10 md:w-14 md:h-14" />}
                    title= {t("key_benefit_3_title")}
                    description={t("key_benefit_3_description")}
                    classNameForIcon="flex justify-center"
                    className="text-center p-10"
                    classNameForDescription="text-description"
                />
           </div>
        </section>
    )
}
