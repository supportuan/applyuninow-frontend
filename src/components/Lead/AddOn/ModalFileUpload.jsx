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
const FileUploadModal = ({
  open,
  handleClose,
  handleSubmit,
  handleImage,
  params,
  handleChange,
  formErrors,
  handleRemoveAdditionalDoc
}) => {
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
            + Folder
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
              <Input
                disabled={false}
                readOnly={false}
                name="label"
                label="File Name"
                value={params.label}
                handleChange={(e) => {
                  handleChange(e, "image");
                }}
                error={formErrors.label}
                helperText={formErrors.label}
                bgcolor="#262938"
              />

              <FileUpload
                styleType="md"
                setImage={handleImage}
                removeImage={() => handleRemoveAdditionalDoc() }
                acceptMimeTypes={["image/jpeg", "image/png"]}
                title="Drag and Drop PDF here"
                label="File Format:Pdf"
                id="folder"
                maxSize={5}
                imageUrl={undefined}
                filename="folder"
                error={formErrors?.url}
              />
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
            >
              <p className="">Submit</p>
            </CustomButton>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FileUploadModal;
