import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseSquareLight from "../../assets/user/CloseSquareLight.svg";
import CustomButton from "../../common/CustomButton";
import { Input } from "../../common/InputBox";
import FileUpload from "../../common/FileUpload";
import Validator from "validatorjs";
import api from "../../api/index";
import { environment } from "../../environments/environment";
import { toast } from "react-toastify";
// const useStyles = makeStyles(() => ({
//   root: {

//   },

// }));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "100%",
    alignItems: "center",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    backgroundColor: "#404050",
  },
  dialogCustomizedWidth: {
    "max-width": "80%",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "10px !important",
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, type, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, py: 3 }} {...other}>
      {children}
      {onClose ? (
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
          <img src={CloseSquareLight} alt="" />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
const EditProfile = ({
  editProfile,
  handleClose,
  getUsersData,
  params,
  isLoading,
}) => {
  const [meta, setMeta] = useState({
    tab: "BasicInfo",
  });

  const intialValues = {
    name: "",
    phone: "",
    image: "",
    new_pwd: "",
    confirm_pwd: "",
  };

  const [inputs, setInputs] = useState(params);
  const [userImage, setUserImage] = useState("");
  const [formErrors, setFormErrors] = useState(intialValues);

  const handleChange = (e) => {
    setFormErrors(intialValues);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const updateProfile = (e) => {
    e.preventDefault();
    let postdata = {};
    if (inputs.image === "") {
      postdata = {
        name: inputs.name,
        phone: inputs.phone,
      };
    } else {
      postdata = {
        name: inputs.name,
        phone: inputs.phone,
        user_image: inputs.image,
      };
    }
    let validation = new Validator(postdata, {
      name: "required|string|max:30",
      phone: "required|numeric|digits:10",
    });
    if (validation.fails()) {
      const fieldErrors = {};
      for (let key in validation.errors.errors) {
        fieldErrors[key] = validation.errors.errors[key][0];
      }
      setFormErrors(fieldErrors);
      return false;
    }

    const formData = new FormData();

    Object.entries(postdata).forEach(([key, value]) => {
      if (!["user_image"].includes(key)) {
        formData.append(`${key}`, `${value}`);
      }
    });

    if (userImage) {
      formData.append("user_image", userImage);
    }else{
      formData.append("image", inputs.image);
    }

    setFormErrors({});
    updateUserProfile(formData);
    return true;
  };

  const updateUserProfile = (payload) => {
    // setLoading(true)
    api
      .put(
        `${environment.API_BASE_URL}/admin/users/profile/update-profile`,
        payload
      )
      .then((res) => {
        // setLoading(false)
        console.log(res);
        toast.success(res.data.message);
        handleClose();
        getUsersData();
      })
      .catch((error) => {
        const { errors } = error.response.data;
        const erroMsg = errors[Object.keys(errors)[0]] || error.statusText;
        toast.error(erroMsg);
      });
  };

  const updatePassword = (e) => {
    e.preventDefault();
    const postdata = {
      password: inputs.new_pwd,
      password_confirmation: inputs.confirm_pwd,
    };
    let validation = new Validator(postdata, {
      password: "required|min:8|max:14|confirmed",
      password_confirmation: "required|min:8|max:14",
    });
    if (validation.fails()) {
      const fieldErrors = {};
      for (let key in validation.errors.errors) {
        fieldErrors[key] = validation.errors.errors[key][0];
      }
      setFormErrors(fieldErrors);
      return false;
    }

    setFormErrors({});
    updateUserPwd(postdata);
    return true;
  };

  const handleImage = (data) => {
    setUserImage(data.file);
    setInputs({ ...inputs, image: data.url });
  };

  const removeImage = () => {
    setUserImage("");
    setInputs({ ...inputs, image: "" });
  };

  const updateUserPwd = (payload) => {
    // setLoading(true);
    api
      .put(
        `${environment.API_BASE_URL}/admin/users/profile/change-password`,
        payload
      )
      .then((res) => {
        // setLoading(false);
        toast.success(res.data.message);
        handleClose();
        getUsersData();
      })
      .catch((error) => {
        const { errors } = error.response.data;
        const erroMsg = errors[Object.keys(errors)[0]] || error.statusText;
        toast.error(erroMsg);
      });
  };

  return (
    <div>
      <div>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={editProfile}
          PaperProps={{
            sx: { m: 0, backgroundColor: "#262938", alignItems: "center" },
          }}
        >
          <BootstrapDialogTitle onClose={handleClose}>
            <div className="flex justify-start mb-2">
              <p className="audio flex justify-start text-white absolute top-3 left-6">
                Edit Profile
              </p>
            </div>
          </BootstrapDialogTitle>
          <DialogContent>
            <div className="">
              <div className="w-[325px] lg:w-[496px]  bg-[#151929]  rounded-t-lg rounded-b-lg flex flex-col">
                <div className=" flex justify-evenly bg-lightbg rounded-t-lg border-[1px] border-border">
                  <div
                    className={`cursor-pointer border-border w-full ${
                      meta.tab === "BasicInfo"
                        ? "border-b-l-gradient"
                        : "border-r"
                    }`}
                  >
                    <p
                      onClick={() => setMeta({ tab: "BasicInfo" })}
                      className={`py-3 text-center ${
                        meta.tab === "BasicInfo"
                          ? "gradient-text"
                          : "text-white"
                      }`}
                    >
                      Basic Info
                    </p>
                  </div>
                  <div
                    className={` cursor-pointer border-border w-full  ${
                      meta.tab === "ChangePwd"
                        ? "border-b-r-gradient"
                        : "border-l"
                    }`}
                  >
                    <p
                      onClick={() => setMeta({ tab: "ChangePwd" })}
                      className={` py-3   text-center  ${
                        meta.tab === "ChangePwd"
                          ? "gradient-text"
                          : "text-white"
                      } `}
                    >
                      Change Password
                    </p>
                  </div>
                </div>
                {meta.tab === "BasicInfo" && (
                  <>
                    <div className="p-4  mt-4">
                      <Input
                        rows={1}
                        bgcolor="#151929"
                        value={inputs?.name}
                        handleChange={handleChange}
                        label="Name"
                        name="name"
                        error={formErrors?.name}
                        helperText={formErrors?.name}
                      />
                    </div>
                    <div className="p-4 ">
                      <Input
                        rows={1}
                        bgcolor="#151929"
                        value={inputs?.phone}
                        handleChange={handleChange}
                        label="Phone Number"
                        name="phone"
                        error={formErrors?.phone}
                        helperText={formErrors?.phone}
                      />
                    </div>
                    <div className="p-4 ">
                      <p className="text-white mb-2">Display Image</p>
                      <FileUpload
                        filename="image"
                        styleType="md"
                        setImage={handleImage}
                        acceptMimeTypes={["image/jpeg"]}
                        title="Drag and Drop Image here"
                        label="File Format: .jpeg/ .png"
                        id="image"
                        maxSize={5}
                        removeImage={removeImage}
                        bgcolor="#151929"
                        imageUrl={inputs?.image}
                      />
                    </div>
                    <div className="flex justify-center pt-2 pb-6">
                      <CustomButton
                        onClick={updateProfile}
                        width="w-fit"
                        variant="contained"
                        size="medium"
                        disabled={isLoading}
                      >
                        Update Details
                      </CustomButton>
                    </div>
                  </>
                )}
                {meta.tab === "ChangePwd" && (
                  <>
                    <div className="p-4  mt-4">
                      <p className="text-white mb-5">
                        Change your Password Here:
                      </p>
                      <Input
                        rows={1}
                        disabled={false}
                        readOnly={false}
                        bgcolor="#151929"
                        value={inputs?.new_pwd}
                        handleChange={handleChange}
                        label="New Password"
                        name="new_pwd"
                        error={formErrors?.password}
                        helperText={formErrors?.password}
                      />
                    </div>
                    <div className="pl-4 pr-4 pt-2 mb-5 ">
                      <Input
                        rows={1}
                        disabled={false}
                        readOnly={false}
                        bgcolor="#151929"
                        value={inputs?.confirm_pwd}
                        handleChange={handleChange}
                        label="Confirm Password"
                        name="confirm_pwd"
                        error={formErrors?.password_confirmation}
                        helperText={formErrors?.password_confirmation}
                      />
                    </div>
                    <div className="flex justify-center px-4 pt-2 pb-10">
                      <CustomButton
                        onClick={updatePassword}
                        width="w-fit"
                        variant="contained"
                        size="large"
                        disabled={isLoading}
                      >
                        Update Details
                      </CustomButton>
                    </div>
                  </>
                )}
              </div>
            </div>
          </DialogContent>
        </BootstrapDialog>
      </div>
    </div>
  );
};
export default EditProfile;
