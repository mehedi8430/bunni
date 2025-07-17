import CurrentPlan from "./components/CurrentPlan";
import PricingPlanCard from "./components/PricingPlanCard";

export default function SubscriptionPage() {
  return <section className="space-y-6 md:space-y-10">
    <div>
      <h1 className="text-2xl font-semibold md:text-[32px] mb-3">
        Subscriptions Plans
      </h1>
      <p className="text-xl font-normal text-foreground/40">Manage your subscription plan</p>
    </div>
    {/* current plan */}
    <CurrentPlan />
    <div>
      <h1 className="text-2xl font-semibold md:text-[32px] mb-3">
        Choose Your Plan
      </h1>
      <p className="text-xl font-normal text-foreground/40">Manage your subscription plan</p>
    </div>
    {/* Feature List */}
    <div className="flex flex-col md:flex-row items-center w-full max-w-4xl gap-6">
      {/* Free Plan Card */}
      <PricingPlanCard
        planName="Free Plan"
        price="€0"
        period="/month"
        description="Build & Bill — Free to Start"
        features={[
          { text: "3 Free Invoice", isIncluded: true },
          { text: "No Management Setting", isIncluded: false },
          { text: "3 Free Template", isIncluded: true },
          { text: "Add Admin In Company Profile", isIncluded: false },
          { text: "Limited Access", isIncluded: true },
        ]}
        buttonText="Upgrade plan"
        isPro={false}
      />

      {/* Pro Plan Card */}
      <PricingPlanCard
        planName="Pro Plan"
        price="$4.99"
        period="/month"
        description="Invoice Smarter. Grow Faster."
        features={[
          { text: "Unlimited Invoice", isIncluded: true },
          { text: "Management Setting", isIncluded: true },
          { text: "Unlimited Template", isIncluded: true },
          { text: "Add Admin In Company Profile", isIncluded: true },
          { text: "Full Access", isIncluded: true },
        ]}
        buttonText="Current Plan"
        isPro={true}
        isCurrentPlan={true}
      />
    </div>
  </section>;
}
