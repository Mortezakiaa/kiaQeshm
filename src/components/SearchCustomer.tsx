"use client";

import { Autocomplete } from "@mui/material";
import RTLTextField from "./RTLTextField";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { OrderContext } from "@/Provider/OrderProvider";

export default function SearchCustomer() {
  const [options, setOptions] = useState([]);
  const [params, setParams] = useState("");
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext<any>(OrderContext);

  const getList = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_ADDRESS}/api/Markaz1/SearchListView`)
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
    setLoading(true);
    // let API = ''
    // const pattern = /[0-9\/]*/
    // if(params.match(pattern)) API = `Code=${params}`
    // else API = `Filter=${params}`
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/Markaz1/SearchListView?Filter=${params}`
      )
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
      .catch((e: any) => {
        setLoading(false);
        toast.error("خطا در گرفتن اطلاعات");
      });
  };

  useEffect(()=>{
    getList()
  },[])

  useEffect(() => {
    const timeout = setTimeout(() => {
      getFilteredList();
    }, 600);
    return () => {
      clearTimeout(timeout);
    };
  }, [params]);

  return (
    <Autocomplete
      disablePortal
      style={{ width: "100%" }}
      value={state.customerName || ""}
      noOptionsText="مشتری یافت نشد"
      onChange={(event: any, newValue: any) => {
        dispatch({ type: "customerCode", payload: newValue?.code });
        dispatch({ type: "customerName", payload: newValue?.label });
      }}
      onInputChange={(e: any) => {
        if (e == null) return;
        setParams(e.target.value);
      }}
      // isOptionEqualToValue={(option, value) =>
      //   value === undefined || value === "" || option.id === value.id
      // }
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
