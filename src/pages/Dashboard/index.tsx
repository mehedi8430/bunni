import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import BalanceAnalytics from "./components/BalanceAnalytics";
import BarChartSection from "./components/BarChartSection";
import AreaChartSection from "./components/AreaChartSection";
import ThingsToDo from "./components/ThingsToDo";
import ProPlanCard from "./components/ProPlanCard";

export default function DashboardPage() {
  return (
    <main className="px-10 space-y-6 pb-6">
      <section className="space-y-2">
        <h1 className="text-[32px] font-semibold">Good afternoon, Alex</h1>
        <p className="text-[20px] font-normal text-foreground/50">
          Today is Thursday, June 19, 2025
        </p>

        <div className="flex flex-col md:flex-row gap-2 items-center mt-6">
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
      </section>

      <section>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-sidebar col-span-3 lg:col-span-2 p-4 rounded-2xl">
            <BalanceAnalytics />
          </div>
          <div className="bg-sidebar col-span-3 lg:col-span-1 p-4 rounded-2xl">
            <ThingsToDo />
          </div>
          <div className="bg-sidebar col-span-3 lg:col-span-1 p-4 rounded-2xl">
            <BarChartSection />
          </div>
          <div className="bg-sidebar col-span-3 lg:col-span-1 p-4 rounded-2xl">
            <AreaChartSection />
          </div>
          <div className="bg-sidebar col-span-3 lg:col-span-1 p-4 rounded-2xl">
            <ProPlanCard />
          </div>
        </div>
      </section>
    </main>
  );
}
