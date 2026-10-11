"use client";

import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function DatePickerInput({
  label, value, onChange, required, isInvalid, errorMessage, removeMargin,
}) {
  const [open, setOpen] = useState(false);

  return (
    <FormControl fullWidth color="secondary" required={required}
      error={required ? isInvalid : null}
      sx={{ marginTop: removeMargin ? "0" : "24px", position: "relative" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label={label} value={value ?? null} onChange={onChange}
          format="DD/MM/YYYY" minDate={dayjs()} open={open}
          onOpen={() => setOpen(true)} onClose={() => setOpen(false)}
          slotProps={{ textField: {
            color: "secondary", variant: "outlined", fullWidth: true,
            helperText: isInvalid ? errorMessage : "", error: isInvalid,
            inputProps: { readOnly: true }, onClick: () => setOpen(true),
            onKeyDown: (event) => {
              if (event.key === "Enter" || event.key === " ") setOpen(true);
            },
          } }} />
      </LocalizationProvider>
      {value && (
        <IconButton aria-label="Clear date" size="small" color="secondary"
          onClick={(event) => { event.stopPropagation(); onChange(null); }}
          sx={{ position: "absolute", right: 44, top: "50%", transform: "translateY(-50%)", zIndex: 1 }}>
          <ClearIcon fontSize="small" color="secondary" />
        </IconButton>
      )}
    </FormControl>
  );
}
