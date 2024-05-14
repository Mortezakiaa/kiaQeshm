import { createSlice } from "@reduxjs/toolkit";
import { IRootState } from "../Store/store";

const initialState = {
  isOpenModal: false,
};

const CustomerTreeViewSlice = createSlice({
  name: "customerTreeView",
  initialState,
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpenModal = action.payload;
    },
  },
});

export default CustomerTreeViewSlice.reducer;
export const { setIsOpen } = CustomerTreeViewSlice.actions;
export const CustomerTreeViewModalSelector = (store: IRootState) =>
  store.CustomerTreeViewReducer;
