import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Arrow from "../../../assets/leads/Arrow.svg";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

import DeleteModal from "../../../common/DeleteModal";

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

export default function Accordion1({
  data,
  handleDeleteOk,
  open,
  handleClose,
  handleClickOpen,
  loading,
}) {
  const [expanded, setExpanded] = React.useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="flex flex-col gap-4">
      {data.map((item, index) => {
        return (
          <div>
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
                      <p className="text-white audio text-xs">
                        {item?.name}
                      </p>
                    </div>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div className="flex flex-col gap-6">
                    <div className="bg-[#151929] rounded-lg p-4 flex flex-col gap-6">
                      <div className="w-full grid grid-cols-2">
                        <p className="opacity-50 text-xs text-white audio">
                          Name:
                        </p>
                        <p className="text-xs text-white audio">
                          {item?.name}
                        </p>
                      </div>

                      <div className="w-full grid grid-cols-2">
                        <p className="opacity-50 text-xs text-white audio">
                          Study Industry:
                        </p>
                        <p className="text-xs text-white audio">
                          {item?.industry ? item?.industry?.name : "--"}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center">
                     

                      <span className="flex gap-2 justify-center cursor-pointer">
                <Tooltip title="edit">
                    <svg
                      width="23"
                      height="23"
                      viewBox="0 0 23 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => {
                        handleClickOpen("edit", true, item);
                      }}
                    >
                      <path
                        d="M14.4721 0.215089C14.1853 -0.0716964 13.7204 -0.0716964 13.4336 0.215089L9.54671 4.10196L17.9289 12.4841L21.8157 8.59724C22.1025 8.31045 22.1025 7.84548 21.8157 7.5587L14.4721 0.215089Z"
                        fill="#FE9705"
                      />
                      <path
                        d="M0 13.6487L8.50817 5.1405L16.8903 13.5227L8.38215 22.0308H0.734361C0.328784 22.0308 0 21.702 0 21.2965V13.6487Z"
                        fill="#FE9705"
                      />
                      <path
                        d="M11.7498 22.0308H22.0308V20.5621H11.7498V22.0308Z"
                        fill="#FE9705"
                      />
                    </svg>
                  </Tooltip>
                  <span className="h-8 border border-[#262938] "></span>
                  <Tooltip title="Archive">
                    <svg
                      width="23"
                      height="23"
                      viewBox="0 0 15 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="cursor-pointer"
                      onClick={() => {
                        handleClickOpen("archeiveLargeScreen", true, item?.id);
                      }}
                    >
                      <path
                        d="M1.81763 16C1.81763 17.1 2.71763 18 3.81763 18H11.8176C12.9176 18 13.8176 17.1 13.8176 16V6C13.8176 4.9 12.9176 4 11.8176 4H3.81763C2.71763 4 1.81763 4.9 1.81763 6V16ZM13.8176 1H11.3176L10.6076 0.29C10.4276 0.11 10.1676 0 9.90763 0H5.72763C5.46763 0 5.20763 0.11 5.02763 0.29L4.31763 1H1.81763C1.26763 1 0.817627 1.45 0.817627 2C0.817627 2.55 1.26763 3 1.81763 3H13.8176C14.3676 3 14.8176 2.55 14.8176 2C14.8176 1.45 14.3676 1 13.8176 1Z"
                        fill="#EF4949"
                      />
                    </svg>
                  </Tooltip>
                </span>
                    </div>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        );
      })}

      {open?.archeiveMediumScreen ? (
        <DeleteModal
          open={open.archeiveMediumScreen}
          handleClose={handleClose}
          type="archeive"
          title=" Are you sure you want to Delete the Study Industry?"
          loading={loading}
          handleActionButton={handleDeleteOk}
        />
      ) : (
        ""
      )}
    </div>
  );
}
