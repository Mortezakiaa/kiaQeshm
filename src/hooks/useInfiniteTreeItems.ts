"use client";

import { TreeApiProps, TreeViewList } from "@/Types/Types";
import ApiService from "@/utils/axios";
import {
  isTreeExist,
  recursiveStateUpdate,
} from "@/utils/recursiveStateUpdate";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useInfiniteTreeItems(mainPath: string) {
  const [state, setState] = useState<TreeApiProps>({
    id: "",
    CurrentPage: 1,
  });
  const [defaultExpanded, setDefaultExpanded] = useState<string[]>([]);
  const [TreeViewList, setTreeViewList] = useState<TreeViewList[] | any>();

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
      `/${mainPath}/${id}?CurrentPage=${state.CurrentPage}&ItemsPerPage=20`
    );
    if (data.error) {
      toast.error(data?.message);
    } else {
      data.rows?.map((i: TreeViewList) => (i.children = []));
      const newData = await recursiveStateUpdate(TreeViewList, data, id);
      setTreeViewList(newData);
      setDefaultExpanded([...defaultExpanded, id.toString()]);
    }
  };

  return {
    fetchTreeItems,
    defaultExpanded,
    TreeViewList,
    state,
    setState,
    setTreeViewList,
  };
}
