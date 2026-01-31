import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Checkbox } from "@mui/material";
import { uuid } from "../../../common/utils/helpers";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      borderColor: "red !important",
    },
  },
};

const names = [
  "Pre-Departure",
  "Forex Exchange",
  "Destination – Arrival pickup",
  "On- Arrival registrations",
  "Internship (in-line to Subject area)",
  "Accommodation",
  "Part-time jobs (in-line to academics / work experience)",
  "Resume / CV marketing for Professional jobs",
];

function getStyles(name, value, theme) {
  return {
    fontWeight:
      value.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({
  value,
  handleChange,
  error,
  helperText,
}) {
  const theme = useTheme();

  return (
    <div>
      <FormControl fullWidth
        sx={{
          width: "100%",
        }}
      >
        <InputLabel
          id="demo-multiple-name-label"
          sx={{ color: "#6A6A78 !important" }}
        >
          <p className="audio pr-4">Add-on</p>
        </InputLabel>
        <Select
          error={error}
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={value}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          sx={{
            background: "transparent",
            color: "white",
            ".MuiOutlinedInput-notchedOutline": {
              paddingLeft:'4px',
              paddingRight:'20px',
              borderColor: "rgba(228, 219, 233, 0.25)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white !important",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            ".MuiSvgIcon-root ": {
              fill: "white !important",
            },

            "& .MuiInputLabel-root.Mui-focused": {
              color: "#6A6A78",
              paddingLeft: "4px",
              paddingRight: "4px",
              zIndex: 3,
              borderColor: "#FFFF",
            },
          }}
        >
          {names.map((name) => (
            <MenuItem
              key={uuid()}
              value={name}
              style={getStyles(name, value, theme)}
            >
              <Checkbox
                sx={{
                  color: "white",
                  "&:hover": {
                    color: "white",
                  },
                  "&.Mui-checked": {
                    color: "",
                  },
                }}
                checked={value?.indexOf(name) > -1}
              />

              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <p className="text-[#c12133] ml-[14px] text-[0.75rem] audio">
        {helperText}
      </p>
    </div>
  );
}
