export type TInvoice = {
  id: string;
  customerName: string;
  status: "Paid" | "Unpaid" | "Save";
  orderNumber: string;
  amount: number;
  tenderType: "Credit Card" | "Bank Transfer";
  date: string;
};
