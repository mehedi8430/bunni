import SelectInput from "@/components/SelectInput";
import { icons } from "@/lib/imageProvider";
import { useState } from "react";


export default function LanguageSettings() {

    const [language, setLanguage] = useState<"English" | "Spanish">("English")


    const languageOptions = [
        { value: "English", label: "English" },
        { value: "Spanish", label: "Spanish" },
    ];
    return (
        <section className="space-y-6 md:space-y-10">
            <div>
                <h1 className="text-2xl font-semibold md:text-[32px]">Language</h1>
            </div>
            <div className="bg-white p-6 rounded-md flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center space-x-8">
                    <img src={icons.language} alt="Language Icon" className="w-10 h-10" />
                    <div className="">
                        <p className="text-lg font-normal text-foreground/70">Choose your preferred language to personalize your experience across the platform</p>
                    </div>
                </div>
                <div className="flex justify-end  mt-4 md:mt-0">
                    <SelectInput
                        options={languageOptions.map((option) => ({
                            value: option.value,
                            label: option.label,
                        }))}
                        placeholder="Select Language"
                        onValueChange={
                            (value) => setLanguage(value as "English" | "Spanish")
                        }
                        triggerClassName="w-full py-5 border border-primary focus-visible:outline-none focus-visible:ring focus-visible:ring-primary focus:border-primary data-[state=open]:border-primary rounded-md"
                        value={language}
                    />
                </div>
            </div>
        </section>
    )
}
