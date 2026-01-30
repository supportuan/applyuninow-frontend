import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useState, useEffect, useContext, useMemo } from "react";
import search_logo from "../../../assets/allstudents/search.svg";
import studentdate from "../../../assets/allstudents/date.svg";
import search_white from "../../../assets/allstudents/search-white.svg";
import filter from "../../../assets/allstudents/filter.svg";
import ToggleButton from "../../ToggleButton/ToggleButton";
import arrowdown from "../../../assets/allstudents/arrow-down.svg";
import edit from "../../../assets/user/edit.png";
import api from "../../../api/index";
import { AppContext } from "../../../context/Appcontext";
import { Link } from "react-router-dom";
import moment from "moment";
import DatePicker from "react-datepicker";
import { Pagination } from "../../Shared/Pagination/Pagination.jsx";
import { uuid } from "../../../utils/helpers";
import Tooltip from "@mui/material/Tooltip";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import BasicTable from "./Table";
import CustomButton from "../../../common/CustomButton";
import { SelectInput } from "../../../common/Select";
import { InputAdornments } from "../../../common/SearchText";
import { useNavigate } from "react-router-dom";
import Accordion from "./Accordion";
import DeleteModal from "../../../common/DeleteModal";
import { CountItems } from "../../../common/utils/helpers";

const cols = [
  {
    title: "Internal StaffID",
  },
  {
    title: "Staff Name",
  },
  {
    title: "Phone# EmailID",
  },
  {
    title: "Staff Role",
  },
  {
    title: "Document Status",
  },
  {
    title: "Status",
  },
  {
    title: "Action",
  },
];

const documentStatus = [
  { name: "PENDING" },
  { name: "APPROVED" },
  { name: "REJECTED" },
];

const initialFilterValues = {
  role_id: "",
  document_status: "",
  search_key: "",
};

