import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Arrow from "../../assets/leads/Arrow.svg";
import Red from "../../assets/leads/Red.svg";
import Green from "../../assets/leads/Green.svg";
import moment from "moment";
import Button from "../../common/Button";
import Status from "../../common/Status";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import eye from "../../assets/leads/eye.svg";
import user from "../../assets/leads/user.svg";
import deleteIcon from "../../assets/leads/delete.svg";

import DeleteModal from "../../common/DeleteModal";
import { useState } from "react";
import { useEffect } from "react";
import { loginUser } from "../../utils";
import { encryptData } from "../../utils/helpers";
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid #404050`,
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    sx={{ borderRadius: "8px" }}
    expandIcon={<img src={Arrow} alt="icon" />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "#262938",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
  "& .MuiButtonBase-root-MuiAccordionSummary-root": {
    borderRadius: `8px`,
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export default function CustomizedAccordions({
  data,
}) {
  const [expanded, setExpanded] = React.useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let loggedUser = loginUser();
    if (loggedUser) {
      let user = JSON.parse(loggedUser);
      if (user.role_slug === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {data.map((item, index) => {
        return (
          <div key={index}>
            <Accordion
              expanded={expanded === index}
              onChange={handleChange(index)}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>
                  <div className="text-white flex gap-4  items-center">
                    <div>
                      <img src={Green} alt="" />
                    </div>
                    <div>
                      <p className="text-white audio text-xs">
                        {item?.student?.name}
                      </p>
                      <p className="text-white audio text-xs opacity-60 mt-1">
                        {moment(item?.created_at).format("LT DD/MM/YYYY")}
                      </p>
                    </div>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div className="flex flex-col gap-6">
                    <div className="bg-[#151929] rounded-lg p-4 flex flex-col gap-6 ">
                      <div className="w-full grid grid-cols-2">
                        <p className="opacity-50 text-xs text-white audio">
                          student ID:
                        </p>
                        <p className="text-xs text-white audio">
                          {item?.id || "--"}
                        </p>
                      </div>

                      <div className="w-full grid grid-cols-2">
                        <p className="opacity-50 text-xs text-white audio">
                          Student Name:
                        </p>
                        <p className="text-xs text-white audio break">
                          {item?.student?.name}
                        </p>
                      </div>

                      <div className="w-full grid grid-cols-2">
                        <p className="opacity-50 text-xs text-white audio">
                          Phone Number:
                        </p>
                        <p className="text-xs text-white audio">
                          {item?.student?.phone || "--"}
                        </p>
                      </div>
                      <div className="w-full grid grid-cols-2">
                        <p className="opacity-50 text-xs text-white audio">
                          Email ID:
                        </p>
                        <p className="text-xs text-white audio break">
                          {item?.student?.email || "--"}
                        </p>
                      </div>
                      <div className="w-full grid grid-cols-2">
                        <p className="opacity-50 text-xs text-white audio">
                          Submitted On:
                        </p>
                        <p className="text-xs break-all text-white audio">
                          <p className="break-words">
                            {moment(item?.created_at).format("LT")}
                          </p>
                          <p className="break-words">
                            {moment(item.created_at).format("DD/MM/YYYY")}
                          </p>
                        </p>
                      </div>
                      <div className="w-full grid grid-cols-2">
                        <p className="opacity-50 text-xs text-white audio">
                          Rating:
                        </p>
                        <p className="text-xs text-white audio">
                          <span className="flex gap-1  items-center">
                            <p className="audio text-[#FFE15A] text-[18px]">
                              {item?.rating || '--'}
                            </p>
                            <svg
                              width="18"
                              height="17"
                              viewBox="0 0 18 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.11555 0.676341C8.49076 -0.0348058 9.50924 -0.0348076 9.88445 0.676339L11.827 4.35822C11.9717 4.63247 12.2355 4.82408 12.541 4.87694L16.643 5.58669C17.4352 5.72377 17.75 6.69241 17.1896 7.26901L14.2882 10.2543C14.0721 10.4766 13.9713 10.7867 14.0155 11.0936L14.6081 15.2141C14.7225 16.01 13.8985 16.6086 13.177 16.2538L9.44125 14.417C9.16299 14.2801 8.83701 14.2801 8.55875 14.417L4.82301 16.2538C4.10146 16.6086 3.27749 16.01 3.39194 15.2141L3.98451 11.0936C4.02865 10.7867 3.92792 10.4766 3.71181 10.2543L0.81042 7.26901C0.250025 6.69241 0.564752 5.72377 1.35704 5.58669L5.45901 4.87694C5.76455 4.82408 6.02827 4.63247 6.17297 4.35822L8.11555 0.676341Z"
                                fill="#FFE15A"
                              />
                            </svg>
                          </span>
                        </p>
                      </div>

                      <div className="w-full grid grid-cols-2">
                        <p className="opacity-50 text-xs text-white audio">
                          Comment:
                        </p>
                        <p className="text-xs text-white audio break-all">
                          {item?.feedback}
                        </p>
                      </div>
                    </div>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        );
      })}
    </div>
  );
}
