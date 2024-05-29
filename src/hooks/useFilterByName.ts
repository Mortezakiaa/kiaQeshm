"use client";
import ApiService from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useFilterByName(path: string) {
  const {
    isLoading: loading,
    data: options,
    refetch,
  } = useQuery({
    queryKey: ["trilingDebunceInput", path],
    queryFn: async () => {
      const data: any = await ApiService.get(`/${path}`);
      if (data.error) {
        toast.error(data.message);
      } else {
        const newData = data?.rows?.map((item: any) => {
          const o: any = {};
          o.label = item.name;
          o.id = item.id;
          o.code = item.code;
          return o;
        });
        return newData;
      }
    },
    enabled: false,
  });
  const [params, setParams] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      refetch();
    }, 700);
    return () => {
      clearTimeout(timeout);
    };
  }, [params]);
  return { loading, options, setParams };
}
