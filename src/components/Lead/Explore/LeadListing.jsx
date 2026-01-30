import React from "react";
import { useState, useEffect } from "react";
import BasicTable from "./Table";

import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

import { initialValues } from "./helpers";
import { cols } from "./helpers";
import api from "../../../api";
import { environment } from "../../../environments/environment";
import { country } from "../../../country";
import Pagination from "../../Shared/Pagination/Pagination";
import { useMemo } from "react";
import Accordion from "./Accordion";
import { toast } from "react-toastify";
import CustomButton from "../../../common/CustomButton";
import Filter from "../../../assets/leads/Filter.svg";
import { SelectInput } from "../../../common/Select";
import { InputAdornments } from "../../../common/SearchText";
import Card from "../../../common/Card";
import { DateFilter } from "../../../common/DateFilter";
import { DateRangePicker } from "../../../common/DateRangePicker";
import RightArrow from "../../../assets/leads/RightArrow.svg";
import LeftArrow from "../../../assets/leads/LeftArrow.svg";
import Plus from "../../../assets/leads/Plus.svg";
import Refresh from "../../../assets/leads/Refresh.svg";
import { Link } from "react-router-dom";
import AssignFormModal from "./AssignFormModal";
import DeleteModal from "../../../common/DeleteModal";
import { CountItems } from "../../../common/utils/helpers";
import { loginUser } from "../../../utils";
import SwiperComponent from "../Swiper";
import Slider from "../Swiper";

