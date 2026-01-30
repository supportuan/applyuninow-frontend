import React, { useState, useEffect, useContext } from "react";
import { Tooltip } from "@mui/material";
import UploadDocument from './UploadDocument';
import Validator from 'validatorjs';
import { uuid } from "../../utils/helpers";
import api from "../../api/index";
import { AppContext } from "../../context/Appcontext";
import { toast } from "react-toastify";
import PdfViewer from "./PdfViewer";

const KYCDetails = ({ usersData, refresh }) => {
  const initialValue = {
    type: '',
    name: '',
    image: '',
  }
  const [params, setParams] = useState(initialValue);
  const [formErrors, setFormErrors] = useState(initialValue)
  const [apiLoading, setApiLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [open, setOpen] = useState(false);
  const [supportDocument, setSupportDocument] = useState('')
  const { BASE_URL } = useContext(AppContext);
  const [preview, setPreview] = useState(false);

  const handleClose = () => {
    setOpen(false)
    setApiLoading(false)
    setSupportDocument('')
    setParams({ ...params, image: '' });
  }

  const handleUpload = (item) => {
    setOpen(true)
    setParams({ ...params, type: item.type, name: item.name });
  }

  const handleSubmit = async () => {
    const postdata = { ...params }
    const rules = {
      image: 'required',
    }

    const validation = new Validator(params, rules)

    if (validation.fails()) {
      const fieldErrors = {}
      Object.keys(validation.errors.errors).forEach((key) => {
        fieldErrors[key] = validation.errors.errors[key][0]
      })
      setFormErrors(fieldErrors)
      return false
    }

    const formData = new FormData()

    Object.entries(postdata).forEach(([key, value]) => {
      if (!['image'].includes(key)) {
        formData.append(`${key}`, `${value}`)
      }
    })

    if (supportDocument) {
      formData.append('image', supportDocument)
    }

    setApiLoading(true)
    api
      .post(`${BASE_URL}/admin/users/kyc-documents`, formData)
      .then((res) => {
        setApiLoading(false)
        handleClose();
        toast.success(`${params.name} added Successfully`);
        refresh()
      })
      .catch((err) => {
        const { errors, message } = err.response.data;
        const erroMsg = errors[Object.keys(errors)[0]] || message;
        toast.error(erroMsg);
        handleClose();
      });
  }

  const handleImage = (data) => {
    setSupportDocument(data.file)
    setParams({ ...params, image: data.url });
  }

  const removeImage = () => {
    setSupportDocument('')
    setParams({ ...params, image: '' });
  }

  const handleView = (item) => {
    setSelectedItem(item)
    setPreview(true)
  }
  const handleDownload = (e, item) => {
    e.preventDefault();
    window.open(selectedItem.url, "_blank");
  };
  const handleClosePdf = () => {
    setPreview(false);
  };

  return (
    <>

      <div className="p-5 bg-light rounded-lg font-audiowide">
        {/* for desktop, tab, mobile */}
        <p className="">KYC Documents</p>

        {/* for desktop and tab */}
        <div className="mt-4 rounded-lg bg-tab  flex-col hidden md:block">
          <div className='flex flex-row items-center justify-between px-10 py-4 text-xs text-text border-b border-border'>
            <p>Document</p>
            <p>Uploaded Date</p>
            <p>Action</p>
          </div>
          {
            usersData && usersData.kyc_documents && usersData.kyc_documents?.map(x =>
              <div key={uuid()} className='flex flex-row items-center justify-between px-10 py-4 text-xs text-white border-b border-border'>
                <p className="w-[125px]">{x.name}</p>
                <p className='text-center'>{x.updtated_at || '--'}</p>
                <p className='flex flex-row items-center gap-3'>
                  {
                    x.url &&
                    <>

                      <Tooltip title="View Document">
                        <svg className="cursor-pointer" onClick={() => handleView(x)} width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.9091 10.9119C12.5157 10.9119 13.8182 9.60949 13.8182 8.00284C13.8182 6.39619 12.5157 5.09375 10.9091 5.09375C9.30244 5.09375 8 6.39619 8 8.00284C8 9.60949 9.30244 10.9119 10.9091 10.9119Z" fill="#57CD53" />
                          <path d="M21.7742 7.75273C20.9188 5.54011 19.4339 3.62663 17.5028 2.24879C15.5718 0.87095 13.2793 0.089144 10.9088 0C8.53825 0.089144 6.24579 0.87095 4.31475 2.24879C2.3837 3.62663 0.898717 5.54011 0.043327 7.75273C-0.0144423 7.91251 -0.0144423 8.08749 0.043327 8.24727C0.898717 10.4599 2.3837 12.3734 4.31475 13.7512C6.24579 15.1291 8.53825 15.9109 10.9088 16C13.2793 15.9109 15.5718 15.1291 17.5028 13.7512C19.4339 12.3734 20.9188 10.4599 21.7742 8.24727C21.832 8.08749 21.832 7.91251 21.7742 7.75273V7.75273ZM10.9088 12.7273C9.97382 12.7273 9.05985 12.45 8.28245 11.9306C7.50505 11.4111 6.89915 10.6728 6.54135 9.80905C6.18356 8.94525 6.08994 7.99476 6.27234 7.07775C6.45475 6.16075 6.90497 5.31843 7.5661 4.65731C8.22722 3.99619 9.06954 3.54596 9.98654 3.36356C10.9035 3.18116 11.854 3.27477 12.7178 3.63257C13.5816 3.99037 14.3199 4.59627 14.8394 5.37367C15.3588 6.15106 15.6361 7.06503 15.6361 8C15.6341 9.25316 15.1355 10.4544 14.2493 11.3406C13.3632 12.2267 12.1619 12.7253 10.9088 12.7273V12.7273Z" fill="#57CD53" />
                        </svg>
                      </Tooltip>
                      <Tooltip title="Download Document">
                        <svg className="cursor-pointer" onClick={(e) => handleDownload(e, x)} width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.17583 0H17.4546C17.4902 0.0145893 17.5271 0.0262064 17.5646 0.0347321C19.4723 0.312097 20.8076 1.82953 20.8111 3.75544C20.8186 7.91347 20.8194 12.0715 20.8135 16.2295C20.8135 16.776 20.7216 17.3057 20.4794 17.7993C19.7731 19.237 18.6109 19.9855 17.0099 19.9923C13.7958 20.0065 10.5812 19.9967 7.36651 19.9967C6.43714 19.9967 5.50532 20.0016 4.57497 19.9967C2.91629 19.986 1.54229 18.9949 1.00423 17.4329C0.914722 17.1737 0.888798 16.9012 0.817383 16.6385V3.36116C0.832219 3.31873 0.84447 3.27544 0.854068 3.23153C1.10451 1.72485 1.95366 0.716161 3.38293 0.189313C3.64022 0.0924556 3.91365 0.0709311 4.17583 0ZM10.2114 10.5546C10.1346 10.5325 10.0979 10.468 10.0495 10.4195C9.41357 9.78361 8.78013 9.14767 8.1418 8.51712C7.92706 8.30433 7.66782 8.26666 7.42912 8.39727C7.31734 8.45919 7.22883 8.55589 7.17701 8.6727C7.12519 8.7895 7.11289 8.92003 7.14199 9.04445C7.17427 9.20001 7.27797 9.30665 7.38656 9.41281C8.36191 10.3879 9.33743 11.363 10.3131 12.3381C10.6677 12.6923 10.9651 12.6923 11.3193 12.3381C12.2633 11.3956 13.2067 10.4526 14.1494 9.50918C14.2228 9.43531 14.2962 9.36242 14.3656 9.28415C14.433 9.20436 14.4776 9.10798 14.495 9.00504C14.5124 8.9021 14.5019 8.79638 14.4645 8.69891C14.4271 8.60143 14.3643 8.51577 14.2826 8.45084C14.2008 8.38591 14.1032 8.3441 13.9998 8.32976C13.7821 8.2965 13.6085 8.39091 13.4617 8.54207C12.8327 9.17344 12.2023 9.80366 11.5707 10.4327C11.5272 10.4763 11.4944 10.5365 11.4239 10.5531C11.3882 10.4836 11.4068 10.4117 11.4068 10.3432C11.4068 8.67741 11.4068 7.01191 11.4068 5.34674C11.4068 5.01459 11.4117 4.68292 11.4044 4.35126C11.4059 4.21314 11.3576 4.0791 11.2681 3.97384C11.1787 3.86858 11.0542 3.79918 10.9177 3.77843C10.5264 3.71581 10.2358 3.99122 10.2329 4.42904C10.2329 6.40043 10.2329 8.37183 10.2329 10.3432C10.2285 10.4122 10.2466 10.4841 10.2114 10.5546ZM10.8272 15.0633H5.36151C5.27042 15.0614 5.1793 15.0647 5.08857 15.0731C4.9682 15.0868 4.85548 15.139 4.7673 15.2221C4.67912 15.3052 4.62023 15.4146 4.59943 15.5339C4.52068 15.9497 4.80732 16.2344 5.30966 16.2344C8.97954 16.2344 12.6494 16.2344 16.3193 16.2344C16.4101 16.2358 16.5009 16.2283 16.5903 16.2119C16.723 16.1831 16.8414 16.1084 16.9245 16.001C17.0077 15.8936 17.0504 15.7603 17.0452 15.6246C17.0399 15.4888 16.9871 15.3592 16.8958 15.2586C16.8046 15.1579 16.6808 15.0926 16.5462 15.0741C16.4557 15.065 16.3647 15.0616 16.2738 15.0638L10.8272 15.0633Z" fill="#07A1C0" />
                        </svg>
                      </Tooltip>
                    </>

                  }

                  {
                    !x.url &&
                    <Tooltip title="Upload Document">
                      <svg className="cursor-pointer" onClick={() => handleUpload(x)} width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 12.825V16C7 16.2833 7.096 16.5207 7.288 16.712C7.47933 16.904 7.71667 17 8 17C8.28333 17 8.521 16.904 8.713 16.712C8.90433 16.5207 9 16.2833 9 16V12.825L9.9 13.725C10 13.825 10.1127 13.9 10.238 13.95C10.3627 14 10.4877 14.0207 10.613 14.012C10.7377 14.004 10.8583 13.975 10.975 13.925C11.0917 13.875 11.2 13.8 11.3 13.7C11.4833 13.5 11.5793 13.2667 11.588 13C11.596 12.7333 11.5 12.5 11.3 12.3L8.7 9.7C8.6 9.6 8.49167 9.529 8.375 9.487C8.25833 9.44567 8.13333 9.425 8 9.425C7.86667 9.425 7.74167 9.44567 7.625 9.487C7.50833 9.529 7.4 9.6 7.3 9.7L4.7 12.3C4.5 12.5 4.40433 12.7333 4.413 13C4.421 13.2667 4.525 13.5 4.725 13.7C4.925 13.8833 5.15833 13.9793 5.425 13.988C5.69167 13.996 5.925 13.9 6.125 13.7L7 12.825ZM2 20C1.45 20 0.979333 19.8043 0.588 19.413C0.196 19.021 0 18.55 0 18V2C0 1.45 0.196 0.979 0.588 0.587C0.979333 0.195667 1.45 0 2 0H9.175C9.44167 0 9.696 0.0500001 9.938 0.15C10.1793 0.25 10.3917 0.391667 10.575 0.575L15.425 5.425C15.6083 5.60833 15.75 5.82067 15.85 6.062C15.95 6.304 16 6.55833 16 6.825V18C16 18.55 15.8043 19.021 15.413 19.413C15.021 19.8043 14.55 20 14 20H2ZM9 6C9 6.28333 9.096 6.52067 9.288 6.712C9.47933 6.904 9.71667 7 10 7H14L9 2V6Z" fill="#FFE15A" />
                      </svg>

                    </Tooltip>
                  }


                </p>
              </div>
            )
          }

        </div>

        {/* for mobile */}
        <div className="mt-4 p-5 rounded-lg bg-tab flex flex-col gap-4 md:hidden">
          {
            usersData && usersData.kyc_documents && usersData.kyc_documents?.map(x =>
              <div key={uuid()} >
                <div className='flex flex-row justify-between items-center py-1'>
                  <p className='text-xs text-text'>Document</p>
                  <p className='text-xs'>{x.name}</p>
                </div>
                <div className='flex flex-row justify-between items-center py-1'>
                  <p className='text-xs text-text'>Date</p>
                  <p className='text-xs text-right'>{x.updtated_at || '--'}</p>
                </div>
                <div className='flex flex-row justify-between items-center py-1'>
                  <p className='text-xs text-text'>Action</p>
                  <p className='flex flex-row items-center gap-3'>
                    {
                      x.url &&

                      <>
                        <Tooltip title="View Document">
                          <svg  onClick={() => handleView(x)} width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.9091 10.9119C12.5157 10.9119 13.8182 9.60949 13.8182 8.00284C13.8182 6.39619 12.5157 5.09375 10.9091 5.09375C9.30244 5.09375 8 6.39619 8 8.00284C8 9.60949 9.30244 10.9119 10.9091 10.9119Z" fill="#57CD53" />
                            <path d="M21.7742 7.75273C20.9188 5.54011 19.4339 3.62663 17.5028 2.24879C15.5718 0.87095 13.2793 0.089144 10.9088 0C8.53825 0.089144 6.24579 0.87095 4.31475 2.24879C2.3837 3.62663 0.898717 5.54011 0.043327 7.75273C-0.0144423 7.91251 -0.0144423 8.08749 0.043327 8.24727C0.898717 10.4599 2.3837 12.3734 4.31475 13.7512C6.24579 15.1291 8.53825 15.9109 10.9088 16C13.2793 15.9109 15.5718 15.1291 17.5028 13.7512C19.4339 12.3734 20.9188 10.4599 21.7742 8.24727C21.832 8.08749 21.832 7.91251 21.7742 7.75273V7.75273ZM10.9088 12.7273C9.97382 12.7273 9.05985 12.45 8.28245 11.9306C7.50505 11.4111 6.89915 10.6728 6.54135 9.80905C6.18356 8.94525 6.08994 7.99476 6.27234 7.07775C6.45475 6.16075 6.90497 5.31843 7.5661 4.65731C8.22722 3.99619 9.06954 3.54596 9.98654 3.36356C10.9035 3.18116 11.854 3.27477 12.7178 3.63257C13.5816 3.99037 14.3199 4.59627 14.8394 5.37367C15.3588 6.15106 15.6361 7.06503 15.6361 8C15.6341 9.25316 15.1355 10.4544 14.2493 11.3406C13.3632 12.2267 12.1619 12.7253 10.9088 12.7273V12.7273Z" fill="#57CD53" />
                          </svg>
                        </Tooltip>
                        <Tooltip title="Download Document">
                          <svg onClick={(e) => handleDownload(e, x)} width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.17583 0H17.4546C17.4902 0.0145893 17.5271 0.0262064 17.5646 0.0347321C19.4723 0.312097 20.8076 1.82953 20.8111 3.75544C20.8186 7.91347 20.8194 12.0715 20.8135 16.2295C20.8135 16.776 20.7216 17.3057 20.4794 17.7993C19.7731 19.237 18.6109 19.9855 17.0099 19.9923C13.7958 20.0065 10.5812 19.9967 7.36651 19.9967C6.43714 19.9967 5.50532 20.0016 4.57497 19.9967C2.91629 19.986 1.54229 18.9949 1.00423 17.4329C0.914722 17.1737 0.888798 16.9012 0.817383 16.6385V3.36116C0.832219 3.31873 0.84447 3.27544 0.854068 3.23153C1.10451 1.72485 1.95366 0.716161 3.38293 0.189313C3.64022 0.0924556 3.91365 0.0709311 4.17583 0ZM10.2114 10.5546C10.1346 10.5325 10.0979 10.468 10.0495 10.4195C9.41357 9.78361 8.78013 9.14767 8.1418 8.51712C7.92706 8.30433 7.66782 8.26666 7.42912 8.39727C7.31734 8.45919 7.22883 8.55589 7.17701 8.6727C7.12519 8.7895 7.11289 8.92003 7.14199 9.04445C7.17427 9.20001 7.27797 9.30665 7.38656 9.41281C8.36191 10.3879 9.33743 11.363 10.3131 12.3381C10.6677 12.6923 10.9651 12.6923 11.3193 12.3381C12.2633 11.3956 13.2067 10.4526 14.1494 9.50918C14.2228 9.43531 14.2962 9.36242 14.3656 9.28415C14.433 9.20436 14.4776 9.10798 14.495 9.00504C14.5124 8.9021 14.5019 8.79638 14.4645 8.69891C14.4271 8.60143 14.3643 8.51577 14.2826 8.45084C14.2008 8.38591 14.1032 8.3441 13.9998 8.32976C13.7821 8.2965 13.6085 8.39091 13.4617 8.54207C12.8327 9.17344 12.2023 9.80366 11.5707 10.4327C11.5272 10.4763 11.4944 10.5365 11.4239 10.5531C11.3882 10.4836 11.4068 10.4117 11.4068 10.3432C11.4068 8.67741 11.4068 7.01191 11.4068 5.34674C11.4068 5.01459 11.4117 4.68292 11.4044 4.35126C11.4059 4.21314 11.3576 4.0791 11.2681 3.97384C11.1787 3.86858 11.0542 3.79918 10.9177 3.77843C10.5264 3.71581 10.2358 3.99122 10.2329 4.42904C10.2329 6.40043 10.2329 8.37183 10.2329 10.3432C10.2285 10.4122 10.2466 10.4841 10.2114 10.5546ZM10.8272 15.0633H5.36151C5.27042 15.0614 5.1793 15.0647 5.08857 15.0731C4.9682 15.0868 4.85548 15.139 4.7673 15.2221C4.67912 15.3052 4.62023 15.4146 4.59943 15.5339C4.52068 15.9497 4.80732 16.2344 5.30966 16.2344C8.97954 16.2344 12.6494 16.2344 16.3193 16.2344C16.4101 16.2358 16.5009 16.2283 16.5903 16.2119C16.723 16.1831 16.8414 16.1084 16.9245 16.001C17.0077 15.8936 17.0504 15.7603 17.0452 15.6246C17.0399 15.4888 16.9871 15.3592 16.8958 15.2586C16.8046 15.1579 16.6808 15.0926 16.5462 15.0741C16.4557 15.065 16.3647 15.0616 16.2738 15.0638L10.8272 15.0633Z" fill="#07A1C0" />
                          </svg>
                        </Tooltip>
                      </>

                    }
                    {
                      !x.url &&

                      <Tooltip title="Upload Document">
                        <svg onClick={() => handleUpload(x)} width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 12.825V16C7 16.2833 7.096 16.5207 7.288 16.712C7.47933 16.904 7.71667 17 8 17C8.28333 17 8.521 16.904 8.713 16.712C8.90433 16.5207 9 16.2833 9 16V12.825L9.9 13.725C10 13.825 10.1127 13.9 10.238 13.95C10.3627 14 10.4877 14.0207 10.613 14.012C10.7377 14.004 10.8583 13.975 10.975 13.925C11.0917 13.875 11.2 13.8 11.3 13.7C11.4833 13.5 11.5793 13.2667 11.588 13C11.596 12.7333 11.5 12.5 11.3 12.3L8.7 9.7C8.6 9.6 8.49167 9.529 8.375 9.487C8.25833 9.44567 8.13333 9.425 8 9.425C7.86667 9.425 7.74167 9.44567 7.625 9.487C7.50833 9.529 7.4 9.6 7.3 9.7L4.7 12.3C4.5 12.5 4.40433 12.7333 4.413 13C4.421 13.2667 4.525 13.5 4.725 13.7C4.925 13.8833 5.15833 13.9793 5.425 13.988C5.69167 13.996 5.925 13.9 6.125 13.7L7 12.825ZM2 20C1.45 20 0.979333 19.8043 0.588 19.413C0.196 19.021 0 18.55 0 18V2C0 1.45 0.196 0.979 0.588 0.587C0.979333 0.195667 1.45 0 2 0H9.175C9.44167 0 9.696 0.0500001 9.938 0.15C10.1793 0.25 10.3917 0.391667 10.575 0.575L15.425 5.425C15.6083 5.60833 15.75 5.82067 15.85 6.062C15.95 6.304 16 6.55833 16 6.825V18C16 18.55 15.8043 19.021 15.413 19.413C15.021 19.8043 14.55 20 14 20H2ZM9 6C9 6.28333 9.096 6.52067 9.288 6.712C9.47933 6.904 9.71667 7 10 7H14L9 2V6Z" fill="#FFE15A" />
                      </svg>
                      </Tooltip>

                    }

                  </p>
                </div>
              </div>
            )
          }

        </div>
      </div>


      {/* popup */}
      <UploadDocument
        open={open}
        handleClose={handleClose}
        handleImage={handleImage}
        removeImage={removeImage}
        handleSubmit={handleSubmit}
        formErrors={formErrors}
        params={params}
        apiLoading={apiLoading}
      />


      {
        preview &&
        <PdfViewer
        hideNavbar={true}
          open={preview}
          item={selectedItem}
          handleClose={handleClosePdf}
          handleDowload={handleDownload}
        />
      }

    </>
  )
}

export default KYCDetails