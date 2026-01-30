import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "../../../assets/leads/CloseIcon.svg";
import CustomButton from "../../../common/CustomButton";
import { SelectInput } from "../../../common/Select";
import TextArea from "../../../common/TextArea";
import moment from 'moment'

import img from "../../../assets/leads/img.jpg";
const AssignFormModal = ({ open, handleClose, type, users, params, handleChange, onSubmit, isLoading, label }) => {
 
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
            {
              type === "assign" &&
              <div className="flex flex-col">
                <p className="text-[20px]">Assign to staff</p>
                <p className="text-[#6A6A78] text-[16px]">
                  Choose the staff member to allocate the lead
                </p>
              </div>
            }
            {
              type === "reassign" &&
              <div className="flex flex-col mr-2">
                <p className="text-[20px]">
                  Responding to reassigning the request
                </p>
                <p className="text-[#6A6A78] text-[16px]">
                  Reallocation of lead to another staff member.
                </p>
              </div>
            }
            {
              type === "exe_cancel" &&
              <div className="flex flex-col mr-2">
                <p className="text-[20px]">
                  reassigning the Lead request
                </p>
                <p className="text-[#6A6A78] text-[16px]">
                  Reallocation of lead to another staff member.
                </p>
              </div>
            }
            <div className="cursor-pointer" onClick={handleClose}>
              <img src={CloseIcon} alt="" />
            </div>
          </div>
        </DialogTitle>
        <DialogContent sx={{ background: "#262938" }}>
          <DialogContentText id="alert-dialog-description">


            {type === "assign" &&
              <div className="w-full bg-tab text-white p-6 rounded-lg flex flex-col gap-6">
                <SelectInput
                  options={users}
                  handleChange={handleChange}
                  value={params?.assigned_to}
                  label="Select Staff "
                  name="assigned_to"
                  bgcolor="#151929"
                />
              </div>
            }
            {
              type === 'reassign' &&
              <div className="w-full text-white rounded-lg flex flex-col gap-6">
                <div className="w-full bg-tab text-white p-6 rounded-lg flex gap-2">
                <div className="w-10 h-10 bg-slider rounded-full flex justify-center items-center">
                          <p className="p-4">{params?.re_assign_user?.name?.charAt(0)}</p>
                        </div>
                  <div>
                    <div className="flex flex-col gap-1">
                      <p className="audio text-[16px]">{params.re_assign_user?.name || '--'}</p>
                      <p className="text-text audio text-[10px]">
                        {moment(params?.re_assign_date).format('LT ; YYYY/MM/DD')}
                      </p>
                    </div>
                    <div>
                      <p className="text-white audio text-[14px] break-all">
                        {params.re_assign_notes}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-tab text-white p-6 rounded-lg flex flex-col gap-6">
                  <SelectInput
                    options={users}
                    handleChange={handleChange}
                    value={params?.assigned_to}
                    label="Select Staff "
                    name="assigned_to"
                    bgcolor="#151929"
                  />
                </div>
              </div>
            }
            {
              type === 'exe_cancel' &&
              <div className='w-full rounded-lg flex flex-col gap-6 p-4'>
                <TextArea
                  placeholder='Enter the Reason for Reassigning'
                  name='notes'
                  rows={7}
                  handleChange={handleChange}
                  value={params?.notes}
                />
              </div>

            }
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ background: "#262938" }}>
          <div className="w-full flex justify-center pb-6">
            {
              isLoading ?
                <CustomButton
                  variant="contained"
                  size="large"
                  borderRadius="8px"
                  width="w-fit"
                >
                  <p className="">
                    Loading...
                  </p>
                </CustomButton> :
                <CustomButton
                  variant="contained"
                  size="large"
                  borderRadius="8px"
                  width="w-fit"
                  onClick={onSubmit}
                >
                  <p className="">
                    {label}
                  </p>
                </CustomButton>
            }

          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AssignFormModal;
