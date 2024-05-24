import { configureStore } from "@reduxjs/toolkit";
import OrderReducer from "@/StateManagment/Slices/OrderSlice";
import OrderLinesReducer from "@/StateManagment/Slices/OrderLinesSlice";
import CustomerTreeViewReducer from "@/StateManagment/Slices/CustomerTreeView";
import TreeReducer from "../Slices/InfiniteTreeView";
import ProductTreeViewReducer from "../Slices/ProductTreeView";
import HesabCodeTreeViewReducer from "../Slices/HesabCodeTreeView";

const store = configureStore({
  reducer: {
    OrderReducer,
    OrderLinesReducer,
    CustomerTreeViewReducer,
    TreeReducer,
    ProductTreeViewReducer,
    HesabCodeTreeViewReducer
  },
});
export type IRootState = ReturnType<typeof store.getState>;
export default store;
