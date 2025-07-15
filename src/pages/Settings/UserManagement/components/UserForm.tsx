import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { TUser } from "@/types";

interface UserFormProps {
  user?: Partial<TUser>;
  onClose: () => void;
  onSave: (user: TUser) => void;
}

export default function UserForm({ user, onClose, onSave }: UserFormProps) {

  const [formData, setFormData] = useState<Partial<TUser>>({
    id: user?.id || "",
    memberName: user?.memberName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    permissions: user?.permissions || "Admin",
    lastLogin: user?.lastLogin || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: TUser = {
      id:
        formData.id || `USER-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      memberName: formData.memberName || "",
      email: formData.email || "",
      phone: formData.phone || "",
      permissions: formData.permissions as "Owner" | "Admin",
      lastLogin: formData.lastLogin || "Pending Invitation",
    };
    onSave(newUser as TUser);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-600">
          Member Name
        </label>
        <input
          type="text"
          name="memberName"
          value={formData.memberName}
          onChange={handleChange}
          className="w-full rounded-md border p-2 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter member name"
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-600">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-md border p-2 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter email"
          required
        />
      </div>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-md border p-2 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="(+XX) XXX XXX XXX"
            required
          />
        </div>
        <div className="w-1/2">
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Permissions
          </label>
          <select
            name="permissions"
            value={formData.permissions}
            onChange={handleChange}
            className="w-full rounded-md border p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          >
            <option value="Admin">Admin</option>
            <option value="Owner">Owner</option>
          </select>
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-600">
          Last Login
        </label>
        <input
          type="text"
          name="lastLogin"
          value={formData.lastLogin}
          onChange={handleChange}
          className="w-full rounded-md border p-2 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="e.g., Pending Invitation or Jun 28, 2025, 6:03 AM"
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
        <Button type="submit" variant="primary">
          Save
        </Button>
      </div>
    </form>
  );
}
