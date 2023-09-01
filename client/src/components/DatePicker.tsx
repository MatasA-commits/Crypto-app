import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "../styles/DatePicker.scss";

interface DatePickerComponentProps {
  label: string;
  onSelect: (date: any) => void;
  minDate: any;
  maxDate: any;
}

const DatePickerComponent = ({
  label,
  onSelect,
  minDate,
  maxDate,
}: DatePickerComponentProps) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <p className="label">{label}</p>
        <DatePicker
          slotProps={{ textField: { size: "small" } }}
          onChange={onSelect}
          minDate={"none" ? minDate : ""}
          disableFuture={true}
          maxDate={"none" ? maxDate : ""}
        />
      </LocalizationProvider>
    </>
  );
};

export default DatePickerComponent;
