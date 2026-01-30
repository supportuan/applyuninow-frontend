import React from "react";
import { useState } from "react";
import BasicTable from "./Table";
import "react-datepicker/dist/react-datepicker.css";
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
import Refresh from "../../../assets/leads/Refresh.svg";
import { servicesList } from "./helpers";
import { useEffect } from "react";
import { CountItems } from "../../../common/utils/helpers";
import Slider from "../Swiper";

const AddOnListing = () => {
  const [params, setParams] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState({});
  const [leadId, setLeadId] = useState();
  const [applyFilter, setApplyFilter] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState("");
  const [carousel, setCarousel] = useState(0);
  const [date, setDate] = useState({
    start_date: "",
    end_date: "",
  });

  const [coutryList, setCountryList] = useState([]);
  const [my_swiper, set_my_swiper] = useState({});
  const handleSwiper = (ev) => {
    set_my_swiper(ev);
  };

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
      stats: stats?.total_leads,
      label: "Total Leads",
      color: "#FFFFFF",
    },
    {
      stats: stats?.not_contacted,
      label: "Not Contacted",
      color: "text-[#EF4949]",
    },
    {
      stats: stats?.contacted,
      label: "Contacted",
      color: "text-[#07C046]",
    },
    {
      stats: stats?.in_progress,
      label: "Inprogress",
      color: "text-[#38A9F8]",
    },
    {
      stats: stats?.completed,
      label: "Completed",
      color: "text-[#EF4949]",
    },
  ];

  let width = "200px";

  if (window.innerWidth < 1024) {
    width = "100%";
  }

  const handleChange = (e) => {
    if (e.target.name === "search_key") {
      if (e.target.value === " ") return;
    }
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const onEnter = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
    handleFilter();
  };

  const reset = () => {
    setParams(initialValues);
    setCurrentPage(1);
    setStartDate(null);
    setEndDate(null);
    fetchAddOn(initialValues, 1);
  };

  

  const onChange = (dates) => {
    const [start, end] = dates;
    const sDate = new Date(start);
    
    const eDate = end ? new Date(end) : null;
    setParams({ ...params, created_from: sDate, created_to: eDate });
  };

  const fetchAddOn = (params, currentPage) => {
    setLeads([]);
    setLoading(true);
    api
      .get(
        `${
          environment.API_BASE_URL
        }/admin/additional-services?search_key=${params.search_key.trim()}&country_id=${
          params.country_id
        }&created_from=${params.created_from}&created_to=${
          params.created_to
        }&status=${params.status}&service=${params.service}&page=${currentPage}`
      )
      .then((res) => {
        setLoading(false);
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
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useMemo(() => {
    fetchAddOn(params, currentPage);
  }, [currentPage]);

  const getStats = (date) => {
    api
      .get(
        `${environment.API_BASE_URL}/admin/additional-services/statistics?from=${date.start_date}&to=${date.end_date}`
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
    setDate(date);
  };

  const archiveAddOn = () => {
    setLoading(true);
    api
      .delete(`${environment.API_BASE_URL}/admin/additional-services/${leadId}`)
      .then((res) => {
        setLoading(false);
        fetchAddOn(initialValues);
        getStats(date);
        if (leads.length === 1) {
          fetchAddOn(params, 1);
          setCurrentPage(1);
        } else {
          fetchAddOn(params, currentPage);
        }
        toast.success("AddOn Archived Successfully");
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

  const handleFilter = () => {
    if (params.created_to === null) {
      toast.error("Please Select Valid Date Range");
      return false;
    }
    setCurrentPage(1);
    fetchAddOn(params,1);
  };

  const fetchDropdowns = () => {
    api
      .get(`${environment.API_BASE_URL}/prerequisite`)
      .then((res) => {
        setLoading(false);
        setCountryList(res.data.data.study_destination);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    fetchDropdowns();
  }, []);
  return (
    <div className="p-2 lg:p-4 mb-10">
      <div className="flex justify-between items-center">
        <h1 className=" audio text-white relative text-[16px] lg:text-2xl">
          Leads-Add ons
        </h1>
        <div className="w-[180px] md:w-[220px]">
          <DateFilter onDateRangeSelect={onDateSelect} id="4" />
        </div>
      </div>
     
      <hr className="mt-1 hidden lg:block" />

      {/* Stats Medium and Large Screens */}

      <div className="hidden lg:flex gap-2 mt-2">
        <Card
          count={stats?.total_leads}
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
        <Card
          count={stats?.in_progress}
          label="In Progress"
          color="text-[#38A9F8]"
        />
        <Card
          count={stats?.completed}
          label="Completed"
          color="text-[#EF4949]"
        />
      </div>

      <div className="lg:hidden flex flex-row justify-between">
        <div className="w-[50%] custom-swiper">
          {" "}
          <Slider
            my_swiper={my_swiper}
            handleSwiper={handleSwiper}
            content={arr}
          />
        </div>
        <div className="flex lg:hidden mt-6 pr-4">
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

      <hr className="mt-2 lg:hidden block" />

      {/*for Desktop */}

      <div className="hidden lg:flex mt-2 justify-end gap-6">
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

      {applyFilter ? (
        <>
          <div className="w-full mt-4 flex gap-4">
            <div className="w-full flex  flex-col lg:flex-row gap-4">
              <div>
                <DateRangePicker
                  startDate={params.created_from}
                  endDate={params.created_to}
                  onChange={onChange}
                  id="3"
                />
              </div>
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
                label="Status"
                name="status"
                bgcolor="#151929"
                width={width}
                fontSize="12px"
              />

              <SelectInput
                options={servicesList}
                handleChange={handleChange}
                value={params.service}
                label="Add-on"
                name="service"
                bgcolor="#151929"
                width={width}
                fontSize="12px"
              />

              <SelectInput
                options={coutryList}
                handleChange={handleChange}
                value={params.country_id}
                label="Country"
                name="country_id"
                bgcolor="#151929"
                width={width}
                fontSize="12px"
              />
              <InputAdornments
                handleChange={handleChange}
                onEnter={onEnter}
                label="Search"
                name="search_key"
                value={params.search_key}
                width="w-full"
              />
            </div>

            <div className="hidden justify-center items-center  lg:flex gap-4">
              <CustomButton
                onClick={() => {
                  handleFilter();
                }}
                variant="contained"
                size="large"
                borderRadius="8px"
                width="w-fit"
                disabled={CountItems(params) === 0}
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

          {/* Mobile and Tab */}
          <div className="flex lg:hidden gap-4 justify-end mt-4">
            <CustomButton
              onClick={() => {
                handleFilter();
              }}
              variant="contained"
              size="large"
              borderRadius="8px"
              width="w-fit"
              disabled={CountItems(params) === 0}
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

      {applyFilter ? <hr className="mt-1 mb-2" /> : ""}
      {loading ? (
        ""
      ) : (
        <p className="text-[10px] mt-2 lg:mt-0 lg:text-[12px] mb-2 audio  ml-2">
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
          {leads.length > 0 ? (
            <BasicTable
              cols={cols}
              data={leads}
              handleDeleteOk={archiveAddOn}
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
          data={leads}
          handleDeleteOk={archiveAddOn}
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
    </div>
  );
};

export default AddOnListing;
