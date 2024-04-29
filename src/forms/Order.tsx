"use client";
import DatePickerTime from "@/components/DatePickerTime";
import EditableTable from "@/components/EditableTable";
import RTLTextField from "@/components/RTLTextField";
import { Box, Button, Grid, IconButton, Tooltip } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { DateObject } from "react-multi-date-picker";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { toast } from "react-toastify";
import AddNewCustomer from "@/components/AddNewCustomer";
import ProductTreeViewModal from "@/components/ProductTreeViewModal";
import CustomerTreeViewModal from "@/components/CustomerTreeViewModal";
import SearchProduct from "@/components/SearchProduct";
import SearchCustomer from "@/components/SearchCustomer";
import { OrderContext } from "@/Provider/OrderProvider";
import { OrderLines } from "@/Types/Types";
import { OrderLinesContext } from "@/Provider/OrderLinesProvider";

export default function Order() {
  const {state , dispatch} = useContext<any>(OrderContext)
  const ctx = useContext<any>(OrderLinesContext)
  console.log(ctx);
  
  const SaveOrder = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/Order/Insert`,
        state
      );
      const data = await res.data;
      toast.success("");
      console.log("data", data);
    } catch (e) {
      toast.error("");
      console.log("e", e);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Grid
        container
        style={{ display: "flex", alignItems: "center", gap: "5px" }}
      >
        <Grid item>
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
        <Grid item>
          <AddNewCustomer />
        </Grid>
      </Grid>
      <Grid
        xs={12}
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <RTLTextField
          onChange={(e) => dispatch({type:'customerCode' , payload:e.target.value})}
          name="customerCode"
          value={state?.customerCode || ""}
          label="کد تفضیلی"
          variant="outlined"
        />
        <SearchCustomer />
        <CustomerTreeViewModal />
      </Grid>
      <Grid container display={"flex"} spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <RTLTextField
            onChange={(e) => dispatch({type:'accountingCode' , payload:e.target.value})}
            name="accountingCode"
            value={state?.accountingCode || ""}
            fullWidth
            label="کد حساب"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RTLTextField
            onChange={(e) => dispatch({type:'saleExpertCode' , payload:e.target.value})}
            name="saleExpertCode"
            value={state?.saleExpertCode || ""}
            fullWidth
            label="کد کارشناس فروش"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RTLTextField
            onChange={(e) => dispatch({type:'inventoryCode' , payload:e.target.value})}
            name="inventoryCode"
            type="number"
            value={state?.inventoryCode || ""}
            fullWidth
            label="کد انبار"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DatePickerTime
            label="تاریخ"
            DateValue={state?.date || ""}
            onChange={(e) => {
              dispatch({type:'date' , payload:new DateObject(e).format()})
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RTLTextField
            onChange={(e) => dispatch({type:'description1' , payload:e.target.value})}
            name="description1"
            value={state?.description1 || ""}
            fullWidth
            label="شرح"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RTLTextField
            onChange={(e) => dispatch({type:'description2' , payload:e.target.value})}
            name="description2"
            value={state?.description2 || ""}
            fullWidth
            label="توضیحات"
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Grid sm={12} style={{display:'flex' , gap:'5px'}}>
        <RTLTextField value={ctx.state?.fee} fullWidth label="قیمت"/>
        <RTLTextField value={ctx.state?.discountPercent} fullWidth label="درصد تخفیف"/>
      </Grid>
      <Grid
        xs={12}
        md={12}
        style={{ display: "flex", alignItems: "center", gap: "5px" }}
      >
        <RTLTextField value={ctx.state?.itemCode} label="کد محصول" />
        <SearchProduct />
        <ProductTreeViewModal />
        <RTLTextField value={ctx.state?.qty1} label="تعداد" />
      </Grid>
      <Grid sm={12}>
        <Button variant="outlined">اضافه</Button>
      </Grid>
      <Grid sm={12}>
        <EditableTable />
      </Grid>
    </Box>
  );
}
