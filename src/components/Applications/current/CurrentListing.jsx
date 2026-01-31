import React, { useEffect } from "react";
import { useState } from "react";
import BasicTable from "./Table";

import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

import { filterStats, initialValues, intakeMonth } from "./helpers";
import { cols } from "./helpers";
import { intakeYear } from "./helpers";
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
import Slider from "../../Lead/Swiper";

const statusList = [
  { name: "IN_PROGRESS" },
  { name: "ENROLLED" },
  { name: "DEFER" },
  { name: "HOLD" },
];
const stages = [
  {
    name: "Gathering Checklist",
  },
  {
    name: "Financial Evidence",
  },
  {
    name: "Pre-CAS Process",
  },
  {
    name: "Pre Requisite",
  },
  {
    name: "After I-20",
  },
  {
    name: "Pre-Departure",
  },
  {
    name: "Visa Application",
  },
];

const CurrentListing = () => {
  const [inputs, setInputs] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState({});
  const [leadId, setLeadId] = useState();
  const [applyFilter, setApplyFilter] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState(null);
  const [carousel, setCarousel] = useState(0);
  const [poc, setPoc] = useState([]);
  const [my_swiper, set_my_swiper] = useState({});
  const handleSwiper = (ev) => {
    set_my_swiper(ev);
  };
  const [date, setDate] = useState({
    start_date: "",
    end_date: "",
  });
  const [dropdowns, setDropdowns] = useState({
    study_destination: [],
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
  });

  let arr = [
    {
      stats: stats?.total_students,
      label: "Total Students",
      color: "#FFFFFF",
    },
    {
      stats: stats?.in_progress,
      label: "InProcess",
      color: "text-[#EF4949]",
    },
    {
      stats: stats?.enrolled,
      label: "Enrolled",
      color: "text-[#07C046]",
    },
    {
      stats: stats?.defer,
      label: "Defer",
      color: "text-[#38A9F8]",
    },
    {
      stats: stats?.hold,
      label: "Hold",
      color: "text-[#38A9F8]",
    },
  ];

  const getPocUsers = () => {
    api
      .get(`${environment.API_BASE_URL}/admin/users/dropdown`)
      .then((res) => {
        setPoc(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPocUsers();
  }, []);

  const fetchDropdowns = () => {
    api
      .get(`${environment.API_BASE_URL}/prerequisite`)
      .then((res) => {
        setLoading(false);
        // console.log(res.data.data);
        setDropdowns({
          ...dropdowns,
          study_destination: res.data.data.study_destination,
        });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    fetchDropdowns();
  }, []);

  const handleSelect = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onEnter = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    filterSearch();
  };

  const reset = () => {
    setInputs(initialValues);
    setStartDate(null);
    setEndDate(null);
    getAllStudents(initialValues);
  };

 

  const getAllStudents = (inputs) => {
    setLoading(true);
    setStudents([]);
    api
      .get(
        `${
          environment.API_BASE_URL
        }/admin/students?page=${currentPage}&search_key=${inputs.search_key.trim()}&created_from=${
          inputs.created_from
        }&created_to=${inputs.created_to}&stage=${inputs.stage}&country_id=${
          inputs.country_id
        }&contact_id=${inputs.contact_id}&status=${inputs.status}`
      )
      .then((res) => {
        for (let item of res.data.data.data) {
          let flag = country.find(
            (x) => item.country && x.fullName === item.country.name
          );
          if (flag) {
            item["flag"] = flag.img;
          }
        }
        const addStatus = res.data.data.data.map((e) => {
          return {
            ...e,
          };
        });
        setStudents(addStatus);
        setTotal(res.data.data.meta.total);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useMemo(() => {
    getAllStudents(inputs);
  }, [currentPage]);

  const getStats = (date) => {
    api
      .get(
        `${environment.API_BASE_URL}/admin/students/statistics?from=${date.start_date}&to=${date.end_date}`
      )
      .then((res) => {
        setStats(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useMemo(() => {
    getStats(date);
  }, [date]);

  const onDateSelect = (date) => {
    console.log(date);

    setDate(date);
  };

  const deleteLead = () => {
    setLoading(true);
    api
      .delete(`${environment.API_BASE_URL}/admin/students/${leadId}`)
      .then((res) => {
        setLoading(false);
        getAllStudents(initialValues);
        toast.success("Student Deleted Successfully");
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
    if (carousel === 4) {
      setCarousel(4);
    } else {
      setCarousel(carousel + 1);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (name, value, id) => {
    setLeadId(id);
    setOpen({ ...open, [name]: value });
  };

  function filterSearch() {
    if (inputs.created_to === null) {
      toast.error("Please Select Valid Date Range");
      return false;
    }
    setCurrentPage(1);
    getAllStudents(inputs, 1);
  }

  const onTimeChange = (dates) => {
    const [start, end] = dates;
    const sDate = new Date(start);
    const eDate = end ? new Date(end) : null;
    setInputs({ ...inputs, created_from: sDate, created_to: eDate });
  };

  return (
    <div className="p-2 lg:p-4 mb-10">
    <div className="flex justify-between items-center">
        <h1 className=" audio text-white relative text-[16px] lg:text-2xl">
          Applications
        </h1>
        <div className="w-[180px] md:w-[220px]">
          <DateFilter onDateRangeSelect={onDateSelect} id="22" />
        </div>
      </div>

      <hr className="mt-4 hidden lg:block" />

      {/* Stats Medium and Large Screens */}
      <div className="flex justify-between">
        <div className="hidden lg:flex gap-2 mt-2">
          <Card
            count={stats?.total_students}
            label="Total Students"
            color="text-[#99D592]"
          />
          <Card
            count={stats?.in_progress}
            label="InProcess"
            color="text-[#EF4949]"
          />
          <Card
            count={stats?.enrolled}
            label="Enrolled"
            color="text-[#FE9705]"
          />
          <Card count={stats?.defer} label="Defer" color="text-[#FFE15A]" />
          <Card count={stats?.hold} label="Hold" color="text-[#EF8549]" />
        </div>

        {/*for Desktop */}

        <div className="hidden lg:flex mt-4 justify-end gap-6">
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

          <Link to="/students/create-student">
            <CustomButton
              variant="contained"
              size="large"
              icon={<img src={Plus} alt="" />}
              borderRadius="8px"
              width="w-fit"
            >
              <p className="">New Student</p>
            </CustomButton>
          </Link>
        </div>
      </div>

      {/* Carousel for mobile view */}

      <div className="lg:hidden flex flex-row gap-6 justify-between">
        <div className="w-[48%]">
          {" "}
          <Slider
            my_swiper={my_swiper}
            handleSwiper={handleSwiper}
            content={arr}
          />
        </div>
        <div className="flex flex-col gap-2 lg:hidden mt-6">
          <Link to="/students/create-student">
            <CustomButton
              variant="contained"
              size="large"
              icon={<img src={Plus} alt="" />}
              borderRadius="8px"
              width="w-fit"
            >
              <p className="">New</p>
            </CustomButton>
          </Link>
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
        </div>
      </div>

      <hr className="mt-4 md:hidden block" />

      {applyFilter ? (
        <>
          <div className="w-full mt-4 flex gap-4">
            <div className="w-full flex  flex-col lg:flex-row gap-4">
              <DateRangePicker
                startDate={inputs.created_from}
                endDate={inputs.created_to}
                onChange={onTimeChange}
                id="21"
              />
              <SelectInput
                options={stages}
                handleChange={handleSelect}
                value={inputs.stage}
                label="Stage"
                name="stage"
                bgcolor="#151929"
                fontSize={"12px"}
              />
              <SelectInput
                options={dropdowns.study_destination}
                handleChange={handleSelect}
                value={inputs.country_id}
                label="Study Destination"
                name="country_id"
                bgcolor="#151929"
                fontSize={"12px"}
              />
              <SelectInput
                options={statusList}
                handleChange={handleSelect}
                value={inputs.status}
                label="Application Status"
                name="status"
                bgcolor="#151929"
                fontSize={"12px"}
              />
            </div>

            <div className="hidden justify-center items-center  lg:flex gap-4">
              <CustomButton
                onClick={filterSearch}
                variant="contained"
                size="large"
                borderRadius="8px"
                width="w-fit"
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

          <div className="flex w-full lg:w-[40%] mt-4 flex-col lg:flex-row gap-4 ">
            <SelectInput
              options={poc}
              handleChange={handleSelect}
              value={inputs.contact_id}
              label="POC"
              name="contact_id"
              bgcolor="#151929"
              fontSize={"12px"}
            />
            <InputAdornments
              handleChange={handleSelect}
              onEnter={onEnter}
              label="Search"
              name="search_key"
              value={inputs.search_key}
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
        </>
      ) : (
        ""
      )}

      {applyFilter ? <hr className=" mt-4 mb-4" /> : ""}
      {loading ? (
        ""
      ) : (
        <p className="text-[10px] lg:text-[12px] mb-2  mt-2 ml-2">
          Showing{" "}
          <span className="font-[800]">
            {students.length + (currentPage - 1) * 10}
          </span>{" "}
          out of <span className="font-[800]">{total}</span> results
        </p>
      )}

      {loading ? (
        <div className="w-full mt-4">
          <p className="text-center audio text-3xl">Loading....</p>
        </div>
      ) : (
        <div className="hidden lg:block">
          {students.length > 0 ? (
            <BasicTable
              cols={cols}
              data={students}
              handleDeleteOk={deleteLead}
              open={open}
              handleClose={handleClose}
              handleClickOpen={handleClickOpen}
              loading={loading}
            />
          ) : (
            <p className="text-center audio text-3xl">No data Found!!!</p>
          )}
        </div>
      )}

      <div className="block lg:hidden ">
        <Accordion
          data={students}
          handleDeleteOk={deleteLead}
          open={open}
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
          loading={loading}
        />
      </div>
      {students.length > 0 ? (
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
    </div>
  );
};

export default CurrentListing;
