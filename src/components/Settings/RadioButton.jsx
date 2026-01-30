import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function ControlledRadioButtonsGroup({ name, defaultValue, onChange }) {
  return (
    <FormControl sx={{ color: 'white' }}>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name={name}
        defaultValue={defaultValue}
        className="gradient-text role-access"
      >
        <FormControlLabel
          value={"Manager"}
          control={<Radio checked={defaultValue ==='Manager'} name="role"  onChange={onChange} className="gradient-text" />}
          label="Manager" />

        <FormControlLabel
          value="Executive"
          control={<Radio checked={defaultValue ==='Executive'} name="role"   onChange={onChange} className="gradient-text" />}
          label="Executive"
        />
      </RadioGroup>
    </FormControl>
  );
}
