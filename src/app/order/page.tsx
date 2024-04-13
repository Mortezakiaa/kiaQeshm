import AddNewCustomerModal from "@/components/AddNewCustomerModal";
import DatePickerTime from "@/components/DatePicker";
import { TextField } from "@mui/material";

export default function page() {
  return (
    <div dir="rtl">
      <TextField label="کد تفضیلی" variant="outlined"/>
      <DatePickerTime/>
      <AddNewCustomerModal/>
    </div>
  );
}
