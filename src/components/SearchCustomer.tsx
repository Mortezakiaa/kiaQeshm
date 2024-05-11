"use client";

import { Autocomplete } from "@mui/material";
import RTLTextField from "./RTLTextField";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  OrderSelector,
  customerCode,
  customerName,
} from "@/StateManagment/Slices/OrderSlice";
import useSearch from "@/hooks/useSearch";

export default function SearchCustomer() {
  const OrderStore = useSelector(OrderSelector);
  const dispatch = useDispatch();
  const { loading, options, setParams, params, setPath } = useSearch();

  useEffect(() => {
    if (params == "") setPath("api/Markaz1/SearchListView");
    else setPath(`api/Markaz1/SearchListView?Filter=${params}`);
  }, [params]);

  return (
    <Autocomplete
      disablePortal
      style={{ width: "100%" }}
      value={OrderStore.customerName || ""}
      noOptionsText="مشتری یافت نشد"
      onChange={(event: any, newValue: any) => {
        dispatch(customerCode(newValue?.code));
        dispatch(customerName(newValue?.label));
      }}
      onInputChange={(e: any) => {
        if (e == null) return;
        setParams(e.target.value);
      }}
      options={options || []}
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
