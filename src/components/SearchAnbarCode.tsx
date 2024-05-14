"use client";
import { Autocomplete } from "@mui/material";
import RTLTextField from "./RTLTextField";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  OrderSelector,
  inventoryCode,
  inventoryName,
} from "@/StateManagment/Slices/OrderSlice";
import useFilterByName from "@/hooks/useFilterByName";

export default function SearchAnbarCode() {
  const orderStore = useSelector(OrderSelector)
  const dispatch = useDispatch();
  const { loading, options, setParams, params, setPath } = useFilterByName();

  useEffect(() => {
    if (params == "") setPath("api/Warehouse/Search");
    else setPath(`api/Warehouse/Search?Code=${params}`);
  }, [params]);

  return (
    <>
      <Autocomplete
        style={{ width: "100%" }}
        disablePortal
        value={orderStore.inventoryName}
        noOptionsText="محصولی یافت نشد"
        onChange={(event: any, newValue: any) => {
          dispatch(inventoryCode(newValue?.code));
          dispatch(inventoryName(newValue?.label));
        }}
        onInputChange={(e: any) => {
          if (e == null) return;
          setParams(e.target.value);
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
            label={loading ? "در حال جستجو...." : "جستجوی کد انبار"}
          />
        )}
      />
    </>
  );
}
