import { useDispatch } from "react-redux";
import { DialogModal } from "@/components/DialogModal";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCustomerApi } from "@/mock-api-hook/features/customers/useCustomerApi";
import type { TCustomer } from "@/types/customer.type";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { CustomerForm } from "../../Customer/components/CustomerForm";
import ItemsSection from "./ItemsSection";
import {
  setInvoice,
  templateSelector,
  updateField,
} from "@/redux/slices/invoiceTemplateSlice";
import { useLocation } from "react-router";
import { useInvoiceApi } from "@/mock-api-hook/features/customers/useInvoiceApi";
import { useAppSelector } from "@/redux/hooks";
import type { TInvoice, TInvoiceData } from "@/types";
import { CustomDatePicker } from "@/components/customeDatePicker/CustomDatePicker";
import { CollapsibleField } from "./CollapsibleField";

export default function TemplateForm() {
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const { customers } = useCustomerApi();
  const { state: invoiceId } = useLocation();
  const { invoice } = useInvoiceApi(invoiceId);

  const dispatch = useDispatch();
  const {
    title,
    customerId,
    invoiceNumber,
    orderNumber,
    invoiceDate,
    serviceDate,
    dueDate,
    footerTerms,
  } = useAppSelector(templateSelector);

  // Populate form with invoice data when available
  useEffect(() => {
    if (invoice) {
      dispatch(setInvoice(invoice as TInvoiceData & TInvoice));
    }
  }, [invoice, dispatch]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", {
      title,
      customerId,
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
          {/* Invoice Title */}
          <CollapsibleField label="Invoice title">
            <Input
              id="title"
              placeholder="Let your customer know what this invoice is for"
              value={title}
              onChange={(e) =>
                dispatch(updateField({ field: "title", value: e.target.value }))
              }
              className="custom-focus"
            />
          </CollapsibleField>

          {/* Customer Selection */}
          <CollapsibleField label="Customer">
            <div className="space-y-2">
              <SelectInput
                options={customers.map((customer: TCustomer) => ({
                  value: customer.id,
                  label: customer.name,
                }))}
                placeholder="Select a customer"
                value={customerId}
                onValueChange={(value) =>
                  dispatch(updateField({ field: "customerId", value }))
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
                  <Plus className="mr-1 h-4 w-4" /> Add Customer
                </Button>
              </div>
            </div>
          </CollapsibleField>

          {/* Invoice Number */}
          <CollapsibleField label="Invoice Number">
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
          </CollapsibleField>

          {/* Order Number */}
          <CollapsibleField label="Order Number">
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
          </CollapsibleField>

          {/* Date Fields */}
          <CollapsibleField label="Dates">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <CustomDatePicker
                  defaultDate={invoiceDate}
                  label="Invoice Date"
                  labelClassName="custom-label -mb-2"
                  onDateChange={(date) =>
                    dispatch(
                      updateField({
                        field: "invoiceDate",
                        value: date ? date.toDateString() : "",
                      }),
                    )
                  }
                />
                <CustomDatePicker
                  defaultDate={serviceDate}
                  label="Service Date"
                  labelClassName="custom-label -mb-2"
                  onDateChange={(date) =>
                    dispatch(
                      updateField({
                        field: "serviceDate",
                        value: date ? date.toDateString() : "",
                      }),
                    )
                  }
                />
              </div>
              <CustomDatePicker
                defaultDate={dueDate}
                label="Due Date"
                labelClassName="custom-label -mb-2"
                onDateChange={(date) =>
                  dispatch(
                    updateField({
                      field: "dueDate",
                      value: date ? date.toDateString() : "",
                    }),
                  )
                }
              />
            </div>
          </CollapsibleField>

          {/* Footer & Terms */}
          <CollapsibleField label="Footer & Terms">
            <Textarea
              id="footerTerms"
              placeholder="Enter footer text and terms & conditions"
              value={footerTerms}
              onChange={(e) =>
                dispatch(
                  updateField({ field: "footerTerms", value: e.target.value }),
                )
              }
              rows={3}
              className="custom-focus"
            />
          </CollapsibleField>
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
