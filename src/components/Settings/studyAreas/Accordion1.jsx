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
                      <p className="text-white w-[300px] audio text-xs text-ellipsis">
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
                          Study Area Name:
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
                          {item?.industry?.name || "--"}
                        </p>
                      </div>

                      <div className="w-full grid grid-cols-2">
                        <p className="opacity-50 text-xs text-white audio">
                          Study Sub Industry:
                        </p>
                        <p className="text-xs text-white audio">
                        {item?.sub_industry?.name || "--"}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      {/* <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                          handleClickOpen(
                            "archeiveMediumScreen",
                            true,
                            item?.id
                          );
                        }}
                      >
                        <path
                          d="M15.7997 2.21048C15.3897 1.80048 14.6797 2.08048 14.6797 2.65048V6.14048C14.6797 7.60048 15.9197 8.81048 17.4297 8.81048C18.3797 8.82048 19.6997 8.82048 20.8297 8.82048C21.3997 8.82048 21.6997 8.15048 21.2997 7.75048C19.8597 6.30048 17.2797 3.69048 15.7997 2.21048Z"
                          fill="#FFE15A"
                        />
                        <path
                          d="M14.7596 19.2618C12.4096 19.4318 12.4096 22.8318 14.7596 23.0018H20.3196C20.9896 23.0018 21.6496 22.7518 22.1396 22.3018C23.7896 20.8618 22.9096 17.9818 20.7396 17.7118C19.9596 13.0218 13.1796 14.8018 14.7796 19.2718"
                          fill="#FFE15A"
                        />
                        <path
                          d="M21.5 11.19V14.44C21.5 14.74 21.06 14.88 20.84 14.67C20.36 14.2 19.77 13.84 19.09 13.63C17.41 13.11 15.46 13.62 14.25 14.9C13.44 15.74 13.03 16.81 13.04 17.97C13.04 18.16 12.95 18.33 12.8 18.44C12 19.05 11.5 20.01 11.5 21.12C11.5 21.2 11.5 21.28 11.51 21.36C11.53 21.68 11.3 21.99 10.97 21.99H8.07C4.99 21.99 2.5 19.99 2.5 16.42V7.57C2.5 4 4.99 2 8.07 2H12.31C12.86 2 13.31 2.45 13.31 3V5.89C13.31 8.27 15.23 10.19 17.61 10.19H20.5C21.05 10.19 21.5 10.64 21.5 11.19Z"
                          fill="#FFE15A"
                        />
                      </svg> */}

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
                  <Tooltip title="Delete">
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
          title=" Are you sure you want to delete the Study Area?"
          loading={loading}
          handleActionButton={handleDeleteOk}
        />
      ) : (
        ""
      )}
    </div>
  );
}
