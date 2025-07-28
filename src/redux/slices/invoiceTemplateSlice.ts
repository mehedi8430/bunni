import { mockDiscounts, mockTaxRates } from "@/mockApi/invoiceApi";
import type { TInvoiceData, TInvoiceItem, TProduct } from "@/types";
import { getTodayDate, getTodayDateWithTime } from "@/utils/dateFormat";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: TInvoiceData = {
  title: "",
  templateName: "",
  customerId: "",
  invoiceNumber: `INV-${crypto.randomUUID()}`,
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
      discountId: mockDiscounts[0]?.id || "",
    },
  ],
  subtotal: 0.0,
  discount: 0.0,
  totalTax: 0.0,
  total: 0.0,
  color: "#38988A", // Default color
  createdBy: "", // Add a sensible default or fetch from user context if needed
  sentVia: "", // Add a sensible default or set as needed
};

const invoiceTemplateSlice = createSlice({
  name: "invoiceTemplate",
  initialState,
  reducers: {
    setInvoice: (state, action: PayloadAction<TInvoiceData>) => {
      return { ...state, ...action.payload };
    },
    updateField: (
      state,
      action: PayloadAction<{
        field: keyof Omit<TInvoiceData, "items" | "subtotal" | "total">;
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
        discountId: mockDiscounts[0]?.id || "",
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

    clearInvoice: (state) => {
      return { ...initialState, color: state.color };
    },
  },
});

// Helper function to calculate amount for a single item
const calculateAmount = (state: TInvoiceData, index: number) => {
  const item = state.items[index];
  const baseAmount = item.quantity * item.price;
  const discountAmount = getDiscountAmount(item, baseAmount);
  const discountedAmount = baseAmount - discountAmount;

  const taxAmount = getTaxAmount(item, discountedAmount);
  state.items[index].tax = taxAmount;
  state.items[index].amount = discountedAmount + taxAmount;
  calculateTotals(state);
};

// Helper function to calculate subtotal and total
const calculateTotals = (state: TInvoiceData) => {
  const subtotal = state.items.reduce((sum, item) => sum + item.amount, 0);
  const totalTax = state.items.reduce((sum, item) => sum + item.tax, 0);

  const totalDiscount = state.items.reduce(
    (sum, item) =>
      sum +
      item.price * item.quantity * (getDiscountAmount(item, subtotal) / 100),
    0,
  );

  state.totalTax = totalTax;
  state.subtotal = subtotal;
  state.discount = totalDiscount;
  state.total = subtotal - totalDiscount + totalTax;
};

function getDiscountAmount(item: TInvoiceItem, baseAmount: number) {
  const selectedDiscount = mockDiscounts.find(
    (discount) => discount.id === item.discountId,
  );
  let discountAmount = 0;

  if (selectedDiscount) {
    if (selectedDiscount.type === "Percentage") {
      const percentage =
        parseFloat(selectedDiscount.amount.toString().replace("%", "")) || 0;
      discountAmount = (baseAmount * percentage) / 100;
    } else if (selectedDiscount.type === "Fixed Amount") {
      discountAmount =
        parseFloat(selectedDiscount.amount.toString().replace("$", "")) || 0;
    }
  }

  return discountAmount;
}

function getTaxAmount(item: TInvoiceItem, discountedAmount: number) {
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

  return taxAmount;
}

export const {
  setInvoice,
  updateField,
  addItem,
  removeItem,
  updateItem,
  selectProduct,
  setColor,
  clearInvoice,
} = invoiceTemplateSlice.actions;
export const templateSelector = (state: { invoiceTemplate: TInvoiceData }) =>
  state.invoiceTemplate;
export default invoiceTemplateSlice.reducer;
