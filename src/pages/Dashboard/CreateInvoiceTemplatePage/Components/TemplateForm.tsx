import { useForm, Controller } from "react-hook-form";
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

const defaultInvoiceData: TInvoiceData = {
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
      quantity: 0,
      price: 0,
      tax: 0,
      amount: 0,
      taxId: "",
    },
  ],
  subtotal: 100.0,
  discount: 0,
  total: 100.0,
};

export default function TemplateForm() {
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const { customers } = useCustomerApi();

  const { control, handleSubmit, setValue, watch } = useForm<TInvoiceData>({
    defaultValues: defaultInvoiceData,
  });

  const onSubmit = (data: TInvoiceData) => {
    console.log("Form submitted:", data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-6 pt-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="custom-label">
              Invoice title
            </Label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  id="title"
                  placeholder="Let your customer know what this invoice is for"
                  {...field}
                  className="custom-focus"
                />
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customer" className="custom-label">
              Customer
            </Label>
            <Controller
              name="customer"
              control={control}
              render={({ field }) => (
                <SelectInput
                  options={customers.map((customer: TCustomer) => ({
                    value: customer.id,
                    label: customer.name,
                  }))}
                  placeholder="Select a customer"
                  value={field.value}
                  onValueChange={field.onChange}
                  triggerClassName="w-full"
                />
              )}
            />
            <div className="flex justify-end">
              <Button
                variant="link"
                className="text-sm font-normal"
                onClick={() => setIsAddCustomerOpen(true)}
                type="button"
              >
                <Plus /> Add Customer
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="invoiceNumber" className="custom-label">
              Invoice
            </Label>
            <Controller
              name="invoiceNumber"
              control={control}
              render={({ field }) => (
                <Input
                  id="invoiceNumber"
                  placeholder="Enter invoice number"
                  {...field}
                  className="custom-focus"
                />
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="orderNumber" className="custom-label">
              Order Number
            </Label>
            <Controller
              name="orderNumber"
              control={control}
              render={({ field }) => (
                <Input
                  id="orderNumber"
                  placeholder="Enter order number"
                  {...field}
                  className="custom-focus"
                />
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoiceDate" className="custom-label">
                Invoice Date
              </Label>
              <Controller
                name="invoiceDate"
                control={control}
                render={({ field }) => (
                  <Input id="invoiceDate" {...field} className="custom-focus" />
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceDate" className="custom-label">
                Service Date
              </Label>
              <Controller
                name="serviceDate"
                control={control}
                render={({ field }) => (
                  <Input id="serviceDate" {...field} className="custom-focus" />
                )}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate" className="custom-label">
              Due Date
            </Label>
            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => (
                <Input id="dueDate" {...field} className="custom-focus" />
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="footerTerms" className="custom-label">
              Footer & Terms
            </Label>
            <Controller
              name="footerTerms"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="footerTerms"
                  {...field}
                  rows={3}
                  className="custom-focus"
                />
              )}
            />
          </div>
        </div>

        {/* Items Section */}
        <ItemsSection control={control} setValue={setValue} watch={watch} />

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
      </form>
    </div>
  );
}
