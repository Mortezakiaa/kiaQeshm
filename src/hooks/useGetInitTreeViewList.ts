"use client";

import { TreeViewList } from "@/Types/Types";
import ApiService from "@/utils/axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";

type T = {
  setTreeViewList: Dispatch<SetStateAction<TreeViewList[]>>;
  path: string;
};

export default function useGetInitTreeViewList({ setTreeViewList, path }: T) {
  const [loading, setLoading] = useState(false);

  const getInitTreeViewList = async () => {
    setLoading(true);
    const data: any = await ApiService.get(path);
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
    getInitTreeViewList();
  }, []);

  return { loading };
}
