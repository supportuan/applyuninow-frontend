import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Arrow from "../../../assets/leads/Arrow.svg";
import Red from "../../../assets/leads/Red.svg";
import Green from "../../../assets/leads/Green.svg";
import moment from "moment";
import Button from "../../../common/Button";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import eye from "../../../assets/leads/eye.svg";
import user from "../../../assets/leads/user.svg";
import deleteIcon from "../../../assets/leads/delete.svg";
import Status from "../../../common/Status";
import ToggleButton from "../../ToggleButton/ToggleButton";
import Restore from "../../../assets/user/Restore.svg";
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

export default function CustomizedAccordions({
  data,
  handleDelete,
  handleRestore,
}) {
  const [expanded, setExpanded] = React.useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

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
                  <div className="text-white flex gap-4 font-audiowide items-center">
                    <div>
                      <img src={Green} alt="" />
                    </div>
                    <div>
                      <p className="text-white text-xs">
                        {item?.name}
                      </p>
                      <p className="text-white text-xs opacity-50">
                        {item?.phone}
                      </p>
                    </div>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div className="flex flex-col gap-6">
                    <div className="bg-[#151929] rounded-lg p-4 flex flex-col gap-6 font-audiowide w-full overflow-x-auto">
                      <div className="w-full grid grid-cols-2 items-center">
                        <p className="opacity-50 md:text-[16px] text-xs text-white">
                          Internal Staff ID:
                        </p>
                        <p className="md:text-[16px] text-xs text-white">
                          {item?.id}
                        </p>
                      </div>

                      <div className="w-full grid grid-cols-2 items-center">
                        <p className="opacity-50 md:text-[16px] text-xs text-white">
                          Staff Name:
                        </p>
                        <p className="md:text-[16px] text-xs text-white">
                          {item?.name}
                        </p>
                      </div>

                      <div className="w-full grid grid-cols-2 items-center">
                        <p className="opacity-50 md:text-[16px] text-xs text-white">
                          Phone Number:
                        </p>
                        <p className="md:text-[16px] text-xs text-white">
                          +91 {item?.phone}
                        </p>
                      </div>
                      <div className="w-full grid grid-cols-2 items-center">
                        <p className="opacity-50 md:text-[16px] text-xs text-white">
                          Email ID:
                        </p>
                        <p className="md:text-[16px] text-xs text-white">
                          {item?.email}
                        </p>
                      </div>
                      <div className="w-full grid grid-cols-2 items-center">
                        <p className="opacity-50 md:text-[16px] text-xs text-white">
                          Staff Role:
                        </p>
                        <p className="md:text-[16px] text-xs break-all text-white">
                          {item?.role?.name ? item?.role?.name : "--"}
                        </p>
                      </div>
                      <div className="w-full grid grid-cols-2 items-center">
                        <p className="opacity-50 md:text-[16px] text-xs text-white">
                          Document Status:
                        </p>
                        <p className="md:text-[16px] text-xs text-white">
                          <Status>{item?.document_status}</Status>
                        </p>
                      </div>

                      <div className="w-full grid grid-cols-2 items-center">
                        <p className="opacity-50 md:text-[16px] text-xs text-white">
                          Status :
                        </p>
                        <p className="md:text-[16px] text-xs text-white">
                          IN_ACTIVE
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <span className="flex gap-4 pr-4 justify-center items-center">
                        <Tooltip title="Restore">
                          <img
                            src={Restore}
                            alt="icon"
                            className="cursor-pointer"
                            onClick={(e) => handleRestore(e, item)}
                          />
                        </Tooltip>
                        <span className="h-6 border border-[#151929]"></span>
                        <Tooltip title="Delete">
                          <img
                            src={deleteIcon}
                            alt="icon"
                            className="cursor-pointer"
                            onClick={(e) => handleDelete(e, item)}
                          />
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

    </div>
  );
}
