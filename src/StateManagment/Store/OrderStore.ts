import { configureStore } from "@reduxjs/toolkit";
import OrderReducer from "@/StateManagment/Slices/OrderSlice";

export const OrderStore = configureStore({
  reducer: { OrderReducer },
});
