import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { makeStyles } from "@mui/styles";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const useStyles = makeStyles(() => ({
  root: {
    padding: 0,
    "&:hover": {
      backgroundColor: "rgba(255, 205, 44, 0.1) !important",
    },
  },
}));

const CustomCheckbox = ({
  defaultChecked,
  handleCheck,
  ischecked,
  Label,
  name,
  color,
}) => {
  const classes = useStyles();
  return (
    <div className="">
      <Checkbox
        name={name}
        id={Label}
        checked={ischecked}
        className={classes.root}
        {...label}
        defaultChecked={defaultChecked}
        onChange={handleCheck}
        sx={{
          padding: 0,
          
          "&:hover": {
            color: "#07A1C0 ",
          },
          

          "& .MuiSvgIcon-root": {
            color: "#07A1C0 !important",
          },
        }}
      />

      <label
        htmlFor={Label}
        className={`ml-4 md:ml-2 break-word sm:text-sm text-xs  cursor-pointer ${
          ischecked ? "text-white" : `${color}`
        }`}
      >
        {Label}
      </label>
    </div>
  );
};
CustomCheckbox.defaultProps = {
  defaultChecked: false,
  ischecked: false,
  Label: "",
};

export default CustomCheckbox;
