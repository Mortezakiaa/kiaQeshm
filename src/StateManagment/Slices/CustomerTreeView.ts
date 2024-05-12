"use client";
import { createSlice } from "@reduxjs/toolkit";
import { IRootState } from "../Store/store";

const initialState = {
  isOpenModal:false,
};

const CustomerTreeViewSlice = createSlice({
    name:'customerTreeView',
    initialState,
    reducers:{
        setIsOpen:(state)=>{
            state.isOpenModal = true
        },
        setIsClose:(state)=>{
            state.isOpenModal = false
        }
    }
})

export default CustomerTreeViewSlice.reducer
export const {setIsOpen,setIsClose} = CustomerTreeViewSlice.actions
export const CustomerTreeViewModalSelector = (store:IRootState) => store.CustomerTreeViewReducer