const ExternalStaffsRecords = () => {
  const { BASE_URL } = useContext(AppContext);

  const navigate = useNavigate();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [rolelist, setRoleList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [inputs, setInputs] = useState(initialFilterValues);
  const [loading, setLoading] = useState(false);
  const [meta, metaData] = useState({
    current_page: "",
    total: "0",
    per_page: "0",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState("");
  const [apiLoading, setApiLoading] = useState(false);
  useEffect(() => {
    getAllRoles();
  }, []);

  const onFilter = (e) => {
    let { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onEnter = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    filterSearch()
  };

  const handleFilter = () => {
    setShowFilter(!showFilter);
  };

  //Get All Roles
  const getAllRoles = () => {
    api
      .get(`${BASE_URL}/admin/users/roles?user_type=2`)
      .then((res) => {
        setRoleList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  //Submit Data
  const getUsers = (inputs, page) => {
    setLoading(true);
    setUsersList([]);
    api
      .get(
        `${BASE_URL}/admin/archives/users?role_id=${inputs.role_id}&document_status=${inputs.document_status}&search_key=${inputs.search_key}&page=${page}&user_type=2`
      )
      .then((res) => {
        setLoading(false);
        metaData(res.data.data.meta);
        setUsersList(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleSearch = (e) => {
    const key = e.target.value;
    if (key.length === 0) setInputs({ ...inputs, search_key: "" });
    else setInputs({ ...inputs, search_key: key });
  };

  function reset() {
    setInputs(initialFilterValues);
    getUsers(initialFilterValues, 1);
  }

  function filterSearch() {
    getUsers(inputs, 1);
  }

  useMemo(() => {
    let payload = inputs;

    getUsers(payload, currentPage);
  }, [currentPage]);

  function handleDelete(e, item) {
    e.preventDefault();
    setSelectedItem(item);
    setShowDeleteModal(true);
  }

  function handleDeleteCancel(e) {
    e.preventDefault();
    setSelectedItem("");
    setShowDeleteModal(false);
  }

  function handleRestore(e, item) {
    e.preventDefault();
    setSelectedItem(item);
    setShowRestoreModal(true);
  }

  function handleRestoreCancel(e) {
    e.preventDefault();
    setSelectedItem("");
    setShowRestoreModal(false);
  }

  const restoreStaff = () => {
    setApiLoading(true);
    let obj = {
      id: selectedItem.id,
    };
    api
      .post(`${BASE_URL}/admin/archives/users/restore`, obj)
      .then((res) => {
        // console.log(res)
        setApiLoading(false);
        setShowRestoreModal(false);
        setSelectedItem("");
        toast.success(res.data.data.message);
        getUsers(initialFilterValues, 1);
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err.message);
        toast.error(err.response.data.errors.message);
        setApiLoading(false);
        setSelectedItem("");
        setShowDeleteModal(false);
      });
  };

  const deleteStaff = () => {
    setApiLoading(true);
    let obj = {
      id: selectedItem.id,
    };
    api
      .post(`${BASE_URL}/admin/archives/users/delete`, obj)
      .then((res) => {
        console.log(res);
        setApiLoading(false);
        setShowDeleteModal(false);
        setSelectedItem("");
        toast.success(res.data.data.message);
        getUsers(initialFilterValues, 1);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        
        setApiLoading(false);
        setSelectedItem("");
        setShowDeleteModal(false);
      });
  };

  return (
    <>
      <div className="p-2 lg:p-4 mb-10">
      <div className="flex  sjustify-between items-center">
          <div className="w-full">
          <h1 className=" audio text-white text-base md:text-2xl">
              External Staffs
            </h1>
          </div>

          <div className="mt-2 lg:mt-0 w-full flex gap-4 justify-end">
            <CustomButton
              onClick={handleFilter}
              variant="outlined"
              size="large"
              icon={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.04345 1C1.46738 1 1 1.47524 1 2.06027V2.6843C1 3.11765 1.16479 3.53439 1.45957 3.84785L4.69007 7.28288L4.69149 7.28072C5.31514 7.91919 5.66604 8.78228 5.66604 9.68221V12.7301C5.66604 12.9338 5.87913 13.0638 6.056 12.9677L7.8957 11.9653C8.17343 11.8136 8.34675 11.5189 8.34675 11.1989V9.67427C8.34675 8.77939 8.69267 7.91991 9.31064 7.28288L12.5411 3.84785C12.8352 3.53439 13 3.11765 13 2.6843V2.06027C13 1.47524 12.5333 1 11.9573 1H2.04345Z"
                    stroke="url(#paint0_linear_4233_2843)"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_4233_2843"
                      x1="1"
                      y1="7.07595"
                      x2="13.1915"
                      y2="7.07595"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#07A1C0" />
                      <stop offset="1" stop-color="#99D592" />
                    </linearGradient>
                  </defs>
                </svg>
              }
              borderRadius="8px"
              width="w-fit"
              bgcolor="#151929"
            >
              <p className="gradient-text text-xs sm:text-sm">Filter</p>
            </CustomButton>
          </div>
        </div>

        <hr className="mt-3 border-t-line border-t" />

        {/* Filtering Desktop view */}

        {showFilter && (
          <>
            <div className="my-5 w-full mt-4 flex flex-col lg:flex-row gap-4">
              <div className="w-full flex flex-col lg:flex-row gap-4 items-center">
                <div className="w-full lg:w-[25%]">
                  <SelectInput
                    options={rolelist}
                    handleChange={onFilter}
                    value={inputs.role_id}
                    label="Staff Role"
                    name="role_id"
                    bgcolor="#151929"
                    width="w-full"
                    fontSize={"12px"}
                  />
                </div>
                <div className="w-full lg:w-[25%]">
                  <SelectInput
                    options={documentStatus}
                    handleChange={onFilter}
                    value={inputs.document_status}
                    label="Document Status"
                    name="document_status"
                    bgcolor="#151929"
                    width="w-full"
                    fontSize={"12px"}
                  />
                </div>
                <div className="w-full lg:w-[25%]">
                  <InputAdornments
                  onEnter={onEnter}
                    handleChange={onFilter}
                    label="Search"
                    name="search_key"
                    value={inputs.search_key}
                    width="w-full"
                  />
                </div>
              </div>

              <div className="flex flex-row gap-3 items-center justify-end">
                <CustomButton
                  onClick={() => filterSearch()}
                  width="w-fit"
                  variant="contained"
                  size="large"
                  borderRadius="8px"
                  disabled={CountItems(inputs) === 0}
                >
                  <p className="text-sm">Apply</p>
                </CustomButton>

                <svg
                  onClick={() => reset()}
                  className="cursor-pointer"
                  width="44"
                  height="40"
                  viewBox="0 0 44 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M29.91 23.51H25.38C25.1148 23.51 24.8604 23.6154 24.6729 23.8029C24.4854 23.9904 24.38 24.2448 24.38 24.51C24.38 24.7752 24.4854 25.0296 24.6729 25.2171C24.8604 25.4046 25.1148 25.51 25.38 25.51H27.78C26.6769 26.6627 25.2544 27.4593 23.6952 27.7974C22.1359 28.1355 20.5112 27.9996 19.0298 27.4072C17.5483 26.8149 16.2779 25.7931 15.3816 24.4732C14.4853 23.1532 14.0042 21.5955 14 20C14 19.7348 13.8946 19.4804 13.7071 19.2929C13.5196 19.1054 13.2652 19 13 19C12.7348 19 12.4804 19.1054 12.2929 19.2929C12.1054 19.4804 12 19.7348 12 20C12.0053 21.9528 12.5822 23.8613 13.6596 25.49C14.737 27.1187 16.2677 28.3964 18.0627 29.1652C19.8578 29.9341 21.8387 30.1605 23.761 29.8166C25.6833 29.4727 27.4628 28.5735 28.88 27.23V29C28.88 29.2652 28.9854 29.5196 29.1729 29.7071C29.3604 29.8946 29.6148 30 29.88 30C30.1452 30 30.3996 29.8946 30.5871 29.7071C30.7746 29.5196 30.88 29.2652 30.88 29V24.5C30.8775 24.2416 30.7752 23.9943 30.5943 23.8097C30.4135 23.6251 30.1683 23.5177 29.91 23.51ZM22 10C19.4364 10.0073 16.9735 10.9989 15.12 12.77V11C15.12 10.7348 15.0146 10.4804 14.8271 10.2929C14.6396 10.1054 14.3852 10 14.12 10C13.8548 10 13.6004 10.1054 13.4129 10.2929C13.2254 10.4804 13.12 10.7348 13.12 11V15.5C13.12 15.7652 13.2254 16.0196 13.4129 16.2071C13.6004 16.3946 13.8548 16.5 14.12 16.5H18.62C18.8852 16.5 19.1396 16.3946 19.3271 16.2071C19.5146 16.0196 19.62 15.7652 19.62 15.5C19.62 15.2348 19.5146 14.9804 19.3271 14.7929C19.1396 14.6054 18.8852 14.5 18.62 14.5H16.22C17.3225 13.3479 18.7441 12.5515 20.3024 12.2131C21.8607 11.8747 23.4846 12.0097 24.9656 12.6009C26.4466 13.192 27.7172 14.2122 28.6142 15.5306C29.5113 16.849 29.9938 18.4054 30 20C30 20.2652 30.1054 20.5196 30.2929 20.7071C30.4804 20.8946 30.7348 21 31 21C31.2652 21 31.5196 20.8946 31.7071 20.7071C31.8946 20.5196 32 20.2652 32 20C32 18.6868 31.7413 17.3864 31.2388 16.1732C30.7362 14.9599 29.9997 13.8575 29.0711 12.9289C28.1425 12.0003 27.0401 11.2638 25.8268 10.7612C24.6136 10.2587 23.3132 10 22 10Z"
                    fill="url(#paint0_linear_4235_6198)"
                  />
                  <rect
                    x="0.5"
                    y="0.5"
                    width="43"
                    height="39"
                    rx="7.5"
                    stroke="url(#paint1_linear_4235_6198)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_4235_6198"
                      x1="12"
                      y1="20.1266"
                      x2="32.3191"
                      y2="20.1266"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#07A1C0" />
                      <stop offset="1" stop-color="#99D592" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_4235_6198"
                      x1="5.56006e-08"
                      y1="20.2532"
                      x2="44.7021"
                      y2="20.2532"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#07A1C0" />
                      <stop offset="1" stop-color="#99D592" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            <hr className=" border-t-line border-t" />
          </>
        )}

        <div className="mt-2 text-sm text-white text-left">
          {loading ? (
            ""
          ) : (
            <p className="text-[10px] lg:text-[12px] mb-2 audio  ml-2">
              Showing{" "}
              <span className="font-[800]">
                {currentPage === Math.ceil(meta.total / 10) ? (
                  <>{meta.total}</>
                ) : (
                  <>{usersList.length + (currentPage - 1) * 10}</>
                )}
              </span>{" "}
              out of <span className="font-[800]">{meta.total}</span> results
            </p>
          )}
        </div>

        {loading ? (
          <div className="w-full">
            <p className="text-center audio text-3xl">Loading....</p>
          </div>
        ) : (
          <div className="hidden lg:block">
            {usersList.length > 0 ? (
              <BasicTable
                cols={cols}
                data={usersList}
                handleDelete={handleDelete}
                handleRestore={handleRestore}
              />
            ) : (
              <p className="text-center audio text-3xl">No data Found!!!</p>
            )}
          </div>
        )}

        {/* All Students Tablet and Mobile View */}
        <div className="block lg:hidden ">
          <Accordion
            data={usersList}
            handleDelete={handleDelete}
            handleRestore={handleRestore}
          />
        </div>

        {loading ? (
          ""
        ) : (
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={meta.total}
            pageSize={10}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>

      <DeleteModal
        open={showRestoreModal}
        handleClose={handleRestoreCancel}
        type="delete"
        handleActionButton={restoreStaff}
        loading={apiLoading}
        title="Do you need to Restore this User?"
      />

      <DeleteModal
        open={showDeleteModal}
        handleClose={handleDeleteCancel}
        type="delete"
        handleActionButton={deleteStaff}
        loading={apiLoading}
        title="Do you need to Delete this User Permanently?"
      />
    </>
  );
};

export default ExternalStaffsRecords;
