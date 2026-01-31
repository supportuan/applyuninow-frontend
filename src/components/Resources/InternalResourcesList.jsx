import { useState, useContext, useMemo } from "react";
import api from "../../api/index";
import { AppContext } from "../../context/Appcontext";
import "react-datepicker/dist/react-datepicker.css";
import { Pagination } from "../Shared/Pagination/Pagination.jsx";

import Tooltip from "@mui/material/Tooltip";
import edit from "../../assets/resources/edit.svg";
import folder from "../../assets/resources/folder.svg";
import { Link } from "react-router-dom";
import { InputAdornments } from "../../common/SearchText";
import CustomButton from "../../common/CustomButton";
import Filter from "../../assets/leads/Filter.svg";
import Refresh from "../../assets/leads/Refresh.svg";
import download1 from "../../assets/resources/download1.svg";
import CreateModal from "./CreateModal";
import Validator from "validatorjs";
import { toast } from "react-toastify";
import DeleteModal from "../../common/DeleteModal";
import BasicTable from "./InternalTable";
import MobileList from "./MobileList";

const fields = {
  name: "",
  folder_image: "",
  image: "",
};
const InternalResourcesList = () => {
  const { BASE_URL } = useContext(AppContext);
  const [resourcesList, setResourcesList] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [inputs, setInputs] = useState({
    search_key: "",
    page: 1,
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [applyFilter, setApplyFilter] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [params, setParams] = useState(fields);
  const [formErrors, setFormErrors] = useState(fields);
  const [imageFileEvent, setImageFileEvent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [meta, metaData] = useState({
    current_page: "",
    total: "0",
    per_page: "0",
  });
  const getResourcesList = (inputs) => {
    setLoading(true);
    api
      .get(
        `${BASE_URL}/admin/resources?type=1&page=${inputs.page}&search_key=${inputs.search_key}`
      )
      .then((res) => {
        setLoading(false);
        setResourcesList(res.data.data.data);
        metaData(res.data.data.meta);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useMemo(() => {
    let payload = inputs;
    payload.page = currentPage;
    getResourcesList(payload);
  }, [currentPage]);

  const handleSearch = (e) => {
    const key = e.target.value;
    if (key.length === 0) setInputs({ ...inputs, search_key: "" });
    else setInputs({ ...inputs, search_key: key });
  };


  const onEnter = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    filterSearch()
  };


  function reset() {
    setInputs((inputs) => ({
      ...inputs,
      search_key: "",
      page: 1,
    }));
    let query = { ...inputs };
    query.search_key = "";
    query.page = 1;
    setCurrentPage(1);
    getResourcesList(query);
  }

  function filterSearch() {
    setCurrentPage(1);
    getResourcesList(inputs);
  }

  const handleDeleteOk = () => {
    setIsLoading(true);
    api
      .delete(`${BASE_URL}/admin/resources/` + selectedId, {})
      .then((response) => {
        let resources = [...resourcesList];
        let index = resources.findIndex((x) => x.id === selectedId);
        if (index != -1) {
          resources.splice(index, 1);
        }
        setResourcesList(resources);
        getResourcesList(inputs);
        toast.success("Resource Deleted Successfully!");
        setOpenDelete(false);
        setIsLoading(false);
        setParams(params);
        setSelectedId("");
      })
      .catch((error) => {
        setIsLoading(false);
        const { errors, message } = error.response.data;
        const erroMsg = errors[Object.keys(errors)[0]] || message;
        toast.error(erroMsg);
      });
  };
  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
    setParams(fields);
    setSelectedId("");
  };
  // display image
  const handleImage = (data) => {
    setParams({ ...params, folder_image: data.url });
    setImageFileEvent(data.file);
  };
  const deleteFile = () => {
    setImageFileEvent("");
    setParams({ ...params, folder_image: "" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = new Validator(params, {
      name: "string|required|max:50",
    });

    if (validation.fails()) {
      const fieldErrors = {};
      Object.keys(validation.errors.errors).forEach((key) => {
        fieldErrors[key] = validation.errors.errors[key][0];
      });
      setFormErrors(fieldErrors);
      return false;
    }
    const formData = new FormData();
    formData.append("name", params.name);
    if (!imageFileEvent) {
      formData.append("image", params.folder_image);
    } else {
      formData.append("file", imageFileEvent);
    }

    setIsLoading(true);
    if (selectedId) {
      formData.append("user_type", 1);
      api
        .put(`${BASE_URL}/admin/resources/` + selectedId, formData)
        .then((response) => {
          let resources = [...resourcesList];
          let index = resources.findIndex((x) => x.id === selectedId);
          if (index != -1) {
            resources.splice(index, 1);
          }
          resources.unshift(response.data.data);
          setResourcesList(resources);
          getResourcesList(inputs);
          toast.success("Resource Updated Successfully!");
          setOpen(false);
          setIsLoading(false);
          setParams(fields);
          setImageFileEvent("");
          setSelectedId("");
        })
        .catch((error) => {
          setIsLoading(false);
          const { errors, message } = error.response.data;
          const erroMsg = errors[Object.keys(errors)[0]] || message;
          toast.error(erroMsg);
        });
    } else {
      api
        .post(`${BASE_URL}/admin/resources?type=1`, formData)
        .then((response) => {
          let resources = [...resourcesList];
          resources.unshift(response.data.data);
          setResourcesList(resources);
          getResourcesList(inputs);
          setImageFileEvent("");
          toast.success("Resource Added Successfully!");
          setOpen(false);
          setIsLoading(false);
          setParams(fields);
          setSelectedId("");
        })
        .catch((error) => {
          setIsLoading(false);
          const { errors, message } = error.response.data;
          const erroMsg = errors[Object.keys(errors)[0]] || message;
          toast.error(erroMsg);
        });
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams({ ...params, [name]: value });
    setFormErrors(fields);
  };

  const handleEdit = (edit) => {
    setSelectedId(edit.id);
    setParams({ ...params, ...edit });
    setOpen(true);
  };

  const handleDelete = (edit) => {
    setSelectedId(edit.id);
    setOpenDelete(true);
  };
  return (
    <>
      <div className="p-2 lg:p-4 mb-10">
        <div className="lg:flex lg:justify-between">
          <h1 className=" audio text-white relative text-base md:text-2xl">
            Internal Resources
          </h1>
          <div className="hidden lg:flex justify-end gap-4">
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
                setOpen(!open);
              }}
              variant="contained"
              size="large"
              borderRadius="8px"
              width="w-fit"
            >
              <p className="">+New Folder</p>
            </CustomButton>
          </div>
        </div>

        {/*Mobile and tab view*/}
        <div className="flex lg:hidden mt-6  justify-end gap-2">
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
              setOpen(!open);
            }}
            variant="contained"
            size="large"
            borderRadius="8px"
            width="w-fit"
          >
            <p className="">+New Folder</p>
          </CustomButton>
        </div>

        {applyFilter ? <hr className="block lg:hidden mt-2" /> : ""}

        {/* Filtering  view */}

        {applyFilter ? (
          <div className="mt-6 flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-96">
              <InputAdornments
                  onEnter={onEnter}
                handleChange={handleSearch}
                label="Search"
                name="searchText"
                value={inputs.search_key}
                width="w-full"
              />
            </div>

            <div className="mt-6 lg:mt-0 flex gap-4 justify-end">
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
        ) : (
          ""
        )}

        <div className="border-b mt-2 border-border"></div>
        {loading ? (
          ""
        ) : (
          <p className="md:text-[12px] text-[10px]   mt-2 ml-2">
            Showing{" "}
            <span className="font-[800]">
              {resourcesList.length + (currentPage - 1) * 10}
            </span>{" "}
            out of <span className="font-[800]">{meta.total}</span> results
          </p>
        )}

        {loading ? (
          <div className="flex justify-center mt-3">
            <p className="text-center audio text-3xl">Loading....</p>
          </div>
        ) : (
          <>
            <div className="hidden lg:block">
              {resourcesList.length > 0 ? (
                <div className="mt-3">
                  <BasicTable
                    data={resourcesList}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                </div>
              ) : (
                <div className="flex justify-center mt-56">
                  <p>Not Found!!!!</p>
                </div>
              )}
            </div>

            <div className="lg:hidden block">
              {resourcesList.length > 0 ? (
                <div className="mt-3">
                  <MobileList
                    data={resourcesList}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                </div>
              ) : (
                <div className="flex justify-center mt-56">
                  <p>Not Found!!!!</p>
                </div>
              )}
            </div>
          </>
        )}

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

        <CreateModal
          open={open}
          selectedId={selectedId}
          handleClose={handleClose}
          params={params}
          formErrors={formErrors}
          handleChange={handleChange}
          handleImage={handleImage}
          handleSubmit={handleSubmit}
          deleteFile={deleteFile}
          isLoading={isLoading}
        />

        {openDelete ? (
          <DeleteModal
            open={openDelete}
            handleClose={handleClose}
            type="archeive"
            title=" Are you sure you want to delete the folder?"
            loading={isLoading}
            handleActionButton={handleDeleteOk}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default InternalResourcesList;
