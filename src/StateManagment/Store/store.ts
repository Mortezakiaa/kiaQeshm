'use client'
import { configureStore } from "@reduxjs/toolkit";
import OrderReducer from "@/StateManagment/Slices/OrderSlice";
import OrderLinesReducer from "@/StateManagment/Slices/OrderLinesSlice";

const store = configureStore({
  reducer: { OrderReducer , OrderLinesReducer },
});
export type IRootState = ReturnType<typeof store.getState>
export default store