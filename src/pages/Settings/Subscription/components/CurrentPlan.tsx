import { useTranslation } from "react-i18next";

export default function CurrentPlan() {
  const { t } = useTranslation("subscription");
  return (
    <div className="border-primary relative w-full rounded-lg border bg-white p-6">
      {/* Current Plan Badge */}
      <div className="bg-primary absolute -top-5 left-4 rounded-full px-4 py-2 text-sm font-normal text-white shadow-sm">
        {t("Current_Plan")}
      </div>

      <div className="mt-4 flex items-start justify-between">
        <div>
          <h2 className="text-foreground text-xl font-normal md:text-2xl lg:text-3xl">
            Pro Plan
          </h2>
          <p className="text-foreground mt-1.5 text-sm md:text-lg lg:text-lg">
            €9.99/month
          </p>
        </div>
        <button className="border-border cursor-pointer rounded-md border bg-white px-6 py-2.5 text-base font-normal text-gray-700">
          {t("Cancel_Plan")}
        </button>
      </div>

      <div className="text-foreground mt-4 flex items-center space-x-2 text-sm md:text-base">
        <span>{t("Start_Date")}: 5/22/2025</span>
        <span className="bg-foreground/40 h-2 w-2 rounded-full"></span>{" "}
        {/* Dot separator */}
        <span>{t("End_Date")}: 5/22/2026</span>
      </div>
    </div>
  );
}
