"use client";

import { Autocomplete } from "@mui/material";
import RTLTextField from "./RTLTextField";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { itemCode, itemName } from "@/StateManagment/Slices/OrderLinesSlice";
import useFilterByName from "@/hooks/useFilterByName";

export default function SearchProduct() {
  const dispatch = useDispatch();
  const { loading, options, setParams, params, setPath } = useFilterByName();

  useEffect(() => {
    if (params == "") setPath("api/Kala/SearchListView");
    else setPath(`api/Kala/SearchListView?Code=1&Filter=${params}`);
  }, [params]);

  return (
    <Autocomplete
      style={{ width: "100%" }}
      disablePortal
      noOptionsText="محصولی یافت نشد"
      onChange={(event: any, newValue: any) => {
        dispatch(itemCode(+newValue?.code));
        dispatch(itemName(newValue?.label));
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
          label={loading ? "در حال جستجو...." : "جستجوی متنی محصولات"}
        />
      )}
    />
  );
}
