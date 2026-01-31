import { useState, useEffect, useContext, useMemo } from "react";
import CustomButton from "../../../../common/CustomButton";
import { Tooltip } from "@mui/material";
import { Pagination } from "../../../Shared/Pagination/Pagination.jsx";
import PayslipPopup from "./PayslipPopup";
import moment from "moment";
import { useParams } from "react-router-dom";
import Validator from "validatorjs";
import { AppContext } from "../../../../context/Appcontext";
import api from "../../../../api/index";
import { toast } from "react-toastify";
import PdfViewer from "./PdfViewer";
import { decryptData } from "../../../../utils/helpers";
import DeleteModal from "../../../../common/DeleteModal";

const Payslips = ({ usersData, getUsersData }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const { id } = useParams();
  const [monthYear, setMonthYear] = useState(null);
  const [payslipPdf, setPayslipPdf] = useState("");
  const initialValue = {
    user_id: "",
    payslip: "",
    payslip_month: "",
  };
  const [params, setParams] = useState(initialValue);
  const [formErrors, setFormErrors] = useState(initialValue);
  const { BASE_URL } = useContext(AppContext);
  const [apiLoading, setApiLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [payslipId, setPayslipId] = useState();

  const handleClose = () => {
    setOpenPopup(false);
    setDeleteOpen(false);
    setFormErrors(initialValue);
    setParams(initialValue);
  };

  const payslipPopup = () => {
    setParams({ ...params, user_id: decryptData(id) });
    setOpenPopup(true);
  };

  useEffect(() => {
    setParams({ ...params, user_id: decryptData(id) });
  }, []);

  const handleDateChange = (date) => {
    let newDate = new Date(date);
    setFormErrors(initialValue);
    setParams({ ...params, payslip_month: newDate });
  };

  const handleSubmit = async () => {
    const postdata = { ...params };
    const rules = {
      payslip: "required",
      payslip_month: "required",
    };

    const validation = new Validator(params, rules);

    if (validation.fails()) {
      const fieldErrors = {};
      Object.keys(validation.errors.errors).forEach((key) => {
        fieldErrors[key] = validation.errors.errors[key][0];
      });
      setFormErrors(fieldErrors);
      toast.error("Please fill Required fields!!");
      return false;
    }

    let res = usersData.payslips.some((item) => {
      let date = new Date(item.payslip_month);
      let paramsDate = new Date(params.payslip_month);
      const year = date.getFullYear();
      const month = date.getMonth();
      const paramsYear = paramsDate.getFullYear();
      const paramsMonth = paramsDate.getMonth();
      return year == paramsYear && month == paramsMonth;
    });

    if (res) {
      toast.error("Payslip already uploaded for the same month and year ");
      return;
    }

    const formData = new FormData();

    Object.entries(postdata).forEach(([key, value]) => {
      if (!["payslip"].includes(key)) {
        formData.append(`${key}`, `${value}`);
      }
    });

    if (payslipPdf) {
      formData.append("payslip", payslipPdf);
    }

    addPayslip(formData);
    return true;
  };

  const addPayslip = (payload) => {
    setApiLoading(true);
    api
      .post(`${BASE_URL}/admin/users/payslips`, payload)
      .then((res) => {
        console.log(res);
        setApiLoading(false);
        handleClose();
        toast("Payslip added Successfully");
        getUsersData();
      })
      .catch((error) => {
        setApiLoading(false);
        handleClose();
        toast("Error");
      });
  };

  const handleImage = (data) => {
    setFormErrors(initialValue);
    setPayslipPdf(data.file);
    setParams({ ...params, payslip: data.url });
  };

  const removeImage = () => {
    setPayslipPdf("");
    setParams({ ...params, payslip: "" });
  };

  function deletePaySlip() {
    setApiLoading(true);
    api
      .delete(`${BASE_URL}/admin/users/payslips/${payslipId.id}`)
      .then((res) => {
        console.log(res);
        setApiLoading(false);
        toast.success(res.data.data.message);
        handleClose();
        getUsersData();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        setApiLoading(false);
      });
  }

  const handleView = (item) => {
    setSelectedItem(item);
    convertToBase64(item.payslip_url);
    setOpen(true);
  };

  function convertToBase64(url) {
    var url = url;
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var codes = new Uint8Array(xhr.response);
      var bin = String.fromCharCode.apply(null, codes);
      var b64 = btoa(bin);
      console.log(b64); //-> "R0lGODdhAQABAPAAAP8AAAAAACwAAAAAAQABAAACAkQBADs="
    };

    xhr.open("GET", url);
    xhr.responseType = "arraybuffer";
    xhr.send();
  }

  const handleDownload = (e, item) => {
    e.preventDefault();
    window.open(selectedItem.payslip_url, "_blank");
  };

  const handleClosePdf = () => {
    setOpen(false);
  };

  const deleteConfirmation = (item) => {
    setPayslipId(item);
    setDeleteOpen(true);
  };

  // "2001-06-02T11:25:06.000Z"
  // Thu Sep 02 2010 17:33:21 GMT+0530 (India Standard Time)
  //Saturday, June 2, 2001 4:55 PM

  return (
    <>
      <div className="p-5 bg-light rounded-lg font-audiowide">
        {/* for desktop, tab, mobile */}
        <p className="">Pay Slips</p>
        <div className="mt-2 p-5 rounded-lg bg-tab flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="md:w-[50%] w-full mb-3 md:mb-0">
            <p>Upload Payment Slip</p>
          </div>
          <div className="flex flex-row gap-2 w-full md:justify-end justify-start items-center">
            <CustomButton
              onClick={payslipPopup}
              variant="outlined"
              size="medium"
              borderRadius="8px"
              width="w-fit"
              bgcolor="#151929"
            >
              <p className="gradient-text">Upload</p>
            </CustomButton>
          </div>
        </div>

        {/* popup */}
        <PayslipPopup
          open={openPopup}
          handleClose={handleClose}
          monthYear={monthYear}
          handleDateChange={handleDateChange}
          handleImage={handleImage}
          removeImage={removeImage}
          handleSubmit={handleSubmit}
          formErrors={formErrors}
          params={params}
          apiLoading={apiLoading}
        />

        {/* for desktop and tab */}
        <div className="mt-4 rounded-lg bg-tab flex flex-col">
          <div className="flex flex-row items-center justify-between px-4 sm:px-10 py-4 text-xs text-text border-b border-border">
            <p>Document</p>
            <p>Action</p>
          </div>
          {usersData?.payslips?.length > 0 ? (
            usersData?.payslips?.map((item, index) => {
              return (
                <div className="flex flex-row items-center justify-between px-4 sm:px-10 py-4 text-xs text-white border-b border-border">
                  <p>{moment(`${item.payslip_month}`).format("MMMM YYYY")}</p>
                  <p className="flex flex-row items-center gap-3">
                    <Tooltip title="View Document">
                      <svg
                        onClick={() => handleView(item)}
                        className="cursor-pointer"
                        width="22"
                        height="16"
                        viewBox="0 0 22 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.9091 10.9119C12.5157 10.9119 13.8182 9.60949 13.8182 8.00284C13.8182 6.39619 12.5157 5.09375 10.9091 5.09375C9.30244 5.09375 8 6.39619 8 8.00284C8 9.60949 9.30244 10.9119 10.9091 10.9119Z"
                          fill="#57CD53"
                        />
                        <path
                          d="M21.7742 7.75273C20.9188 5.54011 19.4339 3.62663 17.5028 2.24879C15.5718 0.87095 13.2793 0.089144 10.9088 0C8.53825 0.089144 6.24579 0.87095 4.31475 2.24879C2.3837 3.62663 0.898717 5.54011 0.043327 7.75273C-0.0144423 7.91251 -0.0144423 8.08749 0.043327 8.24727C0.898717 10.4599 2.3837 12.3734 4.31475 13.7512C6.24579 15.1291 8.53825 15.9109 10.9088 16C13.2793 15.9109 15.5718 15.1291 17.5028 13.7512C19.4339 12.3734 20.9188 10.4599 21.7742 8.24727C21.832 8.08749 21.832 7.91251 21.7742 7.75273V7.75273ZM10.9088 12.7273C9.97382 12.7273 9.05985 12.45 8.28245 11.9306C7.50505 11.4111 6.89915 10.6728 6.54135 9.80905C6.18356 8.94525 6.08994 7.99476 6.27234 7.07775C6.45475 6.16075 6.90497 5.31843 7.5661 4.65731C8.22722 3.99619 9.06954 3.54596 9.98654 3.36356C10.9035 3.18116 11.854 3.27477 12.7178 3.63257C13.5816 3.99037 14.3199 4.59627 14.8394 5.37367C15.3588 6.15106 15.6361 7.06503 15.6361 8C15.6341 9.25316 15.1355 10.4544 14.2493 11.3406C13.3632 12.2267 12.1619 12.7253 10.9088 12.7273V12.7273Z"
                          fill="#57CD53"
                        />
                      </svg>
                    </Tooltip>
                    <Tooltip title="Download Document">
                      <svg
                        onClick={(e) => handleDownload(e, item)}
                        className="cursor-pointer"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.17583 0H17.4546C17.4902 0.0145893 17.5271 0.0262064 17.5646 0.0347321C19.4723 0.312097 20.8076 1.82953 20.8111 3.75544C20.8186 7.91347 20.8194 12.0715 20.8135 16.2295C20.8135 16.776 20.7216 17.3057 20.4794 17.7993C19.7731 19.237 18.6109 19.9855 17.0099 19.9923C13.7958 20.0065 10.5812 19.9967 7.36651 19.9967C6.43714 19.9967 5.50532 20.0016 4.57497 19.9967C2.91629 19.986 1.54229 18.9949 1.00423 17.4329C0.914722 17.1737 0.888798 16.9012 0.817383 16.6385V3.36116C0.832219 3.31873 0.84447 3.27544 0.854068 3.23153C1.10451 1.72485 1.95366 0.716161 3.38293 0.189313C3.64022 0.0924556 3.91365 0.0709311 4.17583 0ZM10.2114 10.5546C10.1346 10.5325 10.0979 10.468 10.0495 10.4195C9.41357 9.78361 8.78013 9.14767 8.1418 8.51712C7.92706 8.30433 7.66782 8.26666 7.42912 8.39727C7.31734 8.45919 7.22883 8.55589 7.17701 8.6727C7.12519 8.7895 7.11289 8.92003 7.14199 9.04445C7.17427 9.20001 7.27797 9.30665 7.38656 9.41281C8.36191 10.3879 9.33743 11.363 10.3131 12.3381C10.6677 12.6923 10.9651 12.6923 11.3193 12.3381C12.2633 11.3956 13.2067 10.4526 14.1494 9.50918C14.2228 9.43531 14.2962 9.36242 14.3656 9.28415C14.433 9.20436 14.4776 9.10798 14.495 9.00504C14.5124 8.9021 14.5019 8.79638 14.4645 8.69891C14.4271 8.60143 14.3643 8.51577 14.2826 8.45084C14.2008 8.38591 14.1032 8.3441 13.9998 8.32976C13.7821 8.2965 13.6085 8.39091 13.4617 8.54207C12.8327 9.17344 12.2023 9.80366 11.5707 10.4327C11.5272 10.4763 11.4944 10.5365 11.4239 10.5531C11.3882 10.4836 11.4068 10.4117 11.4068 10.3432C11.4068 8.67741 11.4068 7.01191 11.4068 5.34674C11.4068 5.01459 11.4117 4.68292 11.4044 4.35126C11.4059 4.21314 11.3576 4.0791 11.2681 3.97384C11.1787 3.86858 11.0542 3.79918 10.9177 3.77843C10.5264 3.71581 10.2358 3.99122 10.2329 4.42904C10.2329 6.40043 10.2329 8.37183 10.2329 10.3432C10.2285 10.4122 10.2466 10.4841 10.2114 10.5546ZM10.8272 15.0633H5.36151C5.27042 15.0614 5.1793 15.0647 5.08857 15.0731C4.9682 15.0868 4.85548 15.139 4.7673 15.2221C4.67912 15.3052 4.62023 15.4146 4.59943 15.5339C4.52068 15.9497 4.80732 16.2344 5.30966 16.2344C8.97954 16.2344 12.6494 16.2344 16.3193 16.2344C16.4101 16.2358 16.5009 16.2283 16.5903 16.2119C16.723 16.1831 16.8414 16.1084 16.9245 16.001C17.0077 15.8936 17.0504 15.7603 17.0452 15.6246C17.0399 15.4888 16.9871 15.3592 16.8958 15.2586C16.8046 15.1579 16.6808 15.0926 16.5462 15.0741C16.4557 15.065 16.3647 15.0616 16.2738 15.0638L10.8272 15.0633Z"
                          fill="#07A1C0"
                        />
                      </svg>
                    </Tooltip>
                    <Tooltip title="Delete Document">
                      <svg
                        onClick={() => deleteConfirmation(item)}
                        className="cursor-pointer"
                        width="15"
                        height="18"
                        viewBox="0 0 15 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.81738 16C1.81738 17.1 2.71738 18 3.81738 18H11.8174C12.9174 18 13.8174 17.1 13.8174 16V6C13.8174 4.9 12.9174 4 11.8174 4H3.81738C2.71738 4 1.81738 4.9 1.81738 6V16ZM13.8174 1H11.3174L10.6074 0.29C10.4274 0.11 10.1674 0 9.90738 0H5.72738C5.46738 0 5.20738 0.11 5.02738 0.29L4.31738 1H1.81738C1.26738 1 0.817383 1.45 0.817383 2C0.817383 2.55 1.26738 3 1.81738 3H13.8174C14.3674 3 14.8174 2.55 14.8174 2C14.8174 1.45 14.3674 1 13.8174 1Z"
                          fill="#EF4949"
                        />
                      </svg>
                    </Tooltip>
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-center audio text-xl my-4">No data Found!!!</p>
          )}
        </div>
      </div>
      {open && (
        <PdfViewer
          hideNavbar={true}
          open={open}
          item={selectedItem}
          handleClose={handleClosePdf}
          handleDowload={handleDownload}
        />
      )}

      <DeleteModal
        open={deleteOpen}
        handleClose={handleClose}
        type="archeive"
        title=" Are you sure you want to Delete the Payslip?"
        loading={apiLoading}
        handleActionButton={deletePaySlip}
      />
    </>
  );
};

export default Payslips;
