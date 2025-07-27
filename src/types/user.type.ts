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

export type TAddress = {
  isDefault: string;
  address: string;
};

export type TProfileData = {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
  };
  businessInfo: {
    logo: string;
    name: string;
    addresses: TAddress[];
    contact: string;
    website: string;
    brandColor: string;
  };
};
