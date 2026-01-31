import React from "react";
import { useState, useEffect } from "react";
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

import Refresh from "../../../assets/leads/Refresh.svg";
import { Link } from "react-router-dom";
import { CountItems } from "../../../common/utils/helpers";

const UniversityListing = () => {
  const [params, setParams] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countries, setCountries] = useState([]);
  const [total, setTotal] = useState(0);
  const [universityId, setUniversityId] = useState();
  const [applyFilter, setApplyFilter] = useState(false);
  const [open, setOpen] = React.useState({
    archeiveLargeScreen: false,
    archeiveMediumScreen: false,
  });

  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const onEnter = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
    setCurrentPage(1);
    fetchUniversities(params);
  };

  const reset = () => {
    setParams(initialValues);
    setCurrentPage(1);
    fetchUniversities(initialValues);
  };

  const fetchUniversities = (params) => {
    setLoading(true);
    setUniversities([]);
    api
      .get(
        `${environment.API_BASE_URL}/admin/universities?search_key=${params.search_key}&country_id=${params.country_id}&page=${currentPage}`
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
        setTotal(res?.data?.data?.meta?.total);
        setUniversities(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const getCountries = () => {
    api
      .get(`${environment.API_BASE_URL}/admin/countries`)
      .then((res) => {
        setCountries(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useMemo(() => {
    fetchUniversities(params);
  }, [currentPage]);

  const archiveUniversity = () => {
    setLoading(true);
    api
      .delete(`${environment.API_BASE_URL}/admin/universities/${universityId}`)
      .then((res) => {
        setLoading(false);
        fetchUniversities(initialValues);
        toast.success("University Archived Successfully");
        handleClose();
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (name, value, id) => {
    setUniversityId(id);
    setOpen({ ...open, [name]: value });
  };

  useEffect(() => {
    getCountries();
  }, []);
  return (
    <div className="p-2 lg:p-4 mb-10">
    <div className="w-full flex flex-col lg:flex-row justify-between">
        <h1 className=" p-2 audio text-white relative text-base lg:text-2xl">
          Universities Listing
        </h1>

        <div className="flex gap-4 mt-2 mb-1 lg:mt-0 justify-end">
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

          <Link to="/settings/universities/create">
            <CustomButton
              onClick={() => {
                setApplyFilter(!applyFilter);
              }}
              variant="contained"
              size="large"
              borderRadius="8px"
              width="w-fit"
            >
              <p className="hidden md:block">+New University</p>
              <p  className="block md:hidden">+Add New</p>

            </CustomButton>
          </Link>
        </div>
      </div>

      <hr className="mt-1" />

      {/*for Desktop */}

      {applyFilter ? (
        <>
          <div className="w-full mt-2 flex gap-4">
            <div className="w-full flex  flex-col lg:flex-row gap-4">
              <SelectInput
                options={countries}
                handleChange={handleChange}
                value={params.country_id}
                label="Country"
                name="country_id"
                bgcolor="#151929"
                fontSize={'12px'}
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
                  setCurrentPage(1);
                  fetchUniversities(params);
                }}
                variant="contained"
                size="large"
                borderRadius="8px"
                width="w-fit"
                disabled={CountItems(params)===0}
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
                fetchUniversities(params);
              }}
              variant="contained"
              size="large"
              borderRadius="8px"
              width="w-fit"
              disabled={CountItems(params)===0}
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
        <p className="text-[10px] md:text-[12px] mb-2  mt-2 ml-2">
          showing{" "}
          <span className="font-[800]">
            {universities.length > 0 ? (
              <> {universities.length + (currentPage - 1) * 10}</>
            ) : (
              "0"
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
          {universities.length > 0 ? (
            <BasicTable
              cols={cols}
              data={universities}
              handleDeleteOk={archiveUniversity}
              loading={loading}
              open={open}
              handleClose={handleClose}
              handleClickOpen={handleClickOpen}
            />
          ) : (
            <p className="text-center audio text-3xl">No data Found!!!</p>
          )}
        </div>
      )}

      <div className="block lg:hidden ">
        <Accordion
          data={universities}
          handleDeleteOk={archiveUniversity}
          loading={loading}
          open={open}
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
        />
      </div>

      {loading ? (
        ""
      ) : (
        <>
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={total}
            pageSize={10}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
};

export default UniversityListing;
