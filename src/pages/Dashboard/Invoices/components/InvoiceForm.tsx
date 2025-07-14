import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { TInvoice } from "@/types";

interface InvoiceFormProps {
  invoice?: Partial<TInvoice>;
  onClose: () => void;
  onSave: (invoice: TInvoice) => void;
}

export default function InvoiceForm({
  invoice,
  onClose,
  onSave,
}: InvoiceFormProps) {
  const [formData, setFormData] = useState<Partial<TInvoice>>({
    id: invoice?.id || "",
    customerName: invoice?.customerName || "",
    status: invoice?.status || "Save",
    orderNumber: invoice?.orderNumber || "",
    amount: invoice?.amount || 0,
    tenderType: invoice?.tenderType || "Credit Card",
    date: invoice?.date || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInvoice: TInvoice = {
      id:
        formData.id || `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      customerName: formData.customerName || "",
      status: formData.status as "Paid" | "Unpaid" | "Save",
      orderNumber:
        formData.orderNumber ||
        `#${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      amount: Number(formData.amount) || 0,
      tenderType: formData.tenderType as "Credit Card" | "Bank Transfer",
      date:
        formData.date ||
        new Date().toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    };
    onSave(newInvoice as TInvoice);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Customer Name</label>
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          className="w-full rounded border p-2"
          required
        />
      </div>
      <div>
        <label>Amount</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full rounded border p-2"
          required
        />
      </div>
      <div>
        <label>Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full rounded border p-2"
          required
        >
          <option value="Save">Save</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
        </select>
      </div>
      <div>
        <label>Tender Type</label>
        <select
          name="tenderType"
          value={formData.tenderType}
          onChange={handleChange}
          className="w-full rounded border p-2"
          required
        >
          <option value="Credit Card">Credit Card</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>
      </div>
      <div>
        <label>Date</label>
        <input
          type="text"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full rounded border p-2"
          placeholder="e.g., 05 Feb, 2025"
          required
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
