export type TInvoice = {
  id: string;
  customerName: string;
  status: "Paid" | "Unpaid" | "Save";
  orderNumber: string;
  amount: number;
  tenderType: "Credit Card" | "Bank Transfer";
  date: string;
};

export type TDiscount = {
  id: string;
  name: string;
  amount: number;
  createdDate: string;
  status: "Active" | "Inactive";
};

export type TTaxRate = {
  id: string;
  name: string;
  amount: number;
  createdDate: string;
  lastLogin: string;
};
