export type TInvoice = {
  id: string;
  customerName: string;
  status: string;
  orderNumber: string;
  amount: string | number;
  tenderType: "Credit Card" | "Bank Transfer";
  date: string;
  templateId?: string;
};

export type TDiscount = {
  id: string;
  name: string;
  amount: string | number;
  createdDate: string;
  status: "Active" | "Inactive";
  type: "Percentage" | "Fixed Amount" | "Free Shipping";
};

export type TInvoiceFooter = {
  id: string;
  footerContent: string;
};

export type TTaxRate = {
  id: string;
  name: string;
  amount: string | number;
  createdDate: string;
  lastLogin?: string;
  rate: string;
  status: "Active" | "Inactive";
};

export type TInvoiceItem = {
  id: string;
  description: string;
  quantity: number;
  price: number;
  tax: number;
  amount: number;
  taxId: string;
  discount: number;
  discountId: string;
};

export type TInvoiceTemplate = {
  id: string;
  name: string;
  type: "default" | "professional" | "modern";
  color: "blue" | "orange" | "green" | "purple";
  preview: string;
  image: string;
  link: string;
};

export type TInvoiceData = {
  title: string;
  customerId: string;
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
  color: string;
  totalTax: number;
};
