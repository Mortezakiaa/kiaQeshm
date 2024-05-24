"use client";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { Box } from "@mui/material";
import PageLoader from "./PageLoader";
import useInfiniteTreeItems from "@/hooks/useInfiniteTreeItems";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import useGetInitTreeViewList from "@/hooks/useGetInitTreeViewList";
import { RecursiveTreeView } from "./RecursiveTreeView";
import { InfiniteTreeSelector } from "@/StateManagment/Slices/InfiniteTreeView";
import { useDispatch, useSelector } from "react-redux";
import { TreeViewList } from "@/Types/Types";
import {
  accountingCode,
  accountingName,
} from "@/StateManagment/Slices/OrderSlice";
import { setIsOpen } from "@/StateManagment/Slices/HesabCodeTreeView";

export default function HesabCodeTreeViewList() {
  const dispatch = useDispatch();
  const { TreeViewList } = useSelector(InfiniteTreeSelector);
  const { fetchTreeItems } = useInfiniteTreeItems(
    "Account/GetTreeViewChildren"
  );
  const { ref } = useIntersectionObserver();
  const { loading } = useGetInitTreeViewList("Account/SearchTreeView");

  const onSelect = (i: TreeViewList) => {
    if (i.childCount == 0) {
      dispatch(accountingCode(i.code));
      dispatch(accountingName(i.name));
      dispatch(setIsOpen(false));
    }
  };

  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <PageLoader />
        </Box>
      ) : (
        <SimpleTreeView sx={{ overflowX: "hidden", flexGrow: 1 }}>
          <RecursiveTreeView
            Ref={ref}
            data={TreeViewList}
            getTreeItems={fetchTreeItems}
            selectTreeItems={onSelect}
          />
        </SimpleTreeView>
      )}
    </>
  );
}
