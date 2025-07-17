export type TUser = {
  id: string;
  memberName: string;
  email: string;
  phone: string;
  businessName?: string;
  businessAddress?: string;
  location?: string;
  commission?: number;
  permissions?: "Owner" | "Admin";
  lastLogin?: string;
  currentPassword?: string;
  newPassword?: string;
};
