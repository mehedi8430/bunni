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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Payment);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="invoice">Invoice</Label>
        <Input
          id="invoice"
          value={formData.invoice}
          onChange={(e) =>
            setFormData({ ...formData, invoice: e.target.value })
          }
          placeholder="Enter invoice number"
        />
      </div>
      <div>
        <Label htmlFor="customerName">Customer Name</Label>
        <Input
          id="customerName"
          value={formData.customerName}
          onChange={(e) =>
            setFormData({ ...formData, customerName: e.target.value })
          }
          placeholder="Enter customer name"
        />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          value={formData.amount}
          onChange={(e) =>
            setFormData({ ...formData, amount: Number(e.target.value) })
          }
          placeholder="Enter amount"
        />
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value as "Paid" | "Unpaid" | "Save",
            })
          }
          className="w-full rounded border p-2"
        >
          <option value="Save">Save</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
        </select>
      </div>
      <div>
        <Label htmlFor="paymentMethod">Payment Method</Label>
        <select
          id="paymentMethod"
          value={formData.paymentMethod}
          onChange={(e) =>
            setFormData({
              ...formData,
              paymentMethod: e.target.value as "Credit Card" | "Bank Transfer",
            })
          }
          className="w-full rounded border p-2"
        >
          <option value="Credit Card">Credit Card</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
