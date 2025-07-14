import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import BalanceAnalytics from "./components/BalanceAnalytics";
import BarChartSection from "./components/BarChartSection";
import AreaChartSection from "./components/AreaChartSection";
import ThingsToDo from "./components/ThingsToDo";
import ProPlanCard from "./components/ProPlanCard";

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-[32px] font-semibold">Good afternoon, Alex</h1>
        <p className="text-foreground/50 text-[20px] font-normal">
          Today is Thursday, June 19, 2025
        </p>

        <div className="mt-6 flex flex-col items-center gap-2 md:flex-row">
          <Button
            variant={"primary"}
            size={"lg"}
            className="text-lg font-normal"
          >
            <Plus />
            Create Invoices
          </Button>
          <Button
            variant={"primary"}
            size={"lg"}
            className="text-lg font-normal"
          >
            <Plus />
            New Customer
          </Button>
          <Button
            variant={"primary"}
            size={"lg"}
            className="text-lg font-normal"
          >
            <Plus />
            New Products
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="card_container col-span-3 xl:col-span-2">
          <BalanceAnalytics />
        </div>
        <div className="card_container col-span-3 xl:col-span-1">
          <ThingsToDo />
        </div>
        <div className="card_container col-span-3 xl:col-span-1">
          <BarChartSection />
        </div>
        <div className="card_container col-span-3 xl:col-span-1">
          <AreaChartSection />
        </div>
        <div className="card_container col-span-3 xl:col-span-1">
          <ProPlanCard />
        </div>
      </div>
    </section>
  );
}
