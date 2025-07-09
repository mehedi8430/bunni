import { Check } from "lucide-react";

export default function ProPlanCard() {
  return (
    <div className="bg-white rounded-xl shadow p-5 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-3xl font-bold">$4.99</span>
          <span className="text-muted-foreground text-sm">/month</span>
        </div>
        <div className="text-green-600 font-semibold text-sm flex items-center gap-1">
          Pro Plan <span className="text-green-500">✨</span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Invoice Smarter. Grow Faster.
      </p>

      <ul className="space-y-1 text-sm text-muted-foreground">
        <li className="flex items-center gap-2">
          <Check className="text-green-500 w-4 h-4" /> Unlimited Invoice
        </li>
        <li className="flex items-center gap-2">
          <Check className="text-green-500 w-4 h-4" /> Management Setting
        </li>
        <li className="flex items-center gap-2">
          <Check className="text-green-500 w-4 h-4" /> Add Admin In Company
          Profile
        </li>
      </ul>

      <button className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-lg font-medium">
        Upgrade plan
      </button>
    </div>
  );
}
