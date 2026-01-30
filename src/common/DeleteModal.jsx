import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "../assets/leads/CloseIcon.svg";
import CustomButton from "./CustomButton";

const DeleteModal = ({
  open,
  handleClose,
  handleActionButton,
  loading,
  title,
}) => {
  return (
    <div className="w-full rounded-lg">
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
          <div className="flex justify-between audio text-white mt-4 px-7 py-4">
            <p className="mr-4 text-[14px] lg:text-[20px]">{title}</p>
            <div className="cursor-pointer" onClick={handleClose}>
              <img src={CloseIcon} alt="" />
            </div>{" "}
          </div>

          <hr />
        </DialogTitle>
        <DialogActions sx={{ background: "#262938" }}>
          <div className="w-full flex justify-center pb-6 gap-4">
            <CustomButton
              variant="outlined"
              size="large"
              borderRadius="8px"
              width="w-fit"
              onClick={handleClose}
              bgcolor="#262938"
              disabled={loading}
            >
              <p className="gradient-text">No</p>
            </CustomButton>

            <CustomButton
              variant="contained"
              size="large"
              borderRadius="8px"
              width="w-fit"
              onClick={handleActionButton}
              disabled={loading}
            >
              Yes
            </CustomButton>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteModal;
