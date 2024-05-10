'use client'
import { OrderContextType } from "@/Types/Types";
import { createSlice } from "@reduxjs/toolkit";
import { IRootState } from "../Store/store";

const initialState: OrderContextType = {
  inventoryCode: null,
  inventoryName: "",
  accountingCode: "",
  accountingName: "",
  saleExpertCode: "",
  saleExpertName: "",
  date: "",
  description1: "",
  description2: "",
  customerCode: "",
  customerName: "",
  orderLines: [],
  discount: null,
  editMode: false,
  editId: null,
};

const OrderSlice = createSlice({
  name: "OrderSlice",
  initialState,
  reducers: {
    inventoryCode: (state,action) => {
        state.inventoryCode = action.payload
    },
    accountingCode: (state,action) => {
        state.accountingCode = action.payload
    },
    accountingName: (state,action) => {
        state.accountingName = action.payload
    },
    saleExpertCode: (state,action) => {
        state.saleExpertCode = action.payload
    },
    date: (state,action) => {
        state.date = action.payload
    },
    description1: (state,action) => {
        state.description1 = action.payload
    },
    description2: (state,action) => {
        state.description2 = action.payload
    },
    customerCode: (state,action) => {
        state.customerCode = action.payload
    },
    customerName: (state,action) => {
        state.customerName = action.payload
    },
    orderLines: (state,action) => {
        state.orderLines = action.payload
    },
    discount: (state,action) => {
        state.discount = action.payload
    },
    editMode: (state,action) => {
        state.editMode = action.payload
    },
    editId: (state,action) => {
        state.editId = action.payload
    },
    deleteRecord: (state,action) => {
        state.orderLines = state.orderLines?.filter(i => i.id !== action.payload)
    },
    update: (state,action) => {
        state.orderLines = action.payload
    },
  },
  extraReducers(builder) {
    //   builder.addCase(orderLines , (state,action)=>{
    //   })
  },
});

export default OrderSlice.reducer;
export const {
  inventoryCode,
  accountingCode,
  accountingName,
  saleExpertCode,
  date,
  description1,
  description2,
  customerCode,
  customerName,
  orderLines,
  discount,
  editMode,
  editId,
  deleteRecord,
  update,
} = OrderSlice.actions;

export const OrderSelector = (store:IRootState) => store.OrderReducer 