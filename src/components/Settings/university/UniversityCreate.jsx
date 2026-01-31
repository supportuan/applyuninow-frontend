import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../../common/CustomButton";
import { Input } from "../../../common/InputBox";
import { useParams } from "react-router-dom";
import { SelectInput } from "../../../common/Select";
import api from "../../../api";
import { environment } from "../../../environments/environment";
import { useEffect } from "react";
import { toast } from "react-toastify";
import FileUpload from "../../../common/FileUpload";
import Validator from "validatorjs";
import { decryptData } from "../../../utils/helpers";

export const initialParams = {
  name: "",
  country_id: "",
  city: "",
  location: "",
  logo: "",
  file: "",
};

const UniversityCreate = () => {
  const [params, setParams] = useState(initialParams);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState(initialParams);
  const [countries, setCountries] = useState([]);
  const [imageFileEvent, setImageFileEvent] = useState("");
  const navigate = useNavigate();

  let { id } = useParams();

  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
    setFormErrors(initialParams);
  };

  // display image
  const handleImage = (data) => {
    setParams({ ...params, [data.name]: data.url });
    setImageFileEvent(data.file);
  };

  const deleteFile = (param_type) => {
    if (param_type === "image") {
      setImageFileEvent("");
    } else {
      setImageFileEvent("");
    }
    setParams({ ...params, logo: "" });
  };

  const getCountries = () => {
    api
      .get(`${environment.API_BASE_URL}/admin/countries`)
      .then((res) => {
        setCountries(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUniversity = () => {
    setLoading(true);
    api
      .get(`${environment.API_BASE_URL}/admin/universities/${decryptData(id)}`)
      .then((res) => {
        setLoading(false);
        setParams(res.data.data);
      })

      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      getUniversity();
    }

    getCountries();
  }, []);

  const handleSubmit = async () => {
    const rules = {
      name: "required|max:80",
      country_id: "integer|required",
      location: "string|max:30",
      city: "string|max:30",
    };

    let validation = new Validator(params, rules);
    if (validation.fails()) {
      const fieldErrors = {};
      for (let key in validation.errors.errors) {
        fieldErrors[key] = validation.errors.errors[key][0];
      }
      const err = Object.keys(fieldErrors);
      if (err.length) {
        const input = document.querySelector(`input[name=${err[0]}]`);
        if (input) {
          input.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "start",
          });
        }
      }
      setFormErrors(fieldErrors);
      return false;
    }
    const formData = new FormData();
    const payloadKeys = ["name", "country_id", "city", "location"];
    for (const key of payloadKeys) {
      formData.append(key, params[key]);
    }

    if (imageFileEvent) {
      formData.append("university_logo", imageFileEvent);
    }

    if (id) {
      let is_image = formData.get("university_logo");
      if (!is_image) {
        formData.append("image", params.logo);
      }
    }

    if (!id) {
      createUniversity(formData);
    } else {
      updateUniveristy(formData);
    }
  };

  const createUniversity = (obj) => {
    setIsLoading(true);
    api
      .post(`${environment.API_BASE_URL}/admin/universities`, obj)
      .then((res) => {
        setIsLoading(false);
        toast(`University Added SuccessFully`);
        navigate(`/settings/universities`);
      })
      .catch((error) => {
        setIsLoading(false);
        const { errors } = error.response.data;
        const erroMsg = errors[Object.keys(errors)[0]] || error.message;
        toast.error(erroMsg);
      });
  };

  const updateUniveristy = (obj) => {
    setIsLoading(true);
    api
      .put(
        `${environment.API_BASE_URL}/admin/universities/${decryptData(id)}`,
        obj
      )
      .then((res) => {
        setIsLoading(false);
        toast(`University Updated SuccessFully`);
        navigate(`/settings/universities`);
      })
      .catch((error) => {
        setIsLoading(false);
        const { errors } = error.response.data;
        const erroMsg = errors[Object.keys(errors)[0]] || error.message;
        toast.error(erroMsg);
      });
  };

  return (
    <div className="p-2 md:p-6">
      {loading ? (
        <p className="audio text-center text-3xl">Loading...</p>
      ) : (
        <>
          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-2">
              <Link to="/settings/universities">
                {" "}
                <p className="text-xs">University Listing</p>
              </Link>
              <p className="text-xs">{">"}</p>
              <p className="text-xs">New Universities</p>
            </div>
            <div>
              <h1 className=" audio text-white relative text-xl md:text-2xl">
                New Universities
              </h1>
            </div>
          </div>

          <div className="w-full p-2 md:p-6 rounded-lg mt-4 flex flex-col bg-[#262938]">
            <div className="w-full bg-tab p-3 rounded-lg">
              <p className="text-lg">University Info</p>
            </div>
            <div className="flex flex-col md:grid md:grid-cols-2 gap-6 mt-4">
              <div className="flex flex-col gap-4">
                <Input
                  disabled={false}
                  readOnly={false}
                  name="name"
                  label="University Name"
                  value={params.name}
                  handleChange={(e) => {
                    handleChange(e);
                  }}
                  error={formErrors.name}
                  helperText={formErrors.name}
                  bgcolor="#262938"
                />
                <Input
                  disabled={false}
                  readOnly={false}
                  name="location"
                  label="Location/ State"
                  value={params.location}
                  handleChange={(e) => {
                    handleChange(e);
                  }}
                  error={formErrors.location}
                  helperText={formErrors.location}
                  bgcolor="#262938"
                />

                <div className="flex flex-col gap-2">
                  <p className="">Upload the University Logo:</p>
                  <FileUpload
                    styleType="md"
                    setImage={handleImage}
                    removeImage={() => deleteFile("image")}
                    acceptMimeTypes={["image/jpeg", "image/png"]}
                    title="Drag and Drop PDF here"
                    label="File Format:.JPEG,PNG"
                    id="image"
                    maxSize={5}
                    imageUrl={params.logo}
                    filename="image"
                    bgcolor="#262938"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <SelectInput
                  options={countries}
                  handleChange={(e) => {
                    handleChange(e);
                  }}
                  value={params.country_id}
                  error={!!formErrors.country_id}
                  helperText={formErrors.country_id}
                  label="Country"
                  name="country_id"
                  bgcolor="#262938"
                />

                <Input
                  disabled={false}
                  readOnly={false}
                  name="city"
                  label="City"
                  value={params.city}
                  handleChange={(e) => {
                    handleChange(e);
                  }}
                  error={formErrors.city}
                  helperText={formErrors.city}
                  bgcolor="#262938"
                />
              </div>
            </div>
          </div>

          <div className="w-full mt-6 pb-4 flex justify-center md:justify-end">
            {isLoading ? (
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
                onClick={handleSubmit}
                variant="contained"
                size="large"
                borderRadius="8px"
                width="w-fit"
              >
                <p className="">Submit Details</p>
              </CustomButton>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UniversityCreate;
