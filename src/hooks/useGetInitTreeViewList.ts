"use client";

import { setInitTreeViewList } from "@/StateManagment/Slices/InfiniteTreeView";
import ApiService from "@/utils/axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function useGetInitTreeViewList(path: string) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getInitTreeViewList = async () => {
    setLoading(true);
    const data: any = await ApiService.get(path);
    if (data.error) {
      setLoading(false);
      toast.error("مشکلی پیش آمده است مجدد امتحان کنید");
    } else {
      setLoading(false);
      data?.map((i: any) => (i.children = []));
      dispatch(setInitTreeViewList(data));
    }
  };

  useEffect(() => {
    getInitTreeViewList();
  }, []);

  return { loading };
}
