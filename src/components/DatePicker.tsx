"use client";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { IconButton, InputAdornment } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RTLTextField from "./RTLTextField";
import { DatePickerArguments } from "@/Types/Types";


export default function DatePickerTime({ DateValue, onChange }: DatePickerArguments) {
  return (
    <div className="DatePickerContainer">
      <DatePicker
        onChange={onChange}
        render={(v, openCalender) => (
          <RTLTextField
            fullWidth
            onClick={openCalender}
            defaultValue={v}
            value={DateValue}
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
