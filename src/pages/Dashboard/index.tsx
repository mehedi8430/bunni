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
import ProductForm from "./Products/components/ProductForm";
import type { TProduct } from "@/types";
import { useTranslation } from "react-i18next";

export default function DashboardPage() {
  const { t } = useTranslation();
  const formatted = format(new Date(), "EEEE, MMMM d, yyyy");
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editCustomer, setEditCustomer] = useState<Partial<Customer>>({});
  const [, setData] = useState<Customer[]>([]);
  const [, setTotal] = useState(0);

  // add product state
  const [isProductEditOpen, setIsProductEditOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Partial<TProduct>>({});
  const [, setProductData] = useState<TProduct[]>([]);
  const [, setProductTotal] = useState(0);

  // Handle save for product form
  const handleProductSave = (updatedProduct: TProduct) => {
    setProductData((prev) =>
      prev.map((prod) =>
        prod.id === updatedProduct.id ? updatedProduct : prod,
      ),
    );
    if (!updatedProduct.id) {
      setProductData((prev) => [...prev, updatedProduct]);
      setProductTotal((prev) => prev + 1);
    }
  };

  // Handle save for customer form
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
        <h1 className="text-[26px] font-semibold">{t("dashboard_greeting")}</h1>
        <p className="text-muted-foreground text-base font-normal">
          {t("dashboard_today_is", { date: formatted })}
        </p>

        <div className="mt-6 flex flex-col items-center gap-2 md:flex-row">
          <Button
            variant={"primary"}
            size={"lg"}
            className="text-base font-normal"
            onClick={() => navigate("/dashboard/invoices/templates")}
          >
            <Plus />
            {t("dashboard_create_invoice")}
          </Button>
          <Button
            variant={"primary"}
            size={"lg"}
            className="text-base font-normal"
            onClick={() => {
              setEditCustomer({});
              setIsEditOpen(true);
            }}
          >
            <Plus />
            {t("dashboard_new_customer")}
          </Button>
          <Button
            variant={"primary"}
            size={"lg"}
            className="text-base font-normal"
            onClick={() => {
              setIsProductEditOpen(true);
              setEditProduct({});
            }}
          >
            <Plus />
            {t("dashboard_new_product")}
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant={"primary"}
              size={"lg"}
              className="text-base font-normal"
              onClick={() =>
                navigate("/dashboard/invoices/templates?type=estimate")
              }
            >
              <Plus />
              {t("dashboard_create_estimate")}
            </Button>
            <Button
              variant={"primary"}
              size={"lg"}
              className="text-base font-normal"
              onClick={() => navigate("/dashboard/payment")}
            >
              <Plus />
              {t("dashboard_payment")}
            </Button>
          </div>
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

      {/* Edit Modal with ProductForm */}
      <DialogModal
        isOpen={isProductEditOpen}
        onOpenChange={setIsProductEditOpen}
        title={editProduct.id ? "Edit Product" : "Add New Product"}
      >
        <ProductForm
          product={editProduct}
          onClose={() => setIsProductEditOpen(false)}
          onSave={handleProductSave}
        />
      </DialogModal>
    </section>
  );
}
