import TextArea from "../../../common/TextArea";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../api/index";
import { environment } from "../../../environments/environment";
import moment from "moment";
import CustomButton from "../../../common/CustomButton";
import { SelectInput } from "../../../common/Select";
import Download from "../../../assets/leads/Download.svg";
import { Tooltip } from "@mui/material";
import Validator from "validatorjs";
import { toast } from "react-toastify";
import { TimeandDatePicker } from "./DateTimePicker";
import Log1 from "../../../common/Log";
import StudentInfo from "./LeadInfo";
import { decryptData } from "../../../utils/helpers";

let initialValues = {
  status: "",
  notes: "",
  call_back_time: "",
};
const AddOnView = () => {
  const { id } = useParams();
  const [lead, setLead] = useState();
  const [params, setParams] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [addOn, setAddOn] = useState([]);

  useEffect(() => {
    getAddOnById();
  }, []);

 
  const getAddOnById = () => {
    setLoading(true);
    api
      .get(
        `${environment.API_BASE_URL}/admin/additional-services/${decryptData(
          id
        )}?fetch_logs=true`
      )
      .then((res) => {
        setLead(res.data.data);
        setAddOn(res?.data?.data?.selected_service.split(","));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    setFormErrors(initialValues);
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const handleStatus = () => {
    const rules = {
      status: "required",
      notes: "required|max:150",
    };

    if (params.status === "CALL_BACK") {
      rules.call_back_time = "required";
    }

    const validation = new Validator(params, rules);

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

    setLoading(true);
    api
      .patch(
        `${environment.API_BASE_URL}/admin/additional-services/status/${decryptData(
          id
        )}`,
        params
      )
      .then((res) => {
        setLoading(false);
        setParams(initialValues);
        getAddOnById();
        toast.success("Status Updated Successfully");
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  const handleDate = (newValue) => {
    setFormErrors(initialValues);
    const newDate = moment(new Date(newValue)).format("YYYY-MM-DD HH:mm:ss");
    setParams({ ...params, call_back_time: newDate });
  };
  return (
    <div className="p-2 md:p-6">
      {loading ? (
        <p className="audio text-3xl text-center">Loading...</p>
      ) : (
        <>
          <div className="flex flex-col gap-1 font-audiowide audio">
            <div className="flex flex-row gap-2">
              <Link to="/leads/add_on">
                {" "}
                <p className="text-xs ">Leads-Add on</p>
              </Link>
              <p className="text-xs">{">"}</p>
              <p className="text-xs">View Lead</p>
            </div>
            <div className="flex justify-between font-audiowide audio">
              <h1 className="text-white relative text-xl md:text-2xl">
                View Student Detail
              </h1>
              <Link to={`/leads/add_on/edit/${id}`}>
                <CustomButton
                  variant="outlined"
                  size="large"
                  borderRadius="8px"
                  width="w-fit"
                  bgcolor="#151929"
                >
                  <p className="gradient-text">Edit</p>
                </CustomButton>
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-6 mt-6">
            <div className="view-div-mobile p-3 lg:p-6 ">
              <div className="flex justify-between">
                <p>Lead Details</p>
              </div>

              <div className="mt-6 bg-light">
                {lead && <StudentInfo lead={lead} addOn={addOn} />}
              </div>
            </div>

            {/* Docs Table*/}
            <div className="view-div-mobile p-3 lg:p-6">
              <p>Supporting Documents</p>
              <div className="w-full bg-[#151929] mt-4 p-4 rounded-lg">
                <div className=" bg-[#151929] audio text-text grid grid-cols-3">
                  <p className="text-xs break-all">Slno</p>
                  <p className="text-xs break-all">Docs</p>
                  <p className="flex justify-end mr-4 text-xs ">Action</p>
                </div>
                <hr className="mt-2" />
                {lead?.images?.length ? (
                  <>
                    <div className="flex flex-col gap-6">
                      {lead?.images?.map((item, index) => {
                        return (
                          <div className="ml-2 grid grid-cols-3 mt-3 text-xs text-white">
                            <p>{index + 1}.</p>
                            <p>{item?.label}</p>
                            <span className="flex justify-end mr-6 cursor-pointer">
                              <Tooltip title="Download">
                                <a href={item?.url} download>
                                  <img
                                    src={Download}
                                    alt=""
                                    className="w-6 lg:w-5"
                                  />
                                </a>
                              </Tooltip>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <p className="text-center mt-4">No Records Found!!!</p>
                )}
              </div>
            </div>

            <div className=" bg-[#151929]"></div>

            {/* Leads Status */}

            <div className="view-div-mobile p-3 lg:p-6">
              <div className="flex justify-between">
                <p>Status Info</p>
              </div>
              <hr />

              <div className="bg-[#151929] px-2 py-4 md:px-4 md:py-6 md:inner-div rounded-lg  mt-4 flex flex-col gap-6">
                <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
                  <SelectInput
                    options={[
                      { name: "NOT_CONTACTED" },
                      { name: "CONTACTED" },
                      { name: "CALL_BACK" },
                      { name: "IN_PROGRESS" },
                      { name: "COMPLETED" },
                    ]}
                    handleChange={handleChange}
                    value={params.status}
                    error={!!formErrors.status}
                    helperText={formErrors.status}
                    label="Select Status"
                    name="status"
                    bgcolor="#151929"
                  />
                  {params.status === "CALL_BACK" ? (
                    <TimeandDatePicker
                      label="Call back time"
                      handleChange={handleDate}
                      value={params.call_back_time}
                      error={formErrors.call_back_time}
                    />
                  ) : (
                    ""
                  )}
                </div>
                <TextArea
                  placeholder="Add More Information"
                  handleChange={handleChange}
                  value={params?.notes}
                  name="notes"
                  error={!!formErrors.notes}
                  helperText={formErrors.notes}
                />
              </div>
              <div className="mt-4 flex justify-center md:justify-start">
                <CustomButton
                  variant="contained"
                  size="large"
                  borderRadius="8px"
                  width="w-fit"
                  onClick={() => {
                    handleStatus();
                  }}
                  disabled={loading}
                >
                  <p className="">Update Status</p>
                </CustomButton>
              </div>
            </div>

            <div className="view-div-mobile p-3 lg:p-6">
              <div className="flex justify-between">
                <p>Logs Info</p>
              </div>

              {/* Logs */}
              <div className="inner-div mt-4">
                <Log1 logs={lead?.logs} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddOnView;
