import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { TDiscount } from "@/types";

interface DiscountFormProps {
  discount: Partial<TDiscount>;
  onSave: (discount: TDiscount) => void;
  onClose: () => void;
}

export default function DiscountForm({
  discount,
  onSave,
  onClose,
}: DiscountFormProps) {
  const [formData, setFormData] = useState<Partial<TDiscount>>({
    id: discount.id || "",
    name: discount.name || "",
    amount: discount.amount || 0,
    status: discount.status || "Active",
  });
  const [errors, setErrors] = useState<{ name?: string; amount?: string }>({});

  useEffect(() => {
    setFormData({
      id: discount.id || "",
      name: discount.name || "",
      amount: discount.amount || 0,
      status: discount.status || "Active",
    });
  }, [discount]);

  const validateForm = () => {
    const newErrors: { name?: string; amount?: string } = {};
    if (!formData.name?.trim()) {
      newErrors.name = "Name is required";
    }
    if (formData.amount === undefined || formData.amount < 0) {
      newErrors.amount = "Amount must be a non-negative number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const updatedDiscount: TDiscount = {
      id: formData.id || `discount-${Date.now()}`,
      name: formData.name || "",
      amount: formData.amount || 0,
      status: formData.status || "Active",
      createdDate: formData.id
        ? discount.createdDate || new Date().toISOString()
        : new Date().toISOString(),
    };

    onSave(updatedDiscount);
    onClose();
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name" className="text-sm font-medium">
          Discount Name
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1"
          placeholder="Enter discount name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>
      <div>
        <Label htmlFor="amount" className="text-sm font-medium">
          Amount (%)
        </Label>
        <Input
          id="amount"
          type="number"
          value={formData.amount}
          onChange={(e) =>
            setFormData({
              ...formData,
              amount: parseFloat(e.target.value) || 0,
            })
          }
          className="mt-1"
          placeholder="Enter discount amount"
          min="0"
        />
        {errors.amount && (
          <p className="mt-1 text-sm text-red-500">{errors.amount}</p>
        )}
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Save</Button>
      </div>
    </div>
  );
}
