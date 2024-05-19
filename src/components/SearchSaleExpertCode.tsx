"use client";
import { Autocomplete } from "@mui/material";
import RTLTextField from "./RTLTextField";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  OrderSelector,
  saleExpertCode,
  saleExpertName,
} from "@/StateManagment/Slices/OrderSlice";
import useFilterByName from "@/hooks/useFilterByName";

export default function SearchSaleExpertCode() {
  const orderStore = useSelector(OrderSelector);
  const dispatch = useDispatch();
  const [path, setPath] = useState<string>("Markaz3/SearchListView");
  const { loading, options, setParams } = useFilterByName(path);

  return (
    <>
      <Autocomplete
        style={{ width: "100%" }}
        disablePortal
        value={orderStore.saleExpertName}
        noOptionsText="کد مورد نظر یافت نشد"
        onChange={(event: any, newValue: any) => {
          dispatch(saleExpertCode(newValue?.code));
          dispatch(saleExpertName(newValue?.label));
        }}
        onInputChange={(e: any) => {
          if (e == null) return;
          setParams(e.target.value);
          setPath(`Markaz3/SearchListView?Code=1&Filter=${e.target.value}`);
        }}
        isOptionEqualToValue={(option, value) =>
          value === undefined || value === "" || option.id === value.id
        }
        options={options || []}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <RTLTextField
            {...params}
            label={loading ? "در حال جستجو...." : "جستجوی متنی کد کارشناس فروش"}
          />
        )}
      />
    </>
  );
}
