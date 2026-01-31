import React from "react";
import { decryptData } from "../../utils/helpers";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import TextArea from "../../common/TextArea";
import { SelectInput } from "../../common/Select";
import CustomButton from "../../common/CustomButton";
import { useState } from "react";
import Validator from "validatorjs";
import { toast } from "react-toastify";
import { environment } from "../../environments/environment";
import api from "../../api/index";
import { useParams } from "react-router-dom";;


let initialValues = {
  status: "",
  notes: "",
};

const useStyles = makeStyles((Student) => ({
  root: {
    // backgroundColor: '#151929 !important',
    paddingY: "0px",
    "&:before": {
      backgroundColor: "#151929 !important",
    },
    "& .Mui-expanded": {
      border: "none",
      backgroundColor: "transparent !important",
    },
    "& .MuiPaper-root": {
      background: "transparent !important",
      padding: "0px !important",
      borderBottom: "1px solid #404050",
    },
    "& .MuiAccordionDetails-root": {
      padding: "0px 0px 0px 0px",
    },
  },
  details: {
    backgroundColor: "transparent !important",
    borderRadius: "8px",
    "& .MuiAccordionDetails-root": {
      padding: "0px 0px 0px 0px",
    },
    marginTop: "24px",
  },

  summary: {
    backgroundColor: "#151929 !important",
    borderRadius: "8px !important",
    margin: "0px",
    "&.Mui-expanded ": {
      border: "none",
      backgroundColor: "#151929 !important",
    },
    "&.MuiButtonBase-root-MuiAccordionSummary-root.Mui-expanded":{
       height: '0px'
    },

    padding: "10px",
    // maxHeight: '25px',
  },
}));

const Status = ({refresh}) => {
  const classes = useStyles();
    const { id } = useParams();
  const [params, setParams] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [isApiLoading, setApiLoading] = useState(false);

const handleChange = (e) => {
  e.stopPropagation();
    setFormErrors(initialValues)
    setParams({...params, [e.target.name]: [e.target.value]})
}

  const handleStatus = (e) => {
  e.stopPropagation();
  e.preventDefault();
    const rules = {
      status: "required",
      notes: "required|max:150",
    };


    const validation = new Validator(params, rules);

    if (validation.fails()) {
      const fieldErrors = {};
      Object.keys(validation.errors.errors).forEach((key) => {
        fieldErrors[key] = validation.errors.errors[key][0];
      });

      const err = Object.keys(fieldErrors);
      if (err.length) {
        const input = document.querySelector(`input[name=${err[0]}]`);
        if (input) {
          input.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "start",
          });
        }
      }
      setFormErrors(fieldErrors);
      return false;
    }

    setApiLoading(true);
    api
      .patch(
        `${environment.API_BASE_URL}/admin/students/status/${decryptData(id)}`,
        params
      )
      .then((res) => {
        console.log(res, 'res')
        setApiLoading(false);
        setParams(initialValues)
        // getLead();
        toast.success("Status Updated Successfully");
        setParams(initialValues)
        refresh()
      })
      .catch((err) => {
        toast.error(err.message);
        setApiLoading(false);
      });
  };

//   const handleDate = (newValue) => {
//     setFormErrors(initialValues);
//     const newDate = moment(new Date(newValue)).format("YYYY-MM-DD HH:mm:ss");
//     setParams({ ...params, callback_time: newDate });
//   };
  
  return (
    <Accordion
        key={'student-status-update'}
        defaultExpanded={false}
        elevation={0}
        className={classes.root}
        sx={{ border: "none", borderRadius: "8px" }}
      >
        <AccordionSummary
          sx={{ borderRadius: "8px", height: "10px" }}
          style={{ minHeight: "48px" }}
          expandIcon={
            // <img src={undefined} alt="icon" className="mx-3" />
            <svg
            className="rotate"
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.99922 0.0281248C6.13255 0.0281248 6.26155 0.0531254 6.38622 0.103126C6.51155 0.153126 6.61589 0.219792 6.69922 0.303125L11.2992 4.90312C11.4826 5.08646 11.5742 5.31979 11.5742 5.60313C11.5742 5.88646 11.4826 6.11979 11.2992 6.30313C11.1159 6.48646 10.8826 6.57812 10.5992 6.57812C10.3159 6.57812 10.0826 6.48646 9.89922 6.30313L5.99922 2.40312L2.09922 6.30313C1.91589 6.48646 1.68255 6.57812 1.39922 6.57812C1.11588 6.57812 0.882553 6.48646 0.69922 6.30313C0.515886 6.11979 0.424218 5.88646 0.424218 5.60313C0.424218 5.31979 0.515886 5.08646 0.69922 4.90312L5.29922 0.303125C5.39922 0.203125 5.50755 0.132459 5.62422 0.0911255C5.74089 0.0491257 5.86589 0.0281248 5.99922 0.0281248Z"
                fill="white"
              />
            </svg>
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.summary}
        >
          <Typography>
            <p className="audio my-2 mx-2 text-white">Status Info</p>
          </Typography>
        </AccordionSummary>

        <AccordionDetails className={classes.details}>
          <div className="bg-light">
        <div className="bg-[#151929] px-2 py-4 md:px-4 md:py-6 md:inner-div rounded-lg  mt-4 flex flex-col gap-6">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
          <SelectInput
            options={[
              {
                name: "DEFER",
              },
              {
                name: "HOLD",
              },
            ]}
            handleChange={handleChange}
            value={params.status}
            error={!!formErrors.status}
            helperText={formErrors.status}
            label="Select Status"
            name="status"
            bgcolor="#151929"
          />
          {/* {params.status === "CALL_BACK" ? (
            <TimeandDatePicker
              label="Call back time"
              handleChange={handleDate}
              value={params.callback_time}
              error={formErrors.callback_time}
            />
          ) : (
            ""
          )} */}
        </div>
        <TextArea
          placeholder="Add More Information"
          handleChange={handleChange}
          value={params?.notes}
          name="notes"
          error={!!formErrors.notes}
          helperText={formErrors.notes}
        />
      </div>
      <div className="mt-4 flex justify-center md:justify-start">
        {isApiLoading ? (
          <CustomButton
            variant="contained"
            size="large"
            borderRadius="8px"
            width="w-fit"
            disabled={isApiLoading}
          >
            <p className="">Loading...</p>
          </CustomButton>
        ) : (
          <CustomButton
            variant="contained"
            size="large"
            borderRadius="8px"
            width="w-fit"
            onClick={handleStatus}
            disabled={isApiLoading}
          >
            <p className="">Update Status</p>
          </CustomButton>
        )}
      </div>
      </div>
        </AccordionDetails>
      </Accordion>
    

      
    
  );
};

export default Status;
