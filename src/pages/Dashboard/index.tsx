import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import BalanceAnalytics from "./components/BalanceAnalytics";
import BarChartSection from "./components/BarChartSection";
import AreaChartSection from "./components/AreaChartSection";

export default function DashboardPage() {
  return (
    <main className="px-10 space-y-6 pb-6">
      <section className="space-y-2">
        <h1 className="text-[32px] font-semibold">Good afternoon, Alex</h1>
        <p className="text-[20px] font-normal text-foreground/50">
          Today is Thursday, June 19, 2025
        </p>

        <div className="flex flex-col md:flex-row gap-2 items-center mt-6">
          <Button className="bg-gradient-to-t from-primary to-primary-2 ">
            <Plus />
            Create Invoices
          </Button>
          <Button className="bg-gradient-to-t from-primary to-primary-2 ">
            <Plus />
            New Customer
          </Button>
          <Button className="bg-gradient-to-t from-primary to-primary-2 ">
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
            things to do
          </div>
          <div className="bg-sidebar col-span-3 lg:col-span-1 p-4 rounded-2xl">
            <BarChartSection />
          </div>
          <div className="bg-sidebar col-span-3 lg:col-span-1 p-4 rounded-2xl">
            <AreaChartSection />
          </div>
          <div className="bg-sidebar col-span-3 lg:col-span-1 p-4 rounded-2xl">
            grid 5
          </div>
        </div>
      </section>
    </main>
  );
}
