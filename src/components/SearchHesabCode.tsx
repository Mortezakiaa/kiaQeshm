"use client";
import { Autocomplete } from "@mui/material";
import RTLTextField from "./RTLTextField";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  OrderSelector,
  accountingCode,
  accountingName,
} from "@/StateManagment/Slices/OrderSlice";
import useFilterByName from "@/hooks/useFilterByName";

export default function SearchHesabCode() {
  const orderStore = useSelector(OrderSelector);
  const dispatch = useDispatch();
  const [path, setPath] = useState<string>("api/Markaz1/SearchListView");
  const { loading, options, setParams } = useFilterByName(path);

  return (
    <>
      <Autocomplete
        style={{ width: "100%" }}
        disablePortal
        value={orderStore.accountingName}
        noOptionsText="محصولی یافت نشد"
        onChange={(event: any, newValue: any) => {
          dispatch(accountingCode(newValue?.code));
          dispatch(accountingName(newValue?.label));
        }}
        onInputChange={(e: any) => {
          if (e == null) return;
          setParams(e.target.value);
          setPath(`api/Markaz1/SearchListView?Code=1&Filter=${e.target.value}`);
        }}
        isOptionEqualToValue={(option, value) =>
          value === undefined || value === "" || option.id === value.id
        }
        filterOptions={(opt) => opt}
        // getOptionLabel={(opt) => `(${opt.code}) ` + opt.label}
        options={options || []}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <RTLTextField
            {...params}
            label={loading ? "در حال جستجو...." : "جستجوی متنی کد حساب"}
          />
        )}
      />
    </>
  );
}
