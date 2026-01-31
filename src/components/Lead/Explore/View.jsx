import Button from "../../../common/Button";
import TextArea from "../../../common/TextArea";

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../api/index";
import { environment } from "../../../environments/environment";
import moment from "moment";
import Education from "./EducationDetails";
import CustomButton from "../../../common/CustomButton";
import { SelectInput } from "../../../common/Select";
import Validator from "validatorjs";
import { TimeandDatePicker } from "../AddOn/DateTimePicker";
import { toast } from "react-toastify";
import Log1 from "../../../common/Log";
import LeadInfo from "./LeadInfo";
import { decryptData, encryptData } from "../../../utils/helpers";

let initialValues = {
  status: "",
  notes: "",
  callback_time: "",
};
const View = () => {
  const { id } = useParams();
  const [lead, setLead] = useState();
  const [params, setParams] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [loading, setLoading] = useState(true);
  const [isApiLoading, setApiLoasing] = useState(false);
  useEffect(() => {
    getLead();
  }, []);

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
      rules.callback_time = "required";
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
      console.log();
      setFormErrors(fieldErrors);
      return false;
    }

    setApiLoasing(true);
    api
      .patch(
        `${
          environment.API_BASE_URL
        }/admin/contact-requests/update-status/${decryptData(id)}`,
        params
      )
      .then((res) => {
        setApiLoasing(false);
        setParams(initialValues);
        getLead();
        toast.success("Status Updated Successfully");
        setParams(initialValues);
      })
      .catch((err) => {
        toast.error(err.message);
        setApiLoasing(false);
      });
  };

  const handleDate = (newValue) => {
    setFormErrors(initialValues);
    const newDate = moment(new Date(newValue)).format("YYYY-MM-DD HH:mm:ss");
    setParams({ ...params, callback_time: newDate });
  };
  //
  const getLead = () => {
    api
      .get(
        `${environment.API_BASE_URL}/admin/contact-requests/${decryptData(id)}`
      )
      .then((res) => {
        setLead(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <div className="p-2 md:p-6">
      {loading ? (
        <p className="audio text-3xl text-center">Loading...</p>
      ) : (
        <>
          <div className="flex flex-col gap-1 f">
            <div className="flex flex-row gap-2 font-audiowide audio">
              <Link to="/leads/explore">
                {" "}
                <p className="text-xs font-audiowide audio ">Leads-Explore</p>
              </Link>
              <p className="text-xs">{">"}</p>
              <p className="text-xs ">View Lead</p>
            </div>
            <div className="flex flex-col lg:flex-row justify-between font-audiowide audio">
              <h1 className="text-white relative text-xl md:text-2xl">
                View Lead detail
              </h1>

              <div className="flex justify-between mt-4 lg:mt-0 gap-4">
                <Link to={`/leads/explore/edit/${encryptData(id)}`}>
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
                {!lead?.is_student && (
                  <Link to={`/students/create-student?lead_id=${id}`}>
                    <CustomButton
                      variant="outlined"
                      size="large"
                      borderRadius="8px"
                      width="w-fit"
                      bgcolor="#151929"
                    >
                      <p className="gradient-text">Convert Student</p>
                    </CustomButton>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 mt-6">
            {/*lead Details */}

            <div className="view-div-mobile p-3 lg:p-6 ">
              <div className="bg-light">{lead && <LeadInfo lead={lead} />}</div>

              <div className="mt-6 bg-light">
                {lead && <Education lead={lead} />}
              </div>
            </div>

            {/* Leads Status */}

            <div className="view-div-mobile p-3 lg:p-6 ">
              <div className="flex justify-between">
                <p>Status Info</p>
              </div>
              <hr />

              <div className="bg-[#151929] px-2 py-4 md:px-4 md:py-6 md:inner-div rounded-lg  mt-4 flex flex-col gap-6">
                <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
                  <SelectInput
                    options={[
                      {
                        name: "CALL_BACK",
                      },
                      {
                        name: "CONTACTED",
                      },
                      {
                        name: "NOT_CONTACTED",
                      },
                      {
                        name: "HOLD",
                      },
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
                      value={params.callback_time}
                      error={formErrors.callback_time}
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
                {isApiLoading ? (
                  <CustomButton
                    variant="contained"
                    size="large"
                    borderRadius="8px"
                    width="w-fit"
                    disabled={isApiLoading}
                  >
                    <p className="">Loading...</p>
                  </CustomButton>
                ) : (
                  <CustomButton
                    variant="contained"
                    size="large"
                    borderRadius="8px"
                    width="w-fit"
                    onClick={() => {
                      handleStatus();
                    }}
                    disabled={isApiLoading}
                  >
                    <p className="">Update Status</p>
                  </CustomButton>
                )}
              </div>
            </div>

            <div className="view-div-mobile p-3 lg:p-6 ">
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

export default View;
