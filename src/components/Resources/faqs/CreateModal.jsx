import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "../../../assets/leads/CloseIcon.svg";
import CustomButton from "../../../common/CustomButton";
import { Input } from "../../../common/InputBox";
import FileUpload from "../../../common/FileUploader";
import { SelectInput } from "../../../common/Select";
import TextArea from "../../../common/TextArea";
const Modal = ({ open, handleClose, params, countries, formErrors, handleChange, isLoading, handleSubmit, selectedId }) => {
  const leads = [
    {
      name: "h",
      id: 1,
    },
  ];
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
            + FAQ
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
            <div className=" w-full bg-tab text-white p-4 rounded-lg flex flex-col gap-4">
              <SelectInput
                options={countries}
                handleChange={handleChange}
                value={params.country_id}
                error={formErrors.country_id}
                helperText={formErrors.country_id}
                label="Select Country"
                name="country_id"
              />
              <div className="flex flex-col gap-1">
                <p className="audio">Question</p>
                <TextArea
                  disabled={false}
                  readOnly={false}
                  name="query"
                  label="Enter Your Questions here"
                  placeholder="Enter Your Questions here"
                  value={params.query}
                  error={formErrors.query}
                  helperText={formErrors.query}
                  handleChange={handleChange}
                  rows={4}
                />
              </div>

              <div className="flex flex-col gap-1">
                <p className="audio">Solution</p>
                <TextArea
                  disabled={false}
                  readOnly={false}
                  name="solution"
                  label="Enter Your Solution here"
                  placeholder="Enter Your Solution here"
                  value={params.solution}
                  error={formErrors.solution}
                  helperText={formErrors.solution}
                  handleChange={handleChange}
                  rows={4}
                />
              </div>
            </div>
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
                  <p className="">Loading</p>
                </CustomButton> :
                <CustomButton
                  onClick={handleSubmit}
                  variant="contained"
                  size="large"
                  borderRadius="8px"
                  width="w-fit"
                  disabled={isLoading}
                >
                  <p className="">
                    {selectedId ? 'Update' : 'Submit'}

                  </p>
                </CustomButton>
            }

          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
