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
    inventoryName: (state,action) => {
        state.inventoryName = action.payload
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
    saleExpertName: (state,action) => {
        state.saleExpertName = action.payload
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
        state.orderLines = [...state.orderLines,action.payload]
        const num = state.orderLines?.map(i => {
            let num = 0
            num += i.discountAmount ?? 0
            return num
        })
        state.discount = num[0] ?? 0
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
});

export default OrderSlice.reducer;
export const {
  inventoryCode,
  inventoryName,
  accountingCode,
  accountingName,
  saleExpertCode,
  saleExpertName,
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
  update
} = OrderSlice.actions;

export const OrderSelector = (store:IRootState) => store.OrderReducer 