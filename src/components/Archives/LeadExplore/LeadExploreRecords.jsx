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
import { environment } from "../../../environments/environment";
import { CountItems } from "../../../common/utils/helpers";

export const cols = [
  {
    title: "Lead ID",
  },
  {
    title: "Name",
  },
  {
    title: "Phone# Email ID",
  },
  {
    title: "Study Destination",
  },
  {
    title: "Lead Source",
  },
  {
    title: "Intake Year",
  },
  {
    title: "Assigned to",
  },
  {
    title: "Status",
  },
  {
    title: "Action",
  },
];

const status = [
  { id: "all", status: "all" },
  { id: "contacted", status: "contacted" },
  { id: "not_contacted", status: "not_contacted" },
];

const LeadExploreRecords = () => {
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
  const [users, setUsers] = useState([]);
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
  const initialInputs = {
    search: "",
    status: "",
    from: "",
    to: "",
    source: "",
    assigned_to: "",
    country_id: "",
    intake_year: "",
    intake_month: "",
  };
  const [inputs, setInputs] = useState(initialInputs);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [meta, metaData] = useState({
    current_page: "",
    total: "0",
    per_page: "0",
  });

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

  const restoreLead = () => {
    setApiLoading(true);
    let obj = {
      id: selectedItem.id,
    };
    api
      .post(`${BASE_URL}/admin/archives/explore/restore`, obj)
      .then((res) => {
        // console.log(res)
        setApiLoading(false);
        setShowRestoreModal(false);
        setSelectedItem("");
        toast.success(res.data.data.message);
        getExploreRecords(initialInputs, 1);
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err.response.data.errors.message);
        setApiLoading(false);
        setSelectedItem("");
        setShowDeleteModal(false);
      });
  };

  function handleRestoreCancel(e) {
    e.preventDefault();
    setSelectedItem("");
    setShowRestoreModal(false);
  }

  function deleteLead() {
    setApiLoading(true);
    let obj = {
      id: selectedItem.id,
    };
    api
      .post(`${BASE_URL}/admin/archives/explore/delete`, obj)
      .then((res) => {
        console.log(res);
        setApiLoading(false);
        setShowDeleteModal(false);
        setSelectedItem("");
        toast.success(res.data.data.message);
        getExploreRecords(initialInputs, 1);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        setApiLoading(false);
        setSelectedItem("");
        setShowDeleteModal(false);
      });
  }

  const getExploreRecords = (inputs, page) => {
    setLoading(true);
    setDetails([]);
    api
      .get(
        `${BASE_URL}/admin/archives/explore?page=${page}&search=${inputs.search}&status=${inputs.status}&from=${inputs.from}&to=${inputs.to}&assigned_to=${inputs.assigned_to}&source=${inputs.source}&country_id=${inputs.country_id}&intake_year=${inputs.intake_year}&intake_month=${inputs.intake_month}`
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

    getExploreRecords(payload, currentPage);
  }, [currentPage]);

  function filterSearch() {
    getExploreRecords(inputs, 1);
  }

  const onChange = (dates) => {
    const [start, end] = dates;
    const sDate = new Date(start);
    const eDate = end ? new Date(end) : null;
    setInputs({ ...inputs, from: sDate, to: eDate });
  };

  const onFilter = (e) => {
    let { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };


  const onEnter = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    filterSearch()
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

  useEffect(() => {
    getUsers();
    fetchDropdowns();
  }, []);

  const reset = () => {
    setCurrentPage(1);
    setInputs(initialInputs);
    getExploreRecords(initialInputs, 1);
  };

  return (
    <>
      <div className="p-2 lg:p-4 mb-10">
        <div className="flex  justify-between items-center">
          <div className="w-full">
            <h1 className=" audio text-white text-base md:text-2xl">
              Leads - Explore
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
                  startDate={inputs.from}
                  endDate={inputs.to}
                  onChange={onChange}
                  id="10"
                />
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
                      name: "NOT_ASSIGNED",
                    },
                  ]}
                  handleChange={onFilter}
                  value={inputs.status}
                  label="Status"
                  name="status"
                  bgcolor="#151929"
                  fontSize={"12px"}
                />
                <SelectInput
                  options={users}
                  handleChange={onFilter}
                  value={inputs.assigned_to}
                  label="Assigned to"
                  name="assigned_to"
                  bgcolor="#151929"
                  fontSize={"12px"}
                />
                <SelectInput
                  options={["website", "reference", "social", "others"]}
                  handleChange={onFilter}
                  value={inputs.source}
                  label="Lead Source"
                  name="source"
                  bgcolor="#151929"
                  fontSize={"12px"}
                />
              </div>

              <div className="hidden justify-center items-center flex-row  lg:flex gap-4">
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

            <div className="flex w-full lg:w-[80%] mt-4 flex-col lg:flex-row gap-4 ">
              <SelectInput
                options={dropdowns.study_destination}
                handleChange={onFilter}
                value={inputs.country_id}
                label="Study Destination"
                name="country_id"
                bgcolor="#151929"
                fontSize={"12px"}
              />
              <SelectInput
                options={dropdowns.intake_year}
                handleChange={onFilter}
                value={inputs.intake_year}
                label="Intake Year"
                name="intake_year"
                bgcolor="#151929"
                fontSize={"12px"}
              />
              <SelectInput
                options={dropdowns.intake_month}
                handleChange={onFilter}
                value={inputs.intake_month}
                label="Intake Month"
                name="intake_month"
                bgcolor="#151929"
                fontSize={"12px"}
              />
              <InputAdornments
                  onEnter={onEnter}
                handleChange={onFilter}
                label="Search"
                name="search"
                value={inputs.search}
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

              <div className="cursor-pointer w-10" onClick={reset}>
                <img onClick={() => reset()} src={Reset} alt="" />
              </div>
            </div>
            <hr className=" mt-4" />
          </>
        ) : (
          ""
        )}

        <div className="pt-2 text-xs md:text-sm text-white text-left">
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

      {showRestoreModal && (
        <DeleteModal
          open={showRestoreModal}
          handleClose={handleRestoreCancel}
          type="delete"
          handleActionButton={restoreLead}
          loading={apiLoading}
          title="Do you need to Restore this lead?"
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          open={showDeleteModal}
          handleClose={handleDeleteCancel}
          type="delete"
          handleActionButton={deleteLead}
          loading={apiLoading}
          title="Do you need to Delete this lead Permanently?"
        />
      )}
    </>
  );
};
export default LeadExploreRecords;
