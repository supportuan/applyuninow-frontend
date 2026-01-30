import { useState, useContext, useMemo, useEffect } from "react";
import api from "../../../api/index";
import { AppContext } from "../../../context/Appcontext";
import "react-datepicker/dist/react-datepicker.css";
import { Pagination } from "../../Shared/Pagination/Pagination.jsx";
import deleteIcon from "../../../assets/resources/deleteIcon.svg";
import edit from "../../../assets/resources/edit.svg";

import upCircle from "../../../assets/resources/upCircle.svg";
import closeCircle from "../../../assets/resources/DownCircle.svg";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { makeStyles } from "@mui/styles";
import CustomButton from "../../../common/CustomButton";
import Filter from "../../../assets/leads/Filter.svg";
import Refresh from "../../../assets/leads/Refresh.svg";
import { InputAdornments } from "../../../common/SearchText";
import { SelectInput } from "../../../common/Select";
import Modal from "./CreateModal";
import { toast } from "react-toastify";
import Validator from "validatorjs";
import DeleteModal from "../../../common/DeleteModal";
import { red } from "@mui/material/colors";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#262938 !important",
    borderRadius: "1rem",
    paddingY: "30px",
    "&:before": {
      backgroundColor: "transparent",
    },
  },
  details: {
    backgroundColor: "#262938",
    borderRadius: "1rem",
    paddingX: "24px",
  },

  summary: {
    backgroundColor: "#262938 !important",
    borderRadius: "8px !important",
    margin: "0px",
    padding: "0px",
  },
}));

const fields = {
  country_id: "",
  query: "",
  solution: "",
};

