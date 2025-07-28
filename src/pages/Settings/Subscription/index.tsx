import { useTranslation } from "react-i18next";
import CurrentPlan from "./components/CurrentPlan";
import PricingPlanCard from "./components/PricingPlanCard";

export default function SubscriptionPage() {
  const { t } = useTranslation(["subscription", "landing"]);
  return (
    <section className="space-y-6 md:space-y-10">
      <div>
        <h1 className="mb-3 text-2xl font-semibold md:text-[26px]">
          {t("Subscriptions_Plans")}
        </h1>
        <p className="text-foreground/40 text-lg font-normal">
          {t("manage_your_subscription")}
        </p>
      </div>
      {/* current plan */}
      <CurrentPlan />
      <div>
        <h1 className="mb-3 text-2xl font-semibold md:text-[26px]">
          {t("Choose_Your_Plan")}
        </h1>
        <p className="text-foreground/40 text-lg font-normal">
          {t("manage_your_subscription")}
        </p>
      </div>
      {/* Feature List */}
      <div className="flex w-full max-w-4xl flex-col items-center gap-6 md:flex-row">
        {/* Free Plan Card */}
        <PricingPlanCard
          planName={t("Current_Plan")}
          price="€0"
          period="/month"
          description={t("Build_Bill_Free_to_Start")}
          features={[
            { text: t("3_Free_Invoice"), isIncluded: true },
            { text: t("No_Management_Setting"), isIncluded: false },
            { text: t("3_Free_Template"), isIncluded: true },
            { text: t("Add_Admin_In_Company_Profile"), isIncluded: false },
            { text: t("Limited_Access"), isIncluded: true },
          ]}
          buttonText={t("Upgrade_plan")}
          isPro={false}
        />

        {/* Pro Plan Card */}
        <PricingPlanCard
          planName={t("Pro_Plan")}
          price="$4.99"
          period="/month"
          description={t("Invoice_Smarter_Grow_Faster")}
          features={[
            { text: t("Unlimited_Invoice"), isIncluded: true },
            { text: t("Management_Setting"), isIncluded: true },
            { text: t("Unlimited_Template"), isIncluded: true },
            { text: t("Add_Admin_In_Company_Profile"), isIncluded: true },
            { text: t("Full_Access"), isIncluded: true },
          ]}
          buttonText={t("Current_Plan")}
          isPro={true}
          isCurrentPlan={true}
        />
      </div>
    </section>
  );
}
