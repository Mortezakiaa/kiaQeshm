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
  saleExpertCode,
  saleExpertName,
} from "@/StateManagment/Slices/OrderSlice";
import { setIsOpen } from "@/StateManagment/Slices/SaleExpertTreeView";

export default function SaleExpertCodeTreeViewList() {
  const dispatch = useDispatch();
  const { TreeViewList } = useSelector(InfiniteTreeSelector);
  const { fetchTreeItems } = useInfiniteTreeItems(
    "Markaz3/GetTreeViewChildren"
  );
  const { ref } = useIntersectionObserver();
  const { loading } = useGetInitTreeViewList("/Markaz3/SearchTreeView");

  const onSelect = (i: TreeViewList) => {
    if (i.childCount == 0) {
      dispatch(saleExpertCode(i.code));
      dispatch(saleExpertName(i.name));
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
