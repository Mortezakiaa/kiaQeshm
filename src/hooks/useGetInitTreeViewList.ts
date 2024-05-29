"use client";

import { setInitTreeViewList } from "@/StateManagment/Slices/InfiniteTreeView";
import ApiService from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function useGetInitTreeViewList(path: string) {
  const dispatch = useDispatch();
  const { isLoading: loading } = useQuery({
    queryKey: ["intiTreeItems", path],
    queryFn: async () => {
      const data: any = await ApiService.get(path);
      if (data.error) {
        toast.error("مشکلی پیش آمده است مجدد امتحان کنید");
        return null;
      } else {
        data?.map((i: any) => (i.children = []));
        dispatch(setInitTreeViewList(data));
        return null;
      }
    },
  });
  return { loading };
}
