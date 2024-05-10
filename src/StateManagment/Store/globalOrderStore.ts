import { configureStore } from "@reduxjs/toolkit";
import OrderReducer from "@/StateManagment/Slices/OrderSlice";
import OrderLinesReducer from "@/StateManagment/Slices/OrderLinesSlice";

export const GlobalOrderStore = configureStore({
  reducer: { OrderReducer , OrderLinesReducer },
});
