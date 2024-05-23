import { TreeViewList } from "@/Types/Types";
import { recursiveStateUpdate } from "@/utils/recursiveStateUpdate";
import { createSlice } from "@reduxjs/toolkit";
import { IRootState } from "../Store/store";

type T = {
  ID: number | string;
  CurrentPage: number;
  TreeViewList: TreeViewList[] | any;
  defaultExpanded: [];
};

const initialState: T = {
  ID: "",
  CurrentPage: 1,
  TreeViewList: [],
  defaultExpanded: [],
};

const TreeSlice = createSlice({
  name: "tree",
  initialState,
  reducers: {
    setID: (state, action) => {
      state.ID = action.payload;
    },
    increaseCurrentPage: (state) => {
      state.CurrentPage += 1;
    },
    resetCurrentPage: (state) => {
      state.CurrentPage = 1;
    },
    setTreeViewList: (state, action) => {
      state.TreeViewList = recursiveStateUpdate(
        state.TreeViewList,
        action.payload,
        state.ID
      );
    },
    setInitTreeViewList: (state, action) => {
      state.TreeViewList = action.payload;
    },
    setDefaultExpanded: (state, action) => {
      state.defaultExpanded = action.payload;
    },
  },
});

export default TreeSlice.reducer;
export const {
  increaseCurrentPage,
  setDefaultExpanded,
  setID,
  setTreeViewList,
  resetCurrentPage,
  setInitTreeViewList,
} = TreeSlice.actions;
export const InfiniteTreeSelector = (store: IRootState) => store.TreeReducer;
