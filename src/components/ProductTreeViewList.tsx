"use client";
import { TreeViewList } from "@/Types/Types";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RecrusiveTreeView } from "./RecrusiveTreeView";
import { recrusiveStateUpdate } from "@/utils/recrusiveStateUpdate";
import { CollapseIcon, EndIcon, ExpandIcon } from "./CustomTreeItem";
import ApiService from "@/utils/axios";
import { Box } from "@mui/material";
import PageLoader from "./PageLoader";

export default function ProductTreeViewList() {
  const [loading, setLoading] = useState(false);
  const [TreeViewList, setTreeViewList] = useState<TreeViewList[]>();
  const [defaultExpanded, setDefaultExpanded] = useState<string[]>([]);

  const getKalaTree = async () => {
    setLoading(true);
    const data: any = await ApiService.get("/Kala/SearchTreeView");
    data?.map((i: any) => (i.children = []));
    setTreeViewList(data);
    setLoading(false);
    // toast.error("مشکلی پیش آمده است مجدد امتحان کنید");
  };

  useEffect(() => {
    getKalaTree();
  }, []);

  const getKalaTreeViewListChildren = async (id: number | string) => {
    if (!defaultExpanded.includes(id.toString())) {
      setDefaultExpanded([...defaultExpanded, id.toString()]);
    } else {
      const expandedItems = defaultExpanded.filter((i) => i != id);
      setDefaultExpanded(expandedItems);
      return;
    }
    const data: any = await ApiService.get(`/Kala/GetTreeViewChildren/${id}`);
    const duplicate = data?.some((x: any) => x.id === id);
    if (duplicate || data.length == 0) return;
    data?.map((i: any) => (i.children = []));
    const newData = await recrusiveStateUpdate(TreeViewList, data, id);
    setTreeViewList(newData);
    // toast.error("مشکلی پیش آمده است. لطفا مجدد تلاش کنید!!");
  };

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
          <RecrusiveTreeView
            Select={onSelect}
            getKala={getKalaTreeViewListChildren}
            data={TreeViewList}
          />
        </SimpleTreeView>
      )}
    </>
  );
}
