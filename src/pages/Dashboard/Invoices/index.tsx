import { Button } from "@/components/ui/button";
import { icons } from "@/lib/imageProvider";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { ReactSVG } from "react-svg";
import TopCard from "./components/TopCard";
import InvoicesTable from "./components/InvoicesTable";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EstimatesTable from "./components/EstimatesTable";
import { useTranslation } from "react-i18next";

export default function InvoicesPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const formatted = format(new Date(), "EEEE, MMMM d, yyyy");

  return (
    <section className="space-y-10">
      <div className="flex flex-col items-start justify-between space-y-4 md:flex-row">
        <div className="space-y-2">
          <h1 className="text-[26px] font-semibold">
            {t("dashboard_greeting")}
          </h1>
          <p className="text-muted-foreground text-lg font-normal">
            {t("dashboard_today_is", { date: formatted })}
          </p>
        </div>
        <div className="space-y-4 space-x-4">
          <Button
            variant="primary"
            className="text-base font-normal max-sm:mx-auto"
            onClick={() => navigate("/dashboard/invoices/templates")}
          >
            <Plus />
            {t("dashboard_create_invoice")}
          </Button>
          <Button
            variant={"primary"}
            className="text-base font-normal"
            onClick={() =>
              navigate("/dashboard/invoices/templates?type=estimate")
            }
          >
            <Plus />
            {t("invoice_estimate")}
          </Button>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-3 md:grid md:grid-cols-4 md:pb-0">
        <TopCard
          icon={<ReactSVG src={icons.outstanding} />}
          title={t("outstanding_invoices")}
          value="$1,637"
          iconBgColor="bg-red-100"
          valueColor="text-red-400"
        />
        <TopCard
          icon={<ReactSVG src={icons.dolar} />}
          title={t("recent_payments")}
          value="$3,847"
          iconBgColor="bg-purple-100"
          valueColor="text-foreground"
        />
        <TopCard
          icon={<ReactSVG src={icons.groupuser} />}
          title={t("total_customers")}
          value="$2,567"
          iconBgColor="bg-yellow-50"
          valueColor="text-foreground"
        />
        <TopCard
          icon={<ReactSVG src={icons.revinue} />}
          title={t("revenue_this_month")}
          value="$4,212"
          iconBgColor="bg-green-100"
          valueColor="text-foreground"
        />
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-sidebar col-span-4 rounded-2xl py-4">
          <Tabs defaultValue="invoices">
            <TabsList className="ml-4 h-8 w-[320px] p-0 md:w-[400px]">
              <TabsTrigger
                value="invoices"
                className="data-[state=active]:bg-primary text-sm data-[state=active]:text-white"
              >
                {t("dashboard_create_invoice")}
              </TabsTrigger>
              <TabsTrigger
                value="estimates"
                className="data-[state=active]:bg-primary text-sm data-[state=active]:text-white"
              >
                {t("invoice_estimate")}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="invoices">
              <InvoicesTable />
            </TabsContent>
            <TabsContent value="estimates">
              <EstimatesTable />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
