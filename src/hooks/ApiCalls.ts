"use client";
import ApiService from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

type get = { path: string; params?: string; enabled?: boolean };

export function useGet({ path, params, enabled }: get) {
  const { data, isSuccess, error, isLoading, isError } = useQuery({
    queryKey: [path],
    queryFn: async () => {
      const data = await ApiService.get(path, params);
      return data;
    },
    enabled: enabled,
  });

  return { data, isSuccess, error, isLoading, isError };
}

type T = { path: string; Data: any; enabled?: boolean };

export function usePost({ path, Data, enabled }: T) {
  const { data, isSuccess, error, isLoading, isError } = useQuery({
    queryKey: [Data],
    queryFn: async () => {
      const data = await ApiService.post(path, Data);
      return data;
    },
    enabled: enabled,
  });

  return { data, isSuccess, error, isLoading, isError };
}
