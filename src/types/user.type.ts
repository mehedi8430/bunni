export type TUser = {
  id: string;
  memberName: string;
  email: string;
  phone: string;
  location: string;
  commission: number;
  permissions: "Owner" | "Admin";
  lastLogin?: string;
};
