

import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import CloseIcon from "../../../../assets/leads/CloseIcon.svg";

import CustomButton from "../../../../common/CustomButton";
import { Input } from "../../../../common/InputBox";
import FileUpload from "../../../../common/FileUploader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import MaterialUIPickers from "../../../../common/Calendar";
import MonthYearPicker from "./Year";

const CreateModal = ({
  open,
  handleClose,
  monthYear,
  handleDateChange,
  handleImage,
  removeImage,
  handleSubmit,
  formErrors,
  params,
  apiLoading,
}) => {
  console.log(params);
  return (
    <div className="w-full">
      <Dialog
        PaperProps={{ sx: { width: "100%", m: 0, p: 0 } }}
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
          margin: 0,
          p: 2,
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ background: "#262938", margin: 0, p: 2 }}
        >
          <div className="flex justify-between audio text-white">
            Upload Payslip
            <div className="cursor-pointer" onClick={handleClose}>
              <img src={CloseIcon} alt="" />
            </div>
          </div>
        </DialogTitle>
        <DialogContent
          sx={{
            background: "#262938",
            width: "100%",
            margin: 0,
          }}
        >
          <DialogContentText id="alert-dialog-description">
            <div className=" w-full bg-tab text-white px-2 py-4 rounded-lg flex flex-col gap-6">
              <MonthYearPicker
                handleChange={(date) => {
                  handleDateChange(date);
                }}
                value={params.payslip_month}
                name="payslip_month
                "
              />

              <FileUpload
                styleType="md"
                setImage={handleImage}
                acceptMimeTypes={["application/pdf"]}
                title="Drag and Drop PDF here"
                label="File Format:.pdf"
                id="payslip"
                maxSize={5}
                filename="payslip"
                bgcolor="#151929"
                error={!!formErrors?.payslip}
                removeImage={removeImage}
              />

              {/* <ViewsDatePicker/> */}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ background: "#262938" }}>
          <div className="w-full flex justify-center pb-6">
            {apiLoading ? (
              <CustomButton
                variant="contained"
                size="large"
                borderRadius="8px"
                width="w-fit"
              >
                <p className="">Loading...</p>
              </CustomButton>
            ) : (
              <CustomButton
                variant="contained"
                size="large"
                borderRadius="8px"
                width="w-fit"
                onClick={handleSubmit}
              >
                <p className="">Submit</p>
              </CustomButton>
            )}
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateModal;
