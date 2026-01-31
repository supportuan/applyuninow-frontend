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
import { Pagination } from '../../Shared/Pagination/Pagination.jsx'
import { uuid } from '../../../utils/helpers'

import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

const initialFilterValues = {
  created_from: "",
  created_to: "",
  role_id: "",
  active: "",
  search_key: "",
  page: 1,
}

export const UserListingTable = () => {
  const { BASE_URL } = useContext(AppContext);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [rolelist, setRoleList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [inputs, setInputs] = useState(initialFilterValues);
  const [loading, setLoading] = useState(false);
  const [meta, metaData] = useState({
    current_page: "",
    total: "0",
    per_page: "0",
  });
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedItem, setSelectedItem] = useState('');
  const [apiLoading, setApiLoading] = useState(false);
  useEffect(() => {
    getAllRoles();
  }, []);

  const onSelectStatus = (e) => {
    let key = e.target.value;
    if (key === "all") setInputs({ ...inputs, active: "" });
    else if (key === 'true') setInputs({ ...inputs, active: true });
    else setInputs({ ...inputs, active: false });
  };

  const onSelectRole = (e) => {
    let key = e.target.value;
    if (key === "all") setInputs({ ...inputs, role_id: "" });
    else setInputs({ ...inputs, role_id: key });
  };

  const handleFilter = () => {
    setShowFilter(!showFilter);
  };

  const onChange = (dates) => {
    const [start, end] = dates;
    setInputs({
      ...inputs,
      created_from: moment(start).format("YYYY-MM-DD"),
      created_to: moment(end).format("YYYY-MM-DD"),
    });

    setStartDate(start);
    setEndDate(end);
  };

  //Get All Roles
  const getAllRoles = () => {
    api
      .get(`${BASE_URL}/admin/users/roles?user_type=external`)
      .then((res) => {
        setRoleList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ToggleStatus
  const handleStatus = (el) => {
    api
      .patch(`${BASE_URL}/admin/users/update-status/${el.id}`, {
        active: !el.active,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Submit Data
  const getUsers = (inputs) => {
    setLoading(true);
    setUsersList([]);
    api
      .get(
        `${BASE_URL}/admin/users?role_id=${inputs.role_id}&active=${inputs.active}&search_key=${inputs.search_key}&created_from=${inputs.created_from}&created_to=${inputs.created_to}&page=${inputs.page}&user_type=external`
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

  const handleShowData = (item) => {
    setUsersList(
      usersList.map((el) => {
        if (el.id === item.id) {
          return {
            ...el,
            makestatus: !item.makestatus,
          };
        } else {
          return {
            ...el,
            makestatus: false,
          };
        }
      })
    );
  };

  const handleSearch = (e) => {
    const key = e.target.value;
    if (key.length === 0) setInputs({ ...inputs, search_key: "" });
    else setInputs({ ...inputs, search_key: key });
  };


  function reset() {
    setInputs((inputs) => ({
      ...inputs,
      created_from: "",
      created_to: "",
      role_id: "",
      active: "",
      search_key: "",
      page: 1,
    }));
    setStartDate('')
    setEndDate('')
    getUsers(initialFilterValues);
  }

  function filterSearch() {
    getUsers(inputs)
  }

  const list = useMemo(() => {
    let payload = inputs;
    console.log(inputs)
    payload.page = currentPage
    getUsers(payload);
  }, [currentPage])

  function handleDelete(e, item) {
    e.preventDefault();
    setSelectedItem(item)
    setShowDeleteModal(true)
  }


  function handleDeleteCancel(e) {
    e.preventDefault();
    setSelectedItem('')
    setShowDeleteModal(false)
  }


  function deleteUser() {
    setApiLoading(true)
    api
      .delete(`${BASE_URL}/admin/users/` + selectedItem.id)
      .then((res) => {
        setApiLoading(false)
        setShowDeleteModal(false)
        let index = usersList.findIndex(x => x.id === selectedItem.id)
        if (index != -1) {
          usersList.splice(index, 1)
          setUsersList(usersList)
        }
        setSelectedItem('');
        toast("User Deleted Successfully");
      })
      .catch((err) => {
        toast.error(err.message);
        setApiLoading(false)
        setSelectedItem('')
        setShowDeleteModal(false)
      });
  }
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    filterSearch()
  }

  return (
    <>
      {/* Filtering Desktop view */}
      <form className="w-full" onSubmit={handleFilterSubmit}>
      <div className=" my-5 p-4 bg-light  items-center justify-between rounded-xl border-2 border-line hidden lg:flex">
        <div className="flex gap-3 flex-wrap">
          <div className="bg-line px-3 flex rounded-lg items-center gap-5">
            <div>
              <label className="block text-text text-sm">Date Range</label>
              <DatePicker
                id="datepicker"
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
              />
            </div>
            <label for="datepicker">
              <img className=" relative top-2" src={studentdate} alt="date" />
            </label>
          </div>

          <div className="px-3 rounded-lg bg-line py-1">
            <label className="block text-sm text-text">User Role</label>
            <select
              className=" w-28 relative right-1 bg-line"
              onChange={(e) => onSelectRole(e)}
              value={inputs.role_id}
            >
              <option value="all">All</option>
              {rolelist.map((e) => (
                <option key={uuid()} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>

          <div className="px-3 py-1 rounded-lg bg-line">
            <label className="block text-sm text-text">Status</label>
            <select
              className=" w-28 relative right-1 bg-line"
              onChange={(e) => onSelectStatus(e)}
              value={inputs.active}
            >
              <option value="all"> All</option>
              <option value={true}> Active </option>
              <option value={false}> Inactive </option>
            </select>
          </div>

          <div className="grid grid-flow-col items-center px-3 bg-line rounded-lg">
            <img className="w-6" src={search_logo} alt="search" />
            <input
              className="border-none text-white placeholder:text-text pl-2 h-12"
              type="text"
              placeholder="Search..."
              value={inputs.search_key}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            className="submit text-[#000000] font-semibold rounded-lg py-2 px-6"
            type="submit"
          >
            Submit
          </button>
          <button onClick={() => reset()} className=" underline text-white" type="button">
            Reset
          </button>
        </div>
      </div>
      </form>
      {/* Search Bar Tablet And Mobile View */}
      <div className="flex gap-3  my-4 items-center lg:hidden ">
        <div className="flex w-full bg-light rounded-lg">
          <input
            className=" w-full py-3 border-none text-white placeholder:text-text placeholder:pl-4"
            type="text"
            placeholder="Search..."
            value={inputs.search_key}
            onChange={handleSearch}
          />
          <img className="mr-3" src={search_white} alt="search" />
        </div>
        <div className="flex  gap-1 relative top-1 mr-1 lg:hidden">
          <img
            className="relative w-5 bottom-[2px]"
            src={filter}
            alt="filter"
          />
          <p onClick={handleFilter} className="text-gradient cursor-pointer">
            Filter
          </p>
        </div>
      </div>
      <hr className="border-t border-t-line  my-3 lg:hidden" />
      <div className={`flex flex-col  lg:hidden ${showFilter ? "" : "hidden"}`}>
        <label className="text-text pl-1">Date Range</label>
        <div className="bg-light px-5 flex justify-between rounded-lg items-center ">
          <DatePicker
            id="datepicker"
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
          />
          <label htmlFor="datepicker" className=" text-text text-sm py-5">
            <img className=" " src={studentdate} alt="date" />
          </label>
        </div>
        <div className=" rounded-lg  py-1">
          <label className="block  text-text mb-1 pl-2">Status</label>
          <select
            className=" w-full bg-light py-4 rounded-lg px-5"
            onChange={(e) => onSelectStatus(e)}
            value={inputs.active}
          >
            <option value="All"> All </option>
            <option value={true}> Active </option>
            <option value={false}> Inactive </option>
          </select>
        </div>

        <div className="py-1 rounded-lg">
          <label className="block  text-text mb-1 pl-2">User Role</label>
          <select
            className=" w-full bg-light px-5 py-4 rounded-lg"
            onChange={(e) => onSelectRole(e)}
            value={inputs.role_id}
          >
            <option value="all">All</option>
            {rolelist.map((e) => (
              <option key={uuid()} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <hr
        className={`border-t border-t-line  my-3 lg:hidden ${showFilter ? "" : "hidden"
          }`}
      />


      <div className="py-2 text-sm text-right text-white opacity-50 md:px-4 md:mt-4 md:opacity-100 md:text-left">
        Found <strong>{meta.total}</strong> Results.
      </div>
      <div className="hidden px-6  overflow-x-auto lg:block rounded-xl bg-light">
        <table className="w-full lead">
          <thead>
            <th>Date</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </thead>
          <tbody>
            {usersList.length ? (
              usersList.map((item, index) => {
                return (
                  <tr className="my-4 bg-tab users-list" key={uuid()}>
                    <td>
                      <p className="break-words">
                        {moment(item.created_at).format("DD/MM")}
                      </p>
                      <p className="break-words">
                        {moment(item.created_at).format("YYYY")}
                      </p>
                    </td>
                    <td>{item.name}
                    </td>
                    <td>
                      {item.email}
                    </td>
                    <td>
                      {item.phone}
                    </td>
                    <td>
                      {item?.role?.name}
                    </td>
                    <td>
                      <div
                        className="bg-tab py-3"
                        onClick={() => {
                          handleStatus(item);
                        }}
                      >
                        <ToggleButton
                          defaultChecked={item?.active}
                          value={item?.active}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="bg-tab py-5 rounded-r-xl flex space-x-4 items-center justify-center">
                        <Link to={`/users/edit-user/${item.id}?type=external`}>
                          <img className="mx-auto " src={edit} alt="action" />
                        </Link>

                        <svg className="cursor-pointer"
                          onClick={(e) => handleDelete(e, item)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21.0697 5.23C19.4597 5.07 17.8497 4.95 16.2297 4.86V4.85L16.0097 3.55C15.8597 2.63 15.6397 1.25 13.2997 1.25H10.6797C8.34967 1.25 8.12967 2.57 7.96967 3.54L7.75967 4.82C6.82967 4.88 5.89967 4.94 4.96967 5.03L2.92967 5.23C2.50967 5.27 2.20967 5.64 2.24967 6.05C2.28967 6.46 2.64967 6.76 3.06967 6.72L5.10967 6.52C10.3497 6 15.6297 6.2 20.9297 6.73C20.9597 6.73 20.9797 6.73 21.0097 6.73C21.3897 6.73 21.7197 6.44 21.7597 6.05C21.7897 5.64 21.4897 5.27 21.0697 5.23Z" fill="#EF4949" />
                          <path d="M19.2297 8.14C18.9897 7.89 18.6597 7.75 18.3197 7.75H5.67975C5.33975 7.75 4.99975 7.89 4.76975 8.14C4.53975 8.39 4.40975 8.73 4.42975 9.08L5.04975 19.34C5.15975 20.86 5.29975 22.76 8.78975 22.76H15.2097C18.6997 22.76 18.8397 20.87 18.9497 19.34L19.5697 9.09C19.5897 8.73 19.4597 8.39 19.2297 8.14ZM13.6597 17.75H10.3297C9.91975 17.75 9.57975 17.41 9.57975 17C9.57975 16.59 9.91975 16.25 10.3297 16.25H13.6597C14.0697 16.25 14.4097 16.59 14.4097 17C14.4097 17.41 14.0697 17.75 13.6597 17.75ZM14.4997 13.75H9.49975C9.08975 13.75 8.74975 13.41 8.74975 13C8.74975 12.59 9.08975 12.25 9.49975 12.25H14.4997C14.9097 12.25 15.2497 12.59 15.2497 13C15.2497 13.41 14.9097 13.75 14.4997 13.75Z" fill="#EF4949" />
                        </svg>

                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="pt-4 text-center text-white">
                {loading ? (
                  <td colSpan="12">Loading...</td>
                ) : (
                  <td colSpan="12">Not found</td>
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* All Students Tablet and Mobile View */}
      <div className=" lg:hidden ">
        {usersList.map((item, index) => (
          <div
            key={uuid()}
            className=" pb-5  border border-border bg-light  my-4  rounded-lg p-3"
          >
            <div
              className="  flex justify-between"
              onClick={() => {
                handleShowData(item);
              }}
            >
              <div className=" flex">
                <div
                  className={`h-[30px] w-[30px] rounded-[50%] mt-3 ${item.active ? "bg-greenshadow" : "bg-redshadow"
                    }`}
                >
                  <div
                    className={`h-[12px] w-[12px] rounded-lg bg-inactivered m-auto  mt-[9px]  border ${item.active ? "bg-activegreen" : "bg-inactivered"
                      }`}
                  ></div>
                </div>
                <div className="ml-3">
                  <p className="text-white">{item?.name}</p>
                  {item?.active ? (
                    <p className=" font-thin text-xs text-text mt-1">On</p>
                  ) : (
                    <p className=" font-thin text-xs text-text mt-1">Off</p>
                  )}
                </div>
              </div>
              <div>
                <img
                  className={`relative top-5 ${item?.makestatus ? "rotate" : ""
                    }`}
                  src={arrowdown}
                  alt="arrowdown"
                />
              </div>
            </div>
            <div
              className={` ${item?.makestatus ? "flex flex-col" : "hidden"}`}
            >
              {/* Drop Down 1st container */}
              <div className=" bg-tab  rounded-xl mt-5 text-sm text-white md:text-base">
                <div className="flex  p-3 pl-5 md:pl-11 md:gap-11">
                  <p className="w-32 md:w-40">Date Added</p>
                  <p>{moment(item?.created_at).format("DD/MM/YYYY")}</p>
                </div>
                <div className="flex  p-3 pl-5 md:pl-11 md:gap-11">
                  <p className="w-32 md:w-40 ">Mail Id</p>
                  <p className="w-2/4 sm:w-12/12  break-all">{item?.email}</p>
                </div>
                <div className="flex  p-3 pl-5 md:pl-11 md:gap-11">
                  <p className="w-32 md:w-40 ">Phone Number</p>
                  {item.phone ? <p>{item?.phone}</p> : <p>null</p>}
                </div>
                <div className="flex  p-3 pl-5 md:pl-11 md:gap-11">
                  <p className="w-32 md:w-40 ">User Role</p>
                  <p>{item?.role?.name}</p>
                </div>
              </div>
              <div className="flex justify-between mx-3">
                <div className="text-white  my-auto relative top-2">
                  <ToggleButton
                    defaultChecked={item?.active}
                    onChange={() => handleStatus(item)}
                    changebg="true"
                  />
                </div>
                <div className="md:pr-2 mt-3">
                  <Link to={`/users/edit-user/${item?.id}?type=external`}>
                    <button className="border border-border text-light submit px-6 py-3 font-semibold rounded-lg ">
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={meta.total}
        pageSize={10}
        onPageChange={page => setCurrentPage(page)}
      />

      {
        showDeleteModal ? <div id="deleteModel" className="modal">
          <div className="modal-content">
            <div className="container">
              <p className="py-4">Are you sure you want to delete the User?</p>

              <div className="clearfix flex justify-center space-x-4">
                {
                  !apiLoading ?
                    <>
                      <button
                        className="rounded-lg  px-6 py-2 ml-4 text-white cancel-btn"
                        onClick={(e) => handleDeleteCancel(e)}
                        disabled={apiLoading}
                      >
                        <span> Cancel</span>
                      </button>
                      <button
                        className=" delete-btn rounded-lg px-6 py-2 submit "
                        onClick={(e) => deleteUser()}
                        disabled={apiLoading}
                      >
                        Delete
                      </button>
                    </>
                    : <button
                      className=" delete-btn rounded-lg px-6 py-2 submit "
                      disabled={apiLoading}
                    >
                      Loading...
                    </button>
                }

              </div>
            </div>
          </div>
        </div> : ''
      }

    </>
  );
};
