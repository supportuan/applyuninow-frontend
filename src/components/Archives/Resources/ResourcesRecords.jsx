import { useState, useEffect, useContext, useMemo } from "react";
import api from "../../../api/index";
import { AppContext } from "../../../context/Appcontext";
import { country } from "../../../country";
import { toast } from "react-toastify";
import { Pagination } from "../../Shared/Pagination/Pagination.jsx";
import BasicTable from "./Table";
import CustomButton from "../../../common/CustomButton";
import { InputAdornments } from "../../../common/SearchText";
import Reset from "../../../assets/user/Reset.svg";
import Filter from "../../../assets/leads/Filter.svg";
import SmallScreenTable from "./SmallScreenTable";
import DeleteModal from "../../../common/DeleteModal";
import { CountItems } from "../../../common/utils/helpers";

const cols = [
  {
    title: "Sl no",
  },
  {
    title: "File Name",
  },
  {
    title: "Action",
  },
];

const ResourcesRecords = () => {
  const { BASE_URL } = useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false);
  const [details, setDetails] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [apiLoading, setApiLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const initialValues = {
    search_key: "",
  };
  const [inputs, setInputs] = useState(initialValues);
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
    setSelectedItem(item);
    setShowRestoreModal(true);
  }

  function handleRestoreCancel(e) {
    e.preventDefault();
    setSelectedItem("");
    setShowRestoreModal(false);
  }

  const handleFilter = () => {
    setShowFilter(!showFilter);
  };

  const getResources = (inputs, page) => {
    setLoading(true);
    setDetails([]);
    api
      .get(
        `${BASE_URL}/admin/archives/resources?page=${page}&search_key=${inputs.search_key}`
      )
      .then((res) => {
        setLoading(false);
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

    getResources(payload, currentPage);
  }, [currentPage]);

  function reset() {
    setInputs(initialValues);
    getResources(initialValues, 1);
  }

  function filterSearch() {
    getResources(inputs, 1);
  }

  const onFilter = (e) => {
    let { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onEnter = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    filterSearch()
  };


  const restoreResources = () => {
    setApiLoading(true);
    let obj = {
      id: selectedItem.id,
    };
    api
      .post(`${BASE_URL}/admin/archives/resources/restore`, obj)
      .then((res) => {
        // console.log(res)
        setApiLoading(false);
        setShowRestoreModal(false);
        setSelectedItem("");
        toast.success(res.data.data.message);
        getResources(initialValues, 1);
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err.response.data.errors.message);
        setApiLoading(false);
        setSelectedItem("");
        setShowDeleteModal(false);
      });
  };

  const deleteResources = () => {
    setApiLoading(true);
    let obj = {
      id: selectedItem.id,
    };
    api
      .post(`${BASE_URL}/admin/archives/resources/delete`, obj)
      .then((res) => {
        console.log(res);
        setApiLoading(false);
        setShowDeleteModal(false);
        setSelectedItem("");
        toast.success(res.data.data.message);
        getResources(initialValues, 1);
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
      <div className="flex  justify-between items-center">
          <div className="w-full">
          <h1 className=" audio text-white text-base md:text-2xl">
              Resource
            </h1>
          </div>

          <div className="w-full flex gap-4 justify-end">
            <CustomButton
              onClick={handleFilter}
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

        <hr className="mt-2 border-t-line border-t" />

        {/* Filtering Desktop view */}

        {showFilter && (
          <>
            <div className="my-5 w-full mt-4 flex flex-col lg:flex-row gap-4">
              <div className="w-full flex flex-col lg:flex-row gap-4 items-center">
                <div className="w-full lg:w-[30%]">
                  <InputAdornments
                  onEnter={onEnter}
                    handleChange={onFilter}
                    label="Search"
                    name="search_key"
                    value={inputs.search_key}
                    width="w-full"
                  />
                </div>
              </div>

              <div className="flex flex-row gap-3 items-center justify-end">
                <CustomButton
                  onClick={() => filterSearch()}
                  width="w-fit"
                  variant="contained"
                  size="large"
                  borderRadius="8px"
                  disabled={CountItems(inputs) === 0}
                >
                  <p className="text-sm">Apply</p>
                </CustomButton>

                <div className="cursor-pointer w-10" onClick={reset}>
                  <img src={Reset} alt="" />
                </div>
              </div>
            </div>

            <hr className=" border-t-line border-t" />
          </>
        )}

        <div className="pt-2 text-sm text-white text-left">
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
          <>
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
          </>
        )}

        {/* Tablet and Mobile View */}
        <div className="block lg:hidden">
          <SmallScreenTable
            data={details}
            handleRestore={handleRestore}
            handleDelete={handleDelete}
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
        handleActionButton={restoreResources}
        loading={apiLoading}
        title="Do you need to Restore this Application?"
      />

      <DeleteModal
        open={showDeleteModal}
        handleClose={handleDeleteCancel}
        type="delete"
        handleActionButton={deleteResources}
        loading={apiLoading}
        title="Do you need to Delete this User Application Permanently?"
      />
    </>
  );
};
export default ResourcesRecords;
