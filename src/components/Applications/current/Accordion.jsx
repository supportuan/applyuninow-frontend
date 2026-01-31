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
import Status from "../../../common/Status";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import eye from "../../../assets/leads/eye.svg";
import user from "../../../assets/leads/user.svg";
import deleteIcon from "../../../assets/leads/delete.svg";
// import AssignFormModal from "./AssignFormModal";
import DeleteModal from "../../../common/DeleteModal";
import info from "../../../assets/allstudents/info.svg";
import { encryptData } from "../../../utils/helpers";

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
                      <img src={item?.is_contacted ? Green : Red} alt="" />
                    </div>
                    <div >
                      <p className="text-white audio text-xs md:text-xl">
                        {item?.name}
                      </p>
                      <p className="text-white audio text-xs md:text-sm opacity-50">
                        {item?.status}
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
                          Student ID :
                        </p>
                        <p className="text-xs  text-white audio">
                          {item.id}
                        </p>
                      </div>
                      <div className="w-full grid grid-cols-2">
                        <p className="opacity-50 text-xs text-white audio">
                          Application Date :
                        </p>
                        <p className="text-xs text-white audio">
                          {moment(item.created_at).format("YYYY-MM-DD")}
                        </p>
                      </div>

                      <div className="w-full grid grid-cols-2">
                        <p className="opacity-50 text-xs text-white audio">
                          First Name:
                        </p>
                        <p className="text-xs text-white audio">
                          {item?.first_name}
                        </p>
                      </div>

                      <div className="w-full grid grid-cols-2">
                        <p className="opacity-50 text-xs text-white audio">
                          Last Name:
                        </p>
                        <p className="text-xs text-white audio">
                          {item?.last_name}
                        </p>
                      </div>
                      <div className="w-full grid grid-cols-2">
                        <p className="opacity-50 text-xs text-white audio">
                          Contact Phone:
                        </p>
                        <p className="text-xs text-white audio">
                          +91 {item?.phone}
                        </p>
                      </div>

                      <div className="w-full grid grid-cols-2">
                        <p className="opacity-50 text-xs text-white audio">
                          Study Destination:
                        </p>
                        <p className="text-xs text-white audio">
                          <img src={item?.flag} alt="flag" className="w-12" />
                        </p>
                      </div>

                      <div className="w-full grid grid-cols-2">
                        <p className="opacity-50 text-xs text-white audio">
                          Stage:
                        </p>
                        <p className="text-xs text-white audio">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <p>{item?.stage}  </p>
                              <div>
                                <img className="" src={info} alt="not done" />
                              </div>
                            </div>

                            <p>
                              &nbsp; • &nbsp;
                              {item?.stage_completed_task}/{item?.stage_total_task}  &nbsp; • &nbsp;

                            </p>
                          </div>


                        </p>
                      </div>



                      <div className="w-full grid grid-cols-2">
                        <p className="opacity-50 text-xs text-white audio">
                          Application Status :
                        </p>
                        <p className="text-xs text-white audio pr-2">
                          <Status>{item.status}</Status>
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <span className="flex gap-4  justify-center items-center">
                        <Tooltip title="view">
                          <Link to={`/students/view-student-detail/${encryptData(item?.id)}`}>
                            <img
                              src={eye}
                              alt="icon"
                              className="w-6 cursor-pointer"
                            />
                          </Link>
                        </Tooltip>
                        <span className="h-8 border border-[#151929]"></span>
                        <Tooltip title="delete">
                          <img
                            src={deleteIcon}
                            alt="icon"
                            className="w-5 cursor-pointer"
                            onClick={() => {
                              handleClickOpen(
                                "deleteMediumScreen",
                                true,
                                item?.id
                              );
                            }}
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


      {open.deleteMediumScreen ? (
        <DeleteModal
          open={open.deleteMediumScreen}
          handleClose={handleClose}
          type="delete"
          handleActionButton={handleDeleteOk}
          loading={loading}
          title=" Are you sure you want to delete the Lead?"
        />
      ) : (
        ""
      )}

      {open.archeiveMediumScreen ? (
        <DeleteModal
          open={open.archeiveMediumScreen}
          handleClose={handleClose}
          type="archeive"
          title=" Are you sure you want to delete the Lead?"
          loading={loading}
          handleActionButton={handleDeleteOk}
        />
      ) : (
        ""
      )}
    </div>
  );
}
