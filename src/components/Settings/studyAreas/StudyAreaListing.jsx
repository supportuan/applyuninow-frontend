import React from "react";
import { useState, useEffect } from "react";
import BasicTable from "./Table";
import "react-datepicker/dist/react-datepicker.css";
import { initialParams, initialValues } from "./helpers";
import { cols } from "./helpers";
import api from "../../../api";
import { environment } from "../../../environments/environment";

import Pagination from "../../Shared/Pagination/Pagination";
import { useMemo } from "react";

import { toast } from "react-toastify";
import CustomButton from "../../../common/CustomButton";
import Filter from "../../../assets/leads/Filter.svg";
import { InputAdornments } from "../../../common/SearchText";

import Refresh from "../../../assets/leads/Refresh.svg";
import CreateModal from "./CreateModal";
import Validator from "validatorjs";
import Accordion1 from "./Accordion1";

const intialValues = {
  name: "",
  industry_id: "",
  sub_industry_id: "",
};
const StudyAreaListing = () => {
  const [params, setParams] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [studyAreaList, setStudyAreaList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [industryId, setindustryId] = useState();
  const [applyFilter, setApplyFilter] = useState(false);
  const [industries, setStudyInterstries] = useState([]);
  const [sub_industries, setStudySubInterstries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = React.useState({
    archeiveLargeScreen: false,
    archeiveMediumScreen: false,
    create: false,
    edit: false,
  });
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState(intialValues);
  const handleChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "search") {
      setParams({ ...params, [name]: value });
    }

    if (type === "form") {
      if (name === "industry_id") {
        getStudySubIndustry(value);
      }
      setFormValues({ ...formValues, [e.target.name]: e.target.value });
      setFormErrors(intialValues);
    }
  };


  const onEnter = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
    setCurrentPage(1)
    fetchStudyArea(params);
  };


  const reset = () => {
    setParams(initialValues);
    fetchStudyArea(initialValues);
  };

  const fetchStudyArea = (params) => {
    setLoading(true);
    setStudyAreaList([]);
    api
      .get(
        `${environment.API_BASE_URL}/admin/study_areas?page=${currentPage}&search_key=${params.search_key}`
      )
      .then((res) => {
        setLoading(false);

        setTotal(res?.data?.data?.meta?.total);
        setStudyAreaList(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useMemo(() => {
    fetchStudyArea(params);
  }, [currentPage]);

  const archiveStudyArea = () => {
    setLoading(true);
    api
      .delete(`${environment.API_BASE_URL}/admin/study_areas/${industryId}`)
      .then((res) => {
        setLoading(false);
        fetchStudyArea(initialValues);
        toast.success("StudyArea Archived Successfully");
        handleClose();
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  const handleClose = () => {
    setOpen(false);
    setFormValues(initialParams);
  };

  const handleClickOpen = (name, value, id) => {
    setindustryId(id);
    if (name === "edit") {
      setFormValues(id);
    }
    setOpen({ ...open, [name]: value });
  };

  const getStudyIndustry = () => {
    api
      .get(`${environment.API_BASE_URL}/admin/study_industries/dropdown`)
      .then((res) => {
        //console.log(res.data.data);
        setStudyInterstries(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStudySubIndustry = (id) => {
    api
      .get(
        `${environment.API_BASE_URL}/admin/study_sub_industries/dropdown/${id}`
      )
      .then((res) => {
        //console.log(res.data.data);
        setStudySubInterstries(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getStudyIndustry();
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();

    let validation = new Validator(formValues, {
      name: "required|max:150",
      industry_id: "required",
    });
    if (validation.fails()) {
      const fieldErrors = {};
      for (let key in validation.errors.errors) {
        fieldErrors[key] = validation.errors.errors[key][0];
      }
      setFormErrors(fieldErrors);
      return;
    }
    setFormErrors({});
    setIsLoading(true);

    if (!formValues.id) {
      api
        .post(`${environment.API_BASE_URL}/admin/study_areas`, formValues)
        .then((res) => {
          toast("Subject Area created Successfully");
          setParams(intialValues);
          fetchStudyArea(initialValues);
          setIsLoading(false);
          handleClose();
        })
        .catch((error) => {
          setIsLoading(false);
          const { errors } = error.response.data;
          const erroMsg = errors[Object.keys(errors)[0]] || error.message;
          toast.error(erroMsg);
        });
    } else {
      api
        .put(
          `${environment.API_BASE_URL}/admin/study_areas/${formValues.id}`,
          formValues
        )
        .then((res) => {
          toast("Subject Area Updated Successfully");
          setParams(intialValues);
          fetchStudyArea(initialValues);
          setIsLoading(false);
          handleClose();
        })
        .catch((error) => {
          setIsLoading(false);
          const { errors } = error.response.data;
          const erroMsg = errors[Object.keys(errors)[0]] || error.message;
          toast.error(erroMsg);
        });
    }
  };
  return (
    <div className="p-2 lg:p-4 mb-10">
      <div className="w-full flex flex-col lg:flex-row justify-between">
        <h1 className=" p-2 audio text-white relative text-[16px] lg:text-2xl">
          Subject Area Listing
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

          <CustomButton
            onClick={() => {
              handleClickOpen("create", true, "");
            }}
            variant="contained"
            size="large"
            borderRadius="8px"
            width="w-fit"
          >
            <p className="hidden md:block">+New New Subject Area</p>
            <p  className="block md:hidden">+Add New</p>
          </CustomButton>
        </div>
      </div>

      <hr className="mt-2" />

      {/*for Desktop */}

      {applyFilter ? (
        <>
          <div className="w-full mt-4 flex gap-4 justify-between">
            <div className="w-full flex  flex-col lg:flex-row gap-4">
              <div className="w-full lg:w-1/2">
                <InputAdornments
                  onEnter={onEnter}
                  handleChange={(e) => {
                    handleChange(e, "search");
                  }}
                  label="Search"
                  name="search_key"
                  value={params.search_key}
                  width="w-full"
                />
              </div>
            </div>

            <div className="hidden justify-center items-center  lg:flex gap-4">
              <CustomButton
                onClick={() => {
                  fetchStudyArea(params);
                }}
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

          {/* Mobile and Tab */}
          <div className="flex lg:hidden gap-4 justify-end mt-4">
            <CustomButton
              onClick={() => {
                fetchStudyArea(params);
              }}
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
        <p className="text-[10px] md:text-[12px] mb-2  mt-2 ml-2">
          showing{" "}
          <span className="font-[800]">
            {studyAreaList.length + (currentPage - 1) * 10}
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
          {studyAreaList.length > 0 ? (
            <BasicTable
              cols={cols}
              data={studyAreaList}
              handleDeleteOk={archiveStudyArea}
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
        <Accordion1
          data={studyAreaList}
          handleDeleteOk={archiveStudyArea}
          loading={loading}
          open={open}
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
          currentPage={currentPage}
        />
      </div>

      {loading ? (
        ""
      ) : (
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={total}
          pageSize={10}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      <CreateModal
        open={open.create}
        handleClose={handleClose}
        handleChange={handleChange}
        params={formValues}
        handleCreate={handleCreate}
        formErrors={formErrors}
        industries={industries}
        sub_industries={sub_industries}
      />
      <CreateModal
        open={open.edit}
        handleClose={handleClose}
        handleChange={handleChange}
        params={formValues}
        handleCreate={handleCreate}
        formErrors={formErrors}
        industries={industries}
        sub_industries={sub_industries}
      />
    </div>
  );
};

export default StudyAreaListing;
