"use client";

import { OrderLists, OrderListsFilter } from "@/Types/Types";
import DatePickerTime from "@/components/DatePickerTime";
import OrderListTable from "@/components/OrderListsTable";
import RTLTextField from "@/components/RTLTextField";
import { Button, Grid } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { DateObject } from "react-multi-date-picker";
import { toast } from "react-toastify";

export default function OrderList() {
  const [OrderList, setOrderList] = useState<OrderListsFilter>({
    name: "",
    num1: null,
    dateFrom: "",
    dateTo: "",
  });
  const [data, setData] = useState<OrderLists[]>();

  const getFilterdList = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/Order/Search`,
        OrderList
      );
      const data = res.data;
      setData(data.rows);
    } catch (error) {
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
            setOrderList({ ...OrderList, num1: +e.target.value });
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
          onChange={(e) => {
            setOrderList({
              ...OrderList,
              dateTo: new DateObject(e).format(),
            });
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="outlined" onClick={getFilterdList}>
          فیلتر کردن
        </Button>
      </Grid>
      <Grid item sm={12}>
        <OrderListTable data={data || []} />
      </Grid>
    </Grid>
  );
}
