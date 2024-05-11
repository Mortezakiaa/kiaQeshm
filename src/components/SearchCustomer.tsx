"use client";

import { Autocomplete } from "@mui/material";
import RTLTextField from "./RTLTextField";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { OrderSelector, customerCode, customerName } from "@/StateManagment/Slices/OrderSlice";

export default function SearchCustomer() {
  const OrderStore = useSelector(OrderSelector);
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [params, setParams] = useState("");
  const [loading, setLoading] = useState(false);

  const getList = async () => {
    setLoading(true)
    let path = ''
    if(params == '') path = 'api/Markaz1/SearchListView'
    else path = `api/Markaz1/SearchListView?Filter=${params}`
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
        setLoading(false)
        setOptions(d);
      })
      .catch((e) => {
        setLoading(false)
        toast.error("خطا در گرفتن اطلاعات");
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      getList()
    }, 600);
    return () => {
      clearTimeout(timeout);
    };
  }, [params]);

  return (
    <Autocomplete
      disablePortal
      style={{ width: "100%" }}
      value={OrderStore.customerName || ""}
      noOptionsText="مشتری یافت نشد"
      onChange={(event: any, newValue: any) => {
        dispatch(customerCode(newValue?.code))
        dispatch(customerName(newValue?.label))
      }}
      onInputChange={(e: any) => {
        if (e == null) return;
        setParams(e.target.value);
      }}
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <RTLTextField
          {...params}
          label={loading ? "در حال جستجو..." : "جستجوی متنی مشتریان"}
        />
      )}
    />
  );
}
