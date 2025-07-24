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
        <div className="flex justify-end gap-3 text-primary text-sm font-normal">
          {t("pro_plan_card.plan_name")} <ReactSVG src={icons.threeStar} className="size-4" />
        </div>

        <div>
          <span className="text-2xl font-semibold text-black">$4.99</span>
          <span className="text-sm font-normal text-foreground/80">{t("pro_plan_card.billing_cycle")}</span>
        </div>

        <p className="text-[16px] font-normal text-foreground/70">
          {t("pro_plan_card.tagline")}
        </p>

        <ul className="space-y-1 text-sm text-muted-foreground">
          <li className="flex items-center gap-3 text-sm font-normal text-foreground/70">
            <Check className="w-4 h-4 text-foreground" /> {t("pro_plan_card.features.unlimited_invoice")}
          </li>
          <li className="flex items-center gap-3 text-sm font-normal text-foreground/70">
            <Check className=" w-4 h-4 text-foreground" /> {t("pro_plan_card.features.management_setting")}
          </li>
          <li className="flex items-center gap-3 text-sm font-normal text-foreground/70">
            <Check className="w-4 h-4 text-foreground" /> {t("pro_plan_card.features.add_admin")}
          </li>
        </ul>

        <Link to={"/dashboard/settings/subscription"}>
          <Button
            variant={"primary"}
            className="w-full cursor-pointer mt-1 text-base font-normal"
            size={"lg"}
          >
            {t("pro_plan_card.upgrade_button")}
          </Button>
        </Link>
      </div>
    );
  }
