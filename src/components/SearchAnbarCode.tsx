"use client";
import { Autocomplete } from "@mui/material";
import RTLTextField from "./RTLTextField";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { OrderSelector, inventoryCode, inventoryName } from "@/StateManagment/Slices/OrderSlice";

export default function SearchAnbarCode() {
  const OrderStore = useSelector(OrderSelector);
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [params, setParams] = useState("");
  const [loading, setLoading] = useState(false);

  const getList = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_ADDRESS}/api/Warehouse/Search`)
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
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/Warehouse/Search?Code=${params}`
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
    <>
      <Autocomplete
        style={{ width: "100%" }}
        disablePortal
        value={OrderStore.inventoryName || ''}
        noOptionsText="محصولی یافت نشد"
        onChange={(event: any, newValue: any) => {
            dispatch(inventoryCode(newValue?.code))
            dispatch(inventoryName(newValue?.label))
        }}
        onInputChange={(e: any) => {
          if (e == null) return;
          setParams(e.target.value)
        }}
        isOptionEqualToValue={(option, value) =>
          value === undefined || value === "" || option.id === value.id
        }
        options={options}
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
