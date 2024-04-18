import DatePickerTime from "@/components/DatePicker";
import { Button, Grid, TextField } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Metadata } from "next";
import EditableTable from "@/components/EditableTable";

export const metadata: Metadata = {
  title: "ثبت سفارشات",
};

export default function page() {
  return (
    <div dir="rtl">
      <Grid item xs={12} sm={6} md={4}>
        <Tooltip title="ثبت سفارش">
          <IconButton color="info" sx={{
            '&:hover':{
                backgroundColor:'#4dabf5',
                transition:'0.5s',
                color:'white'
              }
            }}>
            <AddShoppingCartIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid container paddingTop={2} display={"flex"} spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            sx={{
              "& .MuiFormLabel-root": {
                right: "8%",
                transformOrigin: "top right",
              },
              "& .mui-14lo706": {
                float: "right",
                position: "absolute",
                // top:'-10%',
              },
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                top: 0,
              },
              "& .mui-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                textAlign: "right",
              },
            }}
            fullWidth
            label="کد تفضیلی"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField fullWidth label="توضیحات" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField fullWidth label="نام فروشنده" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField fullWidth label="شرح" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField fullWidth label="کد کارشناس فروش" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField fullWidth label="کد انبار" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField fullWidth label="محصولات" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField fullWidth label="تعداد" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DatePickerTime />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button variant="outlined">اضافه کردن</Button>
        </Grid>
        <Grid item sm={12}>
          <EditableTable/>
        </Grid>
      </Grid>
    </div>
  );
}
