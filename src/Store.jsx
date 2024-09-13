import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./services/Products";

// Configure the store with the products API reducer
export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

