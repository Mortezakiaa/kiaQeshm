"use client";

import {
  InfiniteTreeSelector,
  resetCurrentPage,
  setID,
  setTreeViewList,
} from "@/StateManagment/Slices/InfiniteTreeView";
import { TreeViewList } from "@/Types/Types";
import ApiService from "@/utils/axios";
import { isCompletedTreeItems } from "@/utils/recursiveStateUpdate";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function useInfiniteTreeItems(mainPath: string) {
  const dispatch = useDispatch();
  const { CurrentPage, TreeViewList, ID } = useSelector(InfiniteTreeSelector);

  useEffect(() => {
    if (ID) {
      dispatch(resetCurrentPage());
    }
  }, [ID]);

  useEffect(() => {
    if (ID) {
      fetchTreeItems(ID);
    }
  }, [CurrentPage]);

  const fetchTreeItems = async (id: number | string) => {
    if (ID != id) {
      dispatch(setID(id));
    }
    const isExist = isCompletedTreeItems(TreeViewList, id);
    if (isExist) return;
    const data: any = await ApiService.get(
      `/${mainPath}/${id}?CurrentPage=${CurrentPage}&ItemsPerPage=20`
    );
    if (data.error) {
      toast.error(data?.message);
    } else {
      data.rows?.map((i: TreeViewList) => (i.children = []));
      dispatch(setTreeViewList(data));
    }
  };

  return {
    fetchTreeItems,
  };
}
