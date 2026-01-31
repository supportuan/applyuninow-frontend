import React from "react";
import { useState } from "react";
import BasicTable from "./Table";
import "react-datepicker/dist/react-datepicker.css";
import { initialParams, initialValues } from "./helpers";
import { cols } from "./helpers";
import api from "../../../api";
import { environment } from "../../../environments/environment";

import Pagination from "../../Shared/Pagination/Pagination";
import { useMemo } from "react";
import Accordion from "./Accordion";
import { toast } from "react-toastify";
import CustomButton from "../../../common/CustomButton";
import Filter from "../../../assets/leads/Filter.svg";
import { InputAdornments } from "../../../common/SearchText";

import Refresh from "../../../assets/leads/Refresh.svg";
import CreateModal from "./CreateModal";
import Validator from "validatorjs";

const IndustryList = () => {
  const [params, setParams] = useState(initialValues);
  const [loading, setLoading] = useState(false);
 
  const [studyIndustry, setStudyIndustry] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [industryId, setindustryId] = useState();
  const [applyFilter, setApplyFilter] = useState(false);
  const [open, setOpen] = React.useState({
    archeiveLargeScreen: false,
    archeiveMediumScreen: false,
    create: false,
    edit: false,
  });
  const [formValues, setFormValues] = useState(initialParams);
  const [formErrors, setFormErrors] = useState(initialParams);
  const handleChange = (e, type) => {
    if (type === "search") {
      setParams({ ...params, [e.target.name]: e.target.value });
    }

    if (type === "form") {
      setFormValues({ ...formValues, [e.target.name]: e.target.value });
      setFormErrors(initialParams);
    }
  };

  const onEnter = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
    setCurrentPage(1)
    fetchstudyIndustry(params);
  };

  const reset = () => {
    setParams(initialValues);
    fetchstudyIndustry(initialValues);
  };

  const fetchstudyIndustry = (params) => {
    setLoading(true);
    setStudyIndustry([]);
    setTotal(0)
    api
      .get(
        `${environment.API_BASE_URL}/admin/study_industries?page=${currentPage}&search_key=${params.search_key}`
      )
      .then((res) => {
        setLoading(false);

        setTotal(res?.data?.data?.meta?.total);
        setStudyIndustry(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useMemo(() => {
    fetchstudyIndustry(params);
  }, [currentPage]);

  const archiveIndustry = () => {
    setLoading(true);
    api
      .delete(
        `${environment.API_BASE_URL}/admin/study_industries/${industryId}`
      )
      .then((res) => {
        fetchstudyIndustry(initialValues);
        toast.success("Sudy Industry Archived Successfully");
        fetchstudyIndustry(initialValues);
        setLoading(false);
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

  const handleCreate = () => {
    let validation = new Validator(formValues, {
      name: "required|max:30",
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
    setLoading(true);
  

    if (!formValues.id) {
      api
        .post(`${environment.API_BASE_URL}/admin/study_industries`, {
          name: formValues.name,
        })
        .then((res) => {
          setLoading(false);
          toast.success(`Study Industry Added Successfully`);
          fetchstudyIndustry(initialValues);
          setFormValues(initialParams);
          handleClose();
        })
        .catch((error) => {
          setLoading(false);
          const { errors } = error.response.data;
          const erroMsg = errors[Object.keys(errors)[0]] || error.message;
          toast.error(erroMsg);
        });
    } else {
      api
        .put(
          `${environment.API_BASE_URL}/admin/study_industries/${formValues.id}`,
          {
            name: formValues.name,
          }
        )
        .then((res) => {
          setLoading(false);
          toast.success(`Study Industry Updated Successfully`);
          fetchstudyIndustry(initialValues);
          setFormValues(initialParams);
          handleClose();
        })
        .catch((error) => {
          setLoading(false);
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
          Study Industry Listing
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
            <p className="hidden md:block">+New Study Industry</p>
            <p  className="block md:hidden">+Add New</p>
          </CustomButton>
        </div>
      </div>

      <hr className="mt-1" />

      {/*for Desktop */}

      {applyFilter ? (
        <>
          <div className="w-full mt-4 flex gap-4">
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
                  setCurrentPage(1);
                  fetchstudyIndustry(params);
                }}
                variant="contained"
                size="large"
                borderRadius="8px"
                width="w-fit"
                disabled={params.search_key.length > 0 ? false : true}
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
                fetchstudyIndustry(params);
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
            {studyIndustry.length + (currentPage - 1) * 10}
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
          {studyIndustry.length > 0 ? (
            <BasicTable
              cols={cols}
              data={studyIndustry}
              handleDeleteOk={archiveIndustry}
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
          data={studyIndustry}
          handleDeleteOk={archiveIndustry}
          loading={loading}
          open={open}
          handleClose={handleClose}
          currentPage={currentPage}
          handleClickOpen={handleClickOpen}
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
        isLoading={loading}
      />

      <CreateModal
        open={open.edit}
        handleClose={handleClose}
        handleChange={handleChange}
        params={formValues}
        handleCreate={handleCreate}
        formErrors={formErrors}
        isLoading={loading}
      />
    </div>
  );
};

export default IndustryList;
