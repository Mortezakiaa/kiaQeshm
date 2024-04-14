import AddNewCustomerModal from "@/components/AddNewCustomerModal";
import DatePickerTime from "@/components/DatePicker";
import { Grid, TextField } from "@mui/material";

export default function page() {
  return (
    <div dir="rtl">
      <Grid item xs={12} sm={6} md={4}>
        <AddNewCustomerModal />
      </Grid>
      <Grid container display={"flex"} spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField fullWidth label="کد تفضیلی" variant="outlined" />
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
          <DatePickerTime />
        </Grid>
      </Grid>
    </div>
  );
}
