"use client";
import { Autocomplete } from "@mui/material";
import RTLTextField from "./RTLTextField";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  OrderSelector,
  saleExpertCode,
  saleExpertName,
} from "@/StateManagment/Slices/OrderSlice";
import useSearch from "@/hooks/useSearch";

export default function SearchSaleExpertCode() {
  const OrderStore = useSelector(OrderSelector);
  const dispatch = useDispatch();
  const { loading, options, setParams, params, setPath } = useSearch();

  useEffect(() => {
    if (params == "") setPath("api/Markaz3/SearchListView");
    else setPath(`api/Markaz3/SearchListView?Filter=${params}`);
  }, [params]);

  return (
    <>
      <Autocomplete
        style={{ width: "100%" }}
        disablePortal
        value={OrderStore.saleExpertName || ""}
        noOptionsText="محصولی یافت نشد"
        onChange={(event: any, newValue: any) => {
          dispatch(saleExpertCode(newValue?.code));
          dispatch(saleExpertName(newValue?.label));
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
            label={loading ? "در حال جستجو...." : "جستجوی متنی کد کارشناس فروش"}
          />
        )}
      />
    </>
  );
}
