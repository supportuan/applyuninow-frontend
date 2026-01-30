import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useContext, useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/Appcontext";
import api from "../../api/index";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

//images
import view from "../../assets/allstudents/view.svg";
import info from "../../assets/allstudents/info.svg";
import check from "../../assets/allstudents/check.svg";
import search_logo from "../../assets/allstudents/search.svg";
import studentdate from "../../assets/allstudents/date.svg";
import search_white from "../../assets/allstudents/search-white.svg";
import filter from "../../assets/allstudents/filter.svg";
import arrowdown from "../../assets/allstudents/arrow-down.svg";
import { country } from "../../country";

import { Pagination } from '../Shared/Pagination/Pagination.jsx'
import { uuid } from '../../utils/helpers'

const intakeMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const intakeYear = [
    new Date().getFullYear(),
    new Date().getFullYear() + 1,
    new Date().getFullYear() + 2,
    new Date().getFullYear() + 3
  ]



export const StudentList = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [details, setDetails] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState(null);
  const [stageData, setStageData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [users, setUsers] = useState([])
  const { BASE_URL } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [inputs, setInputs] = useState({
    created_from: "",
    created_to: "",
    stage: "",
    country_id: "",
    page: 1,
    search_key: "",
    contact_id: "",
    intake_month:'',
    intake_year:""
  });
  const [apiLoading, setApiLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [meta, metaData] = useState({
    current_page: "",
    total: "0",
    per_page: "0",
  });

  let user = localStorage.getItem('applyNow')
  if (user) user = JSON.parse(user)
  useEffect(() => {
    getPrerequisite();
    getCountries();
    if (user && user.role_slug === 'admin') {
      getUsers()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (window.innerWidth < 769) {
      getAllStudents(inputs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs]);

  const onSelectStage = (e) => {
    setInputs({
      ...inputs,
      stage: e.target.value,
    });
  };

  const onSelectUser = (e) => {
    setInputs({
      ...inputs,
      contact_id: e.target.value,
    });
  };


  const onSelectCountry = (e) => {
    setInputs({
      ...inputs,
      country_id: parseInt(e.target.value),
    });
  };
  const handleFilter = () => {
    setShowFilter(!showFilter);
  };

  //get POC name and Phone Number
  const getUsers = () => {
    api
      .get(`${BASE_URL}/admin/users/dropdown`)
      .then((res) => {
        console.log(res.data.data);
        setUsers(res.data.data);
        //  console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleShowData = (item) => {
    setDetails(
      details.map((el) => {
        //console.log(el.id, item.id);
        if (el.id === item.id) {
          return {
            ...el,
            status: !item.status,
          };
        } else
          return {
            ...el,
            status: false,
          };
      })
    );
  };

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

  function deleteStudent() {
    setApiLoading(true)
    api
      .delete(`${BASE_URL}/admin/students/` + selectedItem.id)
      .then((res) => {
        setApiLoading(false)
        setShowDeleteModal(false)
        let index = details.findIndex(x => x.id === selectedItem.id)
        if (index != -1) {
          details.splice(index, 1)
          setDetails(details)
        }
        setSelectedItem('');
        toast.success("student Deleted Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        setApiLoading(false)
        setSelectedItem('')
        setShowDeleteModal(false)
      });
  }

  const handleSearch = (e) => {
    const key = e.target.value;
    if (key.length === 0) setInputs({ ...inputs, search_key: "" });
    else setInputs({ ...inputs, search_key: key });
  };

  //get All Students
  const getAllStudents = (inputs) => {
    setLoading(true);
    setDetails([]);
    api
      .get(
        `${BASE_URL}/admin/students?page=${inputs.page}&search_key=${inputs.search_key}&created_from=${inputs.created_from}&created_to=${inputs.created_to}&stage=${inputs.stage}&country_id=${inputs.country_id}&contact_id=${inputs.contact_id}&intake_month=${inputs.intake_month}&intake_year=${inputs.intake_year}`
      )
      .then((res) => {
        for (let item of res.data.data.data) {
          let flag = country.find(x => item.country && x.fullName === item.country.name)
          if (flag) {
            item['flag'] = flag.img
          }
        }
        const addStatus = res.data.data.data.map((e) => {
          return {
            ...e,
            status: false,
          };
        });
        //console.log(addStatus);
        setDetails(addStatus);
        metaData(res.data.data.meta);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  function handleSubmit(e) {
    e.preventDefault();
    getAllStudents(inputs);
  }
  useMemo(() => {
    let payload = inputs;
    payload.page = currentPage
    getAllStudents(payload);
  }, [currentPage])
  const onChange = (dates) => {
    const [start, end] = dates;

    var from = moment(start).format("YYYY-MM-DD");
    var to = moment(end).format("YYYY-MM-DD");
    setInputs({
      ...inputs,
      created_from: from,
      created_to: to,
    });
    setStartDate(start);
    setEndDate(end);
  };

  const getPrerequisite = () => {
    api
      .get(`${BASE_URL}/admin/students/prerequisite`)
      .then((res) => {
        const resData = res.data.data.stages;
        setStageData(resData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCountries = () => {
    api
      .get(`${BASE_URL}/admin/countries`)
      .then((res) => {
        //console.log(res.data.data);
        setCountries(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function reset() {
    setInputs((inputs) => ({
      ...inputs,
      created_from: "",
      created_to: "",
      country_id: "",
      stage: "",
      search_key: "",
      page: 1,
      contact_id: ""
    }));
    setStartDate('')
    setEndDate('')
    getAllStudents(inputs);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  return (
    <>

      {/* Filtering Desktop view */}
      <form className="w-full" onSubmit={handleSubmit}>
      <div className=" my-5 p-4 bg-light  items-center justify-between rounded-xl border-2 border-line hidden lg:flex">
        <div className="flex gap-3 flex-wrap">
          <div className="bg-line px-3 flex rounded-lg items-center gap-5">
            <div >
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
            <label htmlFor="datepicker">
              <img className=" relative top-2" src={studentdate} alt="date" />
            </label>
          </div>

          {
            user && user.role_slug === 'admin' ?
              <div className="px-3 rounded-lg bg-line py-1 h-12">
                <label className="block text-xs text-text">Executive</label>
                <select
                  className="  bg-line relative right-1"
                  onChange={(e) => onSelectUser(e)}
                  value={inputs.contact_id}
                >
                  <option selected disabled value=''>
                    Select User
                  </option>
                  {users.map((e, index) => (
                    <option key={uuid()} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </div> : ""
          }
          <div className="px-3 rounded-lg bg-line py-1 h-12">
            <label className="block text-xs text-text">Stage</label>
            <select
              className="  bg-line relative right-1"
              onChange={(e) => onSelectStage(e)}
              value={inputs.stage}
            >
              <option selected disabled value=''>
                Select Stage
              </option>
              {stageData.map((e, index) => (
                <option key={uuid()} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>

          <div className="px-3 py-1 rounded-lg bg-line h-12">
            <label className="block text-xs text-text">Country</label>
            <select
              className="  bg-line relative right-1"
              onChange={(e) => onSelectCountry(e)}
              value={inputs.country_id}
            >
              <option selected disabled value=''>
                Select Country
              </option>
              {countries.map((e, index) => (
                <option key={uuid()} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>

          <div className="h-12 px-3 rounded-lg bg-line">
              <label className="text-xs text-text mt-1">Intake Month</label>
              <select
                name="intake_month"
                className="w-full bg-transparent relative right-1 bg-line"
                value={inputs.intake_month}
                onChange={handleChange}
                multiple={false}
              >
                <option value="all"> All </option>
                {intakeMonth.map((item) => {
                  return (<option key={uuid()} value={item}>{item}</option>
                  )
                })
                }
              </select>
            </div>
            <div className="h-12 px-3 rounded-lg bg-line">
              <label className="text-xs text-text mt-1">Intake Year</label>
              <select
                name="intake_year"
                className="w-full bg-transparent relative right-1 bg-line"
                value={inputs.intake_year}
                onChange={handleChange}
                multiple={false}
              >
                <option value="all"> All </option>
                {intakeYear.map((item) => {
                  return (<option key={uuid()} value={item}>{item}</option>
                  )
                })
                }
              </select>
            </div>

          <div className="grid grid-flow-col items-center px-3 bg-line rounded-lg h-12">
            <img className="w-5" src={search_logo} alt="search" />
            <input
              className="border-none text-white pl-4 placeholder:text-text "
              type="text"
              placeholder="Search..."
              value={inputs.search_key}
              onChange={(e) => handleSearch(e)}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <button
            type="submit"
            className="submit text-[#000000] font-semibold rounded-lg py-2 px-6"
          >
            Submit
          </button>
          <button onClick={() => reset()} type="button" className=" underline text-white">
            Reset
          </button>
        </div>
      </div>
      </form>
      {/* Search Bar Tablet And Mobile View */}
      <div className="flex gap-3  my-4 items-center lg:hidden ">
        <div className="flex w-full bg-light rounded-lg px-3">
          <input
            className=" w-full text-white py-3 border-none placeholder:text-text placeholder:pl-4"
            type="text"
            placeholder="Search..."
            value={inputs.search_key}
            onChange={(e) => {
              handleSearch(e);
            }}
          />
          <img className="" src={search_white} alt="search" />
        </div>
        <div className="flex  gap-1 relative top-1 mr-1  lg:hidden">
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
        <div className="bg-light px-3 flex justify-between rounded-lg items-center gap-11">
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
          <label className="block  text-text mb-1 pl-1">Stage</label>
          <select
            className=" w-full bg-light py-4 rounded-lg px-3"
            onChange={(e) => onSelectStage(e)}
            value={inputs.stage}
          >
            <option disabled selected value=''>
              Select Stage
            </option>
            {stageData.map((e, index) => (
              <option key={uuid()} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>

        <div className="py-1 rounded-lg">
          <label className="block  text-text mb-1 pl-1">Country</label>
          <select
            className=" w-full bg-light px-3 py-4 rounded-lg"
            onChange={(e) => onSelectCountry(e)}
            value={inputs.country_id}
          >
            <option disabled selected value=''>
              Select Study Destination
            </option>
            {countries.map((e, index) => (
              <option key={uuid()} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end pr-3">
          <button
            className="text-gradient border cursor-pointer"
            onClick={() => reset()}
          >
            Clear
          </button>
        </div>
      </div>
      <hr
        className={`border-t border-t-line mx-5 my-3 lg:hidden ${showFilter ? "" : "hidden"
          }`}
      />
      {/* All Students Table Desktop View */}
      <div className="hidden px-6  overflow-x-auto lg:block rounded-xl bg-light">
        <table className="w-full lead">
          <thead>
            <th>Date</th>
            <th>
              <p>Applicant Name</p>
              <p>Phone#</p>
              </th>
            <th>POC</th>
            <th width="100">Study Destination</th>
            <th width="300">Stage</th>
            <th>Action</th>
          </thead>
          <tbody>
            {details.length ? (
              details.map((item, index) => {
                return (
                  <tr className="my-4 bg-tab student-list">
                    <td >
                      <p className="break-words">
                        {moment(item.created_at).format("DD/MM")}
                      </p>
                      <p className="break-words">
                        {moment(item.created_at).format("YYYY")}
                      </p>
                    </td>
                    <td>
                      <p>{item.name}</p>
                      <p >
                        {item.phone}
                      </p> </td>
                    <td>
                      <p>{item.primaryContact?.name}</p>
                      <p >
                        {item.primaryContact?.phone}
                      </p>
                    </td>
                    <td>

                      <img src={item.flag} className="flag-image" />
                    </td>

                    <td>
                      <div className="flex bg-tab  h-16   justify-center items-center">
                        <p>{item?.stage} &nbsp;•&nbsp; </p>
                        <p>
                          {item?.stage_completed_task}/{item?.stage_total_task}
                          &nbsp; • &nbsp;
                        </p>
                        <div>
                          <img className="" src={info} alt="not done" />
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className=" bg-tab rounded-r-xl flex space-x-4 items-center justify-center">
                        <Link to={`/students/view-student-detail/${item?.id}`}>
                          {" "}
                          <img className="mx-auto " src={view} alt="action" />
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
      <div className="lg:hidden">
        {details.map((item, index) => (
          <div
            key={uuid()}
            className=" pb-5  border border-border bg-light  my-4 rounded-lg p-3"
          >
            <div
              onClick={() => {
                handleShowData(item);
              }}
              className="  flex justify-between"
            >
              <div className=" flex">
                <div></div>
                <div className="">
                  <p className="text-white">{item?.name}</p>
                  <p className=" font-thin text-xs text-text mt-1">
                    {item?.stage}
                  </p>
                </div>
              </div>
              <div>
                <img
                  className={`relative top-5 ${item?.status ? "rotate" : ""}`}
                  src={arrowdown}
                  alt="arrowdown"
                />
              </div>
            </div>
            <div
              className={`${item?.status ? "flex flex-col text-white" : "hidden"
                }`}
            >
              {/* Drop Down !st container */}
              <div className="bg-tab md:mx-4 rounded-xl mt-5 text-xs sm:text-sm md:text-base">
                <div className="flex gap-5 p-3  md:pl-11 md:gap-11">
                  <p className="w-32 md:w-40 ">Date</p>
                  <p>{moment(item?.created_at).format("DD/MM/YYYY")}</p>
                </div>
                <div className="flex gap-5 p-3  md:pl-11 md:gap-11">
                  <p className="w-32 md:w-40 ">Applicant Phone#</p>
                  <p>{item?.phone}</p>
                </div>
                <div className="flex gap-5 p-3  md:pl-11 md:gap-11">
                  <p className="w-32 md:w-40 ">Point Of Contact</p>
                  <div>
                    <p>{item?.primaryContact?.name}</p>
                    <p>{item?.primaryContact?.phone}</p>
                  </div>
                </div>
              </div>
              {/* Drop Down 2nd Container */}
              <div className="bg-tab md:mx-4 mt-5 rounded-xl text-xs sm:text-sm md:text-base">
                <div className="flex  p-3  md:pl-11 md:gap-11">
                  <p className="w-32 md:w-40  ">Checklist</p>
                  <div className="flex gap-2 break-all">
                    <p className="">
                      {" "}
                      {item?.completed_check_list} / {item?.total_check_list}{" "}
                      &nbsp;•
                    </p>
                    <img
                      className="relative"
                      src={
                        parseInt(item?.completed_check_list) ===
                          parseInt(item?.total_check_list)
                          ? check
                          : info
                      }
                      alt="done"
                    />
                  </div>
                </div>
                <div className="flex  p-3  md:pl-11 md:gap-11">
                  <p className="w-32 md:w-40 ">Country</p>
                  <p className="break-all">{item?.country?.name}</p>
                </div>
                <div className="flex  p-3  md:pl-11 md:gap-11">
                  <p className="w-32 md:w-40 ">Stage</p>
                  <div className="flex flex-col">
                    <p className="break-all">{item?.stage}</p>
                    <div className="flex gap-2">
                      <p>
                        {item?.stage_completed_task}/{item?.stage_total_task}
                        &nbsp; •
                      </p>
                      <img className="relative" src={info} alt="not done" />
                    </div>
                  </div>
                </div>
              </div>
              <div className=" flex justify-end pr-1 md:pr-8 mt-3">
                <Link to={`/students/view-student-detail/${item?.id}`}>
                  <button className="border border-border text-light submit px-6 py-3 font-semibold rounded-lg ">
                    View
                  </button>
                </Link>
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
        showDeleteModal ?  <div id="deleteModel" class="modal">
        <form class="modal-content">
          <div class="container">
            <p className="py-4">Are you sure you want to delete the Applicant?</p>

            <div class="clearfix flex justify-center space-x-4">
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
                      onClick={(e) => deleteStudent()}
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
        </form>
      </div> : ''
      }

     

    </>
  );
};
