"use client";

import { Autocomplete } from "@mui/material";
import RTLTextField from "./RTLTextField";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { customerCode, customerName } from "@/StateManagment/Slices/OrderSlice";
import useFilterByName from "@/hooks/useFilterByName";

export default function SearchCustomer() {
  const dispatch = useDispatch();
  const { loading, options, setParams, params, setPath } = useFilterByName();

  useEffect(() => {
    if (params == "") {
      setPath("api/Markaz1/SearchListView");
    } else {
      setPath(`api/Markaz1/SearchListView?Filter=${params}`);
    }
  }, [params]);

  return (
    <Autocomplete
      disablePortal
      style={{ width: "100%" }}
      noOptionsText="مشتری یافت نشد"
      onChange={(event: any, newValue: any) => {
        dispatch(customerCode(newValue?.code));
        dispatch(customerName(newValue?.label));
      }}
      onInputChange={(e: any) => {
        if (e == null) return;
        setParams(e.target.value);
      }}
      filterOptions={(opt) => opt}
      getOptionLabel={(opt) => `(${opt.code}) ` + opt.label}
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
