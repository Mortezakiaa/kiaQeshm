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

export default function ProductTreeViewList() {
  const dispatch = useDispatch();
  const { TreeViewList } = useSelector(InfiniteTreeSelector);
  const { fetchTreeItems } = useInfiniteTreeItems("Kala/GetTreeViewChildren");
  const { ref } = useIntersectionObserver();
  const { loading } = useGetInitTreeViewList("/Kala/SearchTreeView");

  const onSelect = () => {};

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
