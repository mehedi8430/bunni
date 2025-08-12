import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  email: string | null;
  refresh_token: string | null;
  access_token: string | null;
};

const initialState: TInitialState = {
  email: null,
  refresh_token: null,
  access_token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.email = action.payload?.email;
      state.refresh_token = action.payload?.refresh_token;
      state.access_token = action.payload?.access_token;
    },
    userLoggedOut: (state) => {
      state.email = null;
      state.refresh_token = null;
      state.access_token = null;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
export const authSelector = (state: { auth: TInitialState }) => state.auth;
