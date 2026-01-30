import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import { uuid } from "./utils/helpers";

export const SelectInput = ({
  handleChange,
  value,
  label,
  error,
  helperText,
  options,
  width,
  name,
  required,
  readonly,
  bgcolor,
  fontSize,
}) => {
  const useStyles = makeStyles({
    error: {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "red",
        borderRadius: "8px",
      },
      "& .MuiFormHelperText-root": {
        fontFamily: "audiowide",
      },
      "& .MuiFormLabel-root": {
        fontFamily: "audiowide",
      },
    },
    select: {
      "& ul": {
        backgroundColor: "rgba(255, 255, 255, 0.1);",
      },
      "& li": {
        backgroundColor: "#2F3344",
      },
    },
    icon: {
      fill: "white",
    },
    root: {
      "& .MuiOutlinedInput-input": {
        color: "#FFFF",
      },
      "& .MuiInputLabel-root": {
        color: "#6A6A78",
        fontFamily: "audiowide",
        fontSize: fontSize,
        background: "#fff",
      },
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#404050",
        borderRadius: "8px",
      },
      "&:hover .MuiOutlinedInput-input": {
        color: "#FFFF",
      },
      "&:hover .MuiInputLabel-root": {
        color: "#6A6A78",
      },

      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#FFFF",
      },

      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        color: "#FFFF",
        borderColor: "#FFFF",
        zIndex: 4,
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: "#6A6A78",
        backgroundColor: "#fff",
        paddingLeft: "4px",
        paddingRight: "4px",
        zIndex: 3,
        // borderColor: "#FFFF",
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "1px solid transparent",
        background: `linear-gradient(to right, ${bgcolor}, ${bgcolor}), linear-gradient(to right, #07a1c0, #99d592)`,
        backgroundClip: "padding-box, border-box",
        backgroundOrigin: "padding-box, border-box",
        zIndex: 1,
      },
    },
  });
  const classes = useStyles();
  return (
    <div className="w-full">
      <FormControl
        className={!error ? classes.root : classes.error}
        fullWidth
        error={error}
      >
        <InputLabel id="select-input-label">{label}</InputLabel>
        <Select
          labelId="select-input-label"
          style={{
            width,
            fontSize: fontSize,
          }}
          // IconComponent={KeyboardArrowDownIcon}
          MenuProps={{
            sx: {
              "&& .MuiMenuItem-root": {
                fontFamily: "audiowide",
                backgroundColor: "#2F3344",
                border: "1px solid #404050 !important",
                color: "#FFFFFF",
                fontSize: "12px",
                "&:hover": {
                  backgroundColor: "#444757 !important",
                },
              },
              "&& .MuiMenu-list": {
                padding: "0",
              },

              "&& .Mui-selected": {
                color: "#fff",
                backgroundColor: "#444757",
                zIndex: 2,
              },
            },
          }}
          sx={{
            color: "white",
            ".MuiSvgIcon-root ": {
              fill: "white !important",
            },
          }}
          required={required}
          value={value}
          onChange={handleChange}
          label={label}
          name={name}
          error={error}
          fullWidth
          readOnly={readonly}
        >
          {options.length > 0 ? (
            options?.map((item) => (
              <MenuItem
                key={uuid()}
                value={item.id ? item.id : item.name || item}
              >
                {item?.name ||
                  item ||
                  item?.poc_name ||
                  item?.account_name ||
                  item?.company_name ||
                  item?.id}
                {item.start &&
                  `-${item?.start} to
              ${item?.end}`}
              </MenuItem>
            ))
          ) : (
            <p className="bg-[#262938] p-4 text-xl">Not found !</p>
          )}
        </Select>

        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </div>
  );
};
