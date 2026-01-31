import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { uuid } from "../../../common/utils/helpers";

const useStyles = makeStyles((lead) => ({
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

    padding: "10px",
    // maxHeight: '25px',
  },
}));

const StudentInfo = ({ lead, addOn }) => {
  let LeadInfo = [
    {
      name: "First Name",
      value: lead?.first_name,
    },
    {
      name: "Last Name",
      value: lead?.last_name,
    },
    {
      name: "Phone",
      value: `${lead?.phone ? `+91 ${lead?.phone}` : "--"}`,
    },
    {
      name: "Alternate Phone Number",
      value: `${
        lead?.alternate_phone != null ? `+91 ${lead?.alternate_phone}` : "--"
      }`,
    },
    {
      name: "E-mail id",
      value: lead?.email,
    },
    {
      name: "Education Status",
      value: lead?.present_status,
    },
    {
      name: "DOB",
      value: `${
        lead?.dob ? ` ${moment(lead?.dob).format("DD/MM/YYYY")}` : "--"
      }`,
    },
    {
      name: "Gender",
      value: lead?.gender,
    },
    {
      name: "Country",
      value: lead?.country?.name,
    },
    {
      name: "Lead Created",
      value: moment(lead?.created_at).format("DD/MM/YYYY LT"),
    },
    {
      name: "Passport Number",
      value: lead?.passport_no != 'null' ? lead?.passport_no : "",
    },
    {
      name: "Notes",
      value: lead?.notes != 'null' ? lead?.notes : "",
    },
  ];
  const classes = useStyles();

  return (
    <div className="w-full rounded flex flex-col gap-6">
      <Accordion
        key={uuid()}
        defaultExpanded={true}
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
            <p className="audio my-2 mx-3 text-white">Lead Info</p>
          </Typography>
        </AccordionSummary>

        <AccordionDetails className={classes.details}>
          <div className="inner-div mt-4 flex flex-col gap-4 lg:grid grid-cols-4 lg:gap-10">
            {LeadInfo.map((item, index) => {
              return (
                <div
                  key={uuid()}
                  className="grid grid-cols-2 gap-4 lg:flex lg:flex-col  lg:gap-1"
                >
                  <p className="text-secondary text-xs">{item?.name}</p>
                  <p className="flex justify-start break-all break-word text-sm md:text-base audio text-white">
                    <p className="">{item?.value ? item?.value : "--"}</p>
                  </p>
                </div>
              );
            })}
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        key={uuid()}
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
            <p className=" audio my-2 mx-3 text-white">Add Ons</p>
          </Typography>
        </AccordionSummary>

        <AccordionDetails className={classes.details}>
          <div className="inner-div mt-4 flex flex-col gap-4 lg:grid grid-cols-4 lg:gap-10">
            {addOn?.length > 0 ? (
              <>
                {addOn?.map((item, index) => {
                  return (
                    <div
                      key={uuid()}
                      className="grid grid-cols-2 gap-4 lg:flex lg:flex-col  lg:gap-1 "
                    >
                      <p className="text-secondary text-xs">
                        Add On {index + 1}
                      </p>
                      <p className="flex justify-start break-all break-word text-sm md:text-base audio text-white">
                        {item ? item : "--"}
                      </p>
                    </div>
                  );
                })}
              </>
            ) : (
              <p className="audio text-center">No Add On Selected</p>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default StudentInfo;
