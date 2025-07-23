import { createSlice } from "@reduxjs/toolkit";
import i18n from "../../utils/i18next";
import type { RootState } from "../store";

const initialState = {
  language: i18n.language || "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      i18n.changeLanguage(action.payload);
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
export const languageSelector = (state: RootState) => state.language.language;
