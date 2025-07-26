import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TInvoiceFooter } from "@/types";
import { mockInvoiceFooter } from "@/mockApi/invoiceApi";

const initialState: TInvoiceFooter[] = [...mockInvoiceFooter];

const invoiceFooterSlice = createSlice({
  name: "invoiceFooters",
  initialState,
  reducers: {
    addInvoiceFooter: (state, action: PayloadAction<TInvoiceFooter>) => {
      state.push(action.payload);
    },
    updateInvoiceFooter: (state, action: PayloadAction<TInvoiceFooter>) => {
      const idx = state.findIndex(f => f.id === action.payload.id);
      if (idx !== -1) state[idx] = action.payload;
    },
    removeInvoiceFooter: (state, action: PayloadAction<string>) => {
      return state.filter(f => f.id !== action.payload);
    },
  },
});

export const {  addInvoiceFooter, updateInvoiceFooter, removeInvoiceFooter } = invoiceFooterSlice.actions;
export const invoiceFootersSelector = (state: { invoiceFooters: TInvoiceFooter[] }) => state.invoiceFooters;
export default invoiceFooterSlice.reducer;
