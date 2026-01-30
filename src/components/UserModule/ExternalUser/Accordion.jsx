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
import documentCloud from "../../../assets/user/document-cloud.svg";
import DeleteModal from "../../../common/DeleteModal";
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
  handleStatus,
  showDeleteModal,
  handleDelete,
  handleDeleteCancel,
  deleteUser,
  apiLoading,
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
                  <div className="text-white flex gap-4 font-audiowide items-center">
                    <div>
                      <img src={Green} alt="" />
                    </div>
                    <div>
                      <p className="text-white text-xs md:text-xl">
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
                        <p className="md:text-[16px] text-xs text-white break">
                          {item?.email}
                        </p>
                      </div>
                      <div className="w-full grid grid-cols-2 items-center">
                        <p className="opacity-50 md:text-[16px] text-xs text-white">
                          Staff Role:
                        </p>
                        <p className="md:text-[16px] text-xs break-all text-white">
                          {item?.role?.name}
                        </p>
                      </div>
                      <div className="w-full grid grid-cols-2 items-center">
                        <p className="opacity-50 md:text-[16px] text-xs text-white">
                          Document Status:
                        </p>
                        <p className="md:text-[16px] text-xs text-white">
                          <Status>{item?.document_status || "--"}</Status>
                        </p>
                      </div>

                      <div className="w-full grid grid-cols-2 items-center">
                        <p className="opacity-50 md:text-[16px] text-xs text-white">
                          Status :
                        </p>
                        <p className="md:text-[16px] text-xs text-white">
                          <div
                            className="bg-tab lg:py-3 py-0"
                            onClick={() => {
                              handleStatus(item);
                            }}
                          >
                            <ToggleButton
                              defaultChecked={item?.active}
                              value={item?.active}
                            />
                          </div>
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <span className="flex gap-4  justify-center items-center">
                        <Tooltip title="view Staff">
                          <Link
                            to={`/users/external/view/${encryptData(
                              item?.id
                            )}?user_type=2`}
                          >
                            <img
                              src={eye}
                              alt="icon"
                              className="w-6 cursor-pointer"
                            />
                          </Link>
                        </Tooltip>
                        <span className="h-8 border border-[#151929]"></span>
                        <Tooltip title="Delete">
                          <svg
                            width="21"
                            height="21"
                            viewBox="0 0 15 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="cursor-pointer"
                            onClick={(e) => handleDelete(e, item)}
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
      <DeleteModal
        open={showDeleteModal}
        handleClose={handleDeleteCancel}
        type="delete"
        handleActionButton={deleteUser}
        loading={apiLoading}
        title="Are you sure you want to delete the User?"
      />
    </div>
  );
}