const FaqsListing = () => {
  const classes = useStyles();

  const [expand, setExpand] = useState(false);
  const toggleAcordion = () => {
    setExpand((prev) => !prev);
  };

  const [open, setOpen] = useState(false);
  const [applyFilter, setApplyFilter] = useState(false);
  const { BASE_URL } = useContext(AppContext);
  const [resourcesList, setResourcesList] = useState([]);
  const [inputs, setInputs] = useState({
    search_key: "",
    page: 1,
    country_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [countries, setCountries] = useState([]);
  const [params, setParams] = useState(fields);
  const [formErrors, setFormErrors] = useState(fields);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [expanded, setExpanded] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams({ ...params, [name]: value });
    setFormErrors(fields);
  };

  const handleAccordian = (pannel) => (event, newExpanded) => {
    if (expanded === pannel) {
      setExpanded(-1);
      return;
    }
    setExpanded(newExpanded ? pannel : false);
  };

  const [meta, metaData] = useState({
    current_page: "",
    total: "0",
    per_page: "0",
  });

  const getResourcesList = (inputs) => {
    setResourcesList([]);
    setExpanded(-1);
    setLoading(true);
    api
      .get(
        `${BASE_URL}/admin/faqs?page=${inputs.page}&search_key=${inputs.search_key}&country_id=${inputs.country_id}`
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
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onEnter = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    filterSearch()
  };

  
  const reset = () => {
    setInputs((inputs) => ({
      ...inputs,
      search_key: "",
      country_id: "",
      page: 1,
    }));
    let query = { ...inputs };
    query.search_key = "";
    query.page = 1;
    setCurrentPage(1);
    getResourcesList(query);
  };

  const getCountries = () => {
    api
      .get(`${BASE_URL}/admin/countries`)
      .then((res) => {
        //console.log(res.data.data);
        setCountries(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCountries();
  }, []);

  const handleEdit = (e, edit) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedId(edit.id);
    setParams({ ...params, ...edit });
    setOpen(true);
  };
  const handleDelete = (e, edit) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedId(edit.id);
    setOpenDelete(true);
  };
  const handleDeleteOk = () => {
    setIsLoading(true);
    api
      .delete(`${BASE_URL}/admin/faqs/` + selectedId, {})
      .then((response) => {
        let resources = [...resourcesList];
        let index = resources.findIndex((x) => x.id === selectedId);
        if (index != -1) {
          resources.splice(index, 1);
        }
        setResourcesList(resources);
        toast.success("FAQ Deleted Successfully!");
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

  const [openDelete, setOpenDelete] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = new Validator(params, {
      country_id: "required",
      query: "string|required|max:500",
      solution: "string|required|max:5000",
    });

    if (validation.fails()) {
      const fieldErrors = {};
      Object.keys(validation.errors.errors).forEach((key) => {
        fieldErrors[key] = validation.errors.errors[key][0];
      });
      setFormErrors(fieldErrors);
      return false;
    }
    setIsLoading(true);
    if (selectedId) {
      api
        .put(`${BASE_URL}/admin/faqs/` + selectedId, params)
        .then((response) => {
          let resources = [...resourcesList];
          let index = resources.findIndex((x) => x.id === selectedId);
          if (index != -1) {
            resources.splice(index, 1);
          }
          resources.unshift(response.data.data);
          setResourcesList(resources);
          toast.success("FAQ Added Successfully!");
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
    } else {
      api
        .post(`${BASE_URL}/admin/faqs`, params)
        .then((response) => {
          let resources = [...resourcesList];
          resources.unshift(response.data.data);
          setResourcesList(resources);
          toast.success("FAQ Added Successfully!");
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
  function filterSearch() {
    setCurrentPage(1);
    getResourcesList(inputs);
  }

  return (
    <>
      <div className="p-2 lg:p-4 mb-10">
      <div className="flex  justify-between items-center">
          <h1 className=" audio text-white relative text-base ">
          FAQ
          </h1>
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
              <p className="gradient-text">Filter</p>
            </CustomButton>

            <CustomButton
              onClick={() => {
                setOpen(true);
              }}
              variant="contained"
              size="large"
              borderRadius="8px"
              width="w-fit"
            >
              <p className="hidden md:block">+New FAQ</p>
              <p className="block md:hidden">+Add</p>

            </CustomButton>
          </div>
        </div>

        <hr className="block lg:hidden mt-4" />

        {/* Filtering  view */}

        {applyFilter ? (
          <div className="mt-6 flex flex-col lg:flex-row justify-between">
            <div className="w-full flex-col lg:w-1/2 flex lg:flex-row gap-2">
              <SelectInput
                options={countries}
                handleChange={handleSearch}
                value={inputs.country_id}
                label="Select Country"
                name="country_id"
              />
              <InputAdornments
                  onEnter={onEnter}
                handleChange={handleSearch}
                label="Search"
                name="search_key"
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

        <div className="border-b mt-2 border-border hidden lg:block"></div>
        {loading ? (
          ""
        ) : (
          <>
            {" "}
            <p className="md:text-[12px] text-[10px] mt-2 ml-2">
              Showing{" "}
              <span className="font-[800]">
                {resourcesList.length + (currentPage - 1) * 10}
              </span>{" "}
              out of <span className="font-[800]">{meta.total}</span> results
            </p>
          </>
        )}

        {loading ? (
          <p className="text-center mt-3 text-3xl">Loading...</p>
        ) : (
          <>
            {resourcesList && resourcesList.length ? (
              <div className="mt-3">
                {resourcesList.map((x, index) => (
                  <Accordion
                    expanded={expanded === index}
                    onChange={handleAccordian(index)}
                    className={`${classes.root} mb-4`}
                    sx={{
                      "&:before": {
                        display: "none",
                      },
                      border: "none",
                      borderRadius: "8px",
                    }}
                  >
                    <AccordionSummary
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className={classes.summary}
                    >
                      <div className="px-2 lg:px-4 w-full flex justify-between">
                        <div className="flex gap-2 ">
                          <img
                            src={expanded == index ? closeCircle : upCircle}
                            alt="plus"
                          />
                          <p
                            className={`font-nunitoRegular my-2 mx-3 text-xs md:text-base ${
                              expanded == index ? "text-slider" : "text-white"
                            }`}
                          >
                            {x.query}
                          </p>
                        </div>
                        <div className="flex gap-3 mr-4 md:mr-0">
                          <img
                            onClick={(e) => handleEdit(e, x)}
                            src={edit}
                            alt=""
                            className="w-5"
                          />
                          <img
                            onClick={(e) => handleDelete(e, x)}
                            src={deleteIcon}
                            alt=""
                            className="w-5"
                          />
                        </div>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails className={classes.details}>
                      <div className="w-full p-4 bg-[#151929] rounded-lg">
                        <p className="text-white text-xs md:text-base">
                          {x.solution}
                        </p>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            ) : (
              <div className="pt-8 text-center">
                <p>No results</p>
              </div>
            )}
          </>
        )}
        {/**Accordion */}

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

        <Modal
          open={open}
          params={params}
          handleChange={handleChange}
          formErrors={formErrors}
          countries={countries}
          isLoading={isLoading}
          selectedId={selectedId}
          handleSubmit={handleSubmit}
          handleClose={handleClose}
        />

        {openDelete ? (
          <DeleteModal
            open={openDelete}
            handleClose={handleClose}
            type="archeive"
            title=" Are you sure you want to delete this FAQ?"
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
export default FaqsListing;
