import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
import dialogReducer from "./slices/dialogSlice";
import invoiceTemplateReducer from "./slices/invoiceTemplateSlice";
import languageReducer from "./slices/languageSlice";
import invoiceFooterSliceReducer from "./slices/invoiceFooterSlice";
import busynessReducer from "./slices/busynessSlice";
import businessSwitchReducer from "./slices/busynessSwitchSlice";

import { apiSlice } from "./api";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["auth", "businessSwitch"],
  blacklist: [apiSlice.reducerPath],
};

const rootReducer = combineReducers({
  busyness: busynessReducer,
  auth: authReducer,
  dialog: dialogReducer,
  invoiceTemplate: invoiceTemplateReducer,
  language: languageReducer,
  invoiceFooters: invoiceFooterSliceReducer,
  businessSwitch: businessSwitchReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
