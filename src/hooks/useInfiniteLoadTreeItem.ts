"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

type T = { path: string };
export default function useInfiniteLoadTreeItem({ path }: T) {
  const { data, hasNextPage, fetchNextPage, isPending } = useInfiniteQuery({
    queryKey: ["treeItem"],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const url = `${process.env.NEXT_PUBLIC_API_ADDRESS}/${path}`;
      const res = await axios.get(url);
      //check have and error or not!!
      return res.data;
    },
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      return null;
    },
  });
  return { data, hasNextPage, fetchNextPage, isPending };
}
