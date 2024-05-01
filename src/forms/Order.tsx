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
import { OrderLinesContext } from "@/Provider/OrderLinesProvider";

export default function Order() {
  const { state, dispatch } = useContext<any>(OrderContext);
  const ctx = useContext<any>(OrderLinesContext);
  const [num1, setNum1] = useState<number>();

  const SaveOrder = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/Order/Insert`,
      state
    );
    const data = await res.data;
    if (data.isSuccess) {
      toast.success("عملیات با موفقیت انجام شد");
      setNum1(data.data.num1);
    } else {
      toast.error("خطا در عملیات");
    }
  };

  const addOrderLines = () => {
    if (state.editMode) {
      
    } else {
      if (!ctx.state.fee) return toast.error("قیمت را وارد کنید");
      if (!ctx.state.discountPercent)
        return toast.error("درصد تخفیف را وارد کنید");
      if (!ctx.state.itemCode) return toast.error("کد کالا را وارد کنید");
      if (!ctx.state.qty1) return toast.error("تعداد را وارد کنید");
      dispatch({ type: "orderLines", payload: ctx.state });
      ctx.dispatch({ type: "reset" });
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
      <Grid>
        <RTLTextField
          value={num1}
          InputProps={{
            readOnly: true,
          }}
          label="شماره فاکتور"
        />
      </Grid>
      <Grid
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <RTLTextField
          onChange={(e) =>
            dispatch({ type: "customerCode", payload: e.target.value })
          }
          name="customerCode"
          value={state?.customerCode || ""}
          label="کد تفضیلی"
          variant="outlined"
        />
        <SearchCustomer />
        {/* <CustomerTreeViewModal /> */}
      </Grid>
      <Grid container display={"flex"} spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <RTLTextField
            onChange={(e) =>
              dispatch({ type: "accountingCode", payload: e.target.value })
            }
            name="accountingCode"
            value={state?.accountingCode || ""}
            fullWidth
            label="کد حساب"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RTLTextField
            onChange={(e) =>
              dispatch({ type: "saleExpertCode", payload: e.target.value })
            }
            name="saleExpertCode"
            value={state?.saleExpertCode || ""}
            fullWidth
            label="کد کارشناس فروش"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RTLTextField
            onChange={(e) =>
              dispatch({ type: "inventoryCode", payload: +e.target.value })
            }
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
              dispatch({ type: "date", payload: new DateObject(e).format() });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RTLTextField
            onChange={(e) =>
              dispatch({ type: "description1", payload: e.target.value })
            }
            name="description1"
            value={state?.description1 || ""}
            fullWidth
            label="شرح"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RTLTextField
            onChange={(e) =>
              dispatch({ type: "description2", payload: e.target.value })
            }
            name="description2"
            value={state?.description2 || ""}
            fullWidth
            label="توضیحات"
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Grid style={{ display: "flex", gap: "5px" }}>
        <RTLTextField
          onChange={(e) =>
            ctx.dispatch({ type: "fee", payload: +e.target.value })
          }
          value={ctx.state?.fee || ""}
          fullWidth
          type="number"
          label="قیمت"
        />
        <RTLTextField
          onChange={(e) =>
            ctx.dispatch({ type: "discountPercent", payload: +e.target.value })
          }
          value={ctx.state?.discountPercent || ""}
          fullWidth
          label="درصد تخفیف"
        />
      </Grid>
      <Grid style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <RTLTextField
          onChange={(e) =>
            ctx.dispatch({ type: "itemCode", payload: e.target.value })
          }
          value={ctx.state?.itemCode || ""}
          type="number"
          label="کد محصول"
        />
        <SearchProduct />
        {/* <ProductTreeViewModal /> */}
        <RTLTextField
          onChange={(e) =>
            ctx.dispatch({ type: "qty1", payload: +e.target.value })
          }
          value={ctx.state?.qty1 || ""}
          type="number"
          label="تعداد"
        />
      </Grid>
      <Grid>
        <Button onClick={addOrderLines} variant="outlined">
          {state.editMode ? "ویرایش کردن" : "اضافه کردن"}
        </Button>
      </Grid>
      <Grid>
        <EditableTable />
      </Grid>
    </Box>
  );
}
