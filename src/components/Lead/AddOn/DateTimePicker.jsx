import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { SxProps } from "@mui/material";

export const TimeandDatePicker = ({
  handleChange,
  value,
  error,
  label = "Date time",
}) => {
  const onKeyDown = (e) => {
    e.preventDefault();
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack
        spacing={3}
        sx={{
          "& .MuiInputBase-input": {
            color: "white",
          },
          "& .MuiOutlinedInput-input": {
            color: "white",
          },
          "& .MuiInputBase-inputAdornedEnd": {
            color: "white",
          },

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#404050",
            borderRadius: "8px",
            color: "white !important",
          },
          backgroundColor: "transparent",
          textarea: { color: "#FFFFFF" },
          label: {
            color: "#6A6A78",
            backgroundColor: "#151929",
            paddingLeft: "4px",
            paddingRight: "4px",
            zIndex: 3,
            borderColor: "#FFFF",
          },
          "& .MuiFormLabel-root.Mui-hovered": {
            color: "#6A6A78",
            backgroundColor: "#151929",
            paddingLeft: "4px",
            paddingRight: "4px",
            zIndex: 3,
            borderColor: "#FFFF",
          },
          "& .MuiFormLabel-root.Mui-focused": {
            color: "#6A6A78",
            backgroundColor: "#151929",
            paddingLeft: "4px",
            paddingRight: "4px",
            zIndex: 3,
            borderColor: "#FFFF",
          },
          "& .MuiOutlinedInput-root:hover": {
            "& > fieldset": {
              borderColor: "#FFFFFF",
              color: "#FFFFFF",
            },
          },
          "& .MuiOutlinedInput-root": {
            "& > fieldset": {
              borderColor: "#404050",
              color: "#FFFFFF",
            },
          },
          "& .MuiOutlinedInput-root.Mui-focused": {
            "& > fieldset": {
              color: "#FFFFFF",
              borderColor: "#404050",
            },
          },
        }}
      >
        <DateTimePicker
      
          label={label}
          value={value}
          onChange={handleChange}
          minDate={new Date()}
          renderInput={(params) => (
            <TextField
              {...params}
              onKeyDown={onKeyDown}
              sx={{
                width: "100%",
                fontFamily: "audio",
                color: "white !important",
              }}
              error={error}
              InputLabelProps={{
                style: {
                  color: "#6A6A78",
                  fontFamily: "audiowide",
                },
              }}
             
            />
          )}
          components={
            {
              // OpenPickerIcon: MoreTimeIcon,
              // LeftArrowIcon: ArrowBackIcon,
              // RightArrowIcon: ArrowForwardIcon,
              // SwitchViewIcon: ChangeCircleIcon
            }
          }
          onError={() => error}
          OpenPickerButtonProps={{ style: { color: "white" } }}
        />
      </Stack>
    </LocalizationProvider>
  );
};
