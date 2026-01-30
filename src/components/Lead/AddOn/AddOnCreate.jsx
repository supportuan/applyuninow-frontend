import React from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CustomButton from "../../../common/CustomButton";

import { Input } from "../../../common/InputBox";
import { useParams } from "react-router-dom";

import { SelectInput } from "../../../common/Select";
import Textarea from "../../../common/TextArea";
import { initialParams } from "./helpers";
import api from "../../../api";
import { environment } from "../../../environments/environment";
import { useEffect } from "react";
import MaterialUIPickers from "../../../common/Calendar";
import { toast } from "react-toastify";
import MultipleSelect from "./MultiSelect";
import FileUploadModal from "./ModalFileUpload";
import FileUpload from "../../../common/FileUpload";
import Validator from "validatorjs";
import moment from "moment";
import { servicesList } from "./helpers";
import { uuid } from "../../../common/utils/helpers";
import { decryptData } from "../../../utils/helpers";


const AddOnCreate = () => {
  const imageInterfaceValue = {
    label: "",
    url: "",
    preview: "",
    file: "",
  };
  const [additonalDoc, setAdditonalDoc] = useState(imageInterfaceValue);
  const [params, setParams] = useState(initialParams);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState(initialParams);
  const [additonalDocErrors, setAdditonalDocErrors] =
    useState(imageInterfaceValue);

  const [open, setOpen] = useState(false);
  const [addOn, setAddOn] = useState([]);
  const [coutryList, setCountryList] = useState([]);

  let { id } = useParams();

  let navigate = useNavigate();

  const handleChangeMultiSelect = (event) => {
    setFormErrors(initialParams);
    const {
      target: { value },
    } = event;
    setAddOn(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChange = (e, type) => {
    if (type === "form") {
      if (e.target.name === "alternate_phone") {
        const re = /^[0-9\b]+$/;
        if (e.target.value && !re.test(e.target.value)) {
          return;
        }
      }
      setParams({ ...params, [e.target.name]: e.target.value });
      setFormErrors(initialParams);
    }
    if (type === "image") {
      setAdditonalDoc({ ...additonalDoc, label: e.target.value });
      // setFormErrors(initialValues);
      setAdditonalDocErrors(imageInterfaceValue);
    }
  };

  const handleDOB = (date) => {
    let newDate = new Date(date);
    setFormErrors(initialParams);
    setParams({ ...params, dob: newDate });
  };

  const handlePopupUrl = (data) => {
    setAdditonalDocErrors(imageInterfaceValue);
    setAdditonalDoc({
      ...additonalDoc,
      url: data.url,
      file: data.file,
      preview: data.preview,
    });
  };

  const handleRemoveAdditionalDoc = () => {
    setAdditonalDoc({ ...additonalDoc, url: "" });
  };

  console.log(additonalDoc);

  const handleRemove = (index) => {
    // let arr = [...files];
    // arr.splice(index, 1);
    // setFiles(arr);

    let arr = [...params.images];

    arr.splice(index, 1);
    setParams({ ...params, images: arr });
  };

  const deleteFile = (index) => {
    let arr = [...params.images];

    arr.splice(index, 1);
    setParams({ ...params, images: arr });
  };

  const handleImage = (data) => {};

  const getAddOnById = () => {
    setLoading(true);
    api
      .get(
        `${environment.API_BASE_URL}/admin/additional-services/${decryptData(
          id
        )}`
      )
      .then((res) => {
        let addon = res.data.data;
        setParams(res.data.data);
        setAddOn(res?.data?.data?.selected_service?.split(","));
        setLoading(false);
        if (addon.images && addon.images.length) {
          addon.images = addon.images
            .filter((x) => x)
            .map((x) => ({
              label: x.label,
              url: x.url,
              preview: "",
              file: "",
            }));
          setParams(addon);
        } else {
          addon.images = [];
          setParams(addon);
        }
      })

      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const fetchDropdowns = () => {
    api
      .get(`${environment.API_BASE_URL}/prerequisite`)
      .then((res) => {
        setLoading(false);
        setCountryList(res.data.data.study_destination);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getAddOnById();
    fetchDropdowns();
  }, []);

  const handleUpdate = () => {
    const rules = {
      first_name: "required|max:30",
      last_name: "required|max:30",
      phone: "required|numeric|digits:10",
      email: "required|email|max:20",

      selected_service: "required",
    };

    let postdata = {
      ...params,
      selected_service: addOn.join(),
    };

    const validation = new Validator(postdata, rules);

    if (validation.fails()) {
      const fieldErrors = {};
      Object.keys(validation.errors.errors).forEach((key) => {
        fieldErrors[key] = validation.errors.errors[key][0];
      });

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

    let formData = new FormData();

    Object.keys(initialParams).map((key) => {
      if (key !== "images") {
        formData.append(key, postdata[key]);
      }
    });

    const files = postdata.images.filter((x) => x.file);
    if (files.length) {
      const labels = files.map((x) => x.label);
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i].file);
      }

      formData.append("labels", JSON.stringify(labels));
    }

    const old_files = postdata.images.filter(
      (x) => x.url && x.url.startsWith("https")
    );
    if (id && old_files.length) {
      formData.append("old_files", JSON.stringify(old_files));
    }

    setLoading(true);
    api
      .put(
        `${environment.API_BASE_URL}/admin/additional-services/${decryptData(
          id
        )}`,
        formData
      )
      .then((res) => {
        setLoading(false);
        // getAddOnById();
        navigate(`/leads/add_on/view/${id}`);
        setParams(initialParams);
        setFormErrors(initialParams);
        setAdditonalDoc(imageInterfaceValue);
        toast.success("Status Updated Successfully");
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  const AddDocuments = () => {
    const rules = {
      label: "required",
      url: "required",
    };

    console.log();

    const validation = new Validator(additonalDoc, rules);

    if (validation.fails()) {
      const fieldErrors = {};
      Object.keys(validation.errors.errors).forEach((key) => {
        fieldErrors[key] = validation.errors.errors[key][0];
      });

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

      setAdditonalDocErrors(fieldErrors);
      toast.error("Please Fill Required Fields");
      return false;
    }
    params.images.push({
      label: additonalDoc.label,
      url: additonalDoc.url,
      preview: additonalDoc.preview,
      file: additonalDoc.file,
    });
    handleClose();
  };

  const handleResume = (data, index) => {
    const images = params.images;

    console.log(images[0]?.label);
    images[index] = {
      label: "Resume",
      url: data.url,
      preview: data.preview,
      file: data.file,
    };
    setParams({ ...params, images });
  };

  const handleClose = () => {
    setOpen(false);
    setAdditonalDoc(imageInterfaceValue);
    setAdditonalDocErrors(imageInterfaceValue);
  };

  console.log(params.dob);

  return (
    <div className="p-2 md:p-6">
      {loading ? (
        <p className="audio text-center text-3xl">Loading...</p>
      ) : (
        <>
          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-2">
              <Link to="/leads/add_on">
                {" "}
                <p className="text-xs">Leads</p>
              </Link>
              <p className="text-xs">{">"}</p>
              <p className="text-xs">Leads-Addon</p>
            </div>
            <div>
              <h1 className=" audio text-white relative text-xl md:text-2xl">
                Lead
              </h1>
            </div>
          </div>

          <div className="w-full p-2 md:p-6 rounded-lg mt-4 flex flex-col bg-[#262938]">
            <div className="w-full bg-tab p-3 rounded-lg">
              <p className="text-lg">Lead Info</p>
            </div>
            <div className="flex flex-col md:grid md:grid-cols-2 gap-6 mt-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
                  <Input
                    disabled={false}
                    readOnly={false}
                    name="first_name"
                    label="First Name"
                    value={params.first_name}
                    handleChange={(e) => {
                      handleChange(e, "form");
                    }}
                    error={formErrors.first_name}
                    helperText={formErrors.first_name}
                    bgcolor="#262938"
                  />
                  <Input
                    disabled={false}
                    readOnly={false}
                    name="last_name"
                    label="Last Name"
                    value={params.last_name}
                    handleChange={(e) => {
                      handleChange(e, "form");
                    }}
                    error={formErrors.last_name}
                    helperText={formErrors.last_name}
                    bgcolor="#262938"
                  />
                </div>
                <Input
                  disabled={false}
                  readOnly={false}
                  name="phone"
                  label="Phone Number"
                  value={params.phone}
                  handleChange={(e) => {
                    handleChange(e, "form");
                  }}
                  error={formErrors.phone}
                  helperText={formErrors.phone}
                  bgcolor="#262938"
                />
                <Input
                  disabled={false}
                  readOnly={false}
                  name="alternate_phone"
                  label="Alternate Phone Number"
                  value={
                    params.alternate_phone === "null"
                      ? ""
                      : params.alternate_phone
                  }
                  handleChange={(e) => {
                    handleChange(e, "form");
                  }}
                  error={formErrors.alternate_phone}
                  helperText={formErrors.alternate_phone}
                  bgcolor="#262938"
                />
                <Input
                  disabled={false}
                  readOnly={false}
                  name="email"
                  label="Email"
                  value={params.email}
                  handleChange={(e) => {
                    handleChange(e, "form");
                  }}
                  error={formErrors.email}
                  helperText={formErrors.email}
                  bgcolor="#262938"
                />

                <div className="flex flex-col md:grid md:grid-cols-2 gap-4 ">
                  <MaterialUIPickers
                    handleChange={(date) => {
                      handleDOB(date);
                    }}
                    value={params.dob}
                    name="dob"
                  />

                  <SelectInput
                    options={[{ name: "Male" }, { name: "Female" }]}
                    handleChange={(e) => {
                      handleChange(e, "form");
                    }}
                    value={params.gender}
                    error={!!formErrors.gender}
                    helperText={formErrors.gender}
                    label="Gender"
                    name="gender"
                    bgcolor="#262938"
                  />
                </div>
                <Input
                  disabled={false}
                  readOnly={false}
                  name="passport_no"
                  label="Passport Number"
                  value={
                    params.passport_no === "null" ? "" : params.passport_no
                  }
                  handleChange={(e) => {
                    handleChange(e, "form");
                  }}
                  error={formErrors.passport_no}
                  helperText={formErrors.passport_no}
                  bgcolor="#262938"
                />
                <MultipleSelect
                  value={addOn}
                  handleChange={handleChangeMultiSelect}
                  error={!!formErrors.selected_service}
                  helperText={formErrors.selected_service}
                />

           
                <SelectInput
                  options={coutryList}
                  handleChange={(e) => {
                    handleChange(e, "form");
                  }}
                  value={params.country_id}
                  error={!!formErrors.country_id}
                  helperText={formErrors.country_id}
                  label="Country"
                  name="country_id"
                  bgcolor="#262938"
                />
              </div>
              <div className="flex flex-col gap-4">
                <SelectInput
                  options={[
                    { name: "Student" },
                    { name: "Graduated" },
                    { name: "Waiting for results" },
                  ]}
                  handleChange={(e) => {
                    handleChange(e, "form");
                  }}
                  value={params.present_status}
                  // error={!!formErrors.role}
                  // helperText={formErrors.role}
                  label="Educational Status"
                  name="present_status"
                  bgcolor="#262938"
                />

                {params?.images?.length > 0 ? (
                  <>
                    {params?.images?.map((item, index) => {
                      return (
                        <div className="flex" key={uuid()}>
                          {index === 0 ? (
                            <FileUpload
                              styleType="md"
                              setImage={handleResume}
                              removeImage={() => deleteFile(index)}
                              acceptMimeTypes={["image/jpeg", "image/png"]}
                              title="Drag and Drop PDF here"
                              label="File Format:.JPEG,PNG"
                              id={index}
                              maxSize={5}
                              imageUrl={item?.url}
                              filename={index}
                              bgcolor="#262938"
                              previewData={item?.preview}
                            />
                          ) : (
                            <FileUpload
                              styleType="md"
                              setImage={handleImage}
                              acceptMimeTypes={["image/jpeg"]}
                              title="Drag and Drop Image here"
                              label="File Format: .jpeg/.png"
                              id={index}
                              filename="image"
                              maxSize={5}
                              bgcolor="#262938"
                              imageUrl={item?.url}
                              removeImage={() => deleteFile(index)}
                              previewData={item?.preview}
                            />
                          )}

                          {index === 0 ? (
                            ""
                          ) : (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              onClick={() => {
                                handleRemove(index);
                              }}
                              className="cursor-pointer"
                            >
                              <path
                                d="M10 0C4.49 0 0 4.49 0 10C0 15.51 4.49 20 10 20C15.51 20 20 15.51 20 10C20 4.49 15.51 0 10 0ZM13.36 12.3C13.65 12.59 13.65 13.07 13.36 13.36C13.21 13.51 13.02 13.58 12.83 13.58C12.64 13.58 12.45 13.51 12.3 13.36L10 11.06L7.7 13.36C7.55 13.51 7.36 13.58 7.17 13.58C6.98 13.58 6.79 13.51 6.64 13.36C6.35 13.07 6.35 12.59 6.64 12.3L8.94 10L6.64 7.7C6.35 7.41 6.35 6.93 6.64 6.64C6.93 6.35 7.41 6.35 7.7 6.64L10 8.94L12.3 6.64C12.59 6.35 13.07 6.35 13.36 6.64C13.65 6.93 13.65 7.41 13.36 7.7L11.06 10L13.36 12.3Z"
                                fill="#E64667"
                              />
                            </svg>
                          )}
                        </div>
                      );
                    })}
                  </>
                ) : (
                  ""
                )}

                <div className="flex justify-end">
                  <CustomButton
                    variant="contained"
                    size="large"
                    borderRadius="8px"
                    width="w-fit"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    <p className="">+ Add New</p>
                  </CustomButton>
                </div>

                <Textarea
                  placeholder="notes"
                  handleChange={(e) => {
                    handleChange(e, "form");
                  }}
                  value={params.notes === "null" ? "" : params.notes}
                  helperText=""
                  error={false}
                  rows={4}
                  id="1"
                  name="notes"
                  bgcolor="#262938"
                />
              </div>
            </div>
          </div>

          <div className="w-full mt-6 pb-4 flex justify-center md:justify-end">
            <CustomButton
              onClick={() => {
                handleUpdate();
              }}
              variant="contained"
              size="large"
              borderRadius="8px"
              width="w-fit"
            >
              <p className="">Update</p>
            </CustomButton>
          </div>
        </>
      )}

      <FileUploadModal
        open={open}
        handleClose={handleClose}
        handleSubmit={AddDocuments}
        handleImage={handlePopupUrl}
        params={additonalDoc}
        handleChange={handleChange}
        formErrors={additonalDocErrors}
        handleRemoveAdditionalDoc={handleRemoveAdditionalDoc}
      />
    </div>
  );
};

export default AddOnCreate;
