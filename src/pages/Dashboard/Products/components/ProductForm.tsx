// components/ProductForm.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { TProduct } from "@/types";

interface ProductFormProps {
  product?: Partial<TProduct>;
  onClose: () => void;
  onSave: (product: TProduct) => void;
}

export default function ProductForm({
  product,
  onClose,
  onSave,
}: ProductFormProps) {
  const [formData, setFormData] = useState<Partial<TProduct>>({
    id: product?.id || "",
    name: product?.name || "",
    type: product?.type || "Product",
    unit: product?.unit || "per hour",
    price: product?.price || 0,
    description: product?.description || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: TProduct = {
      id:
        formData.id || `PROD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: formData.name || "",
      type: formData.type as "Product" | "Service",
      unit: formData.unit || "per hour",
      price: Number(formData.price) || 0,
      description: formData.description || "",
    };
    onSave(newProduct as TProduct);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-600">
          Product Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-md border p-2 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter product name"
          required
        />
      </div>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full rounded-md border p-2 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            step="0.01"
            placeholder="$0.00"
            required
          />
        </div>
        <div className="w-1/2">
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full rounded-md border p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          >
            <option value="Product">Product</option>
            <option value="Service">Service</option>
          </select>
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-600">
          Description
        </label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded-md border p-2 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter product description"
          required
        />
      </div>
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          Cancel
        </Button>
        <Button variant={"primary"} type="submit">
          Save
        </Button>
      </div>
    </form>
  );
}
