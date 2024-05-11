"use client";

import { Autocomplete } from "@mui/material";
import RTLTextField from "./RTLTextField";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { OrderLinesContext } from "@/Provider/OrderLinesProvider";
import { useDispatch, useSelector } from "react-redux";
import { OrderSelector } from "@/StateManagment/Slices/OrderSlice";
import { OrderLinesSelector, itemCode, itemName } from "@/StateManagment/Slices/OrderLinesSlice";

export default function SearchProduct() {
  const OrderStore = useSelector(OrderSelector);
  const OrderLinesStore = useSelector(OrderLinesSelector);
  const dis = useDispatch();

  const [options, setOptions] = useState([]);
  const [params, setParams] = useState("");
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext<any>(OrderLinesContext);

  const getList = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_ADDRESS}/api/Kala/SearchListView`)
      .then((res) => {
        const d = res.data.rows?.map((item: any) => {
          const o: any = {};
          o.label = item.name;
          o.id = item.id;
          o.code = item.code;
          return o;
        });
        setOptions(d);
      })
      .catch((e) => {
        toast.error("خطا در گرفتن اطلاعات");
      });
  };

  const getFilteredList = () => {
    setLoading(true);
    // let API = "";
    // const pattern = /[0-9\/]*/;
    // if (params.match(pattern)) API = `Code=${params}`;
    // else API = `Filter=${params}`;
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/Kala/SearchListView?Filter=${params}`
      )
      .then((res) => {
        const d = res.data.rows?.map((item: any) => {
          const o: any = {};
          o.label = item.name;
          o.id = item.id;
          o.code = item.code;
          return o;
        });
        setLoading(false);
        setOptions(d);
      })
      .catch((e) => {
        setLoading(false);
        toast.error("خطا در گرفتن اطلاعات");
      });
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      getFilteredList();
    }, 600);
    return () => {
      clearTimeout(timeout);
    };
  }, [params]);

  return (
    <Autocomplete
      style={{ width: "100%" }}
      disablePortal
      value={OrderLinesStore.itemName || ""}
      noOptionsText="محصولی یافت نشد"
      onChange={(event: any, newValue: any) => {
        // dispatch({ type: "itemCode", payload: +newValue?.code });
        // dispatch({ type: "itemName", payload: newValue?.label });
        dis(itemCode(+newValue?.code))
        dis(itemName(newValue?.label))
      }}
      onInputChange={(e: any) => {
        if (e == null) return;
        setParams(e.target.value);
      }}
      isOptionEqualToValue={(option, value) =>
        value === undefined || value === "" || option.id === value.id
      }
      options={options}
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
