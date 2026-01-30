import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@mui/material/Paper";
const useStyles = makeStyles({
  selectedOption: {
    backgroundColor:'#404050 !important'
  },
  selectedLabel: {
    backgroundColor: 'green', // change this to the desired background color
  },

  option: {
    "&:hover": {
      backgroundColor: "#404050 !important",
    },
    "&:selected": {
      backgroundColor: "#404050 !important",
    },
  },
  customTextField: {
    "& input::placeholder": {
      color: "#fff !important",
    },
  },
});

const selectStyles = () => {
  return {
    selectedOption: {
      backgroundColor:'#404050 !important'
    },
    "& .MuiInputLabel-root": {
      color: "#6A6A78",
      fontFamily: "audiowide",
      fontSize: "14px",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#6A6A78",
      fontFamily: "audiowide",
      fontSize: "14px",
    },
    input: {
      "&::placeholder": {
        fontFamily: "audiowide",
        color: "#fff",
        opacity: 1,
      },
    },
    width: "100%",
    "& .MuiInputLabel-root": {
      color: "#6A6A78",
      "font-size": "14px",
      "font-family": "audiowide",
    },

    "& .MuiAutocomplete-inputRoot:before": {
      "border-bottom": "1px solid #fff !important",
    },
    "& .MuiFormLabel-root": {
      color: "#404050",
      fontFamily: "audiowide !important",
      color: "#6A6A78",
      backgroundColor: "transparent",

      zIndex: 3,
      borderColor: "#FFFF",
    },
    "& .MuiInputBase-input": {
      color: "white ",
    },
    "& .MuiSvgIcon-root": {
      fill: "#fff",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#6A6A78",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid transparent",
      // background: `linear-gradient(to right, #151929,#151929 ), linear-gradient(to right, #07a1c0, #99d592)`,
      borderColor: "white !important",
      backgroundClip: "padding-box, border-box",
      backgroundOrigin: "padding-box, border-box",
      zIndex: 1,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white !important",
    },
    backgroundColor: "transparent",
  };
};
const AutoComplete1 = ({ options, handleChange, value }) => {
  const styles = useStyles();
  const getOptionSelected = (option, value) => option.value === value.value;

  return (
    <div>
      <Autocomplete
        id="combo-box-demo"
        options={options}
        autoHighlight
        defaultValue={{ name: "" }}
        handleChange={handleChange}
        value={value}
        classes={{
          option: styles.option,
        }}
        sx={selectStyles()}
        PaperProps={{
          style: {
            fontFamily: "audiowide",
            paddingTop: 0,
          },
        }}
        renderOption={(props, option) => {
          const { name } = option;
          return (
            <span
              {...props}
              style={{
                backgroundColor: "#262938",
                color: "white",
                fontFamily: "audiowide",
                border: "1px solid #404050",
                fontSize: "12px",
              }}
            >
              {name}
            </span>
          );
        }}
        getOptionLabel={(option) => option.name || ""}
        getOptionSelected={getOptionSelected}
        renderInput={(params) => (
          <TextField
            {...params}
            classes={{ root: styles.customTextField }}
            label="Subject Area"
            variant="outlined"
            
            sx={{ fontFamily: "audiowide" }}
          />
        )}
        onChange={(event, newValue) => {
          handleChange(newValue);
        }}
      />
    </div>
  );
};

export default AutoComplete1;
