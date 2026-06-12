import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import { resolveDisplayName, uuid } from "../utils/helpers";

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
}) => {
  const useStyles = makeStyles({
    error: {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#D2D9E5",
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
        backgroundColor: "#D2D9E5;",
      },
      "& li": {
        backgroundColor: "#D2D9E5",
      },
    },
    icon: {
      fill: "white",
    },
    root: {
      "& .MuiOutlinedInput-input": {
        color: "#1E417C",
        backgroundColor: "#fff",
        borderColor: "#d3d9e5",
        borderRadius: "8px",
      },
      "& .MuiInputLabel-root": {
        color: "#1E417C",
        fontFamily: "audiowide",
        fontSize: "14px",
        backgroundColor: "#fff",
      },
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#D2D9E5",
        borderRadius: "8px",
      },
      "&:hover .MuiOutlinedInput-input": {
        color: '#1E417C',
      },
      "&:hover .MuiInputLabel-root": {
        color: "#1E417C",
      },

      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#D2D9E5",
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        color: "#1E417C",
        zIndex: 4,
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: "#1E417C",
        backgroundColor: "#fff",
        paddingLeft: "4px",
        paddingRight: "4px",
        zIndex: 5,
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #D2D9E5 ",
        background: "#F8F9FB",
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
          }}
          // IconComponent={KeyboardArrowDownIcon}
          MenuProps={{
            sx: {
              "&& .MuiMenuItem-root": {
                fontFamily: "audiowide",
                backgroundColor: "#ffffff",
                // border: "1px solid #404050 !important",
                color: "#1E417C",
                "&:hover": {
                  backgroundColor: "#D2D9E5 !important",
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
            color: "rgba(0, 0, 0, 0.54)",
            ".MuiSvgIcon-root ": {
              fill: "rgba(0, 0, 0, 0.54)",
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
          {options?.length > 0 ? (
            options?.map((item) => (
              <MenuItem
                key={uuid()}
                value={
                  item.id
                    ? item.id
                    : resolveDisplayName(item.name) || resolveDisplayName(item)
                }
              >
                {resolveDisplayName(item?.name) ||
                  resolveDisplayName(item?.address_1) ||
                  resolveDisplayName(item?.poc_name) ||
                  resolveDisplayName(item?.account_name) ||
                  resolveDisplayName(item?.company_name) ||
                  (item?.id != null ? String(item.id) : "")}
                {item.start &&
                  `-${item?.start} to
              ${item?.end}`}
              </MenuItem>
            ))
          ) : (
            <p className="text-white p-4 text-xl">Not found !</p>
          )}
        </Select>

        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </div>
  );
};
