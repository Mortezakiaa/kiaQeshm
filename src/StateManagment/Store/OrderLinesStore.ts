import { configureStore } from "@reduxjs/toolkit";
import OrderLinesReducer from "@/StateManagment/Slices/OrderLinesSlice";

export const OrderLinesStore = configureStore({
  reducer: { OrderLinesReducer },
});
