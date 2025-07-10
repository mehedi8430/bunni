import { Check } from "lucide-react";
import { icons } from "@/lib/imageProvider";
import { ReactSVG } from "react-svg";
import { Button } from "@/components/ui/button";

export default function ProPlanCard() {
  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-3 text-primary text-lg font-normal">
        Pro Plan <ReactSVG src={icons.threeStar} className="size-6" />
      </div>

      <div>
        <span className="text-5xl font-semibold text-black">$4.99</span>
        <span className="text-lg font-normal text-foreground/80">/month</span>
      </div>

      <p className="text-[16px] font-normal text-foreground/70">
        Invoice Smarter. Grow Faster.
      </p>

      <ul className="space-y-1 text-sm text-muted-foreground">
        <li className="flex items-center gap-3 text-sm font-normal text-foreground/70">
          <Check className="w-4 h-4 text-foreground" /> Unlimited Invoice
        </li>
        <li className="flex items-center gap-3 text-sm font-normal text-foreground/70">
          <Check className=" w-4 h-4 text-foreground" /> Management Setting
        </li>
        <li className="flex items-center gap-3 text-sm font-normal text-foreground/70">
          <Check className="w-4 h-4 text-foreground" /> Add Admin In Company
          Profile
        </li>
      </ul>

      <Button
        variant={"primary"}
        className="w-full cursor-pointer mt-1 text-lg font-normal"
        size={"lg"}
      >
        Upgrade plan
      </Button>
    </div>
  );
}
