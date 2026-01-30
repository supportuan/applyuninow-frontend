import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from '../../../api/index'
import { environment } from "../../../environments/environment";
// import './styles.scss';
import moment from "moment";
import Tooltip from '@mui/material/Tooltip';
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import info from "../../../Images/info.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import close from "../../../assets/allstudents/close.svg";
import { decryptData } from "../../../utils/helpers";

const ExternalStaffView = () => {
    const [usersData, setUsersData] = useState('');
    const [notes, setNotes] = useState('');
    const [isLoading, setLoading] = useState(false);
    const { id } = useParams();
    const [dateRange, setDateRange] = useState();
    const [showAddForm, setShowAddForm] = useState(false);

    console.log(id);

    useEffect(() => {
        getUsersData(decryptData(id));
    }, []);

    const getUsersData = (id) => {
        api
            .get(`${environment.API_BASE_URL}/admin/users/${decryptData(id)}`)
            .then((res) => {
                setUsersData(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // const updateNotes = (e) => {
    //     e.preventDefault();
    //     if (!notes) {
    //         return
    //     }
    //     setLoading(true)
    //     api
    //         .patch(`${environment.API_BASE_URL}/admin/contact-requests/notes/` + lead.id, { notes: notes })
    //         .then((res) => {
    //             setLoading(false)
    //             getLead()
    //         })
    //         .catch((error) => {
    //             setLoading(false)
    //         });
    // };

    const onSelectDate = (e) => {
        setDateRange(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // setSubmitted(true)
        // if (saveForm.name && saveForm.file) {
        //   setApiLoading(true)
        //   const formData = new FormData();
        //   formData.append('file', saveForm.file)
        //   formData.append('name', saveForm.name)
        //   api.post(`${BASE_URL}/admin/resources`, formData).then((response) => {
        //     let resources = [...resourcesList]
        //     resources.unshift(response.data.data)
        //     setResourcesList(resources)
        //     setShowAddForm(false)
        //     setSaveForm({name:'',file:''})
        //     setApiLoading(false)
        //     setSubmitted(false);
        //     toast.success('Resource Added Successfully!');
        //   }).catch((error) => {
        //     setApiLoading(false);
        //     setSubmitted(false);
        //     const { errors } = error.response.data;
        //     const erroMsg = errors[Object.keys(errors)[0]] || error.statusText;
        //     toast.error(erroMsg);
        //   })
        // }
        // return
    }

    const handleChange = () => { }

    return (
        <div className="mt-6 p-4 text-white ">
            <p className="text-xs ml-2">
                <Link to="/users/external" className="mr-1 cursor-pointer">
                    External Staffs
                </Link>{" "}
                {">"}
                <span className="ml-2">View External Staffs</span>
            </p>
            <p className="font-bold  text-2xl ml-2 mb-4">View External Staff</p>

            <div className=" bg-light rounded-xl px-5 lg:px-8 py-6">
                <div className="flex items-center justify-between mb-3">
                    <p className=" font-medium">Basic Information</p>
                    <Link to={`/users/edit-user/${id}?type=external`}>
                        <button className='btn-with-border py-2 px-8' >
                            <span>Edit</span>
                        </button>
                    </Link>
                </div>
                <div className="flex flex-col gap-6 rounded-xl p-6 bg-tab lg:grid lg:grid-cols-4  lg:gap-8">
                    <div className="flex flex-row gap-2 lg:flex lg:flex-col lg:gap-2 text-xs lg:text-sm">
                        <div className="text-text w-[120px]  lg:w-full">Staff ID</div>
                        <div className="text-white w-[160px] text-left lg:w-full">
                            {usersData?.id}
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 lg:flex lg:flex-col lg:gap-2 text-xs lg:text-sm">
                        <div className="text-text w-[120px]  lg:w-full">Lead Name</div>
                        <div className="text-white w-[160px] text-left lg:w-full">
                            {usersData?.name}
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 lg:flex lg:flex-col lg:gap-2 text-xs lg:text-sm">
                        <div className="text-text w-[120px]  lg:w-full">Phone Number</div>
                        <div className="text-white w-[160px] text-left lg:w-full">
                            {usersData?.phone}
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 lg:flex lg:flex-col lg:gap-2 text-xs lg:text-sm">
                        <div className="text-text w-[120px]  lg:w-full">E-mail Id</div>
                        <div className="text-white w-[160px] text-left lg:w-full">
                            {usersData?.email}
                        </div>
                    </div>

                    <div className="flex flex-row gap-2 lg:flex lg:flex-col lg:gap-2 text-xs lg:text-sm">
                        <div className="text-text w-[120px]  lg:w-full">User Role</div>
                        <div className="text-white w-[160px] text-left lg:w-full">
                            {usersData?.role?.name || '--'}
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 lg:flex lg:flex-col lg:gap-2 text-xs lg:text-sm">
                        <div className="text-text w-[120px]  lg:w-full">Created date & time</div>
                        <div className="text-white w-[160px] text-left lg:w-full">
                            {moment(usersData?.created_at).format("DD/MM/YYYY")}
                            <br/>
                            {moment(usersData?.created_at).format("LT")}
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 lg:flex lg:flex-col lg:gap-2 text-xs lg:text-sm">
                        <div className="text-text w-[120px]  lg:w-full">offer letter </div>
                        <div className="text-white w-[160px] text-left lg:w-full">
                            <button className={`${usersData?.download ? 'text-green' : 'text-[#61617E]'} underline`}>Download</button>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 lg:flex lg:flex-col lg:gap-2 text-xs lg:text-sm">
                        <div className="text-text w-[120px]  lg:w-full">Status</div>
                        <div className="text-white w-[160px] text-left lg:w-full">
                            {usersData?.status || '--'}
                        </div>
                    </div>
                </div>

            </div>

            <div className=" bg-light rounded-xl px-5 lg:px-8 mt-6 py-6">
                <div className="flex justify-between mb-4">
                    <p className=" font-medium">KYC Documents</p>
                </div>
                <div className="hidden lg:block rounded-xl p-6 bg-tab ">
                    <div className=" px-6 overflow-x-auto rounded-xl bg-light">
                        <Table className=" px-4 font-audiowide">
                            <Thead className="mb-1 text-text">
                                <Tr className="text-sm">
                                    <Th className="text-left font-audiowide">Document Name</Th>
                                    <Th className="pl-20 text-left font-audiowide">Date Uploaded</Th>
                                    <Th className="text-right font-audiowide">Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr className="text-xs text-white">
                                    <Td className="text-left">
                                        JHGJH
                                    </Td>
                                    <Td className="pl-20 text-left">
                                        KJHGFD
                                    </Td>
                                    <Td className="text-right">
                                        <div className="flex space-x-3 items-center justify-end">
                                            <Tooltip title="View Staff">
                                                <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.9091 10.908C12.5157 10.908 13.8182 9.60558 13.8182 7.99893C13.8182 6.39229 12.5157 5.08984 10.9091 5.08984C9.30244 5.08984 8 6.39229 8 7.99893C8 9.60558 9.30244 10.908 10.9091 10.908Z" fill="#57CD53" />
                                                    <path d="M21.7742 7.75273C20.9188 5.54011 19.4339 3.62663 17.5028 2.24879C15.5718 0.87095 13.2793 0.089144 10.9088 0C8.53825 0.089144 6.24579 0.87095 4.31475 2.24879C2.3837 3.62663 0.898717 5.54011 0.043327 7.75273C-0.0144423 7.91251 -0.0144423 8.08749 0.043327 8.24727C0.898717 10.4599 2.3837 12.3734 4.31475 13.7512C6.24579 15.1291 8.53825 15.9109 10.9088 16C13.2793 15.9109 15.5718 15.1291 17.5028 13.7512C19.4339 12.3734 20.9188 10.4599 21.7742 8.24727C21.832 8.08749 21.832 7.91251 21.7742 7.75273V7.75273ZM10.9088 12.7273C9.97382 12.7273 9.05985 12.45 8.28245 11.9306C7.50505 11.4111 6.89915 10.6728 6.54135 9.80905C6.18356 8.94525 6.08994 7.99476 6.27234 7.07775C6.45475 6.16075 6.90497 5.31843 7.5661 4.65731C8.22722 3.99619 9.06954 3.54596 9.98654 3.36356C10.9035 3.18116 11.854 3.27477 12.7178 3.63257C13.5816 3.99037 14.3199 4.59627 14.8394 5.37367C15.3588 6.15106 15.6361 7.06503 15.6361 8C15.6341 9.25316 15.1355 10.4544 14.2493 11.3406C13.3632 12.2267 12.1619 12.7253 10.9088 12.7273V12.7273Z" fill="#57CD53" />
                                                </svg>
                                            </Tooltip>

                                            <span className="w-[1px] h-[24px] bg-tab"></span>

                                            <Tooltip title="View Staff">
                                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4.17583 0H17.4546C17.4902 0.0145893 17.5271 0.0262064 17.5646 0.0347321C19.4723 0.312097 20.8076 1.82953 20.8111 3.75544C20.8186 7.91347 20.8194 12.0715 20.8135 16.2295C20.8135 16.776 20.7216 17.3057 20.4794 17.7993C19.7731 19.237 18.6109 19.9855 17.0099 19.9923C13.7958 20.0065 10.5812 19.9967 7.36651 19.9967C6.43714 19.9967 5.50532 20.0016 4.57497 19.9967C2.91629 19.986 1.54229 18.9949 1.00423 17.4329C0.914722 17.1737 0.888798 16.9012 0.817383 16.6385V3.36116C0.832219 3.31873 0.84447 3.27544 0.854068 3.23153C1.10451 1.72485 1.95366 0.716161 3.38293 0.189313C3.64022 0.0924556 3.91365 0.0709311 4.17583 0ZM10.2114 10.5546C10.1346 10.5325 10.0979 10.468 10.0495 10.4195C9.41357 9.78361 8.78013 9.14767 8.1418 8.51712C7.92706 8.30433 7.66782 8.26666 7.42912 8.39727C7.31734 8.45919 7.22883 8.55589 7.17701 8.6727C7.12519 8.7895 7.11289 8.92003 7.14199 9.04445C7.17427 9.20001 7.27797 9.30665 7.38656 9.41281C8.36191 10.3879 9.33743 11.363 10.3131 12.3381C10.6677 12.6923 10.9651 12.6923 11.3193 12.3381C12.2633 11.3956 13.2067 10.4526 14.1494 9.50918C14.2228 9.43531 14.2962 9.36242 14.3656 9.28415C14.433 9.20436 14.4776 9.10798 14.495 9.00504C14.5124 8.9021 14.5019 8.79638 14.4645 8.69891C14.4271 8.60143 14.3643 8.51577 14.2826 8.45084C14.2008 8.38591 14.1032 8.3441 13.9998 8.32976C13.7821 8.2965 13.6085 8.39091 13.4617 8.54207C12.8327 9.17344 12.2023 9.80366 11.5707 10.4327C11.5272 10.4763 11.4944 10.5365 11.4239 10.5531C11.3882 10.4836 11.4068 10.4117 11.4068 10.3432C11.4068 8.67741 11.4068 7.01191 11.4068 5.34674C11.4068 5.01459 11.4117 4.68292 11.4044 4.35126C11.4059 4.21314 11.3576 4.0791 11.2681 3.97384C11.1787 3.86858 11.0542 3.79918 10.9177 3.77843C10.5264 3.71581 10.2358 3.99122 10.2329 4.42904C10.2329 6.40043 10.2329 8.37183 10.2329 10.3432C10.2285 10.4122 10.2466 10.4841 10.2114 10.5546ZM10.8272 15.0633H5.36151C5.27042 15.0614 5.1793 15.0647 5.08857 15.0731C4.9682 15.0868 4.85548 15.139 4.7673 15.2221C4.67912 15.3052 4.62023 15.4146 4.59943 15.5339C4.52068 15.9497 4.80732 16.2344 5.30966 16.2344C8.97954 16.2344 12.6494 16.2344 16.3193 16.2344C16.4101 16.2358 16.5009 16.2283 16.5903 16.2119C16.723 16.1831 16.8414 16.1084 16.9245 16.001C17.0077 15.8936 17.0504 15.7603 17.0452 15.6246C17.0399 15.4888 16.9871 15.3592 16.8958 15.2586C16.8046 15.1579 16.6808 15.0926 16.5462 15.0741C16.4557 15.065 16.3647 15.0616 16.2738 15.0638L10.8272 15.0633Z" fill="#07A1C0" />
                                                </svg>
                                            </Tooltip>

                                            <span className="w-[1px] h-[24px] bg-tab"></span>

                                            <Tooltip title="Delete Resource">
                                                <svg className="cursor-pointer"
                                                    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21.0697 5.23C19.4597 5.07 17.8497 4.95 16.2297 4.86V4.85L16.0097 3.55C15.8597 2.63 15.6397 1.25 13.2997 1.25H10.6797C8.34967 1.25 8.12967 2.57 7.96967 3.54L7.75967 4.82C6.82967 4.88 5.89967 4.94 4.96967 5.03L2.92967 5.23C2.50967 5.27 2.20967 5.64 2.24967 6.05C2.28967 6.46 2.64967 6.76 3.06967 6.72L5.10967 6.52C10.3497 6 15.6297 6.2 20.9297 6.73C20.9597 6.73 20.9797 6.73 21.0097 6.73C21.3897 6.73 21.7197 6.44 21.7597 6.05C21.7897 5.64 21.4897 5.27 21.0697 5.23Z" fill="#EF4949" />
                                                    <path d="M19.2297 8.14C18.9897 7.89 18.6597 7.75 18.3197 7.75H5.67975C5.33975 7.75 4.99975 7.89 4.76975 8.14C4.53975 8.39 4.40975 8.73 4.42975 9.08L5.04975 19.34C5.15975 20.86 5.29975 22.76 8.78975 22.76H15.2097C18.6997 22.76 18.8397 20.87 18.9497 19.34L19.5697 9.09C19.5897 8.73 19.4597 8.39 19.2297 8.14ZM13.6597 17.75H10.3297C9.91975 17.75 9.57975 17.41 9.57975 17C9.57975 16.59 9.91975 16.25 10.3297 16.25H13.6597C14.0697 16.25 14.4097 16.59 14.4097 17C14.4097 17.41 14.0697 17.75 13.6597 17.75ZM14.4997 13.75H9.49975C9.08975 13.75 8.74975 13.41 8.74975 13C8.74975 12.59 9.08975 12.25 9.49975 12.25H14.4997C14.9097 12.25 15.2497 12.59 15.2497 13C15.2497 13.41 14.9097 13.75 14.4997 13.75Z" fill="#EF4949" />
                                                </svg>
                                            </Tooltip>

                                            <span className="w-[1px] h-[24px] bg-tab"></span>

                                            <Tooltip title="Delete Resource">
                                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4867 0.087785C10.5874 0.030258 10.7014 0 10.8174 0C10.9334 0 11.0473 0.030258 11.1481 0.087785L20.4814 5.42112C20.5834 5.4794 20.6682 5.56362 20.7272 5.66524C20.7862 5.76686 20.8173 5.88228 20.8174 5.99979V6.95978C20.8174 9.90108 19.8592 12.7623 18.0878 15.1104C16.3164 17.4584 13.8283 19.1655 11 19.9731C10.8806 20.0071 10.7541 20.0071 10.6347 19.9731C7.8067 19.1651 5.3188 17.458 3.54748 15.11C1.77615 12.762 0.817783 9.90097 0.817383 6.95978L0.817383 5.99979C0.817421 5.88228 0.848518 5.76686 0.907523 5.66524C0.966529 5.56362 1.05135 5.4794 1.15338 5.42112L10.4867 0.087785ZM10.2467 14.2811L16.0041 7.08245L14.964 6.25045L10.0547 12.3851L6.57738 9.48779L5.72405 10.5118L10.2467 14.2811Z" fill="#37D300" />
                                                </svg>
                                            </Tooltip>
                                        </div>
                                    </Td>
                                </Tr>
                                <Tr className="text-xs text-white">
                                    <Td className="text-left">
                                        JHGJH
                                    </Td>
                                    <Td className="pl-20 text-left">
                                        KJHGFD
                                    </Td>
                                    <Td className="text-right">
                                        <div className="flex space-x-3 items-center justify-end">
                                            <Tooltip title="View Staff">
                                                <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.9091 10.908C12.5157 10.908 13.8182 9.60558 13.8182 7.99893C13.8182 6.39229 12.5157 5.08984 10.9091 5.08984C9.30244 5.08984 8 6.39229 8 7.99893C8 9.60558 9.30244 10.908 10.9091 10.908Z" fill="#57CD53" />
                                                    <path d="M21.7742 7.75273C20.9188 5.54011 19.4339 3.62663 17.5028 2.24879C15.5718 0.87095 13.2793 0.089144 10.9088 0C8.53825 0.089144 6.24579 0.87095 4.31475 2.24879C2.3837 3.62663 0.898717 5.54011 0.043327 7.75273C-0.0144423 7.91251 -0.0144423 8.08749 0.043327 8.24727C0.898717 10.4599 2.3837 12.3734 4.31475 13.7512C6.24579 15.1291 8.53825 15.9109 10.9088 16C13.2793 15.9109 15.5718 15.1291 17.5028 13.7512C19.4339 12.3734 20.9188 10.4599 21.7742 8.24727C21.832 8.08749 21.832 7.91251 21.7742 7.75273V7.75273ZM10.9088 12.7273C9.97382 12.7273 9.05985 12.45 8.28245 11.9306C7.50505 11.4111 6.89915 10.6728 6.54135 9.80905C6.18356 8.94525 6.08994 7.99476 6.27234 7.07775C6.45475 6.16075 6.90497 5.31843 7.5661 4.65731C8.22722 3.99619 9.06954 3.54596 9.98654 3.36356C10.9035 3.18116 11.854 3.27477 12.7178 3.63257C13.5816 3.99037 14.3199 4.59627 14.8394 5.37367C15.3588 6.15106 15.6361 7.06503 15.6361 8C15.6341 9.25316 15.1355 10.4544 14.2493 11.3406C13.3632 12.2267 12.1619 12.7253 10.9088 12.7273V12.7273Z" fill="#57CD53" />
                                                </svg>
                                            </Tooltip>

                                            <span className="w-[1px] h-[24px] bg-tab"></span>

                                            <Tooltip title="View Staff">
                                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4.17583 0H17.4546C17.4902 0.0145893 17.5271 0.0262064 17.5646 0.0347321C19.4723 0.312097 20.8076 1.82953 20.8111 3.75544C20.8186 7.91347 20.8194 12.0715 20.8135 16.2295C20.8135 16.776 20.7216 17.3057 20.4794 17.7993C19.7731 19.237 18.6109 19.9855 17.0099 19.9923C13.7958 20.0065 10.5812 19.9967 7.36651 19.9967C6.43714 19.9967 5.50532 20.0016 4.57497 19.9967C2.91629 19.986 1.54229 18.9949 1.00423 17.4329C0.914722 17.1737 0.888798 16.9012 0.817383 16.6385V3.36116C0.832219 3.31873 0.84447 3.27544 0.854068 3.23153C1.10451 1.72485 1.95366 0.716161 3.38293 0.189313C3.64022 0.0924556 3.91365 0.0709311 4.17583 0ZM10.2114 10.5546C10.1346 10.5325 10.0979 10.468 10.0495 10.4195C9.41357 9.78361 8.78013 9.14767 8.1418 8.51712C7.92706 8.30433 7.66782 8.26666 7.42912 8.39727C7.31734 8.45919 7.22883 8.55589 7.17701 8.6727C7.12519 8.7895 7.11289 8.92003 7.14199 9.04445C7.17427 9.20001 7.27797 9.30665 7.38656 9.41281C8.36191 10.3879 9.33743 11.363 10.3131 12.3381C10.6677 12.6923 10.9651 12.6923 11.3193 12.3381C12.2633 11.3956 13.2067 10.4526 14.1494 9.50918C14.2228 9.43531 14.2962 9.36242 14.3656 9.28415C14.433 9.20436 14.4776 9.10798 14.495 9.00504C14.5124 8.9021 14.5019 8.79638 14.4645 8.69891C14.4271 8.60143 14.3643 8.51577 14.2826 8.45084C14.2008 8.38591 14.1032 8.3441 13.9998 8.32976C13.7821 8.2965 13.6085 8.39091 13.4617 8.54207C12.8327 9.17344 12.2023 9.80366 11.5707 10.4327C11.5272 10.4763 11.4944 10.5365 11.4239 10.5531C11.3882 10.4836 11.4068 10.4117 11.4068 10.3432C11.4068 8.67741 11.4068 7.01191 11.4068 5.34674C11.4068 5.01459 11.4117 4.68292 11.4044 4.35126C11.4059 4.21314 11.3576 4.0791 11.2681 3.97384C11.1787 3.86858 11.0542 3.79918 10.9177 3.77843C10.5264 3.71581 10.2358 3.99122 10.2329 4.42904C10.2329 6.40043 10.2329 8.37183 10.2329 10.3432C10.2285 10.4122 10.2466 10.4841 10.2114 10.5546ZM10.8272 15.0633H5.36151C5.27042 15.0614 5.1793 15.0647 5.08857 15.0731C4.9682 15.0868 4.85548 15.139 4.7673 15.2221C4.67912 15.3052 4.62023 15.4146 4.59943 15.5339C4.52068 15.9497 4.80732 16.2344 5.30966 16.2344C8.97954 16.2344 12.6494 16.2344 16.3193 16.2344C16.4101 16.2358 16.5009 16.2283 16.5903 16.2119C16.723 16.1831 16.8414 16.1084 16.9245 16.001C17.0077 15.8936 17.0504 15.7603 17.0452 15.6246C17.0399 15.4888 16.9871 15.3592 16.8958 15.2586C16.8046 15.1579 16.6808 15.0926 16.5462 15.0741C16.4557 15.065 16.3647 15.0616 16.2738 15.0638L10.8272 15.0633Z" fill="#07A1C0" />
                                                </svg>
                                            </Tooltip>

                                            <span className="w-[1px] h-[24px] bg-tab"></span>

                                            <Tooltip title="Delete Resource">
                                                <svg className="cursor-pointer"
                                                    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21.0697 5.23C19.4597 5.07 17.8497 4.95 16.2297 4.86V4.85L16.0097 3.55C15.8597 2.63 15.6397 1.25 13.2997 1.25H10.6797C8.34967 1.25 8.12967 2.57 7.96967 3.54L7.75967 4.82C6.82967 4.88 5.89967 4.94 4.96967 5.03L2.92967 5.23C2.50967 5.27 2.20967 5.64 2.24967 6.05C2.28967 6.46 2.64967 6.76 3.06967 6.72L5.10967 6.52C10.3497 6 15.6297 6.2 20.9297 6.73C20.9597 6.73 20.9797 6.73 21.0097 6.73C21.3897 6.73 21.7197 6.44 21.7597 6.05C21.7897 5.64 21.4897 5.27 21.0697 5.23Z" fill="#EF4949" />
                                                    <path d="M19.2297 8.14C18.9897 7.89 18.6597 7.75 18.3197 7.75H5.67975C5.33975 7.75 4.99975 7.89 4.76975 8.14C4.53975 8.39 4.40975 8.73 4.42975 9.08L5.04975 19.34C5.15975 20.86 5.29975 22.76 8.78975 22.76H15.2097C18.6997 22.76 18.8397 20.87 18.9497 19.34L19.5697 9.09C19.5897 8.73 19.4597 8.39 19.2297 8.14ZM13.6597 17.75H10.3297C9.91975 17.75 9.57975 17.41 9.57975 17C9.57975 16.59 9.91975 16.25 10.3297 16.25H13.6597C14.0697 16.25 14.4097 16.59 14.4097 17C14.4097 17.41 14.0697 17.75 13.6597 17.75ZM14.4997 13.75H9.49975C9.08975 13.75 8.74975 13.41 8.74975 13C8.74975 12.59 9.08975 12.25 9.49975 12.25H14.4997C14.9097 12.25 15.2497 12.59 15.2497 13C15.2497 13.41 14.9097 13.75 14.4997 13.75Z" fill="#EF4949" />
                                                </svg>
                                            </Tooltip>

                                            <span className="w-[1px] h-[24px] bg-tab"></span>

                                            <Tooltip title="Delete Resource">
                                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4867 0.087785C10.5874 0.030258 10.7014 0 10.8174 0C10.9334 0 11.0473 0.030258 11.1481 0.087785L20.4814 5.42112C20.5834 5.4794 20.6682 5.56362 20.7272 5.66524C20.7862 5.76686 20.8173 5.88228 20.8174 5.99979V6.95978C20.8174 9.90108 19.8592 12.7623 18.0878 15.1104C16.3164 17.4584 13.8283 19.1655 11 19.9731C10.8806 20.0071 10.7541 20.0071 10.6347 19.9731C7.8067 19.1651 5.3188 17.458 3.54748 15.11C1.77615 12.762 0.817783 9.90097 0.817383 6.95978L0.817383 5.99979C0.817421 5.88228 0.848518 5.76686 0.907523 5.66524C0.966529 5.56362 1.05135 5.4794 1.15338 5.42112L10.4867 0.087785ZM10.2467 14.2811L16.0041 7.08245L14.964 6.25045L10.0547 12.3851L6.57738 9.48779L5.72405 10.5118L10.2467 14.2811Z" fill="#37D300" />
                                                </svg>
                                            </Tooltip>
                                        </div>
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </div>
                </div>
                <div className="lg:hidden">
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className="text-white" />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className="bg-tab text-white"
                        >
                            <Typography className="flex flex-row">
                                <div className=" text-base  font-audiowide text-white">
                                    Documents
                                </div>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="flex flex-col lg:hidden bg-light">
                                <div className="bg-tab rounded-lg px-3  py-6 mt-3 flex gap-4 flex-col">
                                    <div className="text-white text-xs sm:text-sm flex flex-row mb-4 ">
                                        <div>Doc name</div>
                                    </div>
                                    <div className="text-text text-xs sm:text-sm">
                                        <span className="font-audiowide">Date Uploaded: </span>
                                        <span>--</span>
                                    </div>
                                    <hr className="border-b-2 bord" />
                                    <div className="flex justify-end items-end ">
                                        ----
                                    </div>
                                </div>
                            </div>

                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>


            <div className=" bg-light rounded-xl px-5 lg:px-8 mt-6 py-6">
                <div className="flex items-center justify-between mb-4">
                    <p className=" font-medium">Payslips</p>
                    <div className="flex gap-2 items-center">
                        <div className="px-5 rounded-xl bg-formfieldbg py-1  ">
                            <label className="block text-xs text-text">Date Range</label>
                            <select
                                className="bg-formfieldbg relative right-1"
                                onChange={(e) => onSelectDate(e)}
                                value={dateRange}
                            >
                                <option value="all">This Year</option>
                                <option value="0"> Today </option>
                                <option value="-1"> Yesterday </option>
                                <option value="-7"> Last 7 Days </option>
                                <option value="-30"> Last 30 Days </option>
                                <option value="TM">This Month </option>
                                <option value="LM">Last Month </option>
                            </select>
                        </div>
                        <button className='btn-with-border py-2 px-6' onClick={() => setShowAddForm(true)} >
                            <span>+Payslip</span>
                        </button>
                    </div>
                </div>
                <div className="hidden lg:block rounded-xl p-6 bg-tab ">
                    <div className=" px-6 overflow-x-auto rounded-xl bg-light">
                        <Table className="relative px-4 font-audiowide">
                            <Thead className="mb-1 z-20 text-text ">
                                <Tr className="text-sm ">
                                    <Th className="text-left font-audiowide">Sl No</Th>
                                    <Th className="pl-20 text-left font-audiowide">Payslips</Th>
                                    <Th className="pl-20 text-left font-audiowide">Uploaded date</Th>
                                    <Th className="text-right font-audiowide">Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr className="text-xs text-white">
                                    <Td className="text-left">
                                        JHGJH
                                    </Td>
                                    <Td className="text-left pl-20">
                                        KJHGFD
                                    </Td>
                                    <Td className="text-left pl-20">
                                        KJHGFD
                                    </Td>
                                    <Td className="text-right">
                                        <div className="flex space-x-3 items-center justify-end">
                                            <Tooltip title="View Staff">
                                                <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.9091 10.908C12.5157 10.908 13.8182 9.60558 13.8182 7.99893C13.8182 6.39229 12.5157 5.08984 10.9091 5.08984C9.30244 5.08984 8 6.39229 8 7.99893C8 9.60558 9.30244 10.908 10.9091 10.908Z" fill="#57CD53" />
                                                    <path d="M21.7742 7.75273C20.9188 5.54011 19.4339 3.62663 17.5028 2.24879C15.5718 0.87095 13.2793 0.089144 10.9088 0C8.53825 0.089144 6.24579 0.87095 4.31475 2.24879C2.3837 3.62663 0.898717 5.54011 0.043327 7.75273C-0.0144423 7.91251 -0.0144423 8.08749 0.043327 8.24727C0.898717 10.4599 2.3837 12.3734 4.31475 13.7512C6.24579 15.1291 8.53825 15.9109 10.9088 16C13.2793 15.9109 15.5718 15.1291 17.5028 13.7512C19.4339 12.3734 20.9188 10.4599 21.7742 8.24727C21.832 8.08749 21.832 7.91251 21.7742 7.75273V7.75273ZM10.9088 12.7273C9.97382 12.7273 9.05985 12.45 8.28245 11.9306C7.50505 11.4111 6.89915 10.6728 6.54135 9.80905C6.18356 8.94525 6.08994 7.99476 6.27234 7.07775C6.45475 6.16075 6.90497 5.31843 7.5661 4.65731C8.22722 3.99619 9.06954 3.54596 9.98654 3.36356C10.9035 3.18116 11.854 3.27477 12.7178 3.63257C13.5816 3.99037 14.3199 4.59627 14.8394 5.37367C15.3588 6.15106 15.6361 7.06503 15.6361 8C15.6341 9.25316 15.1355 10.4544 14.2493 11.3406C13.3632 12.2267 12.1619 12.7253 10.9088 12.7273V12.7273Z" fill="#57CD53" />
                                                </svg>
                                            </Tooltip>

                                            <span className="w-[1px] h-[24px] bg-tab"></span>

                                            <Tooltip title="View Staff">
                                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4.17583 0H17.4546C17.4902 0.0145893 17.5271 0.0262064 17.5646 0.0347321C19.4723 0.312097 20.8076 1.82953 20.8111 3.75544C20.8186 7.91347 20.8194 12.0715 20.8135 16.2295C20.8135 16.776 20.7216 17.3057 20.4794 17.7993C19.7731 19.237 18.6109 19.9855 17.0099 19.9923C13.7958 20.0065 10.5812 19.9967 7.36651 19.9967C6.43714 19.9967 5.50532 20.0016 4.57497 19.9967C2.91629 19.986 1.54229 18.9949 1.00423 17.4329C0.914722 17.1737 0.888798 16.9012 0.817383 16.6385V3.36116C0.832219 3.31873 0.84447 3.27544 0.854068 3.23153C1.10451 1.72485 1.95366 0.716161 3.38293 0.189313C3.64022 0.0924556 3.91365 0.0709311 4.17583 0ZM10.2114 10.5546C10.1346 10.5325 10.0979 10.468 10.0495 10.4195C9.41357 9.78361 8.78013 9.14767 8.1418 8.51712C7.92706 8.30433 7.66782 8.26666 7.42912 8.39727C7.31734 8.45919 7.22883 8.55589 7.17701 8.6727C7.12519 8.7895 7.11289 8.92003 7.14199 9.04445C7.17427 9.20001 7.27797 9.30665 7.38656 9.41281C8.36191 10.3879 9.33743 11.363 10.3131 12.3381C10.6677 12.6923 10.9651 12.6923 11.3193 12.3381C12.2633 11.3956 13.2067 10.4526 14.1494 9.50918C14.2228 9.43531 14.2962 9.36242 14.3656 9.28415C14.433 9.20436 14.4776 9.10798 14.495 9.00504C14.5124 8.9021 14.5019 8.79638 14.4645 8.69891C14.4271 8.60143 14.3643 8.51577 14.2826 8.45084C14.2008 8.38591 14.1032 8.3441 13.9998 8.32976C13.7821 8.2965 13.6085 8.39091 13.4617 8.54207C12.8327 9.17344 12.2023 9.80366 11.5707 10.4327C11.5272 10.4763 11.4944 10.5365 11.4239 10.5531C11.3882 10.4836 11.4068 10.4117 11.4068 10.3432C11.4068 8.67741 11.4068 7.01191 11.4068 5.34674C11.4068 5.01459 11.4117 4.68292 11.4044 4.35126C11.4059 4.21314 11.3576 4.0791 11.2681 3.97384C11.1787 3.86858 11.0542 3.79918 10.9177 3.77843C10.5264 3.71581 10.2358 3.99122 10.2329 4.42904C10.2329 6.40043 10.2329 8.37183 10.2329 10.3432C10.2285 10.4122 10.2466 10.4841 10.2114 10.5546ZM10.8272 15.0633H5.36151C5.27042 15.0614 5.1793 15.0647 5.08857 15.0731C4.9682 15.0868 4.85548 15.139 4.7673 15.2221C4.67912 15.3052 4.62023 15.4146 4.59943 15.5339C4.52068 15.9497 4.80732 16.2344 5.30966 16.2344C8.97954 16.2344 12.6494 16.2344 16.3193 16.2344C16.4101 16.2358 16.5009 16.2283 16.5903 16.2119C16.723 16.1831 16.8414 16.1084 16.9245 16.001C17.0077 15.8936 17.0504 15.7603 17.0452 15.6246C17.0399 15.4888 16.9871 15.3592 16.8958 15.2586C16.8046 15.1579 16.6808 15.0926 16.5462 15.0741C16.4557 15.065 16.3647 15.0616 16.2738 15.0638L10.8272 15.0633Z" fill="#07A1C0" />
                                                </svg>
                                            </Tooltip>

                                            <span className="w-[1px] h-[24px] bg-tab"></span>

                                            <Tooltip title="Delete Resource">
                                                <svg className="cursor-pointer"
                                                    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21.0697 5.23C19.4597 5.07 17.8497 4.95 16.2297 4.86V4.85L16.0097 3.55C15.8597 2.63 15.6397 1.25 13.2997 1.25H10.6797C8.34967 1.25 8.12967 2.57 7.96967 3.54L7.75967 4.82C6.82967 4.88 5.89967 4.94 4.96967 5.03L2.92967 5.23C2.50967 5.27 2.20967 5.64 2.24967 6.05C2.28967 6.46 2.64967 6.76 3.06967 6.72L5.10967 6.52C10.3497 6 15.6297 6.2 20.9297 6.73C20.9597 6.73 20.9797 6.73 21.0097 6.73C21.3897 6.73 21.7197 6.44 21.7597 6.05C21.7897 5.64 21.4897 5.27 21.0697 5.23Z" fill="#EF4949" />
                                                    <path d="M19.2297 8.14C18.9897 7.89 18.6597 7.75 18.3197 7.75H5.67975C5.33975 7.75 4.99975 7.89 4.76975 8.14C4.53975 8.39 4.40975 8.73 4.42975 9.08L5.04975 19.34C5.15975 20.86 5.29975 22.76 8.78975 22.76H15.2097C18.6997 22.76 18.8397 20.87 18.9497 19.34L19.5697 9.09C19.5897 8.73 19.4597 8.39 19.2297 8.14ZM13.6597 17.75H10.3297C9.91975 17.75 9.57975 17.41 9.57975 17C9.57975 16.59 9.91975 16.25 10.3297 16.25H13.6597C14.0697 16.25 14.4097 16.59 14.4097 17C14.4097 17.41 14.0697 17.75 13.6597 17.75ZM14.4997 13.75H9.49975C9.08975 13.75 8.74975 13.41 8.74975 13C8.74975 12.59 9.08975 12.25 9.49975 12.25H14.4997C14.9097 12.25 15.2497 12.59 15.2497 13C15.2497 13.41 14.9097 13.75 14.4997 13.75Z" fill="#EF4949" />
                                                </svg>
                                            </Tooltip>
                                        </div>
                                    </Td>
                                </Tr>
                                <Tr className="text-xs text-white">
                                    <Td className="text-left">
                                        JHGJH
                                    </Td>
                                    <Td className="text-left pl-20">
                                        KJHGFD
                                    </Td>
                                    <Td className="text-left pl-20">
                                        KJHGFD
                                    </Td>
                                    <Td className="text-right">
                                        <div className="flex space-x-3 items-center justify-end">
                                            <Tooltip title="View Staff">
                                                <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.9091 10.908C12.5157 10.908 13.8182 9.60558 13.8182 7.99893C13.8182 6.39229 12.5157 5.08984 10.9091 5.08984C9.30244 5.08984 8 6.39229 8 7.99893C8 9.60558 9.30244 10.908 10.9091 10.908Z" fill="#57CD53" />
                                                    <path d="M21.7742 7.75273C20.9188 5.54011 19.4339 3.62663 17.5028 2.24879C15.5718 0.87095 13.2793 0.089144 10.9088 0C8.53825 0.089144 6.24579 0.87095 4.31475 2.24879C2.3837 3.62663 0.898717 5.54011 0.043327 7.75273C-0.0144423 7.91251 -0.0144423 8.08749 0.043327 8.24727C0.898717 10.4599 2.3837 12.3734 4.31475 13.7512C6.24579 15.1291 8.53825 15.9109 10.9088 16C13.2793 15.9109 15.5718 15.1291 17.5028 13.7512C19.4339 12.3734 20.9188 10.4599 21.7742 8.24727C21.832 8.08749 21.832 7.91251 21.7742 7.75273V7.75273ZM10.9088 12.7273C9.97382 12.7273 9.05985 12.45 8.28245 11.9306C7.50505 11.4111 6.89915 10.6728 6.54135 9.80905C6.18356 8.94525 6.08994 7.99476 6.27234 7.07775C6.45475 6.16075 6.90497 5.31843 7.5661 4.65731C8.22722 3.99619 9.06954 3.54596 9.98654 3.36356C10.9035 3.18116 11.854 3.27477 12.7178 3.63257C13.5816 3.99037 14.3199 4.59627 14.8394 5.37367C15.3588 6.15106 15.6361 7.06503 15.6361 8C15.6341 9.25316 15.1355 10.4544 14.2493 11.3406C13.3632 12.2267 12.1619 12.7253 10.9088 12.7273V12.7273Z" fill="#57CD53" />
                                                </svg>
                                            </Tooltip>

                                            <span className="w-[1px] h-[24px] bg-tab"></span>

                                            <Tooltip title="View Staff">
                                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4.17583 0H17.4546C17.4902 0.0145893 17.5271 0.0262064 17.5646 0.0347321C19.4723 0.312097 20.8076 1.82953 20.8111 3.75544C20.8186 7.91347 20.8194 12.0715 20.8135 16.2295C20.8135 16.776 20.7216 17.3057 20.4794 17.7993C19.7731 19.237 18.6109 19.9855 17.0099 19.9923C13.7958 20.0065 10.5812 19.9967 7.36651 19.9967C6.43714 19.9967 5.50532 20.0016 4.57497 19.9967C2.91629 19.986 1.54229 18.9949 1.00423 17.4329C0.914722 17.1737 0.888798 16.9012 0.817383 16.6385V3.36116C0.832219 3.31873 0.84447 3.27544 0.854068 3.23153C1.10451 1.72485 1.95366 0.716161 3.38293 0.189313C3.64022 0.0924556 3.91365 0.0709311 4.17583 0ZM10.2114 10.5546C10.1346 10.5325 10.0979 10.468 10.0495 10.4195C9.41357 9.78361 8.78013 9.14767 8.1418 8.51712C7.92706 8.30433 7.66782 8.26666 7.42912 8.39727C7.31734 8.45919 7.22883 8.55589 7.17701 8.6727C7.12519 8.7895 7.11289 8.92003 7.14199 9.04445C7.17427 9.20001 7.27797 9.30665 7.38656 9.41281C8.36191 10.3879 9.33743 11.363 10.3131 12.3381C10.6677 12.6923 10.9651 12.6923 11.3193 12.3381C12.2633 11.3956 13.2067 10.4526 14.1494 9.50918C14.2228 9.43531 14.2962 9.36242 14.3656 9.28415C14.433 9.20436 14.4776 9.10798 14.495 9.00504C14.5124 8.9021 14.5019 8.79638 14.4645 8.69891C14.4271 8.60143 14.3643 8.51577 14.2826 8.45084C14.2008 8.38591 14.1032 8.3441 13.9998 8.32976C13.7821 8.2965 13.6085 8.39091 13.4617 8.54207C12.8327 9.17344 12.2023 9.80366 11.5707 10.4327C11.5272 10.4763 11.4944 10.5365 11.4239 10.5531C11.3882 10.4836 11.4068 10.4117 11.4068 10.3432C11.4068 8.67741 11.4068 7.01191 11.4068 5.34674C11.4068 5.01459 11.4117 4.68292 11.4044 4.35126C11.4059 4.21314 11.3576 4.0791 11.2681 3.97384C11.1787 3.86858 11.0542 3.79918 10.9177 3.77843C10.5264 3.71581 10.2358 3.99122 10.2329 4.42904C10.2329 6.40043 10.2329 8.37183 10.2329 10.3432C10.2285 10.4122 10.2466 10.4841 10.2114 10.5546ZM10.8272 15.0633H5.36151C5.27042 15.0614 5.1793 15.0647 5.08857 15.0731C4.9682 15.0868 4.85548 15.139 4.7673 15.2221C4.67912 15.3052 4.62023 15.4146 4.59943 15.5339C4.52068 15.9497 4.80732 16.2344 5.30966 16.2344C8.97954 16.2344 12.6494 16.2344 16.3193 16.2344C16.4101 16.2358 16.5009 16.2283 16.5903 16.2119C16.723 16.1831 16.8414 16.1084 16.9245 16.001C17.0077 15.8936 17.0504 15.7603 17.0452 15.6246C17.0399 15.4888 16.9871 15.3592 16.8958 15.2586C16.8046 15.1579 16.6808 15.0926 16.5462 15.0741C16.4557 15.065 16.3647 15.0616 16.2738 15.0638L10.8272 15.0633Z" fill="#07A1C0" />
                                                </svg>
                                            </Tooltip>

                                            <span className="w-[1px] h-[24px] bg-tab"></span>

                                            <Tooltip title="Delete Resource">
                                                <svg className="cursor-pointer"
                                                    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21.0697 5.23C19.4597 5.07 17.8497 4.95 16.2297 4.86V4.85L16.0097 3.55C15.8597 2.63 15.6397 1.25 13.2997 1.25H10.6797C8.34967 1.25 8.12967 2.57 7.96967 3.54L7.75967 4.82C6.82967 4.88 5.89967 4.94 4.96967 5.03L2.92967 5.23C2.50967 5.27 2.20967 5.64 2.24967 6.05C2.28967 6.46 2.64967 6.76 3.06967 6.72L5.10967 6.52C10.3497 6 15.6297 6.2 20.9297 6.73C20.9597 6.73 20.9797 6.73 21.0097 6.73C21.3897 6.73 21.7197 6.44 21.7597 6.05C21.7897 5.64 21.4897 5.27 21.0697 5.23Z" fill="#EF4949" />
                                                    <path d="M19.2297 8.14C18.9897 7.89 18.6597 7.75 18.3197 7.75H5.67975C5.33975 7.75 4.99975 7.89 4.76975 8.14C4.53975 8.39 4.40975 8.73 4.42975 9.08L5.04975 19.34C5.15975 20.86 5.29975 22.76 8.78975 22.76H15.2097C18.6997 22.76 18.8397 20.87 18.9497 19.34L19.5697 9.09C19.5897 8.73 19.4597 8.39 19.2297 8.14ZM13.6597 17.75H10.3297C9.91975 17.75 9.57975 17.41 9.57975 17C9.57975 16.59 9.91975 16.25 10.3297 16.25H13.6597C14.0697 16.25 14.4097 16.59 14.4097 17C14.4097 17.41 14.0697 17.75 13.6597 17.75ZM14.4997 13.75H9.49975C9.08975 13.75 8.74975 13.41 8.74975 13C8.74975 12.59 9.08975 12.25 9.49975 12.25H14.4997C14.9097 12.25 15.2497 12.59 15.2497 13C15.2497 13.41 14.9097 13.75 14.4997 13.75Z" fill="#EF4949" />
                                                </svg>
                                            </Tooltip>
                                        </div>
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </div>
                </div>
                <div className="lg:hidden">
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className="text-white" />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className="bg-tab text-white"
                        >
                            <Typography className="flex flex-row">
                                <div className=" text-base  font-audiowide text-white">
                                    Documents
                                </div>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="flex flex-col lg:hidden bg-light">
                                <div className="bg-tab rounded-lg px-3  py-6 mt-3 flex gap-4 flex-col">
                                    <div className="text-white text-xs sm:text-sm flex flex-row mb-4 ">
                                        <div>Doc name</div>
                                    </div>
                                    <div className="text-text text-xs sm:text-sm">
                                        <span className="font-audiowide">Date Uploaded: </span>
                                        <span>--</span>
                                    </div>
                                    <hr className="border-b-2 bord" />
                                    <div className="flex justify-end items-end ">
                                        ----
                                    </div>
                                </div>
                            </div>

                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>

            {
                showAddForm ?
                    <div class="modal">
                        <form class="modal-content add-resouce-from p-8" onSubmit={handleSubmit}>
                            <div class="container">
                                <div className="flex justify-between ">
                                    <p className="text-white font-semibold pb-5">
                                        Add New Resource
                                    </p>
                                    <img onClick={() => setShowAddForm(false)}
                                        className="relative bottom-2 cursor-pointer"
                                        src={close}
                                        alt="close"
                                    />
                                </div>
                                <hr />
                                <div className="add-resouce-sec">

                                    <input
                                        className=" text-white w-full placeholder:text-text px-4 h-12"
                                        type="text"
                                        placeholder="Resource Name"
                                        value={''}
                                        onChange={''}
                                        name='name'
                                    />
                                    {/* {
                                        submitted && !saveForm.name ? <p className="text-red text-left text-xs">Please Enter Resource Name</p> : ''
                                    } */}

                                    <div className="relative py-2 pl-3  items-center space-x-8 gap-8 border-2 border-dashed border-[#404050] flex mb-5 mt-4">

                                        <> <label
                                            className="theme-btn-fill text-sm relative w-48 px-5  py-3 rounded-lg cursor-pointer z-10"
                                            htmlFor="filepicker"
                                        >
                                            <span>Attach Document</span>
                                        </label>
                                            <input
                                                id="filepicker"

                                                className=" hidden relative top-2 left-[-103px] z-[1]  text-white border-none"
                                                type="file"
                                                accept=".pdf"
                                                onChange={(e) => handleChange(e)}
                                            />
                                            Support Only .Pdf</>
                                        {/* <>
                                                    <div className="flex justify-between w-full items-center  px-4 py-4">
                                                        <p className="text-xs text-ellipsis">{saveForm.file.name}</p>
                                                        <button className="bg-red p-1 rounded" onClick={deleteFile}> Delete</button>
                                                    </div>
                                                </> */}
                                    </div>

                                    {/* {
                                        submitted && !saveForm.file ? <p className="text-red text-left text-xs">Please Select File</p> : ''
                                    } */}
                                </div>

                                <div className="flex justify-end  pt-4">
                                    <button
                                        className="submit text-[#000000] font-semibold rounded-lg py-2 px-6"
                                        type="submit"
                                    >
                                        Submit
                                    </button>

                                </div>
                            </div>
                        </form>
                    </div>
                    : ''
            }

        </div>
    );
};
export default ExternalStaffView
