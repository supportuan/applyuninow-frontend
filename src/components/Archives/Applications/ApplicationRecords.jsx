import { useState, useEffect, useContext, useMemo } from "react";
import api from "../../../api/index";
import { AppContext } from "../../../context/Appcontext";
import "react-datepicker/dist/react-datepicker.css";
import { country } from "../../../country";
import { toast } from "react-toastify";
import { Pagination } from "../../Shared/Pagination/Pagination.jsx";
import moment from "moment";
import Filter from "../../../assets/leads/Filter.svg";
import BasicTable from "./Table";
import CustomButton from "../../../common/CustomButton";
import { SelectInput } from "../../../common/Select";
import { InputAdornments } from "../../../common/SearchText";
import Accordion from "./Accordion";
import { DateRangePicker } from "../../../common/DateRangePicker";
import Reset from "../../../assets/user/Reset.svg";
import DeleteModal from "../../../common/DeleteModal";
import { CountItems } from "../../../common/utils/helpers";

export const cols = [
  {
    title: "Student ID",
  },
  {
    title: "Application Date",
  },
  {
    title: "Student Name & Ph Number",
  },
  {
    title: "POC",
  },
  {
    title: "Study Destination",
  },
  {
    title: "Stage",
  },
  {
    title: "Application Status",
  },
  {
    title: "Action",
  },
];

const statusList = [
  { name: "IN_PROGRESS" },
  { name: "ENROLLED" },
  { name: "DEFER" },
  { name: "HOLD" },
];

const stages = [
  { name: "Gathering Checklist" },
  { name: "Financial Evidence" },
  { name: "Pre-CAS Process" },
  { name: "Pre Requisite" },
  { name: "After I-20" },
  { name: "Pre-Departure" },
  { name: "Visa Application" },
];

