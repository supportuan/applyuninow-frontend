import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import { Input } from "../../common/InputBox";
import CustomButton from "../../common/CustomButton";
import Close from "../../assets/application/Close.svg";
import ModulesAccess from "./ModuleAccess";
import RadioButton from "./RadioButton";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "100%",
    alignItems: "center",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },

  dialogCustomizedWidth: {
    "max-width": "80%",
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, type, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 3 }} {...other}>
      {children}
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[600],
        }}
      >
        <img src={Close} alt="" />
      </IconButton>
    </DialogTitle>
  );
};
const PopUp = ({
  open,
  handleClose,
  type,
  submit,
  setParams,
  params,
  handleRootChange,
  handleChildChange,
  handleChange,
  formErrors,
}) => {
  return (
    <div>
      <BootstrapDialog
        sx={{
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(5px)",
          },
        }}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          sx: {
            width: "80%",
            m: 0,
            backgroundColor: "#404050;",
            alignItems: "center",
            borderColor: "arsenic",
          },
        }}
      >
        <BootstrapDialogTitle onClose={handleClose} type={type}>
          <div className="flex justify-start">
            <p className="font-bold font-nunitoRegular flex justify-start text-white absolute top-2 left-6">
              {params.id ? "Update User Role" : "Create User Role"}
            </p>
          </div>
        </BootstrapDialogTitle>
        <DialogContent>
          <div className="flex flex-col mt-2 gap-10  rounded-2">
            <div className="w-full  bg-[#151929] p-6 rounded-lg flex flex-col gap-6">
              <Input
                rows={1}
                width="w-full"
                disabled={false}
                readOnly={false}
                error={!!formErrors?.name}
                value={params?.name}
                handleChange={handleChange}
                helperText={formErrors?.name}
                label="Enter the User Role"
                name="name"
              />

              <div className="divstyles border border-[#404050] p-6 rounded-lg">
                <div>
                  <p className="text-white text-s font-nunitoRegular mb-2">
                    <u>Select the level that user can Access:</u>
                  </p>
                  <RadioButton
                    onChange={handleChange}
                    defaultValue={params.role}
                  />
                </div>
              </div>

              <div className="divstyles">
                <div>
                  <p className="text-white text-s font-nunitoRegular mb-2">
                    <u>Select the Module that user can Access:</u>
                  </p>
                </div>

                <ModulesAccess
                  params={params}
                  handleChildChange={handleChildChange}
                  handleRootChange={handleRootChange}
                />
              </div>
            </div>
          </div>
        </DialogContent>

        <div className="flex justify-center pt-2 pb-10 h-[72px]">
          <CustomButton
            onClick={submit}
            width="w-full"
            variant="contained"
            size="large"
          >
            {params.id ? " Update " : "Submit"}
          </CustomButton>
        </div>
      </BootstrapDialog>
    </div>
  );
};

export default PopUp;
