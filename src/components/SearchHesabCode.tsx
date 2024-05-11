"use client";
import { Autocomplete } from "@mui/material";
import RTLTextField from "./RTLTextField";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { OrderContext } from "@/Provider/OrderProvider";
import { useDispatch, useSelector } from "react-redux";
import { OrderSelector, accountingCode, accountingName } from "@/StateManagment/Slices/OrderSlice";
import { OrderLinesSelector } from "@/StateManagment/Slices/OrderLinesSlice";

export default function SearchHesabCode() {
  const OrderStore = useSelector(OrderSelector);
  const OrderLinesStore = useSelector(OrderLinesSelector);
  const dis = useDispatch();

  const [options, setOptions] = useState([]);
  const [params, setParams] = useState("");
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext<any>(OrderContext);

  const getList = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_ADDRESS}/api/Markaz1/SearchListView`)
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
        `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/Markaz1/SearchListView?Filter=${params}`
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
        value={OrderStore.accountingName || ''}
        noOptionsText="محصولی یافت نشد"
        onChange={(event: any, newValue: any) => {
            // dispatch({type:'accountingCode' , payload:newValue.code})
            // dispatch({type:'accountingName' , payload:newValue.label})
            dis(accountingCode(newValue.code))
            dis(accountingName(newValue.label))
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
            label={loading ? "در حال جستجو...." : "جستجوی متنی کد حساب"}
          />
        )}
      />
    </>
  );
}