const ApplicationRecords = () => {
  const { BASE_URL } = useContext(AppContext);
  const [details, setDetails] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [apiLoading, setApiLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState(null);
  const [rolelist, setRoleList] = useState([]);
  const [applyFilter, setApplyFilter] = useState(false);
  const initialValues = {
    created_from: "",
    created_to: "",
    stage: "",
    search_key: "",
    country_id: "",
    contact_id: "",
    status: "",
  };
  const [inputs, setInputs] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [poc, setPoc] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countries, setCountries] = useState();
  const [meta, metaData] = useState({
    current_page: "",
    total: "0",
    per_page: "0",
  });

  const getPocUsers = () => {
    api
      .get(`${BASE_URL}/admin/users/dropdown`)
      .then((res) => {
        setPoc(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchDropdowns = () => {
    api
      .get(`${BASE_URL}/prerequisite`)
      .then((res) => {
        setLoading(false);
        // console.log(res.data.data.study_destination);
        setCountries(res.data.data.study_destination);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getPocUsers();
    fetchDropdowns();
  }, []);

  function handleDelete(e, item) {
    setSelectedItem(item);
    setShowDeleteModal(true);
  }

  function handleDeleteCancel(e) {
    e.preventDefault();
    setSelectedItem("");
    setShowDeleteModal(false);
  }

  function handleRestore(e, item) {
    setSelectedItem(item);
    setShowRestoreModal(true);
  }

  function handleRestoreCancel(e) {
    e.preventDefault();
    // setSelectedItem('')
    setShowRestoreModal(false);
  }

  const getApplications = (inputs, page) => {
    setLoading(true);
    setDetails([]);
    api
      .get(
        `${BASE_URL}/admin/archives/applications?page=${page}&search_key=${inputs.search_key}&status=${inputs.status}&from=${inputs.created_from}&to=${inputs.created_to}&country_id=${inputs.country_id}&stage=${inputs.stage}&contact_id=${inputs.contact_id}`
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
        metaData(res.data.data.meta);
        setDetails(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useMemo(() => {
    let payload = inputs;
    getApplications(payload, currentPage);
  }, [currentPage]);

  function reset() {
    setStartDate(null);
    setEndDate(null);
    setInputs(initialValues);
    getApplications(initialValues, 1);
  }

  function filterSearch() {
    getApplications(inputs, 1);
  }

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    const sDate = moment(start).format("YYYY-MM-DD");
    const eDate = moment(end).format("YYYY-MM-DD");
    setInputs({ ...inputs, created_from: sDate, created_to: eDate });
  };

  const onFilter = (e) => {
    let { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onEnter = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    filterSearch()
  };


  const restoreApplication = () => {
    setApiLoading(true);
    let obj = {
      id: selectedItem.id,
    };
    api
      .post(`${BASE_URL}/admin/archives/applications/restore`, obj)
      .then((res) => {
        // console.log(res)
        setApiLoading(false);
        setShowRestoreModal(false);
        setSelectedItem("");
        toast.success(res.data.data.message);
        getApplications(initialValues, 1);
      })
      .catch((err) => {
        console.log(err.response.data.errors.message);
        toast.error(err.response.data.errors.message);
        setApiLoading(false);
        setSelectedItem("");
        setShowDeleteModal(false);
      });
  };

  const deleteApplication = () => {
    setApiLoading(true);
    let obj = {
      id: selectedItem.id,
    };
    api
      .post(`${BASE_URL}/admin/archives/applications/delete`, obj)
      .then((res) => {
        console.log(res);
        setApiLoading(false);
        setShowDeleteModal(false);
        setSelectedItem("");
        toast.success(res.data.data.message);
        getApplications(initialValues, 1);
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
              Application
            </h1>
          </div>

          <div className="w-full flex gap-4 justify-end">
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
              <p className="gradient-text text-xs sm:text-sm">Filter</p>
            </CustomButton>
          </div>
        </div>

        <hr className="mt-3 border-t-line border-t" />

        {applyFilter ? (
          <>
            <div className="w-full mt-4 flex gap-4">
              <div className="w-full flex  flex-col lg:flex-row gap-4">
                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  onChange={onChange}
                  id="16"
                />
                <SelectInput
                  options={stages}
                  handleChange={onFilter}
                  value={inputs.stage}
                  label="Stage"
                  name="stage"
                  bgcolor="#151929"
                  fontSize={"12px"}
                />
                <SelectInput
                  options={countries}
                  handleChange={onFilter}
                  value={inputs.country_id}
                  label="Country"
                  name="country_id"
                  bgcolor="#151929"
                  fontSize={"12px"}
                />
                <SelectInput
                  options={statusList}
                  handleChange={onFilter}
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
                  disabled={CountItems(inputs) === 0}
                >
                  <p className="">Apply</p>
                </CustomButton>

                <div className="cursor-pointer w-10" onClick={reset}>
                  <img src={Reset} alt="" />
                </div>
              </div>
            </div>

            <div className="flex w-full lg:w-[40%] mt-4 flex-col lg:flex-row gap-4 ">
              <SelectInput
                options={poc}
                handleChange={onFilter}
                value={inputs.contact_id}
                label="POC"
                name="contact_id"
                bgcolor="#151929"
                fontSize={"12px"}
              />
              <InputAdornments
                  onEnter={onEnter}
                handleChange={onFilter}
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

              <div className="cursor-pointer w-10" onClick={reset}>
                <img src={Reset} alt="" />
              </div>
            </div>
            <hr className=" mt-4" />
          </>
        ) : (
          ""
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
                  <>{details.length + (currentPage - 1) * 10}</>
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
            {details.length > 0 ? (
              <BasicTable
                cols={cols}
                data={details}
                handleDelete={handleDelete}
                handleRestore={handleRestore}
                showRestoreModal={showRestoreModal}
                apiLoading={apiLoading}
                handleRestoreCancel={handleRestoreCancel}
                showDeleteModal={showDeleteModal}
                handleDeleteCancel={handleDeleteCancel}
                loading={loading}
              />
            ) : (
              <p className="text-center audio text-3xl">No data Found!!!</p>
            )}
          </div>
        )}

        {/* Tablet and Mobile View */}
        <div className="block lg:hidden ">
          <Accordion
            data={details}
            handleDelete={handleDelete}
            handleRestore={handleRestore}
            showRestoreModal={showRestoreModal}
            apiLoading={apiLoading}
            handleRestoreCancel={handleRestoreCancel}
            showDeleteModal={showDeleteModal}
            handleDeleteCancel={handleDeleteCancel}
            loading={loading}
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
        handleActionButton={restoreApplication}
        loading={apiLoading}
        title="Do you need to Restore this Application?"
      />

      <DeleteModal
        open={showDeleteModal}
        handleClose={handleDeleteCancel}
        type="delete"
        handleActionButton={deleteApplication}
        loading={apiLoading}
        title="Do you need to Delete this User Application Permanently?"
      />
    </>
  );
};
export default ApplicationRecords;
