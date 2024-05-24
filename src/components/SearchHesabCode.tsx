"use client";
import { Autocomplete, InputAdornment } from "@mui/material";
import RTLTextField from "./RTLTextField";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  OrderSelector,
  accountingCode,
  accountingName,
} from "@/StateManagment/Slices/OrderSlice";
import useFilterByName from "@/hooks/useFilterByName";
import HesabCodeTreeViewModal from "./HesabCodeTreeViewModal";

export default function SearchHesabCode() {
  const orderStore = useSelector(OrderSelector);
  const dispatch = useDispatch();
  const [path, setPath] = useState<string>("Account/SearchTreeView");
  const { loading, options, setParams } = useFilterByName(path);

  return (
    <>
      <Autocomplete
        style={{ width: "100%" }}
        disablePortal
        value={orderStore.accountingName}
        noOptionsText="کد مورد نظر یافت نشد"
        onChange={(event: any, newValue: any) => {
          dispatch(accountingCode(newValue?.code));
          dispatch(accountingName(newValue?.label));
        }}
        onInputChange={(e: any) => {
          if (e == null) return;
          setParams(e.target.value);
          setPath(`Account/SearchTreeView?Code=1&Filter=${e.target.value}`);
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
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <HesabCodeTreeViewModal />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </>
  );
}
