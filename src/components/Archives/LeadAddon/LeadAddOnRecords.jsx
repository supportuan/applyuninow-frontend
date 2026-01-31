import { useState, useEffect, useContext, useMemo } from "react";
import api from "../../../api/index";
import { AppContext } from "../../../context/Appcontext";
import { country } from "../../../country";
import { toast } from "react-toastify";
import { Pagination } from "../../Shared/Pagination/Pagination.jsx";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import CustomButton from "../../../common/CustomButton";
import Reset from "../../../assets/user/Reset.svg";
import Filter from "../../../assets/leads/Filter.svg";
import { DateRangePicker } from "../../../common/DateRangePicker";
import { SelectInput } from "../../../common/Select";
import { InputAdornments } from "../../../common/SearchText";
import BasicTable from "./Table";
import Accordion from "./Accordion";
import DeleteModal from "../../../common/DeleteModal";
import { CountItems } from "../../../common/utils/helpers";

export const cols = [
  {
    title: "Date",
  },
  {
    title: "First Name Last Name",
  },
  {
    title: "Phone# Email ID",
  },
  {
    title: "Add Ons",
  },
  {
    title: "Educational Status",
  },
  {
    title: "Country",
  },
  {
    title: "Status",
  },
  {
    title: "Action",
  },
];

export const servicesList = [
  {
    name: "Pre-Departure",
    checked: false,
  },
  {
    name: "Forex Exchange",
    checked: false,
  },
  {
    name: "Destination – Arrival pickup",
    checked: false,
  },
  {
    name: "On- Arrival registrations",
    checked: false,
  },
  {
    name: "Internship (in-line to Subject area)",
    checked: false,
  },
  {
    name: "Accommodation",
    checked: false,
  },
  {
    name: "Part-time jobs (in-line to academics / work experience)",
    checked: false,
  },
  {
    name: "Resume / CV marketing for Professional jobs",
    checked: false,
  },
];

const status = [
  { id: "all", status: "all" },
  { id: "contacted", status: "contacted" },
  { id: "not_contacted", status: "not_contacted" },
];

const LeadAddOnRecords = () => {
  const { BASE_URL } = useContext(AppContext);
  const [details, setDetails] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [apiLoading, setApiLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState(null);
  const [rolelist, setRoleList] = useState([]);
  const [applyFilter, setApplyFilter] = useState(false);
  const initialInputs = {
    search_key: "",
    status: "",
    created_from: "",
    created_to: "",
    country_id: "",
    service: "",
  };
  const [inputs, setInputs] = useState(initialInputs);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const [meta, metaData] = useState({
    current_page: "",
    total: "0",
    per_page: "0",
  });

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

  const restoreLead = () => {
    setApiLoading(true);
    let obj = {
      id: selectedItem.id,
    };
    api
      .post(`${BASE_URL}/admin/archives/add-on/restore`, obj)
      .then((res) => {
        // console.log(res)
        setApiLoading(false);
        setShowRestoreModal(false);
        setSelectedItem("");
        toast.success(res.data.data.message);
        getAddOnRecords(initialInputs, 1);
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err.response.data.errors.message);
        setApiLoading(false);
        setSelectedItem("");
        setShowDeleteModal(false);
      });
  };

  function deleteLead() {
    setApiLoading(true);
    let obj = {
      id: selectedItem.id,
    };
    api
      .post(`${BASE_URL}/admin/archives/add-on/delete`, obj)
      .then((res) => {
        console.log(res);
        setApiLoading(false);
        setShowDeleteModal(false);
        setSelectedItem("");
        toast.success(res.data.data.message);
        getAddOnRecords(initialInputs, 1);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        setApiLoading(false);
        setSelectedItem("");
        setShowDeleteModal(false);
      });
  }

  const getAddOnRecords = (inputs, page) => {
    setLoading(true);
    setDetails([]);
    api
      .get(
        `${BASE_URL}/admin/archives/add-on?page=${page}&search_key=${inputs.search_key}&status=${inputs.status}&created_from=${inputs.created_from}&created_to=${inputs.created_to}&country_id=${inputs.country_id}&service=${inputs.service}`
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
    getAddOnRecords(payload, currentPage);
  }, [currentPage]);

  useEffect(() => {
    fetchDropdowns();
  }, []);

  function reset() {
    setInputs(initialInputs);
    setStartDate(null);
    setEndDate(null);
    getAddOnRecords(initialInputs, 1);
  }

  function filterSearch() {
    getAddOnRecords(inputs, 1);
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


  return (
    <>
      <div className="p-2 lg:p-4 mb-10">
        <div className="flex justify-between items-center">
          <div className="w-full">
            <h1 className=" audio text-white text-base md:text-2xl">
              Leads - Add ons
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
              <div className="w-full flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-fit">
                  <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    onChange={onChange}
                    id="11"
                  />
                </div>
                <div className="w-full lg:w-[15%]">
                  <SelectInput
                    options={[
                      { name: "NOT_CONTACTED" },
                      { name: "CONTACTED" },
                      { name: "CALL_BACK" },
                      { name: "IN_PROGRESS" },
                      { name: "COMPLETED" },
                    ]}
                    handleChange={onFilter}
                    value={inputs.status}
                    label="Status"
                    name="status"
                    bgcolor="#151929"
                    fontSize={"12px"}
                  />
                </div>
                <div className="w-full lg:w-[15%]">
                  <SelectInput
                    options={servicesList}
                    handleChange={onFilter}
                    value={inputs.service}
                    label="Add-on"
                    name="service"
                    bgcolor="#151929"
                    fontSize={"12px"}
                  />
                </div>
                <div className="w-full lg:w-[15%]">
                  <SelectInput
                    options={countries}
                    handleChange={onFilter}
                    value={inputs.country_id}
                    label="Country"
                    name="country_id"
                    bgcolor="#151929"
                    fontSize={"12px"}
                  />
                </div>
                <div className="w-full lg:w-[15%]">
                  <InputAdornments
                  onEnter={onEnter}
                    handleChange={onFilter}
                    label="Search"
                    name="search_key"
                    value={inputs.search_key}
                    width="w-full"
                  />
                </div>
                <div className="flex lg:items-center justify-end gap-4">
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
        handleActionButton={restoreLead}
        loading={apiLoading}
        title="Do you need to Restore this Add On?"
      />

      <DeleteModal
        open={showDeleteModal}
        handleClose={handleDeleteCancel}
        type="delete"
        handleActionButton={deleteLead}
        loading={apiLoading}
        title="Do you need to Delete this Add On Permanently?"
      />
    </>
  );
};
export default LeadAddOnRecords;
