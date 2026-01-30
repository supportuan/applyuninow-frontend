import { useState, useContext, useMemo } from "react";
import api from "../../api/index";
import { AppContext } from "../../context/Appcontext";
import "react-datepicker/dist/react-datepicker.css";
import { Pagination } from "../Shared/Pagination/Pagination.jsx";
import Tooltip from "@mui/material/Tooltip";
import pdf from "../../assets/resources/pdf.svg";

import { UploadStatusModal } from "./Modal";
import { ModalForm } from "./Modal";

import edit from "../../assets/resources/edit.svg";
import { Link, useParams } from "react-router-dom";
import { InputAdornments } from "../../common/SearchText";
import CustomButton from "../../common/CustomButton";
import Filter from "../../assets/leads/Filter.svg";
import Refresh from "../../assets/leads/Refresh.svg";
import download1 from "../../assets/resources/download1.svg";
import CreateFileModal from "./CreateFileModal";
import { toast } from "react-toastify";
import DeleteModal from "../../common/DeleteModal";
import Validator from "validatorjs";
import { toTitleCase } from "../../utils/helpers";
const fields = {
  name: "",
  url: "",
  image: "",
};

const ResourcesSubList = () => {
  const { type, slug } = useParams();
  const { BASE_URL } = useContext(AppContext);
  const [resourcesList, setResourcesList] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [inputs, setInputs] = useState({
    search_key: "",
    page: 1,
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [applyFilter, setApplyFilter] = useState(false);
  const [params, setParams] = useState(fields);
  const [formErrors, setFormErrors] = useState(fields);
  const [imageFileEvent, setImageFileEvent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [meta, metaData] = useState({
    current_page: "",
    total: "0",
    per_page: "0",
  });

  const handleDownload = (e, item) => {
    e.preventDefault();
    window.open(item.url, "_blank");
  };

  const getResourcesList = (inputs) => {
    setLoading(true);
    api
      .get(
        `${BASE_URL}/admin/resources/sub?slug=${slug}&page=${inputs.page}&search_key=${inputs.search_key}`
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

  function reset() {
    setInputs((inputs) => ({
      ...inputs,
      search_key: "",
      page: 1,
    }));
    let query = { ...inputs };
    query.search_key = "";
    query.page = 1;
    getResourcesList(query);
  }

  function filterSearch() {
    setCurrentPage(1);
    getResourcesList(inputs);
  }

  const onEnter = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    filterSearch();
  };

  const handleSearch = (e) => {
    const key = e.target.value;
    if (key.length === 0) setInputs({ ...inputs, search_key: "" });
    else setInputs({ ...inputs, search_key: key });
  };

  const handleDeleteOk = () => {
    setIsLoading(true);
    api
      .delete(`${BASE_URL}/admin/resources/sub/` + selectedId, {})
      .then((response) => {
        let resources = [...resourcesList];
        let index = resources.findIndex((x) => x.id === selectedId);
        if (index != -1) {
          resources.splice(index, 1);
        }
        setResourcesList(resources);
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
    setParams({ ...params, url: data.url });
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
      url: "required",
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
    formData.append("file", imageFileEvent);
    formData.append("slug", slug);
    setIsLoading(true);
    if (selectedId) {
      api
        .put(`${BASE_URL}/admin/resources/sub/` + selectedId, formData)
        .then((response) => {
          let resources = [...resourcesList];
          let index = resources.findIndex((x) => x.id === selectedId);
          if (index != -1) {
            resources.splice(index, 1);
          }
          resources.unshift(response.data.data);
          setResourcesList(resources);
          toast.success("Resource Added Successfully!");
          setOpen(false);
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
    } else {
      api
        .post(`${BASE_URL}/admin/resources/sub`, formData)
        .then((response) => {
          let resources = [...resourcesList];
          resources.unshift(response.data.data);
          setResourcesList(resources);
          toast.success("Resource Added Successfully!");
          setOpen(false);
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
    <div className="p-2 lg:p-4 mb-10">
      <div className="flex flex-col gap-1">
        <div className="flex flex-row gap-1">
          <Link to={`/resources/${type}`}>
            {" "}
            <p className="text-xs">{toTitleCase(type)} Resources</p>
          </Link>
          <p className="text-xs">{">"}</p>
          <p className="text-xs">{toTitleCase(slug.replace("-", " "))}</p>
        </div>
        <div></div>
      </div>
      <div className="lg:flex lg:justify-between">
        <h1 className=" audio text-white relative text-xl md:text-2xl">
          {toTitleCase(slug.replace("-", " "))}
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
            <p className="">+New File</p>
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

      <hr className="block lg:hidden mt-2" />

      {/* Filtering Desktop view */}

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
      <p className="text-[12px]  mt-2 ml-2">
        Showing{" "}
        <span className="font-[800]">
          {resourcesList.length + (currentPage - 1) * 10}
        </span>{" "}
        out of <span className="font-[800]">{meta.total}</span> results
      </p>

      {/* Listing */}

      {loading ? (
        <div className="flex justify-center mt-56">
          <p>Loading.....</p>
        </div>
      ) : (
        <div>
          {resourcesList.length > 0 ? (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4  justify-center items-center   mt-5">
              {resourcesList.map((item, index) => (
                <div className="bg-[#262938] rounded-lg w-full h-32 px-2 py-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-center">
                      <img src={pdf} alt="" className="w-8" />
                    </div>
                    <Tooltip title={item?.name}>
                      <h6 className="text-center text-xs md:text-xs break-words cursor-pointer  custom-text-ellipsis">
                        {item?.name}
                      </h6>
                    </Tooltip>
                  </div>
                  <div className=" flex justify-center gap-4 pt-4 pb-2 resource-actions">
                    <Tooltip title="delete">
                      <span
                        className="cursor-pointer"
                        onClick={(e) => handleDelete(item)}
                      >
                        <img src={download1} alt="" />
                      </span>
                    </Tooltip>
                    <Tooltip title="download">
                      <span
                        className="cursor-pointer"
                        onClick={(e) => handleDownload(e, item)}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 0C4.49 0 0 4.49 0 10C0 15.51 4.49 20 10 20C15.51 20 20 15.51 20 10C20 4.49 15.51 0 10 0ZM9 8V4H11V8H14L10 12L6 8H9ZM15 15H5V13H15V15Z"
                            fill="#0AF221"
                          />
                        </svg>
                      </span>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center mt-56">
              <p>Not Found!!!!</p>
            </div>
          )}
        </div>
      )}

      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={meta.total}
        pageSize={10}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <CreateFileModal
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
  );
};
export default ResourcesSubList;
