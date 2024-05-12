"use server";

import { TreeViewList } from "@/Types/Types";
import { recrusiveStateUpdate } from "@/utils/recrusiveStateUpdate";
import axios from "axios";
type x = {
  id: string | number;
  TreeViewList: TreeViewList[] | any;
};
const getChildren = async ({ id, TreeViewList }: x) => {
  return axios
    .get(
      `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/Markaz1/GetTreeViewChildren/${id}`
    )
    .then((res) => {
      const data = res.data;
      const duplicate = data?.some((x: any) => x.id === id);
      if (duplicate || data.length == 0) return;
      res.data.map((i: any) => (i.children = []));
      const newData = recrusiveStateUpdate(TreeViewList, data, id);
      return newData;
    })
    .catch((e) => {
      return "Wrong";
    });
};

export { getChildren };
