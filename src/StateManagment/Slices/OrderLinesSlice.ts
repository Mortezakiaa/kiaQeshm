"use client";
import { createSlice } from "@reduxjs/toolkit";
import { IRootState } from "../Store/store";

const initialState = {
  id: 0,
  itemCode: "",
  itemName: "",
  qty1: 0,
  fee: 0,
  amount: 0,
  discountPercent: 0,
  discountAmount: 0,
  remindNet: 0,
};

const OrderLinesSlice = createSlice({
  name: "OrderLineSlice",
  initialState,
  reducers: {
    ID: (state) => {
      let ID = Math.floor(Math.random() * 100000000);
      state.id = ID
    },
    itemCode: (state, action) => {
      state.itemCode = action.payload;
    },
    itemName: (state, action) => {
      state.itemName = action.payload
    },
    qty1: (state, action) => {
      state.qty1 = action.payload;
    },
    fee: (state, action) => {
      state.fee = action.payload;
    },
    amount: (state, action) => {
      state.amount = action.payload;
    },
    discountPercent: (state, action) => {
      state.discountPercent = action.payload;
    },
    discountAmount: (state, action) => {
      state.discountAmount = action.payload;
    },
    remindNet: (state, action) => {
      state.remindNet = action.payload;
    },
    reset: () => initialState,
  },
});

export default OrderLinesSlice.reducer;
export const {
  ID,
  itemCode,
  itemName,
  qty1,
  fee,
  amount,
  discountPercent,
  discountAmount,
  remindNet,
  reset
} = OrderLinesSlice.actions;

export const OrderLinesSelector = (store: IRootState) =>
  store.OrderLinesReducer;
