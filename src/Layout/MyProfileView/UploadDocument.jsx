import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import close from "../../assets/user/close.svg";
import CustomButton from "../../common/CustomButton";
import FileUpload from '../../common/FileUpload'

const UploadDocument = ({
  open,
  handleClose,
  handleImage,
  removeImage,
  handleSubmit,
  formErrors,
  apiLoading,
  params
}) => {

  return (
    <div className="w-full">
      <Dialog
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
            <div className="flex flex-col">
              <p className="text-sm md:text-[20px]">KYC Documents</p>
            </div>
            <div className="cursor-pointer" onClick={handleClose}>
              <img src={close} alt="" />
            </div>
          </div>
        </DialogTitle>
        <DialogContent sx={{ background: "#262938" }}>
          <DialogContentText id="alert-dialog-description">
            <div className="w-full md:w-[500px] bg-tab text-white p-6 rounded-lg flex flex-col gap-6 audio">
              <div>
                <p className="mb-2 text-sm">{params.name} :</p>
                <FileUpload
                  styleType='md'
                  setImage={handleImage}
                  acceptMimeTypes={['application/pdf']}
                  title='Drag and Drop PDF here'
                  label='File Format:.pdf'
                  id='payslip'
                  maxSize={5}
                  filename='payslip'
                  bgcolor='#151929'
                  error={!!formErrors?.image}
                  removeImage={removeImage}
                />
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ background: "#262938" }}>
          <div className="w-full flex justify-center pb-6">
            <CustomButton
              variant="contained"
              size="large"
              borderRadius="8px"
              width="w-fit"
              onClick={handleSubmit}
              disabled={apiLoading}
            >
              <p className="">
                Submit
              </p>
            </CustomButton>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UploadDocument;
