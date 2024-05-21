"use client";

import { Autocomplete, InputAdornment } from "@mui/material";
import RTLTextField from "./RTLTextField";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  OrderLinesSelector,
  itemCode,
  itemName,
} from "@/StateManagment/Slices/OrderLinesSlice";
import useFilterByName from "@/hooks/useFilterByName";
import ProductTreeViewModal from "./ProductTreeViewModal";

export default function SearchProduct() {
  const OrderLinesStore = useSelector(OrderLinesSelector);
  const dispatch = useDispatch();
  const [path, setPath] = useState<string>("Kala/SearchListView");
  const { loading, options, setParams } = useFilterByName(path);

  return (
    <Autocomplete
      style={{ width: "100%" }}
      disablePortal
      // defaultValue={{label:o?.itemName , code:o?.itemCode}}
      value={OrderLinesStore.itemName}
      noOptionsText="محصولی یافت نشد"
      onChange={(event: any, newValue: any) => {
        dispatch(itemCode(+newValue?.code));
        dispatch(itemName(newValue?.label));
      }}
      onInputChange={(e: any) => {
        if (e == null) return;
        setParams(e.target.value);
        setPath(`Kala/SearchListView?Code=1&Filter=${e.target.value}`);
      }}
      isOptionEqualToValue={(option, value) =>
        value === undefined || value === "" || option.id === value.id
      }
      filterOptions={(opt) => opt}
      // getOptionLabel={(opt) => `(${opt?.code}) ` + opt?.label}
      options={options || []}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <RTLTextField
          {...params}
          label={loading ? "در حال جستجو...." : "جستجوی متنی محصولات"}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <ProductTreeViewModal />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
