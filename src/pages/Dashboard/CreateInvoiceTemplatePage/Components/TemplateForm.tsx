import { DialogModal } from "@/components/DialogModal";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import { useCustomerApi } from "@/mock-api-hook/features/customers/useCustomerApi";
import type { TInvoiceData } from "@/types";
import type { TCustomer } from "@/types/customer.type";
import { getTodayDate, getTodayDateWithTime } from "@/utils/dateFormat";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CustomerForm } from "../../Customer/components/CustomerForm";
import ItemsSection from "./ItemsSection";

const initialInvoiceData: TInvoiceData = {
  title: "",
  customer: "",
  invoiceNumber: "",
  orderNumber: "",
  invoiceDate: getTodayDate(),
  serviceDate: getTodayDateWithTime(),
  dueDate: "05 Feb 2025",
  footerTerms:
    "Payment is due within 15 days from the date of invoice. Please make checks payable to Acme Inc. or use the online payment link provided in this email.",
  items: [
    {
      id: "1",
      description: "",
      quantity: 10,
      price: 10.0,
      tax: 0,
      amount: 100.0,
      taxId: "1234",
    },
    {
      id: "2",
      description: "",
      quantity: 100,
      price: 0.0,
      tax: 0,
      amount: 0.0,
      taxId: "5678",
    },
  ],
  subtotal: 100.0,
  discount: 0,
  total: 100.0,
};

export default function TemplateForm() {
  const [invoiceData, setInvoiceData] =
    useState<TInvoiceData>(initialInvoiceData);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);

  const { customers } = useCustomerApi();

  const handleInputChange = (
    field: keyof TInvoiceData,
    value: string | number,
  ) => {
    setInvoiceData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6 px-6 pt-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title" className="custom-label">
            Invoice title
          </Label>
          <Input
            id="title"
            placeholder="Let your customer know what this invoice is for"
            value={invoiceData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="custom-focus"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="customer" className="custom-label">
            Customer
          </Label>
          <SelectInput
            options={customers.map((customer: TCustomer) => ({
              value: customer.id,
              label: customer.name,
            }))}
            placeholder="Select a customer"
            value={invoiceData.customer}
            onValueChange={(value) => handleInputChange("customer", value)}
            triggerClassName="w-full"
          />
          <div className="flex justify-end">
            <Button
              variant="link"
              className="text-sm font-normal"
              onClick={() => setIsAddCustomerOpen(true)}
            >
              <Plus /> Add Customer
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="invoice-number" className="custom-label">
            Invoice
          </Label>
          <Input
            id="invoice-number"
            value={invoiceData.invoiceNumber}
            onChange={(e) => handleInputChange("invoiceNumber", e.target.value)}
            className="custom-focus"
            placeholder="Enter invoice number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="order-number" className="custom-label">
            Order Number
          </Label>
          <Input
            id="order-number"
            placeholder="Enter order number"
            value={invoiceData.orderNumber}
            onChange={(e) => handleInputChange("orderNumber", e.target.value)}
            className="custom-focus"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="invoice-date" className="custom-label">
              Invoice Date
            </Label>
            <Input
              id="invoice-date"
              value={invoiceData.invoiceDate}
              onChange={(e) => handleInputChange("invoiceDate", e.target.value)}
              className="custom-focus"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="service-date" className="custom-label">
              Service Date
            </Label>
            <Input
              id="service-date"
              value={invoiceData.serviceDate}
              onChange={(e) => handleInputChange("serviceDate", e.target.value)}
              className="custom-focus"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="due-date" className="custom-label">
            Due Date
          </Label>
          <Input
            id="due-date"
            value={invoiceData.dueDate}
            onChange={(e) => handleInputChange("dueDate", e.target.value)}
            className="custom-focus"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="footer-terms" className="custom-label">
            Footer & Terms
          </Label>
          <Textarea
            id="footer-terms"
            value={invoiceData.footerTerms}
            onChange={(e) => handleInputChange("footerTerms", e.target.value)}
            rows={3}
            className="custom-focus"
          />
        </div>
      </div>

      {/* Items Section */}
      <ItemsSection invoiceData={invoiceData} setInvoiceData={setInvoiceData} />

      {/* Add Customer Modal */}
      <DialogModal
        isOpen={isAddCustomerOpen}
        onOpenChange={setIsAddCustomerOpen}
        title="Add New Customer"
      >
        <CustomerForm
          onSave={() => console.log("Customer saved!")}
          onClose={() => setIsAddCustomerOpen(false)}
        />
      </DialogModal>
    </div>
  );
}
