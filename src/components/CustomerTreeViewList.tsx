"use client";
import { TreeViewList } from "@/Types/Types";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { RecursiveTreeView } from "./RecursiveTreeView";
import {
  isTreeExist,
  recursiveStateUpdate,
} from "@/utils/recursiveStateUpdate";
import { CollapseIcon, ExpandIcon } from "./CustomTreeItem";
import { useDispatch } from "react-redux";
import { customerCode, customerName } from "@/StateManagment/Slices/OrderSlice";
import { setIsOpen } from "@/StateManagment/Slices/CustomerTreeView";
import ApiService from "@/utils/axios";
import PageLoader from "./PageLoader";
import { Box } from "@mui/material";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import useInfiniteLoadTreeItem from "@/hooks/useInfiniteLoadTreeItem";
import { TreeApiProps } from "@/Types/Types";

export default function CustomerTreeViewList() {
  const [state, setState] = useState<TreeApiProps>({
    id: "",
    CurrentPage: 1,
  });
  const [loading, setLoading] = useState(false);
  const [TreeViewList, setTreeViewList] = useState<TreeViewList[] | any>();
  const [defaultExpanded, setDefaultExpanded] = useState<string[]>([]);
  const dispatch = useDispatch();

  const getCustomerList = async () => {
    setLoading(true);
    const data: any = await ApiService.get("/Markaz1/SearchTreeView");
    if (data.error) {
      setLoading(false);
      toast.error("مشکلی پیش آمده است مجدد امتحان کنید");
    } else {
      setLoading(false);
      data?.map((i: any) => (i.children = []));
      setTreeViewList(data);
    }
  };

  useEffect(() => {
    getCustomerList();
  }, []);

  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setState({ ...state, CurrentPage: ++state.CurrentPage });
        }
      },
      {
        threshold: 1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, defaultExpanded]);

  useEffect(() => {
    if (state.id) {
      fetchTreeItems(state.id);
    }
  }, [state.CurrentPage]);

  const fetchTreeItems = async (id: number | string) => {
    setState({ ...state, id: id });
    const isExist = isTreeExist(TreeViewList, id);

    if (!defaultExpanded.includes(id.toString())) {
      setDefaultExpanded([...defaultExpanded, id.toString()]);
    } else if (isExist) {
      const expandedItems = defaultExpanded.filter((i) => i != id);
      setDefaultExpanded(expandedItems);
    }

    if (isExist) return;
    const data: any = await ApiService.get(
      `/Markaz1/GetTreeViewChildren/${id}?CurrentPage=${state.CurrentPage}&ItemsPerPage=20`
    );
    if (data.error) {
      toast.error(data?.message);
    } else {
      const duplicate = data.rows?.some((x: any) => x.id == id);
      if (duplicate || data.rows?.length == 0) return;
      data.rows?.map((i: any) => (i.children = []));
      const newData = await recursiveStateUpdate(TreeViewList, data, id);
      setTreeViewList(newData);
      setDefaultExpanded([...defaultExpanded, id.toString()]);
    }
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
