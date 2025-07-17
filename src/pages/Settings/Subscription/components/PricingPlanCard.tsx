import { icons } from "@/lib/imageProvider";
import FeatureItem from "./FeatureItem";

// Define the type for a pricing plan
interface PricingPlanProps {
  planName: string;
  price: string;
  period: string;
  description: string;
  features: { text: string; isIncluded: boolean }[];
  buttonText: string;
  isPro?: boolean;
  isCurrentPlan?: boolean;
}

export default function PricingPlanCard({
  planName,
  price,
  period,
  description,
  features,
  buttonText,
  isPro = false,
  isCurrentPlan = false,
}: PricingPlanProps) {
    return (
        <div className="bg-white rounded-xl px-6 py-8 w-full max-w-[340px] flex flex-col justify-between border border-foreground">
            <div>
                <div className={`inline-flex items-center px-3 py-2 rounded-md text-lg font-normal gap-2 text-white ${isPro ? 'bg-primary' : 'bg-ring'}`}>
                    <span>{planName}</span>
                    {/* Placeholder for a small icon next to the plan name */}
                    <img src={icons.starIcon} alt="Star Icon" />
                </div>
                <div className="mt-4 text-4xl font-bold foreground">
                    {price}<span className="text-xl font-normal">{period}</span>
                </div>
                <p className="mt-4 text-foreground/40 text-base font-normal">{description}</p>
                <div className="my-8">
                    {features.map((feature, index) => (
                        <FeatureItem key={index} text={feature.text} isIncluded={feature.isIncluded} />
                    ))}
                </div>
            </div>
            <div>
                <button
                    className={`w-full py-3.5 px-6 rounded-lg font-normal text-lg bg-primary text-white ${isCurrentPlan}`}
                >
                    {buttonText}
                </button>
            </div>
        </div>  
    )
}
