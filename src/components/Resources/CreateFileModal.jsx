import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "../../assets/leads/CloseIcon.svg";
import CustomButton from "../../common/CustomButton";
import { Input } from "../../common/InputBox";
import FileUpload from "../../common/FileUploader";
const CreateFileModal = ({ open, handleClose, params, formErrors, handleChange, handleImage, handleSubmit, deleteFile, isLoading, selectedId }) => {
  return (
    <div className="w-full">
      <Dialog
        PaperProps={{ sx: { width: '100%', m: 0, p: 0 } }}
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
          sx={{ background: "#262938", margin: 0, }}
        >
          <div className="flex justify-between audio text-white">
            {selectedId ? 'Update File' : '+ File'}
            <div className="cursor-pointer" onClick={handleClose}>
              <img src={CloseIcon} alt="" />
            </div>
          </div>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent
            sx={{
              background: "#262938",
              width: "100%",
              margin: 0,
            }}
          >
            <DialogContentText id="alert-dialog-description">
              <div className=" w-full bg-tab text-white p-4 rounded-lg flex flex-col gap-6">
                <Input
                  disabled={false}
                  readOnly={false}
                  name="name"
                  label="File Name"
                  value={params.name}
                  handleChange={handleChange}
                  error={formErrors.name}
                  helperText={formErrors.name}
                  bgcolor="#262938"
                />

                <FileUpload
                  styleType="md"
                  setImage={handleImage}
                  removeImage={deleteFile}
                  acceptMimeTypes={["application/pdf"]}
                  title="Attach Document Here"
                  label="File Format:pdf"
                  id="folder"
                  maxSize={5}
                  imageUrl={params.url}
                  filename="url"
                  error={formErrors.url}
                />
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
        </form>
      </Dialog>
    </div>
  );
};

export default CreateFileModal;
