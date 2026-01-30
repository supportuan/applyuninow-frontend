import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { uuid } from "../../common/utils/helpers";

const useStyles = makeStyles((student) => ({
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

const Education = ({ student }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState("");

  const handleAccordian = (pannel) => (event, newExpanded) => {
    if (expanded === pannel) {
      setExpanded(-1);
      return;
    }
    setExpanded(newExpanded ? pannel : false);
  };

  return (
    <div className="w-full rounded flex flex-col gap-6">
      <Accordion
        expanded={expanded === "first"}
        onChange={handleAccordian("first")}
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
            <p className="audio my-2 mx-0 md:mx-3 gradient-text">
              My Preference
            </p>
          </Typography>
        </AccordionSummary>

        <AccordionDetails className={classes.details}>
          <div className="inner-div mt-4 flex flex-col gap-4 lg:grid grid-cols-4 lg:gap-10">
            <div className="flex justify-between lg:flex lg:flex-col lg:justify-start  lg:gap-1 ">
              <p className="text-secondary text-xs">Destination</p>
              <p className="text-white text-xs lg:text-base break">
                {(student?.country && student?.country.name) || "--"}
              </p>
            </div>

            <div className="flex justify-between lg:flex lg:flex-col lg:justify-start  lg:gap-1 ">
              <p className="text-secondary text-xs">Study Level</p>
              <p className="text-white text-xs text-right lg:text-left lg:text-base break">
                {student?.level}
              </p>
            </div>

            <div className="flex justify-between lg:justify-start lg:flex lg:flex-col  lg:gap-1 ">
              <p className="text-secondary text-xs">Degree</p>
              <p className="text-white text-right lg:text-left text-xs lg:text-base break">
                {" "}
                {student?.type_of_degree || "--"}
              </p>
            </div>

            <div className="flex justify-between lg:justify-start lg:flex lg:flex-col  lg:gap-1 ">
              <p className="text-secondary text-xs">Intake</p>
              <p className="text-white text-xs lg:text-base break">
                {student?.intake_month} {student?.intake_year}
              </p>
            </div>
            <div className="flex justify-between lg:justify-start lg:flex lg:flex-col  lg:gap-1 ">
              <p className="text-secondary text-xs">Study Duration</p>
              <p className="text-white text-xs lg:text-base break">
                {student?.study_duration || "--"}
              </p>
            </div>
            <div className="flex justify-between lg:justify-start lg:flex lg:flex-col  lg:gap-1 ">
              <p className="text-secondary text-xs">Study Industry</p>
              <p className="text-white text-right lg:text-left text-xs lg:text-base break">
                {" "}
                {student?.study_industry?.name || "--"}
              </p>
            </div>
            <div className="flex justify-between lg:justify-start lg:flex lg:flex-col  lg:gap-1 ">
              <p className="text-secondary text-xs">Study Area</p>
              <p className="text-white text-right lg:text-left text-xs lg:text-base break">
                {" "}
                {student?.study_area?.sub_industry?.name || "--"}
              </p>
            </div>
            <div className="text-white flex flex-row justify-between lg:justify-end lg:flex lg:flex-col lg:gap-1">
              <p className="text-secondary text-xs">Study Subject</p>
              <p className=" w-[200px] flex text-xs lg:text-base justify-end text-right lg:justify-start lg:w-full lg:text-left">
                {" "}
                {student?.study_area?.name || "--"}
              </p>
            </div>
            <div className="flex justify-between lg:justify-start lg:flex lg:flex-col  lg:gap-1 ">
              <p className="text-secondary text-xs">Study Format</p>
              <p className="text-white text-xs lg:text-base break">
                {student?.study_mode || "--"}
              </p>
            </div>

            <div className="flex justify-between lg:justify-start lg:flex lg:flex-col  lg:gap-1 ">
              <p className="text-secondary text-xs">Attendance Type</p>
              <p className="text-white text-xs lg:text-base break">
                {student?.study_attendance_type || "--"}
              </p>
            </div>
            <div className="flex justify-between lg:justify-start lg:flex lg:flex-col  lg:gap-1 ">
              <p className="text-secondary text-xs">Study Budget</p>
              <p className="text-white text-xs lg:text-base break">
                {student?.study_budget || ""}
              </p>
            </div>
            <div className="flex justify-between lg:justify-start lg:flex lg:flex-col  lg:gap-1 ">
              <p className="text-secondary text-xs">Work Exp</p>
              <p className="text-white text-xs lg:text-base break">
                {student?.work_experince || "--"}
              </p>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        key={uuid()}
        expanded={expanded === "second"}
        onChange={handleAccordian("second")}
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
            <p className="audio my-2 mx-0 md:mx-3 gradient-text">
              My Academics
            </p>
          </Typography>
        </AccordionSummary>

        <AccordionDetails className={classes.details}>
          <div className="flex flex-col gap-6">
            {student?.education_details &&
              student?.education_details[0]?.type === "SSC" && (
                <div className="bg-[#151929] rounded-lg p-4">
                  <p className="audio text-slider mb-1 text-sm break-all">
                    Secondary School cerificate/10th
                  </p>
                  <hr />
                  <div className="mt-4 flex flex-col gap-4 lg:grid lg:grid-cols-4">
                    <div className="flex justify-between lg:justify-start lg:flex lg:flex-col  lg:gap-1 ">
                      <p className="text-secondary text-xs">Achieved year</p>
                      <p className="flex md:justify-start justify-end break text-sm md:text-base audio text-white">
                        <p className="flex md:justify-start justify-end break text-xs md:text-base audio text-white">
                          {student?.education_details[0]?.passing_year ? (
                            <>
                              {moment(
                                student?.education_details[0].passing_year
                              ).format("YYYY")}
                            </>
                          ) : (
                            "--"
                          )}
                        </p>
                      </p>
                    </div>
                    <div className="flex justify-between lg:justify-start lg:flex lg:flex-col  lg:gap-1 ">
                      <p className="text-secondary text-xs">Achieved %</p>
                      <p className="flex md:justify-start justify-end break text-xs md:text-base audio text-white">
                        {student?.education_details[0].grade ? (
                          <>{student?.education_details[0].grade}%</>
                        ) : (
                          "--"
                        )}
                      </p>
                    </div>
                    <div className="flex justify-between lg:justify-start lg:flex lg:flex-col  lg:gap-1 ">
                      <p className="text-secondary text-xs">Study Medium</p>
                      <p className="flex md:justify-start justify-end break text-xs md:text-base audio text-white">
                        {student?.education_details[0].medium ? (
                          <>{student?.education_details[0].medium}</>
                        ) : (
                          "--"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}

            {student?.education_details &&
              student?.education_details[1]?.type === "HSC" && (
                <div className="bg-[#151929] rounded-lg p-4">
                  <p className="audio text-slider mb-1">
                    Higher Secondary School cerificate/12th
                  </p>
                  <hr />
                  <div className="mt-4 flex flex-col gap-4 lg:grid lg:grid-cols-4">
                    <div className="flex justify-between lg:justify-start lg:flex lg:flex-col  lg:gap-1 ">
                      <p className="text-secondary text-xs">Achieved year</p>
                      <p className="flex md:justify-start justify-end break text-xs md:text-base audio text-white">
                        {student?.education_details[1]?.passing_year ? (
                          <>
                            {moment(
                              student?.education_details[1].passing_year
                            ).format("YYYY")}
                          </>
                        ) : (
                          "--"
                        )}
                      </p>
                    </div>
                    <div className="flex justify-between lg:justify-start lg:flex lg:flex-col  lg:gap-1 ">
                      <p className="text-secondary text-xs">Achieved %</p>
                      <p className="flex md:justify-start justify-end break text-xs md:text-base audio text-white">
                        {student?.education_details[1].grade ? (
                          <>{student?.education_details[1].grade}%</>
                        ) : (
                          "--"
                        )}
                      </p>
                    </div>
                    <div className="flex justify-between lg:justify-start lg:flex lg:flex-col  lg:gap-1 ">
                      <p className="text-secondary text-xs">Study Medium</p>
                      <p className="flex md:justify-start justify-end break text-xs md:text-base audio text-white">
                        {student?.education_details[1].medium ? (
                          <>{student?.education_details[1].medium}</>
                        ) : (
                          "--"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}

            <div className="bg-[#151929] rounded-lg p-4">
              <p className="audio text-slider mb-1">Under Graduation</p>
              <hr />
              <div className="mt-4 flex flex-col gap-4 lg:grid lg:grid-cols-4">
                {/* <div className="flex justify-between lg:justify-start lg:flex lg:flex-col  lg:gap-1 ">
                  <p className="text-secondary text-xs">Degree Type</p>
                  <p className="flex ml-14 break-word text-sm md:text-base audio text-white">
                    {student?.education_details[2]?.type
                      ? student?.education_details[2]?.type
                      : "--"}
                  </p>
                </div> */}
                <div className="text-white flex flex-row justify-between lg:flex lg:flex-col lg:gap-1">
                  <p className="text-secondary text-xs">Degree Type</p>
                  <p className=" w-[200px] flex justify-end text-xs lg:text-base text-right lg:w-full lg:text-left">
                    {" "}
                    {student?.education_details[2]?.type
                      ? student?.education_details[2]?.type
                      : "--"}
                  </p>
                </div>
                <div className="flex justify-between lg:justify-start lg:flex lg:flex-col  lg:gap-1 ">
                  <p className="text-secondary text-xs">Degree Duration</p>
                  <p className="flex md:justify-start justify-end break text-xs md:text-base audio text-white">
                    {student?.education_details[2]?.start_year ? (
                      <>
                        {moment(
                          student?.education_details[2]?.start_year
                        ).format("YYYY")}
                        /{" "}
                        {moment(student?.education_details[2]?.end_year).format(
                          "YYYY"
                        )}
                      </>
                    ) : (
                      "--"
                    )}
                  </p>
                </div>
                <div className="flex justify-between lg:justify-start lg:flex lg:flex-col  lg:gap-1 ">
                  <p className="text-secondary text-xs">Study Medium</p>
                  <p className="flex md:justify-start justify-end break text-xs md:text-base audio text-white">
                    {" "}
                    {student?.education_details[2]?.medium
                      ? student?.education_details[2]?.medium
                      : "--"}
                  </p>
                </div>
                <div className="flex justify-between lg:justify-start lg:flex lg:flex-col  lg:gap-1 ">
                  <p className="text-secondary text-xs">Achieved %</p>
                  <p className="flex md:justify-start justify-end break text-xs md:text-base audio text-white">
                    {" "}
                    {student?.education_details[2]?.grade
                      ? student?.education_details[2]?.grade
                      : "--"}
                  </p>
                </div>
                <div className="flex justify-between lg:justify-start lg:flex lg:flex-col  lg:gap-1 ">
                  <p className="text-secondary text-xs">Backlogs #</p>
                  <p className="flex md:justify-start justify-end break text-xs md:text-base audio text-white">
                    {" "}
                    {student?.education_details[2]?.backlogs
                      ? student?.education_details[2]?.backlogs
                      : "--"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#151929] rounded-lg p-4">
              <p className="audio text-slider mb-1">Post Graduation</p>
              <hr />
              <div className="mt-4 flex flex-col gap-4 lg:grid lg:grid-cols-4">
                <div className="flex justify-between lg:justify-start lg:flex lg:flex-col  lg:gap-1 ">
                  <p className="text-secondary text-xs">Degree Type</p>
                  <p className="flex md:justify-start justify-end break text-xs md:text-base audio text-white">
                    {student?.education_details[3]?.type
                      ? student?.education_details[3]?.type
                      : "--"}
                  </p>
                </div>
                <div className="flex justify-between lg:justify-start lg:flex lg:flex-col  lg:gap-1 ">
                  <p className="text-secondary text-xs">Degree Duration</p>
                  <p className="flex md:justify-start justify-end break text-xs md:text-base audio text-white">
                    {student?.education_details[3]?.start_year ? (
                      <>
                        {moment(
                          student?.education_details[3]?.start_year
                        ).format("YYYY")}
                        /{" "}
                        {moment(student?.education_details[3]?.end_year).format(
                          "YYYY"
                        )}
                      </>
                    ) : (
                      "--"
                    )}
                  </p>
                </div>
                <div className="flex justify-between lg:justify-start lg:flex lg:flex-col  lg:gap-1 ">
                  <p className="text-secondary text-xs">Study Medium</p>
                  <p className="flex md:justify-start justify-end break text-xs md:text-base audio text-white">
                    {" "}
                    {student?.education_details[3]?.medium
                      ? student?.education_details[3]?.medium
                      : "--"}
                  </p>
                </div>
                <div className="flex justify-between lg:justify-start lg:flex lg:flex-col  lg:gap-1 ">
                  <p className="text-secondary text-xs">Achieved %</p>
                  <p className="flex md:justify-start justify-end break text-xs md:text-base audio text-white">
                    {" "}
                    {student?.education_details[3]?.grade
                      ? student?.education_details[3]?.grade
                      : "--"}
                  </p>
                </div>
                <div className="flex justify-between lg:justify-start lg:flex lg:flex-col  lg:gap-1 ">
                  <p className="text-secondary text-xs">Backlogs #</p>
                  <p className="flex md:justify-start justify-end break text-xs md:text-base audio text-white">
                    {" "}
                    {student?.education_details[3]?.backlogs
                      ? student?.education_details[3]?.backlogs
                      : "--"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      {student?.asst_exam_sections && student?.asst_exam_sections.length > 0 ? (
        <Accordion
          key={uuid()}
          expanded={expanded === "third"}
          onChange={handleAccordian("third")}
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
              <p className=" audio my-2 mx-0 md:mx-3 gradient-text">
                My Assessments
              </p>
            </Typography>
          </AccordionSummary>

          <AccordionDetails className={classes.details}>
            <div className="flex flex-col gap-6">
              {student?.asst_exam_sections &&
                student?.asst_exam_sections.map((x, index) => (
                  <div className="bg-[#151929] rounded-lg p-4">
                    <p className={`audio text-white mb-1 break`}>
                      {index === 1
                        ? " ELP test"
                        : student?.level === "Under Graduation"
                        ? "Pre SAT/SAT/ACT"
                        : "GRE/GMAT"}{" "}
                      -{" "}
                      <span
                        className={` ${
                          x.label ==
                            "I wish to consider the tests but later!" ||
                          x.label ==
                            "I do not wish to consider the test for making applications**!"
                            ? "text-slider"
                            : "text-white"
                        }`}
                      >
                        {x.label || "NA"}
                      </span>
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
                              <p
                                className={`flex justify-end lg:justify-start break text-xs md:text-base audio text-white`}
                              >
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
