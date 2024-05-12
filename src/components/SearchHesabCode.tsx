"use client";
import { Autocomplete } from "@mui/material";
import RTLTextField from "./RTLTextField";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  accountingCode,
  accountingName,
} from "@/StateManagment/Slices/OrderSlice";
import useFilterByName from "@/hooks/useFilterByName";

export default function SearchHesabCode() {
  const dispatch = useDispatch();
  const { loading, options, setParams, params, setPath, codeRgx } = useFilterByName();

  useEffect(() => {
    if (params == "") setPath("api/Markaz1/SearchListView");
    if (codeRgx.test(params))
      setPath(`api/Markaz1/SearchListView?Code=${params}`);
    else setPath(`api/Markaz1/SearchListView?Filter=${params}`);
  }, [params]);
  return (
    <>
      <Autocomplete
        style={{ width: "100%" }}
        disablePortal
        noOptionsText="محصولی یافت نشد"
        onChange={(event: any, newValue: any) => {
          dispatch(accountingCode(newValue?.code));
          dispatch(accountingName(newValue?.label));
        }}
        onInputChange={(e: any) => {
          if (e == null) return;
          setParams(e.target.value);
        }}
        isOptionEqualToValue={(option, value) =>
          value === undefined || value === "" || option.id === value.id
        }
        filterOptions={(opt) => opt}
        getOptionLabel={(opt) => `(${opt.code}) ` + opt.label}
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
