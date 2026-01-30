import React, { useContext, useEffect } from "react";
import { useState } from "react";
import add from "../../Images/add.svg";
import { AppContext } from "../../context/Appcontext";
import api from '../../api/index'
import { toast } from "react-toastify";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  select: {
    "& ul": {
      backgroundColor: "red !important",
    },
    "& li": {
      backgroundColor: "red !important",
    },
  },
  option: {
    "&:hover": {
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

const Dropdown = (props) => {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [id, setId] = useState('');

  const { BASE_URL } = useContext(AppContext);

  useEffect(() => {
    if (props.country) getAllUniversities();
  }, [props.country]);

  const getAllUniversities = () => {
    api
      .get(`${BASE_URL}/admin/universities/dropdown?country_id=${props.country}`)
      .then((res) => {
        let list = res.data.data
        list = list.filter((v, i, a) => a.findIndex(v2 => (v2.name === v.name)) === i)
        setData(list);
      })
      .catch((error) => {
      });
  };


  const handleSelectionChange = (value) => {
    if (value) {
      setId(value.id)
    } else {
      setId('')
    }
  };


  const handleServiceAdd = () => {
    if (id) {
      props.onAddUni(id);
    } else {
      toast.warn('Please Select University')
    }
  };

  return (
    <form className="App  lg:pl-12 my-4" autoComplete="off">
      <div className="form-field">
        <label htmlFor="service"></label>
        <div className="services">
          <div className="first-division flex flex-row mt-2 gap-2">
            <div className="lg:hidden text-white mt-3 "></div>
            <div className="w-11/12 lg:w-[400px]  px-4 py-2">

              <div>
                <Autocomplete
                  id="combo-box-demo"
                  options={data}
                  defaultValue={{ name: "" }}
                  handleChange={handleSelectionChange}
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
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      classes={{ root: styles.customTextField }}
                      label="Select University"
                      variant="outlined"
                      sx={{ fontFamily: "audiowide" }}
                    />
                  )}
                  onChange={(event, newValue) => {
                    handleSelectionChange(newValue);
                  }}
                />
              </div>

            </div>
            <button
              type="button"
              onClick={handleServiceAdd}
              className="add-btn "
            >
              <span className="flex flex-row ml-2">
                <img
                  src={add}
                  alt="add btn"
                  className="mr-2 object-contain"
                />
                <div className="mt-1 text-white text-sm hidden lg:flex">
                  Add University
                </div>
              </span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Dropdown;
