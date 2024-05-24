import { TreeViewList } from "@/Types/Types";
import { recursiveStateUpdate } from "@/utils/recursiveStateUpdate";
import { createSlice } from "@reduxjs/toolkit";
import { IRootState } from "../Store/store";

type T = {
  ID: number | string;
  CurrentPage: number;
  TreeViewList: TreeViewList[] | any;
};

const initialState: T = {
  ID: "",
  CurrentPage: 1,
  TreeViewList: [],
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
    reset: () => initialState,
  },
});

export default TreeSlice.reducer;
export const {
  increaseCurrentPage,
  setID,
  setTreeViewList,
  resetCurrentPage,
  setInitTreeViewList,
  reset
} = TreeSlice.actions;
export const InfiniteTreeSelector = (store: IRootState) => store.TreeReducer;
