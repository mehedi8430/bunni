import SelectInput from "@/components/SelectInput";
import Translator from "@/components/shared/Translator";
import { icons } from "@/lib/imageProvider";
import { useAppSelector } from "@/redux/hooks";
import { languageSelector, setLanguage } from "@/redux/slices/languageSlice";
import { useDispatch } from "react-redux";

export default function LanguageSettings() {
  const dispatch = useDispatch();
  const language = useAppSelector(languageSelector);

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
  ];
  return (
    <section className="space-y-6 md:space-y-10">
      <div>
        <h1 className="text-2xl font-semibold md:text-[32px]">Language</h1>
      </div>
      <div className="flex flex-col items-center justify-between rounded-md bg-white p-6 md:flex-row">
        <div className="flex items-center space-x-8">
          <img src={icons.language} alt="Language Icon" className="h-10 w-10" />
          <div className="">
            <p className="text-foreground/70 text-lg font-normal">
              <Translator text="choose_language" />
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-end md:mt-0">
          <SelectInput
            options={languageOptions.map((option) => ({
              value: option.value,
              label: option.label,
            }))}
            placeholder="Select Language"
            onValueChange={(value) => dispatch(setLanguage(value))}
            triggerClassName="w-full py-5 border border-primary focus-visible:outline-none focus-visible:ring focus-visible:ring-primary focus:border-primary data-[state=open]:border-primary rounded-md"
            value={
              languageOptions.find((option) => option.value === language)
                ?.value || "en"
            }
          />
        </div>
      </div>
    </section>
  );
}
