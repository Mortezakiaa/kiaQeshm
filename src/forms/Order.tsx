"use client";
import { InsertOrder } from "@/Types/InsertOrder";
import DatePickerTime from "@/components/DatePicker";
import EditableTable from "@/components/EditableTable";
import RTLTextField from "@/components/RTLTextField";
import { Button, Grid } from "@mui/material";
import { useState } from "react";

export default function Order() {
    const [Insert , setInsert] = useState<InsertOrder>()
  return (
    <>
      <Grid container paddingTop={2} display={"flex"} spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <RTLTextField value={Insert?.CustomerCode} fullWidth label="کد تفضیلی" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RTLTextField value={Insert?.AccountingCode} fullWidth label="کد حساب" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RTLTextField value={Insert?.Description2} fullWidth label="توضیحات" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RTLTextField value={Insert?.Description1} fullWidth label="شرح" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RTLTextField value={Insert?.SalesExpertCode} fullWidth label="کد کارشناس فروش" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RTLTextField value={Insert?.InventoryCode} fullWidth label="کد انبار" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RTLTextField fullWidth label="تعداد" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DatePickerTime DateValue={Insert?.Date} onChange={(e,x) => {console.log(e)}}/>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button variant="outlined">اضافه کردن</Button>
        </Grid>
        <Grid item sm={12}>
          <EditableTable />
        </Grid>
      </Grid>
    </>
  );
}
