import { useDispatch, useSelector } from "react-redux";
import { DialogModal } from "@/components/DialogModal";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCustomerApi } from "@/mock-api-hook/features/customers/useCustomerApi";
import type { TCustomer } from "@/types/customer.type";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CustomerForm } from "../../Customer/components/CustomerForm";
import ItemsSection from "./ItemsSection";
import { updateField } from "@/redux/slices/invoiceTemplateSlice";
import type { TInvoiceItem } from "@/types";

interface RootState {
  invoiceTemplate: {
    title: string;
    customer: string;
    invoiceNumber: string;
    orderNumber: string;
    invoiceDate: string;
    serviceDate: string;
    dueDate: string;
    footerTerms: string;
    items: TInvoiceItem[];
    subtotal: number;
    discount: number;
    total: number;
  };
}

export default function TemplateForm() {
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const { customers } = useCustomerApi();
  const dispatch = useDispatch();
  const {
    title,
    customer,
    invoiceNumber,
    orderNumber,
    invoiceDate,
    serviceDate,
    dueDate,
    footerTerms,
  } = useSelector((state: RootState) => state.invoiceTemplate);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", {
      title,
      customer,
      invoiceNumber,
      orderNumber,
      invoiceDate,
      serviceDate,
      dueDate,
      footerTerms,
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-6 px-6 pt-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="custom-label">
              Invoice title
            </Label>
            <Input
              id="title"
              placeholder="Let your customer know what this invoice is for"
              value={title}
              onChange={(e) =>
                dispatch(updateField({ field: "title", value: e.target.value }))
              }
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
              value={customer}
              onValueChange={(value) =>
                dispatch(updateField({ field: "customer", value }))
              }
              triggerClassName="w-full"
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
            <Input
              id="invoiceNumber"
              placeholder="Enter invoice number"
              value={invoiceNumber}
              onChange={(e) =>
                dispatch(
                  updateField({
                    field: "invoiceNumber",
                    value: e.target.value,
                  }),
                )
              }
              className="custom-focus"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="orderNumber" className="custom-label">
              Order Number
            </Label>
            <Input
              id="orderNumber"
              placeholder="Enter order number"
              value={orderNumber}
              onChange={(e) =>
                dispatch(
                  updateField({ field: "orderNumber", value: e.target.value }),
                )
              }
              className="custom-focus"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoiceDate" className="custom-label">
                Invoice Date
              </Label>
              <Input
                id="invoiceDate"
                value={invoiceDate}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      field: "invoiceDate",
                      value: e.target.value,
                    }),
                  )
                }
                className="custom-focus"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceDate" className="custom-label">
                Service Date
              </Label>
              <Input
                id="serviceDate"
                value={serviceDate}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      field: "serviceDate",
                      value: e.target.value,
                    }),
                  )
                }
                className="custom-focus"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate" className="custom-label">
              Due Date
            </Label>
            <Input
              id="dueDate"
              value={dueDate}
              onChange={(e) =>
                dispatch(
                  updateField({ field: "dueDate", value: e.target.value }),
                )
              }
              className="custom-focus"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="footerTerms" className="custom-label">
              Footer & Terms
            </Label>
            <Textarea
              id="footerTerms"
              value={footerTerms}
              onChange={(e) =>
                dispatch(
                  updateField({ field: "footerTerms", value: e.target.value }),
                )
              }
              rows={3}
              className="custom-focus"
            />
          </div>
        </div>

        {/* Items Section */}
        <ItemsSection />

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
