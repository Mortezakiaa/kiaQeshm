"use client";
import { InsertOrderData } from "@/Types/Types";
import DatePickerTime from "@/components/DatePicker";
import EditableTable from "@/components/EditableTable";
import RTLTextField from "@/components/RTLTextField";
import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { DateObject } from "react-multi-date-picker";

export default function Order() {
  const [Insert, setInsert] = useState<InsertOrderData>({
    InventoryCode: null,
    AccountingCode: null,
    num2: null,
    SalesExpertCode: null,
    Date: "",
    Description1: "",
    Description2: "",
    CustomerCode: "",
    orderLines: [],
    discount: null,
  });
  const setData = (e: any) => {
    if(e.target.type === 'number'){
      setInsert({...Insert , [e.target.name] : +e.target.value})
    }else{
      setInsert({...Insert , [e.target.name]:e.target.value})
    }
  };
  return (
    <>
      <Grid container paddingTop={2} display={"flex"} spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <RTLTextField
            onChange={setData}
            name="CustomerCode"
            type="number"
            value={Insert?.CustomerCode}
            fullWidth
            label="کد تفضیلی"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RTLTextField
            onChange={setData}
            name="AccountingCode"
            type="number"
            value={Insert?.AccountingCode}
            fullWidth
            label="کد حساب"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RTLTextField
            onChange={setData}
            name="SalesExpertCode"
            type="number"
            value={Insert?.SalesExpertCode}
            fullWidth
            label="کد کارشناس فروش"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RTLTextField
            onChange={setData}
            name="InventoryCode"
            type="number"
            value={Insert?.InventoryCode}
            fullWidth
            label="کد انبار"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DatePickerTime
            DateValue={Insert?.Date}
            onChange={e => {setInsert({...Insert , Date:new DateObject(e).format()})}}
          />
        </Grid>
        <Grid item xs={12}>
          <RTLTextField
            onChange={setData}
            name="Description1"
            value={Insert?.Description1}
            fullWidth
            label="شرح"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <RTLTextField
            onChange={setData}
            name="Description2"
            value={Insert?.Description2}
            fullWidth
            label="توضیحات"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined">اضافه کردن</Button>
        </Grid>
        <Grid item sm={12}>
          <EditableTable />
        </Grid>
      </Grid>
    </>
  );
}
