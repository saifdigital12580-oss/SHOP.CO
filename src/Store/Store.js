import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./Features/ProductSlice";

export const store = configureStore({
  reducer: {
    productSlice: ProductReducer,
  },
});