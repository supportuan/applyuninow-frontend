import * as React from "react";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

export default function MaterialUIPickers({ handleChange, value }) {
  const onKeyDown = (e) => {
    e.preventDefault();
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3} sx={{ width: "100%" }}>
        <div className="w-full mui-date-picker-admin">
          <DesktopDatePicker
            label="DOB"
            inputFormat="DD/MM/YYYY"
            value={dayjs(value)}
            onChange={handleChange}
            maxDate={new Date()}
          
            renderInput={(params) => (
              <TextField
                {...params}
                InputLabelProps={{
                  style: {
                    color: "#6A6A78",
                    fontFamily: "audiowide",
                    fontSize: "12px",
                  },
                }}
                sx={{
                  ".MuiInputBase-input": { color: "white" },
                  width: "100%",
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#404050",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
                onKeyDown={onKeyDown}
              />
            )}
          />
        </div>

        {/* <div className="block lg:hidden">
          <MobileDatePicker
            label="DOB"
            inputFormat="DD/MM/YYYY"
            value={value}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField {...params} sx={{ color: "white" }} />
            )}
          />
        </div> */}
      </Stack>
    </LocalizationProvider>
  );
}
