export type TUser = {
  id: string;
  memberName: string;
  email: string;
  phone: string;
  permissions: "Owner" | "Admin";
  lastLogin: string;
};
