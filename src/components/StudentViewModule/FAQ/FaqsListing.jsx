import { useState, useContext, useMemo } from "react";
import api from "../../../api/index";
import { AppContext } from "../../../context/Appcontext";
import "react-datepicker/dist/react-datepicker.css";
import { Pagination } from "../../Shared/Pagination/Pagination.jsx";
import upCircle from "../../../assets/resources/upCircle.svg";
import DownCircle from "../../../assets/resources/DownCircle.svg";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { makeStyles } from "@mui/styles";
import CustomButton from "../../../common/CustomButton";
import Filter from "../../../assets/leads/Filter.svg";
import { InputAdornments } from "../../../common/SearchText";
import Reset from "../../../assets/user/Reset.svg";

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

const FaqsListing = () => {
  const classes = useStyles();
  const [applyFilter, setApplyFilter] = useState(false);
  const { BASE_URL } = useContext(AppContext);
  const [resourcesList, setResourcesList] = useState([]);
  const [inputs, setInputs] = useState({
    search_key: "",
    page: 1,
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [expanded, setExpanded] = useState();

  const [meta, metaData] = useState({
    current_page: "",
    total: "0",
    per_page: "0",
  });

  const FAQList = (inputs) => {
    setResourcesList([]);
    setExpanded(-1);
    setLoading(true);
    api
      .get(
        `${BASE_URL}/admin/faqs/students?page=${inputs.page}&search_key=${inputs.search_key}&country_id=${inputs.country_id}`
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
    FAQList(payload);
  }, [currentPage]);

  const handleSearch = (e) => {
    const key = e.target.value;
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const onEnter = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    filterSearch();
  };

  const reset = () => {
    setInputs((inputs) => ({
      ...inputs,
      search_key: "",
      page: 1,
    }));
    let query = { ...inputs };
    query.search_key = "";
    query.page = 1;
    FAQList(query);
  };

  function filterSearch() {
    FAQList(inputs);
  }

  const handleAccordian = (pannel) => (event, newExpanded) => {
    if (expanded === pannel) {
      setExpanded(-1);
      return;
    }
    setExpanded(newExpanded ? pannel : false);
  };

  return (
    <>
      <div className="p-2 md:p-6">
        <div className="flex items-start md:items-center flex-col md:flex-row justify-between my-1 md:my-0">
          <div className="w-full">
            <p className="text-xl font-audiowide gradient-text">
              <span className="text-xl md:text-2xl font-audiowide  gradient-text ">
                {" "}
                Frequently Asked Questions...
              </span>
            </p>
            <p className="text-xs pb-4 md:pb-0 text-primary">
              ApplyUniNow’s most frequently Asked Questions - this page gives
              you quick answers to your customised questions. The idea is to
              keep the answers short and direct you information quickly.
            </p>
          </div>

          <div className="w-full">
            <div className="flex gap-2 justify-between items-center mt-2 md:mt-0">
              <div className="w-full">
                <InputAdornments
                  handleChange={handleSearch}
                  onEnter={onEnter}
                  label="Search"
                  name="search_key"
                  value={inputs.search_key}
                  width="w-full md:w-fit  ml-0 md:ml-auto"
                />
              </div>

              <div className="flex gap-2 flex-row justify-end">
                <CustomButton
                  onClick={filterSearch}
                  variant="contained"
                  size="large"
                  borderRadius="8px"
                  width="w-fit"
                >
                  <p className="">Submit</p>
                </CustomButton>

                <div className="cursor-pointer w-10" onClick={reset}>
                  <img src={Reset} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {resourcesList && resourcesList.length ? (
          <div className="mt-5">
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
                      {index === expanded ? (
                        <img src={DownCircle} alt="plus" />
                      ) : (
                        <img src={upCircle} alt="plus" />
                      )}

                      <p
                        className={`font-nunitoRegular my-2 mx-3 text-xs md:text-base ${
                          expanded == index ? "text-slider" : "text-white"
                        }`}
                      >
                        {x.query}
                      </p>
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
    </>
  );
};
export default FaqsListing;
