import { mockTaxRates } from "@/mockApi/invoiceApi";
import type { TInvoiceData, TInvoiceItem, TProduct } from "@/types";
import { getTodayDate, getTodayDateWithTime } from "@/utils/dateFormat";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define the initial state based on TInvoiceData
interface InvoiceState extends TInvoiceData {
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
  color: string;
  totalTax: number;
}

const initialState: InvoiceState = {
  title: "",
  customer: "",
  invoiceNumber: "",
  orderNumber: "",
  invoiceDate: getTodayDate(),
  serviceDate: getTodayDateWithTime(),
  dueDate: getTodayDate(),
  footerTerms:
    "Payment is due within 15 days from the date of invoice. Please make checks payable to Acme Inc. or use the online payment link provided in this email.",
  items: [
    {
      id: crypto.randomUUID(),
      description: "",
      quantity: 1,
      price: 0,
      tax: 0,
      amount: 0,
      taxId: mockTaxRates[0]?.id || "",
      discount: 0,
    },
  ],
  subtotal: 100.0,
  discount: 0,
  totalTax: 0,
  total: 100.0,
  color: "#38988A", // Default color
};

const invoiceTemplateSlice = createSlice({
  name: "invoiceTemplate",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{
        field: keyof Omit<InvoiceState, "items" | "subtotal" | "total">;
        value: string;
      }>,
    ) => {
      const { field, value } = action.payload;
      (state[field] as string) = value;
    },
    addItem: (state) => {
      state.items.push({
        id: crypto.randomUUID(),
        description: "",
        quantity: 1,
        price: 0,
        tax: 0,
        taxId: mockTaxRates[0]?.id || "",
        amount: 0,
        discount: 0,
      });

      calculateTotals(state);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1);
      calculateTotals(state);
    },
    updateItem: (
      state,
      action: PayloadAction<{
        index: number;
        field: keyof TInvoiceItem;
        value: string | number;
      }>,
    ) => {
      const { index, field, value } = action.payload;
      state.items[index] = {
        ...state.items[index],
        [field]: value,
      };
      calculateAmount(state, index);
    },
    selectProduct: (
      state,
      action: PayloadAction<{ index: number; product: TProduct }>,
    ) => {
      const { index, product } = action.payload;
      state.items[index].description = product.name;
      state.items[index].price = product.price;
      calculateAmount(state, index);
    },

    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
  },
});

// Helper function to calculate amount for a single item
const calculateAmount = (state: InvoiceState, index: number) => {
  const item = state.items[index];
  const baseAmount = item.quantity * item.price;
  const discountAmount = baseAmount * (item.discount / 100);
  const discountedAmount = baseAmount - discountAmount;

  // Calculate tax
  const selectedTax = mockTaxRates.find((tax) => tax.id === item.taxId);
  let taxAmount = 0;

  if (selectedTax) {
    if (selectedTax.rate === "Percentage") {
      const percentage =
        parseFloat(selectedTax.amount.toString().replace("%", "")) || 0;
      taxAmount = (discountedAmount * percentage) / 100;
    } else if (selectedTax.rate === "Fixed Amount") {
      taxAmount =
        parseFloat(selectedTax.amount.toString().replace("$", "")) || 0;
    }
  }

  state.items[index].tax = taxAmount;
  state.items[index].amount = discountedAmount + taxAmount;
  calculateTotals(state);
};

// Helper function to calculate subtotal and total
const calculateTotals = (state: InvoiceState) => {
  const subtotal = state.items.reduce((sum, item) => sum + item.amount, 0);
  const totalTax = state.items.reduce((sum, item) => sum + item.tax, 0);
  const totalDiscount = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity * (item.discount / 100),
    0,
  );

  state.totalTax = totalTax;
  state.subtotal = subtotal;
  state.discount = totalDiscount;
  state.total = subtotal - totalDiscount + totalTax;
};

export const {
  updateField,
  addItem,
  removeItem,
  updateItem,
  selectProduct,
  setColor,
} = invoiceTemplateSlice.actions;
export const templateSelector = (state: { invoiceTemplate: InvoiceState }) =>
  state.invoiceTemplate;
export default invoiceTemplateSlice.reducer;
