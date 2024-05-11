"use client";

import { Autocomplete } from "@mui/material";
import RTLTextField from "./RTLTextField";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderLinesSelector, itemCode, itemName } from "@/StateManagment/Slices/OrderLinesSlice";

export default function SearchProduct() {
  const OrderLinesStore = useSelector(OrderLinesSelector);
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [params, setParams] = useState("");
  const [loading, setLoading] = useState(false);

  const getList = () => {
    setLoading(true)
    let path = ''
    if(params == '') path = 'api/Kala/SearchListView'
    else path = `api/Kala/SearchListView?Filter=${params}`
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
      getList();
    }, 600);
    return () => {
      clearTimeout(timeout);
    };
  }, [params]);

  return (
    <Autocomplete
      style={{ width: "100%" }}
      disablePortal
      value={OrderLinesStore.itemName || ""}
      noOptionsText="محصولی یافت نشد"
      onChange={(event: any, newValue: any) => {
        dispatch(itemCode(+newValue?.code))
        dispatch(itemName(newValue?.label))
      }}
      onInputChange={(e: any) => {
        if (e == null) return;
        setParams(e.target.value);
      }}
      isOptionEqualToValue={(option, value) =>
        value === undefined || value === "" || option.id === value.id
      }
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <RTLTextField
          {...params}
          label={loading ? "در حال جستجو...." : "جستجوی متنی محصولات"}
        />
      )}
    />
  );
}
