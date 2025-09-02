import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type BusinessInfo = {
  first_name?: string;
  last_name?: string;
  business_name?: string;
  business_do?: string;
  legal_stucture?: string;
  business_type?: string;
  business_country?: string;
  business_currency?: string;
  business_start?: string;
  customer_size?: string;
  payment_method?: string;
  accept_payments?: string;
  like_to_do?: string;
  phone?: string;
  city?: string;
};

const initialState: BusinessInfo = {
  first_name: "",
  last_name: "",
  business_name: "",
  business_do: "",
  legal_stucture: "",
  business_type: "",
  business_country: "",
  business_currency: "",
  business_start: "",
  customer_size: "",
  payment_method: "",
  accept_payments: "",
  like_to_do: "",
  phone: "",
  city: "",
};

const busynessSlice = createSlice({
  name: "busyness",
  initialState,
  reducers: {
    setBusinessInfo: (state, action) => {
      // Mutate the state directly (Redux Toolkit uses Immer)
      Object.assign(state, action.payload);
    },
  },
});

export const { setBusinessInfo } = busynessSlice.actions;
export const selectBusinessInfo = (state: RootState) => state.busyness;

export default busynessSlice.reducer;