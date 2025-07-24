import { Check } from "lucide-react";
import { icons } from "@/lib/imageProvider";
import { ReactSVG } from "react-svg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export default function ProPlanCard() {
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      <div className="text-primary flex justify-end gap-3 text-sm font-normal">
        {t("pro_plan_card.plan_name")}{" "}
        <ReactSVG src={icons.threeStar} className="size-4" />
      </div>

      <div>
        <span className="text-xl font-semibold text-black">$4.99</span>
        <span className="text-foreground/80 text-xs font-normal">
          {t("pro_plan_card.billing_cycle")}
        </span>
      </div>

      <p className="text-foreground/70 text-sm font-normal">
        {t("pro_plan_card.tagline")}
      </p>

      <ul className="text-muted-foreground space-y-1 text-xs">
        <li className="text-foreground/70 flex items-center gap-3 text-sm font-normal">
          <Check className="text-foreground h-4 w-4" />{" "}
          {t("pro_plan_card.features.unlimited_invoice")}
        </li>
        <li className="text-foreground/70 flex items-center gap-3 text-sm font-normal">
          <Check className="text-foreground h-4 w-4" />{" "}
          {t("pro_plan_card.features.management_setting")}
        </li>
        <li className="text-foreground/70 flex items-center gap-3 text-sm font-normal">
          <Check className="text-foreground h-4 w-4" />{" "}
          {t("pro_plan_card.features.add_admin")}
        </li>
      </ul>

      <Link to={"/dashboard/settings/subscription"}>
        <Button
          variant={"primary"}
          className="mt-1 w-full cursor-pointer text-base font-normal"
        >
          {t("pro_plan_card.upgrade_button")}
        </Button>
      </Link>
    </div>
  );
}
