import AddNewCustomerModal from "@/components/AddNewCustomerModal";
import DatePickerTime from "@/components/DatePicker";
import { Grid, TextField } from "@mui/material";

export default function page() {
  return (
    <div dir="rtl">
      <Grid container display={"flex"} spacing={2}>
        <Grid item sm={6} md={4}>
          <TextField sx={{width:'100%'}} label="کد تفضیلی" variant="outlined" />
        </Grid>
        <Grid item sm={6} md={4}>
          <TextField sx={{width:'100%'}} label="توضیحات" variant="outlined" />
        </Grid>
        <Grid item sm={6} md={4}>
          <TextField sx={{width:'100%'}} label="نام فروشنده" variant="outlined" />
        </Grid>
        <Grid item sm={6} md={4}>
          <TextField sx={{width:'100%'}} label="شرح" variant="outlined" />
        </Grid>
        <Grid item sm={6} md={4}>
          <TextField sx={{width:'100%'}} label="کد کارشناس فروش" variant="outlined" />
        </Grid>
        <Grid item sm={6} md={4}>
          <TextField sx={{width:'100%'}} label="کد انبار" variant="outlined" />
        </Grid>
        <Grid item sm={6} md={4}>
          <DatePickerTime />
        </Grid>
        <Grid item sm={6} md={4}>
          <AddNewCustomerModal />
        </Grid>
      </Grid>
    </div>
  );
}
