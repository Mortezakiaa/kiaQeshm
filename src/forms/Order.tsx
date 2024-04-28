"use client";
import { InsertOrderData } from "@/Types/Types";
import DatePickerTime from "@/components/DatePickerTime";
import EditableTable from "@/components/EditableTable";
import RTLTextField from "@/components/RTLTextField";
import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { DateObject } from "react-multi-date-picker";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { toast } from "react-toastify";
import AddNewCustomer from "@/components/AddNewCustomer";
import ProductTreeViewModal from "@/components/ProductTreeViewModal";
import CustomerTreeViewModal from "@/components/CustomerTreeViewModal";
import SearchProduct from "@/components/SearchProduct";
import SearchCustomer from "@/components/SearchCustomer";

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

  const [kala, setKala] = useState();

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
          onChange={(e) => setData(e)}
          name="customerCode"
          value={Insert?.customerCode || ""}
          label="کد تفضیلی"
          variant="outlined"
        />
        <SearchCustomer />
        <CustomerTreeViewModal />
      </Grid>
      <Grid container display={"flex"} spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <RTLTextField
            onChange={(e) => setData(e)}
            name="accountingCode"
            value={Insert?.accountingCode || ""}
            fullWidth
            label="کد حساب"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RTLTextField
            onChange={(e) => setData(e)}
            name="saleExpertCode"
            value={Insert?.saleExpertCode || ""}
            fullWidth
            label="کد کارشناس فروش"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RTLTextField
            onChange={(e) => setData(e)}
            name="inventoryCode"
            type="number"
            value={Insert?.inventoryCode || ""}
            fullWidth
            label="کد انبار"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DatePickerTime
            label="تاریخ"
            DateValue={Insert?.date || ""}
            onChange={(e) => {
              setInsert({ ...Insert, date: new DateObject(e).format() });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RTLTextField
            onChange={(e) => setData(e)}
            name="description1"
            value={Insert?.description1 || ""}
            fullWidth
            label="شرح"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RTLTextField
            onChange={(e) => setData(e)}
            name="description2"
            value={Insert?.description2 || ""}
            fullWidth
            label="توضیحات"
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Grid
        xs={12}
        md={12}
        style={{ display: "flex", alignItems: "center", gap: "5px" }}
      >
        <RTLTextField label="کد محصول" />
        <SearchProduct />
        <ProductTreeViewModal />
      </Grid>
      <Grid sm={12}>
        <EditableTable />
      </Grid>
    </Box>
  );
}
