import { createSlice } from "@reduxjs/toolkit";
import { IRootState } from "../Store/store";

const initialState = {
  isOpenModal: false,
};

const ProductTreeViewSlice = createSlice({
  name: "ProductTreeView",
  initialState,
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpenModal = action.payload;
    },
  },
});

export default ProductTreeViewSlice.reducer;
export const { setIsOpen } = ProductTreeViewSlice.actions;
export const ProductTreeViewModalSelector = (store: IRootState) =>
  store.ProductTreeViewReducer;
