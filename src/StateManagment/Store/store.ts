"use client";
import { configureStore } from "@reduxjs/toolkit";
import OrderReducer from "@/StateManagment/Slices/OrderSlice";
import OrderLinesReducer from "@/StateManagment/Slices/OrderLinesSlice";
import CustomerTreeViewReducer from "@/StateManagment/Slices/CustomerTreeView";

const store = configureStore({
  reducer: { OrderReducer, OrderLinesReducer, CustomerTreeViewReducer },
});
export type IRootState = ReturnType<typeof store.getState>;
export default store;
