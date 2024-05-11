"use client";

import { Autocomplete } from "@mui/material";
import RTLTextField from "./RTLTextField";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  OrderLinesSelector,
  itemCode,
  itemName,
} from "@/StateManagment/Slices/OrderLinesSlice";
import useSearch from "@/hooks/useSearch";

export default function SearchProduct() {
  const OrderLinesStore = useSelector(OrderLinesSelector);
  const dispatch = useDispatch();
  const { loading, options, setParams, params, setPath } = useSearch();

  useEffect(() => {
    if (params == "") setPath("api/Kala/SearchListView");
    else setPath(`api/Kala/SearchListView?Filter=${params}`);
  }, [params]);

  return (
    <Autocomplete
      style={{ width: "100%" }}
      disablePortal
      value={OrderLinesStore.itemName || ""}
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
