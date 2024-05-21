"use client";

import { TreeViewList } from "@/Types/Types";
import ApiService from "@/utils/axios";
import { useInfiniteQuery } from "@tanstack/react-query";

type T = { fetchTreeItems:(pageParam:number)=> Promise<void> };
export default function useInfiniteLoadTreeItem({ fetchTreeItems }: T) {
  const { data, hasNextPage, fetchNextPage, isPending, isError, error } =
    useInfiniteQuery({
      queryKey: ["treeItem"],
      initialPageParam: 1,
      queryFn: async ({pageParam}) => {
        return fetchTreeItems(pageParam)
      },
      getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
       return lastPageParam + 1
      },
      select: (res) => {
        return res.pages[0];
      },
    });
  return { data, hasNextPage, fetchNextPage, isPending, isError, error };
}
