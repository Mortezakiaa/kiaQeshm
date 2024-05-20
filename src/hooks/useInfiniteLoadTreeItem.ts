"use client";

import { TreeViewList } from "@/Types/Types";
import ApiService from "@/utils/axios";
import { useInfiniteQuery } from "@tanstack/react-query";

type T = {  id:number | string};
export default function useInfiniteLoadTreeItem({ id}: T) {
  const { data, hasNextPage, fetchNextPage, isPending, isError, error } =
    useInfiniteQuery({
      queryKey: ["treeItem", id.toString()],
      initialPageParam: 1,
      queryFn: async ({pageParam}) => {
        let url = `/Markaz1/GetTreeViewChildren/${id}?CurrentPage=${pageParam}&ItemsPerPage=10`
        const res:TreeViewList[] | any = await ApiService.get(url);
        console.log(url);
        console.log(res);
        
        return res;
      },
      getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
       return null
      },
      select: (res) => {
        return res.pages[0];
      },
    });
  return { data, hasNextPage, fetchNextPage, isPending, isError, error };
}
