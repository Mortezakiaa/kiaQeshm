import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  itemCode: "",
  itemName: "",
  qty1: null,
  fee: null,
  amount: null,
  discountPercent: null,
  discountAmount: null,
  remindNet: null,
};

const OrderLinesSlice = createSlice({
  name: "OrderLineSlice",
  initialState,
  reducers: {
    id: (state, action) => {
      state.id = action.payload;
    },
    itemCode: (state, action) => {
      state.itemCode = action.payload;
    },
    itemName: (state, action) => {
      state.itemName = action.payload;
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
  },
});

export default OrderLinesSlice.reducer;
export const {
  id,
  itemCode,
  itemName,
  qty1,
  fee,
  amount,
  discountPercent,
  discountAmount,
  remindNet,
} = OrderLinesSlice.actions;
