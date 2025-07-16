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
import type { TInvoiceData, TInvoiceItem } from "@/types";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function TemplateForm() {
  const [invoiceData, setInvoiceData] = useState<TInvoiceData>({
    title: "",
    customer: "",
    invoiceNumber: "INV-000003",
    orderNumber: "",
    invoiceDate: "05 Feb 2025",
    serviceDate: "05 Feb 2025  8:52pm",
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
  });

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

  const addNewItem = () => {
    const newItem: TInvoiceItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      price: 0,
      tax: 0,
      amount: 0,
    };
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
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
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Invoice title</Label>
          <Input
            id="title"
            placeholder="Let your customer know what this invoice is for"
            value={invoiceData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="customer">Customer</Label>
          <Select
            value={invoiceData.customer}
            onValueChange={(value) => handleInputChange("customer", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="John" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="john">John</SelectItem>
              <SelectItem value="jane">Jane</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="link"
            className="mt-1 h-auto p-0 text-sm text-blue-600"
          >
            + Add Customer
          </Button>
        </div>

        <div>
          <Label htmlFor="invoice-number">Invoice</Label>
          <Input
            id="invoice-number"
            value={invoiceData.invoiceNumber}
            onChange={(e) => handleInputChange("invoiceNumber", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="order-number">Order Number</Label>
          <Input
            id="order-number"
            placeholder="Enter order number"
            value={invoiceData.orderNumber}
            onChange={(e) => handleInputChange("orderNumber", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="invoice-date">Invoice Date</Label>
            <Input
              id="invoice-date"
              value={invoiceData.invoiceDate}
              onChange={(e) => handleInputChange("invoiceDate", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="service-date">Service Date</Label>
            <Input
              id="service-date"
              value={invoiceData.serviceDate}
              onChange={(e) => handleInputChange("serviceDate", e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="due-date">Due Date</Label>
          <Input
            id="due-date"
            value={invoiceData.dueDate}
            onChange={(e) => handleInputChange("dueDate", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="footer-terms">Footer & Terms</Label>
          <Textarea
            id="footer-terms"
            value={invoiceData.footerTerms}
            onChange={(e) => handleInputChange("footerTerms", e.target.value)}
            rows={3}
          />
        </div>
      </div>

      {/* Items Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Select Item</h3>
          <Button variant="outline" size="sm" onClick={addNewItem}>
            <Plus className="mr-1 h-4 w-4" />
            Add New Row
          </Button>
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
