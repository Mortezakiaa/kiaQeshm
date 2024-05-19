"use client";
import DatePickerTime from "@/components/DatePickerTime";
import EditableTable from "@/components/EditableTable";
import RTLTextField from "@/components/RTLTextField";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DateObject } from "react-multi-date-picker";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { toast } from "react-toastify";
import AddNewCustomer from "@/components/AddNewCustomer";
import ProductTreeViewModal from "@/components/ProductTreeViewModal";
import CustomerTreeViewModal from "@/components/CustomerTreeViewModal";
import SearchProduct from "@/components/SearchProduct";
import SearchCustomer from "@/components/SearchCustomer";
import PageLoader from "@/components/PageLoader";
import SearchHesabCode from "@/components/SearchHesabCode";
import SearchSaleExpertCode from "@/components/SearchSaleExpertCode";
import SearchAnbarCode from "@/components/SearchAnbarCode";
import { useDispatch, useSelector } from "react-redux";
import {
  OrderSelector,
  accountingCode,
  customerCode,
  date,
  description1,
  description2,
  editMode,
  inventoryCode,
  orderLines,
  saleExpertCode,
  update,
} from "@/StateManagment/Slices/OrderSlice";
import {
  OrderLinesSelector,
  discountPercent,
  fee,
  itemCode,
  qty1,
  reset,
  amount,
  discountAmount,
  remindNet,
  ID,
} from "@/StateManagment/Slices/OrderLinesSlice";
import ApiService from "@/utils/axios";

export default function Order() {
  const OrderStore = useSelector(OrderSelector);
  const OrderLinesStore = useSelector(OrderLinesSelector);
  const dispatch = useDispatch();
  const [num1, setNum1] = useState<number>();
  const [loading, setLoading] = useState(false);

  const SaveOrder = async () => {
    setLoading(true);
    const data:any = await ApiService.post("/Order/Insert", OrderStore);
    if (data.isSuccess) {
      setNum1(data.num1);
      setLoading(false);
      toast.success("عملیات با موفقیت انجام شد");
    } else {
      setLoading(false);
      toast.error("خطا در عملیات");
    }
  };

  useEffect(() => {
    const amt = OrderLinesStore.qty1 * OrderLinesStore.fee;
    const disAmt = OrderLinesStore.discountPercent * amt;
    const remind = Math.abs(amt - disAmt);
    dispatch(amount(+amt));
    dispatch(discountAmount(+disAmt));
    dispatch(remindNet(remind));
    dispatch(ID());
  }, [
    OrderLinesStore.qty1,
    OrderLinesStore.amount,
    OrderLinesStore.discountPercent,
    OrderLinesStore.fee,
  ]);

  const addOrderLines = () => {
    if (OrderStore.editMode) {
      const n = OrderLinesStore;
      const ne = OrderStore.orderLines.map((i) => {
        if (i.id === OrderStore.editId) {
          return { ...n, id: OrderStore.editId };
        } else return i;
      });
      dispatch(editMode(false));
      dispatch(update(ne));
      dispatch(reset());
    } else {
      if (!OrderLinesStore.fee) return toast.error("قیمت را وارد کنید");
      if (!OrderLinesStore.discountPercent)
        return toast.error("درصد تخفیف را وارد کنید");
      if (!OrderLinesStore.itemCode) return toast.error("کد کالا را وارد کنید");
      if (!OrderLinesStore.qty1) return toast.error("تعداد را وارد کنید");
      dispatch(orderLines(OrderLinesStore));
      dispatch(reset());
    }
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "50%",
            transform: "translate(50%,-50%)",
          }}
        >
          <PageLoader />
        </div>
      ) : (
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

          <Grid container spacing={2}>
            <Grid item md={5} xs={12}>
              <RTLTextField
                fullWidth
                onChange={(e) => {
                  dispatch(customerCode(e.target.value));
                }}
                name="customerCode"
                value={OrderStore?.customerCode || ""}
                label="کد تفضیلی"
                variant="outlined"
              />
            </Grid>
            <Grid item md={7} xs={12}>
              <SearchCustomer />
            </Grid>
            {/* <CustomerTreeViewModal /> */}
          </Grid>

          <Grid container spacing={2}>
            <Grid item md={5} xs={12}>
              <RTLTextField
                onChange={(e) => {
                  dispatch(accountingCode(e.target.value));
                }}
                name="accountingCode"
                value={OrderStore?.accountingCode || ""}
                fullWidth
                label="کد حساب"
                variant="outlined"
              />
            </Grid>
            <Grid item md={7} xs={12}>
              <SearchHesabCode />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item md={5} xs={12}>
              <RTLTextField
                onChange={(e) => {
                  dispatch(saleExpertCode(e.target.value));
                }}
                name="saleExpertCode"
                value={OrderStore?.saleExpertCode || ""}
                fullWidth
                label="کد کارشناس فروش"
                variant="outlined"
              />
            </Grid>
            <Grid item md={7} xs={12}>
              <SearchSaleExpertCode />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item md={5} xs={12}>
              <RTLTextField
                onChange={(e) => {
                  dispatch(inventoryCode(+e.target.value));
                }}
                name="inventoryCode"
                type="number"
                value={OrderStore?.inventoryCode || ""}
                fullWidth
                label="کد انبار"
                variant="outlined"
              />
            </Grid>
            <Grid item md={7} xs={12}>
              <SearchAnbarCode />
            </Grid>
          </Grid>

          <Grid container display={"flex"} spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <DatePickerTime
                label="تاریخ"
                DateValue={OrderStore?.date || ""}
                onChange={(e) => {
                  dispatch(date(new DateObject(e).format()));
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <RTLTextField
                onChange={(e) => {
                  dispatch(description1(e.target.value));
                }}
                name="description1"
                value={OrderStore?.description1 || ""}
                fullWidth
                label="شرح"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <RTLTextField
                onChange={(e) => {
                  dispatch(description2(e.target.value));
                }}
                name="description2"
                value={OrderStore?.description2 || ""}
                fullWidth
                label="توضیحات"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid sx={{ my: 1 }}>
            <Typography color="" variant="h6">
              اطلاعات محصول :{" "}
            </Typography>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <RTLTextField
                fullWidth
                onChange={(e) => {
                  dispatch(itemCode(e.target.value));
                }}
                value={OrderLinesStore?.itemCode}
                type="number"
                label="کد محصول"
              />
            </Grid>
            {/* <Grid item xs={12} md={4}>
              <ProductTreeViewModal />
            </Grid> */}
            <Grid item xs={12} md={7}>
              <SearchProduct />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <RTLTextField
                onChange={(e) => {
                  dispatch(fee(+e.target.value));
                }}
                value={OrderLinesStore?.fee || ""}
                fullWidth
                type="number"
                label="قیمت"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <RTLTextField
                onChange={(e) => {
                  dispatch(discountPercent(+e.target.value));
                }}
                value={OrderLinesStore?.discountPercent || ""}
                fullWidth
                label="درصد تخفیف"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <RTLTextField
                fullWidth
                onChange={(e) => {
                  dispatch(qty1(+e.target.value));
                }}
                value={OrderLinesStore?.qty1 || ""}
                type="number"
                label="تعداد"
              />
            </Grid>
          </Grid>

          <Grid>
            <Button onClick={addOrderLines} variant="outlined">
              {OrderStore.editMode ? "ویرایش کردن" : "اضافه کردن"}
            </Button>
          </Grid>

          <Grid>
            <EditableTable />
          </Grid>
        </Box>
      )}
    </>
  );
}
