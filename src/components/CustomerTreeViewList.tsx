"use client";
import { TreeViewList } from "@/Types/Types";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RecrusiveTreeView } from "./RecrusiveTreeView";
import { recrusiveStateUpdate } from "@/utils/recrusiveStateUpdate";
import { CollapseIcon, ExpandIcon } from "./CustomTreeItem";
import { useDispatch } from "react-redux";
import { customerCode, customerName } from "@/StateManagment/Slices/OrderSlice";
import { setIsOpen } from "@/StateManagment/Slices/CustomerTreeView";
import ApiService from "@/utils/axios";
import PageLoader from "./PageLoader";
import { Box } from "@mui/material";

export default function CustomerTreeViewList() {
  const [loading, setLoading] = useState(false);
  const [TreeViewList, setTreeViewList] = useState<TreeViewList[] | any>();
  const [defaultExpanded, setDefaultExpanded] = useState<string[]>([]);
  const dispatch = useDispatch();

  const getCustomerList = async () => {
    setLoading(true);
    const data: any = await ApiService.get("/Markaz1/SearchTreeView");
    data?.map((i: any) => (i.children = []));
    setTreeViewList(data);
    setLoading(false);
    // toast.error("مشکلی پیش آمده است مجدد امتحان کنید");
  };

  useEffect(() => {
    getCustomerList();
  }, []);

  const getCustomerTreeViewChildrenList = async (id: number | string) => {
    if (!defaultExpanded.includes(id.toString())) {
      setDefaultExpanded([...defaultExpanded, id.toString()]);
    } else {
      const expandedItems = defaultExpanded.filter((i) => i != id);
      setDefaultExpanded(expandedItems);
      return;
    }
    console.log(TreeViewList);

    const data: any = await ApiService.get(
      `/Markaz1/GetTreeViewChildren/${id}`
    );
    const duplicate = data?.some((x: any) => x.id === id);
    if (duplicate || data?.length == 0) return;
    data?.map((i: any) => (i.children = []));
    data.map((i: any) => (i.isExist = true));
    const newData = await recrusiveStateUpdate(TreeViewList, data, id);
    setTreeViewList(newData);
    setDefaultExpanded([...defaultExpanded, id.toString()]);
  };

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
          <RecrusiveTreeView
            Select={onSelectCustomer}
            getKala={getCustomerTreeViewChildrenList}
            data={TreeViewList}
          />
        </SimpleTreeView>
      )}
    </>
  );
}
