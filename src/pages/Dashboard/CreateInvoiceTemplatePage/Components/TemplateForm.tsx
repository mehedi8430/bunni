import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCustomerApi } from "@/mock-api-hook/features/customers/useCustomerApi";
import type { TInvoiceData, TInvoiceItem } from "@/types";
import type { TCustomer } from "@/types/customer.type";
import { getTodayDate, getTodayDateWithTime } from "@/utils/dateFormat";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

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
    },
    {
      id: "2",
      description: "",
      quantity: 100,
      price: 0.0,
      tax: 0,
      amount: 0.0,
    },
  ],
  subtotal: 100.0,
  discount: 0,
  total: 100.0,
};

export default function TemplateForm() {
  const [invoiceData, setInvoiceData] =
    useState<TInvoiceData>(initialInvoiceData);

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

  const handleItemChange = (
    itemId: string,
    field: keyof TInvoiceItem,
    value: string | number,
  ) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === itemId ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const removeItem = (itemId: string) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== itemId),
    }));
  };

  const calculateTotal = () => {
    const subtotal = invoiceData.items.reduce(
      (sum, item) => sum + item.amount,
      0,
    );
    const total = subtotal - invoiceData.discount;
    return { subtotal, total };
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
            <Button variant="link" className="text-sm font-normal">
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
      <div className="space-y-6">
        <div>
          <h3 className="px-4 text-2xl font-semibold">Select Item</h3>
          <div className="border-border mt-5 border-t" />
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-12 gap-2 text-sm font-medium text-gray-600">
            <div className="col-span-4">Item Details</div>
            <div className="col-span-2">Quantity</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">Tax</div>
            <div className="col-span-2">Amount</div>
          </div>

          {invoiceData.items.map((item) => (
            <div key={item.id} className="grid grid-cols-12 items-center gap-2">
              <div className="col-span-4">
                <Input
                  placeholder="Type or click to select..."
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(item.id, "description", e.target.value)
                  }
                  className="custom-focus"
                />
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(
                      item.id,
                      "quantity",
                      parseFloat(e.target.value) || 0,
                    )
                  }
                  className="custom-focus"
                />
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  step="0.01"
                  value={item.price}
                  onChange={(e) =>
                    handleItemChange(
                      item.id,
                      "price",
                      parseFloat(e.target.value) || 0,
                    )
                  }
                  className="custom-focus"
                />
              </div>
              <div className="col-span-2">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Tax" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">No Tax</SelectItem>
                    <SelectItem value="10">10%</SelectItem>
                    <SelectItem value="20">20%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-1">
                <Input
                  type="number"
                  step="0.01"
                  value={item.amount}
                  onChange={(e) =>
                    handleItemChange(
                      item.id,
                      "amount",
                      parseFloat(e.target.value) || 0,
                    )
                  }
                />
              </div>
              <div className="col-span-1 flex justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2 border-t pt-4">
          <div className="flex justify-between">
            <span>Sub Total</span>
            <span>{calculateTotal().subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <Input
              type="number"
              step="0.01"
              value={invoiceData.discount}
              onChange={(e) =>
                handleInputChange("discount", parseFloat(e.target.value) || 0)
              }
              className="w-20 text-right"
            />
          </div>
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>{calculateTotal().total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
