"use client";
import { InsertOrderData } from "@/Types/Types";
import DatePickerTime from "@/components/DatePicker";
import EditableTable from "@/components/EditableTable";
import RTLTextField from "@/components/RTLTextField";
import { Grid, IconButton, Tooltip } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { DateObject } from "react-multi-date-picker";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default function Order() {
  const [Insert, setInsert] = useState<InsertOrderData>({
    inventoryCode: null,
    accountingCode: "",
    saleExpertCode: "",
    date: "",
    description1: "",
    description2: "",
    customerCode: "",
    orderLines: [],
    discount: null,
  });
  const setData = (e: any) => {
    if (e.target.type === "number") {
      setInsert({ ...Insert, [e.target.name]: +e.target.value });
    } else {
      setInsert({ ...Insert, [e.target.name]: e.target.value });
    }
  };

  const SaveOrder = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/Order/Insert`,
        Insert
      );
      const data = await res.data;
      console.log('data' , data);
    } catch (e) {
      console.log('e' , e);
    }

  };

  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Tooltip title="ثبت سفارش">
          <IconButton
            onClick={SaveOrder}
            color="info"
            sx={{
              "&:hover": {
                backgroundColor: "#4dabf5",
                transition: "0.5s",
                color: "white",
              },
            }}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid container paddingTop={2} display={"flex"} spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <RTLTextField
            onChange={setData}
            name="customerCode"
            value={Insert?.customerCode}
            fullWidth
            label="کد تفضیلی"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RTLTextField
            onChange={setData}
            name="accountingCode"
            value={Insert?.accountingCode}
            fullWidth
            label="کد حساب"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RTLTextField
            onChange={setData}
            name="saleExpertCode"
            value={Insert?.saleExpertCode}
            fullWidth
            label="کد کارشناس فروش"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RTLTextField
            onChange={setData}
            name="inventoryCode"
            type="number"
            value={Insert?.inventoryCode}
            fullWidth
            label="کد انبار"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DatePickerTime
            DateValue={Insert?.date}
            onChange={(e) => {
              setInsert({ ...Insert, date: new DateObject(e).format() });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <RTLTextField
            onChange={setData}
            name="description1"
            value={Insert?.description1}
            fullWidth
            label="شرح"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <RTLTextField
            onChange={setData}
            name="description2"
            value={Insert?.description2}
            fullWidth
            label="توضیحات"
            variant="outlined"
          />
        </Grid>
        <Grid item sm={12}>
          <EditableTable />
        </Grid>
      </Grid>
    </>
  );
}
