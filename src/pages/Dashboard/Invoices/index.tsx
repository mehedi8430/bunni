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

export default function InvoicesPage() {
  const navigate = useNavigate();
  const formatted = format(new Date(), "EEEE, MMMM d, yyyy");

  return (
    <section className="space-y-10">
      <div className="flex flex-col items-start justify-between space-y-4 md:flex-row">
        <div className="space-y-2">
          <h1 className="text-[32px] font-semibold">Good afternoon, Alex</h1>
          <p className="text-muted-foreground text-[20px] font-normal">
            Today is {formatted}
          </p>
        </div>
        <div className="space-y-4 space-x-4">
          <Button
            variant="primary"
            size="lg"
            className="text-lg font-normal max-sm:mx-auto"
            onClick={() => navigate("/dashboard/invoices/templates")}
          >
            <Plus />
            Create Invoices
          </Button>
          <Button
            variant={"primary"}
            size={"lg"}
            className="text-base font-normal"
            onClick={() =>
              navigate("/dashboard/invoices/templates?type=estimate")
            }
          >
            <Plus />
            Create Estimate
          </Button>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-3 md:grid md:grid-cols-4 md:pb-0">
        <TopCard
          icon={<ReactSVG src={icons.outstanding} />}
          title="Outstanding Invoices"
          value="$1,637"
          iconBgColor="bg-red-100"
          valueColor="text-red-400"
        />
        <TopCard
          icon={<ReactSVG src={icons.dolar} />}
          title="Recent Payments"
          value="$3,847"
          iconBgColor="bg-purple-100"
          valueColor="text-foreground"
        />
        <TopCard
          icon={<ReactSVG src={icons.groupuser} />}
          title="Total Customer"
          value="$2,567"
          iconBgColor="bg-yellow-50"
          valueColor="text-foreground"
        />
        <TopCard
          icon={<ReactSVG src={icons.revinue} />}
          title="Revenue this month"
          value="$4,212"
          iconBgColor="bg-green-100"
          valueColor="text-foreground"
        />
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-sidebar col-span-4 rounded-2xl py-4">
          <Tabs defaultValue="invoices">
            <TabsList className="border-border ml-6 w-[320px] border md:w-[400px]">
              <TabsTrigger
                value="invoices"
                className="text-muted-foreground text-sm focus:text-white md:text-base"
              >
                Invoices
              </TabsTrigger>
              <TabsTrigger
                value="estimates"
                className="text-muted-foreground text-sm focus:text-white md:text-base"
              >
                Estimates
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
