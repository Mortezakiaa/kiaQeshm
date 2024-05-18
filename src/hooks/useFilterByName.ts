"use client";

import ApiService from "@/utils/axios";
import axios from "axios";
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
    // const data = await ApiService.get(`/${path}`)
    axios
      .get(`${process.env.NEXT_PUBLIC_API_ADDRESS}/${path}`)
      .then((res) => {
        const d = res.data.rows?.map((item: any) => {
          const o: any = {};
          o.label = item.name;
          o.id = item.id;
          o.code = item.code;
          return o;
        });
        setLoading(false);
        setOptions(d);
      })
      .catch((e) => {
        setLoading(false);
        toast.error("خطا در گرفتن اطلاعات");
      });
  };
  return { loading, options, setParams };
}