const assign = {
  assigned_to: "",
  notes: "",
};
const LeadListing = () => {
  const [inputs, setInputs] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState({});
  const [leadId, setLeadId] = useState();
  const [applyFilter, setApplyFilter] = useState(false);
  const [carousel, setCarousel] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [statsList, setStatsList] = useState([]);
  const [authUser, setAuthUser] = useState("");
  const [my_swiper, set_my_swiper] = useState({});
  const handleSwiper = (ev) => {
    set_my_swiper(ev);
  };

  const [dropdowns, setDropdowns] = useState({
    study_destination: [],
    study_area: [],
    study_level: [],
    study_industry: [],
    intake_month: [],
    intake_year: [],
    study_durations: [],
    type_of_degree: [],
    years_of_experience: [],
  });

  const [date, setDate] = useState({
    start_date: "",
    end_date: "",
  });

  const [open, setOpen] = React.useState({
    assignLargeScreen: false,
    assignMediumScreen: false,
    reassignLargeScreen: false,
    reassignMediumScreen: false,
    deleteMediumScreen: false,
    deleteLargeScreen: false,
    archeiveLargeScreen: false,
    archeiveMediumScreen: false,
    exe_cancelLargeScreen: false,
    exe_cancelMediumScreen: false,
  });

  const handleSelect = (e) => {
    if (e.target.name === "search") {
      if (e.target.value == " ") {
        return false;
      }
      setInputs({ ...inputs, [e.target.name]: e.target.value });
    } else {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
  };

  const onEnter = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    filterSearch();
  };

  const [assignParams, setAssignParams] = React.useState(assign);

  const handleAssignChange = (e) => {
    if (e.target.name === "notes") {
      if (e.target.value == " ") {
        return false;
      }
      setAssignParams({ ...assignParams, [e.target.name]: e.target.value });
    } else {
      setAssignParams({ ...assignParams, [e.target.name]: e.target.value });
    }
  };

  const onAssignSubmit = async () => {
    if (!assignParams.assigned_to) {
      return toast.error("Please Select Staff");
    }
    setIsLoading(true);
    api
      .patch(
        `${environment.API_BASE_URL}/admin/contact-requests/assign-lead/${leadId}`,
        { assigned_to: assignParams.assigned_to }
      )
      .then((response) => {
        console.log(response);
        toast.success(response.data.data.message);
        fetchLeads(inputs, currentPage);
        handleClose();
        setIsLoading(false);
        setAssignParams(assign);
      })
      .catch((error) => {
        console.log("error:", error);
        toast.success(error.data.message);
        setIsLoading(false);
      });
  };
  const onExeCancelSubmit = async () => {
    if (!assignParams.notes) {
      return toast.error("Please Enter Reason");
    }

    if (assignParams.notes.length > 80) {
      return toast.error("Please Enter Reason within 80 characters");
    }
    setIsLoading(true);
    api
      .patch(
        `${environment.API_BASE_URL}/admin/contact-requests/reassign-lead/${leadId}`,
        { notes: assignParams.notes }
      )
      .then((response) => {
        toast.success(response.data.data.message);
        fetchLeads(inputs, currentPage);
        handleClose();
        setAssignParams(assign);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.success(error.data.message);
        setIsLoading(false);
      });
  };
  const reset = () => {
    setCurrentPage(1);
    setInputs(initialValues);
    fetchLeads(initialValues, 1);
  };

  const onChange = (dates) => {
    const [start, end] = dates;
    const sDate = new Date(start);
    const eDate = end ? new Date(end) : null;
    setInputs({ ...inputs, from: sDate, to: eDate });
  };

  const serialize = (obj) => {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  };

  const fetchLeads = (inputs, page) => {
    setLeads([]);
    setLoading(true);
    let obj = { ...inputs, search: inputs.search.trim() };
    obj["page"] = page;
    if (obj.from) obj.from = moment(obj.from).format("YYYY-MM-DD");
    if (obj.to) obj.to = moment(obj.to).format("YYYY-MM-DD");
    let queryStr = serialize(obj);
    api
      .get(`${environment.API_BASE_URL}/admin/contact-requests?${queryStr}`)
      .then((res) => {
        for (let item of res.data.data.data) {
          let flag = country.find(
            (x) => item.country && x.fullName === item.country.name
          );
          if (flag) {
            item["flag"] = flag.img;
          }
        }
        setLeads(res?.data?.data?.data);
        setTotal(res?.data?.data?.meta?.total);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useMemo(() => {
    fetchLeads(inputs, currentPage);
  }, [currentPage]);

  const getStats = (date) => {
    api
      .get(
        `${environment.API_BASE_URL}/admin/contact-requests/statistics?from=${date.start_date}&to=${date.end_date}`
      )
      .then((res) => {
        setStats(res?.data?.data);
        const response = res?.data?.data;
        let list = [
          {
            stats: response?.total_contacts,
            label: "Total Leads",
            color: "#FFFFFF",
          },
          {
            stats: response?.not_contacted,
            label: "Not Contacted",
            color: "text-[#EF4949]",
          },
          {
            stats: response?.contacted,
            label: "Contacted",
            color: "text-[#07C046]",
          },
          {
            stats: response?.assigned,
            label: "Assigned",
            color: "text-[#38A9F8]",
          },
          {
            stats: response?.not_assigned,
            label: "Unassigned",
            color: "text-[#EF4949]",
          },
        ];
        let user = "";
        let loggedUser = loginUser();
        if (loggedUser) {
          user = JSON.parse(loggedUser);
        }
        if (user && user.role_slug !== "admin") {
          list = list.slice(0, 3);
        }
        setStatsList(list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useMemo(() => {
    getStats(date);
  }, [date]);

  const onDateSelect = (date) => {
    setDate(date);
  };

  const deleteLead = () => {
    setLoading(true);
    api
      .delete(`${environment.API_BASE_URL}/admin/contact-requests/${leadId}`)
      .then((res) => {
        setLoading(false);
        if (leads.length === 1) {
          fetchLeads(inputs, 1);
          setCurrentPage(1);
        } else {
          fetchLeads(inputs, currentPage);
        }
        getStats(date);
        toast.success("Lead Deleted Successfully");
        setOpen(false);
      })
      .catch((err) => {
        setOpen(false);
        toast.error(err.message);
        setLoading(false);
      });
  };

  const handleCarouselDown = () => {
    if (carousel === 0) {
      setCarousel(0);
    } else {
      setCarousel(carousel - 1);
    }
  };
  const handleCarouselUp = () => {
    if (carousel === statsList.length - 1) {
      setCarousel(statsList.length - 1);
    } else {
      setCarousel(carousel + 1);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setAssignParams(assign);
  };

  const handleClickOpen = (name, value, id) => {
    setLeadId(id);
    if (name === "assignLargeScreen") {
      let lead = leads.find((x) => x.id === id);
      if (lead.status === "EXE_CANCELLED") {
        setAssignParams({ ...assignParams, ...lead });
        setOpen({ ...open, reassignLargeScreen: true });
        return;
      }
    }
    setOpen({ ...open, [name]: value });
  };

  function filterSearch() {
    if (inputs.to === null) {
      toast.error("Please Select Valid Date Range");
      return false;
    }
    setCurrentPage(1);
    fetchLeads(inputs, 1);
  }

  //Get All Roles
  const getUsers = () => {
    api
      .get(`${environment.API_BASE_URL}/admin/users/dropdown`)
      .then((res) => {
        setUsers(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchDropdowns = () => {
    api
      .get(`${environment.API_BASE_URL}/prerequisite`)
      .then((res) => {
        setLoading(false);
        // console.log(res.data.data);
        setDropdowns({
          ...dropdowns,
          study_destination: res.data.data.study_destination,
          study_area: res?.data?.data?.study_area,
          study_level: res?.data?.data?.study_level,
          study_industry: res?.data?.data?.study_industry,
          intake_month: res?.data?.data?.intake_month,
          intake_year: res?.data?.data?.intake_year,
          study_durations: res?.data?.data?.study_durations,
          type_of_degree: res?.data?.data?.type_of_degree,
          years_of_experience: res?.data?.data?.years_of_experience,
        });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    getUsers();
    fetchDropdowns();
    let user = "";
    let loggedUser = loginUser();
    if (loggedUser) {
      user = JSON.parse(loggedUser);
    }
    setAuthUser(user);
  }, []);

  return (
    <div className="p-2 lg:p-4 mb-10">
      <div className="flex justify-between items-center">
        <h1 className=" audio text-white relative text-[16px] lg:text-2xl">
          Leads-Explore
        </h1>
        <div className="w-[180px] md:w-[220px]">
          <DateFilter onDateRangeSelect={onDateSelect} id="1" />
        </div>
      </div>
      {/* <div className="w-full flex justify-end md:hidden lg:hidden mb-4 mt-4">
        <DateFilter onDateRangeSelect={onDateSelect} id="3" />
      </div> */}
      <hr className="mt-1 hidden lg:block" />

      {/* Stats Medium and Large Screens */}
      <div className="flex justify-between">
        <div className="hidden lg:flex gap-2 mt-2">
          <Card
            count={stats?.total_contacts}
            label="Total Leads"
            color="text-[#FFFFF]"
          />
          <Card
            count={stats?.not_contacted}
            label="Not Contacted"
            color="text-[#EF4949]"
          />
          <Card
            count={stats?.contacted}
            label="Contacted"
            color="text-[#07C046]"
          />
          {authUser && authUser.role_slug === "admin" && (
            <>
              <Card
                count={stats?.assigned}
                label="Assigned"
                color="text-[#38A9F8]"
              />
              <Card
                count={stats?.not_assigned}
                label="Unassigned"
                color="text-[#EF4949]"
              />
            </>
          )}
        </div>
        <div className="hidden lg:flex  justify-end gap-6 mt-3">
          <CustomButton
            onClick={() => {
              setApplyFilter(!applyFilter);
            }}
            variant="outlined"
            size="large"
            icon={<img src={Filter} alt="" />}
            borderRadius="8px"
            width="w-fit"
            bgcolor="#151929"
          >
            <p className="gradient-text">Filter</p>
          </CustomButton>

          <Link to="/leads/explore/create">
            <CustomButton
              onClick={() => {
                setApplyFilter(!applyFilter);
              }}
              variant="contained"
              size="large"
              icon={<img src={Plus} alt="" />}
              borderRadius="8px"
              width="w-fit"
            >
              <p className="">New Lead</p>
            </CustomButton>
          </Link>
        </div>
      </div>

      {/* Carousel for mobile view */}

      <div className="lg:hidden flex flex-row gap-10">
        <div className="w-[50%]">
          {" "}
          <Slider
            my_swiper={my_swiper}
            handleSwiper={handleSwiper}
            content={statsList}
          />
        </div>

        <div className="w-full mt-6 lg:hidden flex flex-col-reverse justify-end gap-2">
          <CustomButton
            onClick={() => {
              setApplyFilter(!applyFilter);
            }}
            variant="outlined"
            size="large"
            icon={<img src={Filter} alt="" />}
            borderRadius="8px"
            width="w-fit"
            bgcolor="#151929"
          >
            <p className="gradient-text">Filter</p>
          </CustomButton>

          <Link to="/leads/explore/create">
            <CustomButton
              variant="contained"
              size="large"
              icon={<img src={Plus} alt="" />}
              borderRadius="8px"
              width="w-fit"
            >
              <p className="hidden md:block">New Lead</p>
              <p className="block md:hidden">Create</p>

            </CustomButton>
          </Link>
        </div>
      </div>

      <hr className="mt-2 md:hidden block" />

      {/*for Desktop */}

      <div className="mt-4"></div>

      {applyFilter ? (
        <>
          <div className="w-full mt-2 flex gap-4">
            <div className="w-full flex  flex-col lg:flex-row gap-4">
              <div>
                <DateRangePicker
                  startDate={inputs.from}
                  endDate={inputs.to}
                  onChange={onChange}
                  id="2"
                />
              </div>

              <SelectInput
                options={[
                  {
                    name: "CALL_BACK",
                  },
                  {
                    name: "CONTACTED",
                  },
                  {
                    name: "CONVERTED",
                  },
                  {
                    name: "EXE_CANCELLED",
                  },
                  {
                    name: "ASSIGNED",
                  },
                  {
                    name: "UN_ASSIGNED",
                  },
                  {
                    name: "NOT_CONTACTED",
                  },
                ]}
                handleChange={handleSelect}
                value={inputs.status}
                label="Status"
                name="status"
                bgcolor="#151929"
                fontSize="12px"
              />

              <SelectInput
                options={users}
                handleChange={handleSelect}
                value={inputs.assigned_to}
                label="Assigned to"
                name="assigned_to"
                bgcolor="#151929"
                fontSize="12px"
              />
              <SelectInput
                options={["website", "reference", "social", "others"]}
                handleChange={handleSelect}
                value={inputs.source}
                label="Lead Source"
                name="source"
                bgcolor="#151929"
                fontSize="12px"
              />
            </div>

            <div className="hidden justify-center items-center  lg:flex gap-4">
              <CustomButton
                onClick={filterSearch}
                variant="contained"
                size="large"
                borderRadius="8px"
                width="w-fit"
                disabled={CountItems(inputs) === 0}
              >
                <p className="">Apply</p>
              </CustomButton>

              <CustomButton
                onClick={() => {
                  reset();
                }}
                variant="outlined"
                size="large"
                borderRadius="8px"
                width="w-fit"
                bgcolor="#151929"
              >
                <img src={Refresh} alt="" />
              </CustomButton>
            </div>
          </div>

          <div className="flex w-full lg:w-[80%] mt-4 flex-col lg:flex-row gap-4 ">
            <SelectInput
              options={dropdowns.study_destination}
              handleChange={handleSelect}
              value={inputs.country_id}
              label="Study Destination"
              name="country_id"
              bgcolor="#151929"
              fontSize="12px"
            />
            <SelectInput
              options={dropdowns.intake_year}
              handleChange={handleSelect}
              value={inputs.intake_year}
              label="Intake Year"
              name="intake_year"
              bgcolor="#151929"
              fontSize="12px"
            />
            <SelectInput
              options={dropdowns.intake_month}
              handleChange={handleSelect}
              value={inputs.intake_month}
              label="Intake Month"
              name="intake_month"
              bgcolor="#151929"
              fontSize="12px"
            />
            <InputAdornments
              handleChange={handleSelect}
              onEnter={onEnter}
              value={inputs.search}
              label="Search"
              name="search"
              width="w-full"
            />
          </div>
          {/* Mobile and Tab */}
          <div className="flex lg:hidden gap-4 justify-end mt-4">
            <CustomButton
              onClick={filterSearch}
              variant="contained"
              size="large"
              borderRadius="8px"
              width="w-fit"
              disabled={CountItems(inputs) === 0}
            >
              <p className="">Apply</p>
            </CustomButton>

            <CustomButton
              onClick={reset}
              variant="outlined"
              size="large"
              borderRadius="8px"
              width="w-fit"
              bgcolor="#151929"
            >
              <img src={Refresh} alt="" />
            </CustomButton>
          </div>
        </>
      ) : (
        ""
      )}

      {applyFilter ? <hr className=" mt-1 mb-2" /> : ""}

      {loading ? (
        ""
      ) : (
        <p className="text-[10px] lg:text-[12px] mb-2 audio  ml-2">
          Showing{" "}
          <span className="font-[800]">
            {currentPage === Math.ceil(total / 10) ? (
              <>{total}</>
            ) : (
              <>{leads.length + (currentPage - 1) * 10}</>
            )}
          </span>{" "}
          out of <span className="font-[800]">{total}</span> results
        </p>
      )}

      {loading ? (
        <div className="w-full">
          <p className="text-center audio text-3xl">Loading....</p>
        </div>
      ) : (
        <div className="hidden lg:block">
          {leads && leads.length ? (
            <BasicTable
              cols={cols}
              data={leads}
              handleClickOpen={handleClickOpen}
            />
          ) : (
            <p className="text-center audio text-3xl">No data Found!!!</p>
          )}
        </div>
      )}

      <div className="block lg:hidden ">
        <Accordion
          data={leads}
          open={open}
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
          loading={loading}
        />
      </div>
      {leads.length > 0 ? (
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={total}
          pageSize={10}
          onPageChange={(page) => setCurrentPage(page)}
        />
      ) : (
        ""
      )}

      {open.assignLargeScreen ? (
        <AssignFormModal
          users={users}
          params={assignParams}
          open={open.assignLargeScreen}
          handleChange={handleAssignChange}
          handleClose={handleClose}
          type="assign"
          onSubmit={onAssignSubmit}
          isLoading={isLoading}
          label="Assign"
        />
      ) : (
        ""
      )}

      {open.assignMediumScreen ? (
        <AssignFormModal
          users={users}
          params={assignParams}
          open={open.assignMediumScreen}
          handleChange={handleAssignChange}
          handleClose={handleClose}
          type="assign"
          onSubmit={onAssignSubmit}
          isLoading={isLoading}
          label="Assign"
        />
      ) : (
        ""
      )}

      {open.exe_cancelLargeScreen && (
        <AssignFormModal
          open={open.exe_cancelLargeScreen}
          params={assignParams}
          handleChange={handleAssignChange}
          handleClose={handleClose}
          type="exe_cancel"
          onSubmit={onExeCancelSubmit}
          isLoading={isLoading}
          label="Submit"
        />
      )}

      {open.reassignLargeScreen && (
        <AssignFormModal
          users={users}
          open={open.reassignLargeScreen}
          params={assignParams}
          handleChange={handleAssignChange}
          handleClose={handleClose}
          type="reassign"
          isLoading={isLoading}
          onSubmit={onAssignSubmit}
          label="Reassign"
        />
      )}

      {open.deleteLargeScreen && (
        <DeleteModal
          open={open.deleteLargeScreen}
          handleClose={handleClose}
          type="delete"
          handleActionButton={deleteLead}
          loading={loading}
          title=" Are you sure you want to delete the Lead?"
          isLoading={isLoading}
        />
      )}

      {open.archeiveLargeScreen && (
        <DeleteModal
          open={open.archeiveLargeScreen}
          handleClose={handleClose}
          type="archeive"
          title=" Are you sure you want to delete the Lead?"
          loading={loading}
          handleActionButton={deleteLead}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default LeadListing;
