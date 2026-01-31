import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "../../../assets/leads/CloseIcon.svg";
import CustomButton from "../../../common/CustomButton";
import { SelectInput } from "../../../common/Select";
import img from "../../../assets/leads/img.jpg";
const AssignFormModal = ({ open, handleClose, type }) => {
  const leads = [
    {
      name: "h",
      id: 1,
    },
  ];
  return (
    <div className="w-full">
      <Dialog
        PaperProps={{ sx: { width: "100%", m: 2 } }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          width: "100%",
          padding: 0,
          borderRadius: "8px",
          "& .MuiPaper-root": {
            border: "1px solid #404050 !important",
            "border-radius": "8px !important",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ background: "#262938" }}>
          <div className="flex justify-between audio text-white">
            {type === "assign" ? (
              <div className="flex flex-col">
                <p className="text-[20px]">Assign to staff</p>
                <p className="text-[#6A6A78] text-[16px]">
                  Choose the staff member to allocate the lead
                </p>
              </div>
            ) : (
              <div className="flex flex-col mr-2">
                <p className="text-[20px]">
                  Responding to reassigning the request
                </p>
                <p className="text-[#6A6A78] text-[16px]">
                  Reallocation of lead to another staff member.
                </p>
              </div>
            )}
            <div className="cursor-pointer" onClick={handleClose}>
              <img src={CloseIcon} alt="" />
            </div>
          </div>
        </DialogTitle>
        <DialogContent sx={{ background: "#262938" }}>
          <DialogContentText id="alert-dialog-description">
            {type === "assign" ? (
              <div className="w-full bg-tab text-white p-6 rounded-lg flex flex-col gap-6">
                <SelectInput
                  options={leads}
                  // handleChange={handleSelect}
                  // value={params.role}
                  // error={!!formErrors.role}
                  // helperText={formErrors.role}
                  label="Select Staff type"
                  name="role"
                  bgcolor="#151929"
                />

                <SelectInput
                  options={leads}
                  // handleChange={handleSelect}
                  // value={params.role}
                  // error={!!formErrors.role}
                  // helperText={formErrors.role}
                  label="Select Staff "
                  name="role"
                  bgcolor="#151929"
                />
              </div>
            ) : (
              <div className="w-full text-white rounded-lg flex flex-col gap-6">
                <div className="w-full bg-tab text-white p-6 rounded-lg flex gap-2">
                  <img src={img} alt="" className="rounded-full w-9 h-9" />

                  <div>
                    <div className="flex flex-col gap-1">
                      <p className="audio text-[16px]">Preethi</p>
                      <p className="text-text audio text-[10px]">
                        11:45 AM 02/12/2021
                      </p>
                    </div>
                    <div>
                      <p className="text-white audio text-[14px]">
                        Today I am leave can you reassign for some other person.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-tab text-white p-6 rounded-lg flex flex-col gap-6">
                  Add Your notes
                </div>
                <div className="w-full bg-tab text-white p-6 rounded-lg flex flex-col gap-6">
                  <SelectInput
                    options={leads}
                    // handleChange={handleSelect}
                    // value={params.role}
                    // error={!!formErrors.role}
                    // helperText={formErrors.role}
                    label="Select Staff type"
                    name="role"
                    bgcolor="#151929"
                  />

                  <SelectInput
                    options={leads}
                    // handleChange={handleSelect}
                    // value={params.role}
                    // error={!!formErrors.role}
                    // helperText={formErrors.role}
                    label="Select Staff "
                    name="role"
                    bgcolor="#151929"
                  />
                </div>
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ background: "#262938" }}>
          <div className="w-full flex justify-center pb-6">
            <CustomButton
              variant="contained"
              size="large"
              borderRadius="8px"
              width="w-fit"
            >
              <p className="">
                {type === "assign" ? "Assign Now " : "Reassign"}
              </p>
            </CustomButton>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AssignFormModal;
