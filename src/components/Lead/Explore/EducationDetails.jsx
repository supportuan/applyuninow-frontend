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

const Education = ({ lead }) => {
  const classes = useStyles();

  return (
    <div className="w-full rounded flex flex-col gap-6">
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
            <p className="audio my-2 mx-3 text-yellow">Education Background</p>
          </Typography>
        </AccordionSummary>

        <AccordionDetails className={classes.details}>
          <div className="flex flex-col gap-6">
            <div className="bg-[#151929] rounded-lg p-4">
              <p className="audio text-white mb-1 text-sm break-all">
                Secondary School cerificate/10th
              </p>
              <hr />
              <div className="mt-4 flex flex-col gap-4 lg:grid lg:grid-cols-4">
                <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col  lg:gap-1 ">
                  <p className="text-secondary text-xs">Year of Completion</p>
                  <p className="flex justify-start break-all break-word text-sm md:text-base audio text-white">
                    <p className="flex justify-start break-all break-word text-sm md:text-base audio text-white">
                      {lead?.education_details[0]?.passing_year ? (
                        <>
                          {moment(
                            lead?.education_details[0].passing_year
                          ).format("YYYY")}
                        </>
                      ) : (
                        "--"
                      )}
                    </p>
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col  lg:gap-1 ">
                  <p className="text-secondary text-xs">Enter Your %</p>
                  <p className="flex justify-start break-all break-word text-sm md:text-base audio text-white">
                    {lead?.education_details[0].grade ? (
                      <>{lead?.education_details[0].grade}%</>
                    ) : (
                      "--"
                    )}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col  lg:gap-1 ">
                  <p className="text-secondary text-xs">Medium</p>
                  <p className="flex justify-start break-all break-word text-sm md:text-base audio text-white">
                    {lead?.education_details[0].medium ? (
                      <>{lead?.education_details[0].medium}</>
                    ) : (
                      "--"
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#151929] rounded-lg p-4">
              <p className="audio text-white mb-1">
                Higher Secondary School cerificate/12th
              </p>
              <hr />
              <div className="mt-4 flex flex-col gap-4 lg:grid lg:grid-cols-4">
                <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col  lg:gap-1 ">
                  <p className="text-secondary text-xs">Year of Completion</p>
                  <p className="flex justify-start break-all break-word text-sm md:text-base audio text-white">
                    {lead?.education_details[1]?.passing_year ? (
                      <>
                        {moment(lead?.education_details[1].passing_year).format(
                          "YYYY"
                        )}
                      </>
                    ) : (
                      "--"
                    )}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col  lg:gap-1 ">
                  <p className="text-secondary text-xs">Enter Your %</p>
                  <p className="flex justify-start break-all break-word text-sm md:text-base audio text-white">
                    {lead?.education_details[1].grade ? (
                      <>{lead?.education_details[1].grade}%</>
                    ) : (
                      "--"
                    )}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col  lg:gap-1 ">
                  <p className="text-secondary text-xs">Medium</p>
                  <p className="flex justify-start break-all break-word text-sm md:text-base audio text-white">
                    {lead?.education_details[1].medium ? (
                      <>{lead?.education_details[1].medium}</>
                    ) : (
                      "--"
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#151929] rounded-lg p-4">
              <p className="audio text-white mb-1">Under Graduation</p>
              <hr />
              <div className="mt-4 flex flex-col gap-4 lg:grid lg:grid-cols-4">
                <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col  lg:gap-1 ">
                  <p className="text-secondary text-xs">Type of Degree</p>
                  <p className="flex justify-start break-all break-word text-sm md:text-base audio text-white">
                    {lead?.education_details[2]?.type
                      ? lead?.education_details[2]?.type
                      : "--"}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col  lg:gap-1 ">
                  <p className="text-secondary text-xs">Start Year/End Year</p>
                  <p className="flex justify-start break-all break-word text-sm md:text-base audio text-white">
                    {lead?.education_details[2]?.start_year ? (
                      <>
                        {moment(lead?.education_details[2]?.start_year).format(
                          "YYYY"
                        )}
                        /{" "}
                        {moment(lead?.education_details[2]?.end_year).format(
                          "YYYY"
                        )}
                      </>
                    ) : (
                      "--"
                    )}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col  lg:gap-1 ">
                  <p className="text-secondary text-xs">Medium</p>
                  <p className="flex justify-start break-all break-word text-sm md:text-base audio text-white">
                    {" "}
                    {lead?.education_details[2]?.medium
                      ? lead?.education_details[2]?.medium
                      : "--"}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col  lg:gap-1 ">
                  <p className="text-secondary text-xs">CGPA</p>
                  <p className="flex justify-start break-all break-word text-sm md:text-base audio text-white">
                    {" "}
                    {lead?.education_details[2]?.grade
                      ? lead?.education_details[2]?.grade
                      : "--"}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col  lg:gap-1 ">
                  <p className="text-secondary text-xs">BackLogs</p>
                  <p className="flex justify-start break-all break-word text-sm md:text-base audio text-white">
                    {" "}
                    {lead?.education_details[2]?.backlogs
                      ? lead?.education_details[2]?.backlogs
                      : "--"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#151929] rounded-lg p-4">
              <p className="audio text-white mb-1">Post Graduation</p>
              <hr />
              <div className="mt-4 flex flex-col gap-4 lg:grid lg:grid-cols-4">
                <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col  lg:gap-1 ">
                  <p className="text-secondary text-xs">Type of Degree</p>
                  <p className="flex justify-start break-all break-word text-sm md:text-base audio text-white">
                    {lead?.education_details[3]?.type
                      ? lead?.education_details[3]?.type
                      : "--"}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col  lg:gap-1 ">
                  <p className="text-secondary text-xs">Start Year/End Year</p>
                  <p className="flex justify-start break-all break-word text-sm md:text-base audio text-white">
                    {lead?.education_details[3]?.start_year ? (
                      <>
                        {moment(lead?.education_details[3]?.start_year).format(
                          "YYYY"
                        )}
                        /{" "}
                        {moment(lead?.education_details[3]?.end_year).format(
                          "YYYY"
                        )}
                      </>
                    ) : (
                      "--"
                    )}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col  lg:gap-1 ">
                  <p className="text-secondary text-xs">Medium</p>
                  <p className="flex justify-start break-all break-word text-sm md:text-base audio text-white">
                    {" "}
                    {lead?.education_details[3]?.medium
                      ? lead?.education_details[3]?.medium
                      : "--"}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col  lg:gap-1 ">
                  <p className="text-secondary text-xs">CGPA</p>
                  <p className="flex justify-start break-all break-word text-sm md:text-base audio text-white">
                    {" "}
                    {lead?.education_details[3]?.grade
                      ? lead?.education_details[3]?.grade
                      : "--"}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col  lg:gap-1 ">
                  <p className="text-secondary text-xs">BackLogs</p>
                  <p className="flex justify-start break-all break-word text-sm md:text-base audio text-white">
                    {" "}
                    {lead?.education_details[3]?.backlogs
                      ? lead?.education_details[3]?.backlogs
                      : "--"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      {lead?.asst_exam_sections && lead?.asst_exam_sections.length > 0 ? (
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
              <p className=" audio my-2 mx-3 text-yellow">Test Results</p>
            </Typography>
          </AccordionSummary>

          <AccordionDetails className={classes.details}>
            <div className="flex flex-col gap-6">
              {lead?.asst_exam_sections &&
                lead?.asst_exam_sections.map((x, index) => (
                  <div className="bg-[#151929] rounded-lg p-4">
                    <p className="audio text-white mb-1">
                      {index === 1
                        ? " ELP test"
                        : lead.level === "Under Graduation"
                        ? "Pre SAT/SAT/ACT"
                        : "GRE/GMAT"}{" "}
                      - {x.label || "NA"}
                    </p>
                    <hr />
                    <div className="mt-4 flex flex-col gap-4 lg:grid lg:grid-cols-4">
                      {x.label &&
                        Object.keys(x)
                          .filter((k) => k != "type" && k != "label")
                          .sort((z) => z != "overall_score")
                          .map((item) => (
                            <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col  lg:gap-1 ">
                              <p className="text-secondary text-xs">
                                {item.toUpperCase()}
                              </p>
                              <p className="flex justify-start break-all break-word text-sm md:text-base audio text-white">
                                {x[item]}
                              </p>
                            </div>
                          ))}
                    </div>
                  </div>
                ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ) : (
        ""
      )}
    </div>
  );
};
export default Education;
