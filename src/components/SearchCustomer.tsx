"use client";

import { Autocomplete } from "@mui/material";
import RTLTextField from "./RTLTextField";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  OrderSelector,
  customerCode,
  customerName,
} from "@/StateManagment/Slices/OrderSlice";
import useFilterByName from "@/hooks/useFilterByName";

export default function SearchCustomer() {
  const orderStore = useSelector(OrderSelector);
  const dispatch = useDispatch();
  const [path, setPath] = useState<string>("api/Markaz1/SearchListView");
  const { loading, options, setParams } = useFilterByName(path);

  return (
    <Autocomplete
      disablePortal
      value={orderStore.customerName}
      style={{ width: "100%" }}
      noOptionsText="مشتری یافت نشد"
      onChange={(event: any, newValue: any) => {
        dispatch(customerCode(newValue?.code));
        dispatch(customerName(newValue?.label));
      }}
      onInputChange={(e: any) => {
        if (e == null) return;
        setParams(e.target.value);
        setPath(`api/Markaz1/SearchListView?Code=1&Filter=${e.target.value}`);
      }}
      filterOptions={(opt) => opt}
      // getOptionLabel={(opt) => `(${opt.code}) ` + opt.label}
      options={options ?? []}
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
