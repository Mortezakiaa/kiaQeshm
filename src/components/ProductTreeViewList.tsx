"use client";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { CollapseIcon, EndIcon, ExpandIcon } from "./CustomTreeItem";
import { Box } from "@mui/material";
import PageLoader from "./PageLoader";
import useInfiniteTreeItems from "@/hooks/useInfiniteTreeItems";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import useGetInitTreeViewList from "@/hooks/useGetInitTreeViewList";
import { RecursiveTreeView } from "./RecursiveTreeView";

export default function ProductTreeViewList() {
  const {
    fetchTreeItems,
    TreeViewList,
    defaultExpanded,
    state,
    setState,
    setTreeViewList,
  } = useInfiniteTreeItems("Kala/GetTreeViewChildren");

  const { ref } = useIntersectionObserver({
    observerDependency: defaultExpanded,
    setState,
    state,
  });

  const { loading } = useGetInitTreeViewList({
    setTreeViewList,
    path: "/Kala/SearchTreeView",
  });

  const onSelect = () => {};

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
            endIcon: EndIcon,
          }}
          sx={{ overflowX: "hidden", flexGrow: 1, maxWidth: 300 }}
        >
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
