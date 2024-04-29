"use client";

import { Autocomplete } from "@mui/material";
import RTLTextField from "./RTLTextField";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { OrderContext } from "@/Provider/OrderProvider";

export default function SearchProduct() {
  const [options, setOptions] = useState([]);
  const [params, setParams] = useState("");
  const [loading , setLoading] = useState(false)
  const {state , dispatch} = useContext<any>(OrderContext)

  const getList = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_ADDRESS}/api/Kala/SearchListView`)
      .then((res) => {
        const d = res.data.rows?.map((item: any) => {
          const o: any = {};
          o.label = item.name;
          o.id = item.id;
          o.code = item.code;
          return o;
        });
        setOptions(d);
      })
      .catch((e) => {
        toast.error("خطا در گرفتن اطلاعات");
      });
  };

  const getFilteredList = () => {
    setLoading(true)
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/Kala/SearchListView?Filter=${params}`
      )
      .then((res) => {
        const d = res.data.rows?.map((item: any) => {
          const o: any = {};
          o.label = item.name;
          o.id = item.id;
          o.code = item.code;
          return o;
        });
        setLoading(false)
        setOptions(d);
      })
      .catch((e) => {
        setLoading(false)
        toast.error("خطا در گرفتن اطلاعات");
      });
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      getFilteredList();
    }, 800);
    return () => {
      clearTimeout(timeout);
    };
  }, [params]);

  return (
    <>
      <Autocomplete
        disablePortal
        noOptionsText="محصولی یافت نشد"
        onChange={(event: any, newValue: any) => {
          dispatch({type:'' , payload:newValue?.code})
        }}
        onInputChange={(e: any) => {
          setParams(e.target.value);
        }}
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <RTLTextField {...params} label={loading ? "در حال جستجو...." :"جستجوی متنی محصولات"} />
        )}
      />
    </>
  );
}
