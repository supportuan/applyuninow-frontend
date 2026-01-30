import api from "../../../api/index";
import { useState, useContext, useEffect, useMemo } from "react";
import Validator from "validatorjs";
import { AppContext } from "../../../context/Appcontext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { capitalize } from "../../../utils/helpers";
import { Input } from "../../../common/InputBox";
import CustomButton from "../../../common/CustomButton";
import { SelectInput } from "../../../common/Select";
import FileUpload from "../../../common/FileUpload";

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const CreateStaff = () => {
  const intialValues = {
    user_type: 2,
    name: "",
    phone: "",
    email: "",
    role_id: "",
    user_image: "",
    user_offer_letter: "",
  };
  const { BASE_URL } = useContext(AppContext);
  let navigate = useNavigate();

  const query = useQuery();
  const [params, setParams] = useState(intialValues);
  const [formErrors, setFormErrors] = useState(intialValues);
  const [rolelist, setRoleList] = useState([]);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [offerletter, setofferletter] = useState("");

  useEffect(() => {
    getAllRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // const re = /^[0-9\b]+$/;
      const re = /^[0-9\b]+$/
      if (value && !re.test(value)) {
        return;
      }
    }

    if (name === "email") {
      const formattedValue = value.replace(/\s/g, "");
      setParams({ ...params, email: formattedValue });
      return;
    }
    const newParams = { ...params };
    newParams[name] = value;
    setParams(newParams);
    setFormErrors(intialValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postdata = {
      user_type: params.user_type,
      name: params.name,
      email: params.email,
      phone: params.phone,
      role_id: params.role_id,
      user_image: params.user_image,
      user_offer_letter: params.user_offer_letter,
    };
    let validation = new Validator(postdata, {
      name: "required|string|max:30",
      email: "required|email|max:50",
      phone: "required|numeric|digits:10",
      role_id: "required",
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
      if (!["user_image", "user_offer_letter"].includes(key)) {
        formData.append(`${key}`, `${value}`);
      }
    });

    if (userImage) {
      formData.append("user_image", userImage);
    }
    if (offerletter) {
      formData.append("user_offer_letter", offerletter);
    }

    console.log(formData);
    setFormErrors({});
    createUser(formData);
    return true;
  };

  const getAllRoles = () => {
    api
      .get(`${BASE_URL}/admin/users/roles?user_type=${params.user_type}`)
      .then((res) => {
        //  console.log(res.data.data);
        setRoleList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createUser = (payload) => {
    setLoading(true);
    api
      .post(`${BASE_URL}/admin/users`, payload)
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast.success(res.data.data.message);
        navigate(`/users/external`);
      })
      .catch((error) => {
        setLoading(false);
        const { errors, message } = error.response.data;
        const erroMsg = errors[Object.keys(errors)[0]] || message;
        toast.error(erroMsg);
      });
  };

  const handleImage = (type, data) => {
    if (type === "offerLetter") {
      setofferletter(data.file);
      setParams({ ...params, user_offer_letter: data.url });
    }
    if (type === "userImage") {
      setUserImage(data.file);
      setParams({ ...params, user_image: data.url });
    }
  };

  const removeImage = (type) => {
    if (type === "offerLetter") {
      setParams({ ...params, user_offer_letter: "" });
    }
    if (type === "userImage") {
      setParams({ ...params, user_image: "" });
    }
  };

  return (
    <div className="p-2 lg:p-6 text-white">
      <p className="text-xs">
        <Link className="mr-1" to={`/users/external`}>
          {" "}
          External Staff
        </Link>{" "}
        {">"}
        <span className="ml-1 cursor-pointer"> Add New External Staff</span>
      </p>
      <p className=" text-2xl font-semibold mb-4">New External Staff</p>

      <div>
        <div className="bg-light p-4 pt-7 rounded-xl">
          <p className="bg-tab py-2 pl-4 rounded-lg ">
            Fill up the mandatory details required...
          </p>
          <div className="mt-5">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-6">
              <div className="flex flex-col w-full gap-2">
                <div className="mb-2">
                  <Input
                    disabled={false}
                    readOnly={false}
                    name="name"
                    label="Full Name"
                    value={params?.name}
                    handleChange={handleChange}
                    error={formErrors?.name}
                    helperText={formErrors?.name}
                    bgcolor="#262938"
                    width="w-full"
                  />
                </div>
                <div className="mb-2">
                  <Input
                    disabled={false}
                    readOnly={false}
                    name="email"
                    label="Email"
                    value={params?.email}
                    handleChange={handleChange}
                    error={formErrors?.email}
                    helperText={formErrors?.email}
                    bgcolor="#262938"
                  />
                </div>
                <div className="mb-2">
                  <Input
                   
                    disabled={false}
                    readOnly={false}
                    name="phone"
                    label="Phone Number"
                    value={params?.phone}
                    handleChange={handleChange}
                    error={formErrors?.phone}
                    helperText={formErrors?.phone}
                    bgcolor="#262938"
                  />
                </div>
                <div className="mb-2">
                  <SelectInput
                    options={rolelist}
                    handleChange={handleChange}
                    value={params?.role_id}
                    error={!!formErrors?.role_id}
                    helperText={formErrors?.role_id}
                    label="Staff Role"
                    name="role_id"
                    bgcolor="#262938"
                  />
                </div>
              </div>

              {/* ........File Upload........ */}
              <div className="flex flex-col w-full mt-2 lg:mt-0">
                <div className="mb-4">
                  <p className="mb-2">Upload Offer Letter:</p>
                  <FileUpload
                    styleType="md"
                    setImage={(e) => handleImage("offerLetter", e)}
                    acceptMimeTypes={["application/pdf"]}
                    title="Drag and Drop PDF here"
                    label="File Format:.pdf"
                    id="user_offer_letter"
                    filename="user_offer_letter"
                    error={!!formErrors?.user_offer_letter}
                    removeImage={() => removeImage("offerLetter")}
                    bgcolor="#262938"
                  />
                </div>
                <div>
                  <p className="mb-2">Staff Image:</p>
                  <FileUpload
                    styleType="md"
                    setImage={(e) => handleImage("userImage", e)}
                    acceptMimeTypes={["image/jpeg"]}
                    title="Drag and Drop Image here"
                    label="File Format:.jpeg/.png"
                    id="user_image"
                    filename="user_image"
                    maxSize={5}
                    error={!!formErrors?.user_image}
                    removeImage={() => removeImage("userImage")}
                    bgcolor="#262938"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-auto w-[160px] md:w-[200px] mt-6 lg:w-[30%] lg:bottom-0">
          <CustomButton
            onClick={handleSubmit}
            width="w-full"
            variant="contained"
            size=""
            borderRadius="8px"
            disabled={loading}
          >
            Submit Details
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default CreateStaff;
