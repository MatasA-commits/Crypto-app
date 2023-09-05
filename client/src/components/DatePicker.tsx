import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "../styles/DatePicker.scss";
import dayjs from "dayjs";

interface DatePickerComponentProps {
  label: string;
  onChangeFunction: (date: any) => void;
  minDate: any;
  maxDate: any;
}

const bitmartCreateDate = new Date("2018-03-15");

const DatePickerComponent = ({
  label,
  onChangeFunction,
  minDate,
  maxDate,
}: DatePickerComponentProps) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <p className="label">{label}</p>
        <DatePicker
          slotProps={{ textField: { size: "small" } }}
          onChange={(date) => (date === null ? "" : onChangeFunction(date))}
          minDate={null ? minDate : dayjs(bitmartCreateDate)}
          disableFuture={true}
          maxDate={null ? maxDate : ""}
        />
      </LocalizationProvider>
    </>
  );
};

export default DatePickerComponent;
