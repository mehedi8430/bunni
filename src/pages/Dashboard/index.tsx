import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import BalanceAnalytics from "./components/BalanceAnalytics";
import BarChartSection from "./components/BarChartSection";
import AreaChartSection from "./components/AreaChartSection";
import ThingsToDo from "./components/ThingsToDo";
import ProPlanCard from "./components/ProPlanCard";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { useState } from "react";
import type { Customer } from "@/mockApi/customerApi";
import { DialogModal } from "@/components/DialogModal";
import { CustomerForm } from "./Customer/components/CustomerForm";

export default function DashboardPage() {
  const formatted = format(new Date(), 'EEEE, MMMM d, yyyy');
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editCustomer, setEditCustomer] = useState<Partial<Customer>>({});
  const [, setData] = useState<Customer[]>([]);
  const [, setTotal] = useState(0);

  const handleSave = (updatedCustomer: Customer) => {
    setData((prev) =>
      prev.map((cust) =>
        cust.id === updatedCustomer.id ? updatedCustomer : cust,
      ),
    );
    if (!updatedCustomer.id) {
      setData((prev) => [...prev, updatedCustomer]);
      setTotal((prev) => prev + 1);
    }
  };

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-[32px] font-semibold">Good afternoon, Alex</h1>
        <p className="text-muted-foreground text-[20px] font-normal">
          Today is {formatted}
        </p>

        <div className="mt-6 flex flex-col items-center gap-2 md:flex-row">
          <Button
            variant={"primary"}
            size={"lg"}
            className="text-lg font-normal"
            onClick={() => navigate("/dashboard/invoices/templates")}
          >
            <Plus />
            Create Invoices
          </Button>
          <Button
            variant={"primary"}
            size={"lg"}
            className="text-lg font-normal"
            onClick={() => {
              setEditCustomer({});
              setIsEditOpen(true);
            }}
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

      {/* Edit Modal with CustomerForm */}
      <DialogModal
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        title={editCustomer.id ? "Edit Customer" : "Add New Customer"}
        className="!max-w-4xl"
      >
        <CustomerForm
          customer={editCustomer}
          onClose={() => setIsEditOpen(false)}
          onSave={handleSave}
        />
      </DialogModal>
    </section>
  );
}
