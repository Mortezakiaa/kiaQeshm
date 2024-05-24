import { createSlice } from "@reduxjs/toolkit";
import { IRootState } from "../Store/store";

const initialState = {
  isOpenModal: false,
};

const HesabCodeTreeViewSlice = createSlice({
  name: "HesabCodeTreeView",
  initialState,
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpenModal = action.payload;
    },
  },
});

export default HesabCodeTreeViewSlice.reducer;
export const { setIsOpen } = HesabCodeTreeViewSlice.actions;
export const HesabCodeTreeViewModalSelector = (store: IRootState) =>
  store.HesabCodeTreeViewReducer;
