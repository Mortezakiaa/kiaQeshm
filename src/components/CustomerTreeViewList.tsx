"use client";
import { TreeViewList } from "@/Types/Types";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { RecursiveTreeView } from "./RecursiveTreeView";
import { useDispatch, useSelector } from "react-redux";
import { customerCode, customerName } from "@/StateManagment/Slices/OrderSlice";
import { setIsOpen } from "@/StateManagment/Slices/CustomerTreeView";
import PageLoader from "./PageLoader";
import { Box } from "@mui/material";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import useInfiniteTreeItems from "@/hooks/useInfiniteTreeItems";
import useGetInitTreeViewList from "@/hooks/useGetInitTreeViewList";
import { InfiniteTreeSelector } from "@/StateManagment/Slices/InfiniteTreeView";

export default function CustomerTreeViewList() {
  const dispatch = useDispatch();
  const { TreeViewList } = useSelector(InfiniteTreeSelector);
  const { fetchTreeItems } = useInfiniteTreeItems(
    "Markaz1/GetTreeViewChildren"
  );
  const { ref } = useIntersectionObserver();

  const { loading } = useGetInitTreeViewList("/Markaz1/SearchTreeView");

  const onSelectCustomer = (i: TreeViewList) => {
    if (i.childCount == 0) {
      dispatch(customerCode(i.code));
      dispatch(customerName(i.name));
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
        <SimpleTreeView
          sx={{ overflowX: "hidden", flexGrow: 1, maxWidth: 300 }}
        >
          <RecursiveTreeView
            Ref={ref}
            selectTreeItems={onSelectCustomer}
            getTreeItems={fetchTreeItems}
            data={TreeViewList}
          />
        </SimpleTreeView>
      )}
    </>
  );
}
