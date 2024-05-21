"use client";
import { TreeViewList } from "@/Types/Types";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { RecursiveTreeView } from "./RecursiveTreeView";
import { CollapseIcon, ExpandIcon } from "./CustomTreeItem";
import { useDispatch } from "react-redux";
import { customerCode, customerName } from "@/StateManagment/Slices/OrderSlice";
import { setIsOpen } from "@/StateManagment/Slices/CustomerTreeView";
import PageLoader from "./PageLoader";
import { Box } from "@mui/material";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import useInfiniteTreeItems from "@/hooks/useInfiniteTreeItems";
import useGetInitTreeViewList from "@/hooks/useGetInitTreeViewList";

export default function CustomerTreeViewList() {
  const dispatch = useDispatch();
  const {
    fetchTreeItems,
    TreeViewList,
    defaultExpanded,
    state,
    setState,
    setTreeViewList,
  } = useInfiniteTreeItems("Markaz1/GetTreeViewChildren");

  const { ref } = useIntersectionObserver({
    observerDependency: defaultExpanded,
    setState,
    state,
  });

  const { loading } = useGetInitTreeViewList({
    setTreeViewList,
    path: "/Markaz1/SearchTreeView",
  });

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
          expandedItems={defaultExpanded}
          slots={{
            expandIcon: ExpandIcon,
            collapseIcon: CollapseIcon,
            endIcon: ExpandIcon,
          }}
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
