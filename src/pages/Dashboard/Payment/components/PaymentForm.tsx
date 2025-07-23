import { CustomDatePicker } from "@/components/customeDatePicker/CustomDatePicker";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Payment } from "@/mockApi/paymentApi";
import { useState } from "react";

interface PaymentFormProps {
  payment?: Partial<Payment>;
  onClose: () => void;
  onSave: (payment: Payment) => void;
}

export function PaymentForm({ payment, onClose, onSave }: PaymentFormProps) {
  const [formData, setFormData] = useState<Partial<Payment>>({
    invoice: payment?.invoice || "",
    customerName: payment?.customerName || "",
    date: payment?.date || "",
    amount: payment?.amount || 0,
    status: payment?.status || "Save",
    paymentMethod: payment?.paymentMethod || "Credit Card",
  });
  console.log("Form Data:", formData.date);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Payment);
    onClose();
  };

  const paymentMethodOptions = [
    { value: "Credit Card", label: "Credit Card" },
    { value: "Bank Transfer", label: "Bank Transfer" },
    { value: "PayPal", label: "PayPal" },
    { value: "Other", label: "Other" },
  ];

  const statusOptions = [
    { value: "Save", label: "Save" },
    { value: "Paid", label: "Paid" },
    { value: "Unpaid", label: "Unpaid" },
  ];

  function formatShortDate(date?: Date): string {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const monthShort = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${monthShort}, ${year}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label className="text-lg font-normal" htmlFor="invoice">Invoice</Label>
        <Input
          id="invoice"
          value={formData.invoice}
          onChange={(e) =>
            setFormData({ ...formData, invoice: e.target.value })
          }
          placeholder="Enter invoice number"
          className="custom-focus"
        />
      </div>
      <div>
        <Label className="text-lg font-normal" htmlFor="customerName">Customer Name</Label>
        <Input
          id="customerName"
          value={formData.customerName}
          onChange={(e) =>
            setFormData({ ...formData, customerName: e.target.value })
          }
          placeholder="Enter customer name"
          className="custom-focus"
        />
      </div>
      <div>
        <Label className="text-lg font-normal" htmlFor="date"></Label>
        <CustomDatePicker
          defaultDate={formData.date}
          label="Date"
          onDateChange={(date) =>
            setFormData({
              ...formData,
              date: date ? formatShortDate(date) : "",
            })
          }
        />
      </div>
      <div>
        <Label className="text-lg font-normal" htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          value={formData.amount}
          onChange={(e) =>
            setFormData({ ...formData, amount: Number(e.target.value) })
          }
          placeholder="Enter amount"
          className="custom-focus"
        />
      </div>
      <div>
        <Label className="text-lg font-normal" htmlFor="status">Status</Label>
        <SelectInput
          options={statusOptions.map((option) => ({
            value: option.value,
            label: option.label,
          }))}
          onValueChange={
            (value) => setFormData({ ...formData, status: value as "Paid" | "Unpaid" | "Save" })
          }
          triggerClassName="w-full py-5"
          value={formData.status}
        />
      </div>
      <div>
        <Label className="text-lg font-normal" htmlFor="paymentMethod">Payment Method</Label>
        <SelectInput
          options={paymentMethodOptions.map((option) => ({
            value: option.value,
            label: option.label,
          }))}
          onValueChange={
            (value) => setFormData({ ...formData, paymentMethod: value as "Credit Card" | "Bank Transfer" | "PayPal" | "Other" })
          }
          triggerClassName="w-full py-5"
          value={formData.paymentMethod}
        />
      </div>
      <hr className="shadow-[0_-4px_6px_rgba(0,0,0,0.2)] mt-7" />
      {/* Buttons */}
      <div className="flex items-center justify-center md:justify-end gap-3 p-2">
        <Button type="button" variant="outline" onClick={onClose} className="px-10 py-5 text-base font-normal">
          Cancel
        </Button>
        <Button variant={"primary"} type="submit" className="px-10 py-5 shadow-2xl text-base font-normal border border-button-border">Save</Button>
      </div>
    </form>
  );
}
