"use client";

import { OrderLists, OrderListsFilter } from "@/Types/Types";
import DatePickerTime from "@/components/DatePickerTime";
import OrderListTable from "@/components/OrderListsTable";
import RTLTextField from "@/components/RTLTextField";
import Spinner from "@/components/Spinner";
import { p2e } from "@/utils/ReplaceNumber";
import ApiService from "@/utils/axios";
import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { DateObject } from "react-multi-date-picker";
import { toast } from "react-toastify";

export default function OrderList() {
  const [OrderList, setOrderList] = useState<OrderListsFilter>({
    name: "",
    num1: "",
    dateFrom: "",
    dateTo: "",
  });
  const [data, setData] = useState<OrderLists[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFilterdList();
  }, []);

  useEffect(() => {
    const az = new Date(p2e(OrderList.dateFrom)).toLocaleDateString("en-US");
    const to = new Date(p2e(OrderList.dateTo)).toLocaleDateString("en-US");
    if (to < az) {
      setOrderList({ ...OrderList, dateTo: "" });
    }
  }, [OrderList.dateFrom, OrderList.dateTo]);

  const getFilterdList = async () => {
    setLoading(true);
    const data = await ApiService.post("/Order/Search", OrderList);
    console.log(data);
    if (data.isSuccess) {
      setData(data.rows);
      setLoading(false);
    } else {
      setLoading(false);
      toast.error("مشکلی پیش آمده است مجدد امتحان کنید.");
    }
  };

  return (
    <Grid container paddingTop={2} display={"flex"} spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <RTLTextField
          fullWidth
          label="شماره"
          type="number"
          defaultValue={OrderList?.num1}
          onChange={(e) => {
            setOrderList({ ...OrderList, num1: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <RTLTextField
          fullWidth
          label="نام مشتری"
          defaultValue={OrderList?.name}
          onChange={(e) => {
            setOrderList({ ...OrderList, name: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <DatePickerTime
          label="از تاریخ"
          DateValue={OrderList?.dateFrom}
          onChange={(e) => {
            setOrderList({
              ...OrderList,
              dateFrom: new DateObject(e).format(),
            });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <DatePickerTime
          label="تا تاریخ"
          DateValue={OrderList?.dateTo}
          minDate={p2e(OrderList?.dateFrom)}
          onChange={(e) => {
            setOrderList({
              ...OrderList,
              dateTo: new DateObject(e).format(),
            });
          }}
        />
      </Grid>
      <Grid item xs={12}>
        {loading ? (
          <Spinner />
        ) : (
          <Button variant="outlined" onClick={() => getFilterdList()}>
            فیلتر کردن
          </Button>
        )}
      </Grid>
      <Grid item sm={12}>
        <OrderListTable data={data || []} />
      </Grid>
    </Grid>
  );
}
