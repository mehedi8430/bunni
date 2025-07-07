import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function DashboardPage() {
  return (
    <main className="px-10 space-y-6">
      <section className="space-y-2">
        <h1 className="text-[32px] font-semibold">Good afternoon, Alex</h1>
        <p className="text-[20px] font-normal text-foreground/50">
          Today is Thursday, June 19, 2025
        </p>

        <div className="flex gap-2 items-center mt-6">
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
          <div className="bg-sidebar col-span-1 lg:col-span-2 p-4 rounded-2xl">
            grid 1
          </div>
          <div className="bg-sidebar col-span-1 p-4 rounded-2xl">grid 2</div>
          <div className="bg-sidebar col-span-1 p-4 rounded-2xl">grid 3</div>
          <div className="bg-sidebar col-span-1 p-4 rounded-2xl">grid 4</div>
          <div className="bg-sidebar col-span-1 p-4 rounded-2xl">grid 5</div>
        </div>
      </section>
    </main>
  );
}
