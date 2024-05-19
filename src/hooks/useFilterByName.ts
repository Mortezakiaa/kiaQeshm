"use client";
import ApiService from "@/utils/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useFilterByName(path: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState([]);
  const [params, setParams] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      getList();
    }, 700);
    return () => {
      clearTimeout(timeout);
    };
  }, [params]);

  const getList = async () => {
    setLoading(true);
    const data: any = await ApiService.get(`/${path}`);
    if (data.error) {
      setLoading(false);
      toast.error(data.message);
    } else {
      const newData = data?.rows?.map((item: any) => {
        const o: any = {};
        o.label = item.name;
        o.id = item.id;
        o.code = item.code;
        return o;
      });
      setLoading(false);
      setOptions(newData);
    }
  };
  return { loading, options, setParams };
}
