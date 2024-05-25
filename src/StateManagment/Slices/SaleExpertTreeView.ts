import { createSlice } from "@reduxjs/toolkit";
import { IRootState } from "../Store/store";

const initialState = {
  isOpenModal: false,
};

const SaleExpertCodeSlice = createSlice({
  name: "SaleExpertCode",
  initialState,
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpenModal = action.payload;
    },
  },
});

export default SaleExpertCodeSlice.reducer;
export const { setIsOpen } = SaleExpertCodeSlice.actions;
export const SaleExpertCodeSelector = (store: IRootState) =>
  store.SaleExpertCodeReducer;
