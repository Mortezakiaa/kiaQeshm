"use client";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
export default function DatePickerTime() {
  return (
    <div className="DatePickerContainer">
      <DatePicker
        render={(value, openCalender) => (
          <TextField
            fullWidth
            onClick={openCalender}
            value={value}
            label="تاریخ"
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  style={{ position: "absolute", left: 10 }}
                >
                  <IconButton onClick={openCalender}>
                    <CalendarMonthIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-left"
      />
    </div>
  );
}
