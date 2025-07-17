export type TInvoice = {
  id: string;
  customerName: string;
  status: "Paid" | "Unpaid" | "Save";
  orderNumber: string;
  amount: string | number;
  tenderType: "Credit Card" | "Bank Transfer";
  date: string;
};

export type TDiscount = {
  id: string;
  name: string;
  amount: string | number;
  createdDate: string;
  status: "Active" | "Inactive";
};

export type TTaxRate = {
  id: string;
  name: string;
  amount: string | number;
  createdDate: string;
  lastLogin: string;
};

export type TInvoiceItem = {
  id: string;
  description: string;
  quantity: number;
  price: number;
  tax: number;
  amount: number;
};

export type TInvoiceTemplate = {
  id: string;
  name: string;
  type: "default" | "professional" | "modern";
  color: "blue" | "orange" | "green" | "purple";
  preview: string;
  image: string;
};

export type TInvoiceData = {
  title: string;
  customer: string;
  invoiceNumber: string;
  orderNumber: string;
  invoiceDate: string;
  serviceDate: string;
  dueDate: string;
  footerTerms: string;
  items: TInvoiceItem[];
  subtotal: number;
  discount: number;
  total: number;
};
