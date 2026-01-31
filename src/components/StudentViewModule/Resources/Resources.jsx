import { useState, useContext, useMemo } from "react";
import api from "../../../api/index";
import { AppContext } from "../../../context/Appcontext";
import "react-datepicker/dist/react-datepicker.css";
import { Pagination } from "../../Shared/Pagination/Pagination.jsx";

import Tooltip from "@mui/material/Tooltip";
import folder from "../../../assets/resources/folder.svg";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    "& td ": {
      color: "#FFFFFF",
    },
  },

  tr: {
    "& td:first-child ": {
      borderTopLeftRadius: "8px",
      borderBottomLeftRadius: "8px",
    },
    "& td:last-child ": {
      borderTopRightRadius: "8px",
      borderBottomRightRadius: "8px",
    },
  },
}));

let paddingX = "24px";
if (window.innerWidth < 1024) {
  paddingX = "10px";
}

let cols = [
  {
    title: "Folder Name",
  },
  {
    title: "Action",
  },
];

const InternalResourcesList = () => {
  const classes = useStyles();
  const { BASE_URL } = useContext(AppContext);
  const [resourcesList, setResourcesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, metaData] = useState({
    current_page: "",
    total: "0",
    per_page: "0",
  });
  const getResourcesList = () => {
    setLoading(true);
    api
      .get(`${BASE_URL}/admin/resources?type=2&page=${currentPage}`)
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
    getResourcesList();
  }, [currentPage]);

  return (
    <>
      <div className="p-2 md:p-6">
        <p className="text-xl md:text-2xl font-audiowide gradient-text mt-1 md:mt-0 ">
          <span className="text-xl md:text-2xl font-audiowide gradient-text ">
            {" "}
            Resources…
          </span>
        </p>
        <p className="text-xs pb-2 text-primary ">
          ApplyUniNow is in the mission with 100% digital transparency for untroubled
          information. Here are some useful information/drafts that are helpful
          in preparation and also while making + submitting the University
          applications...
        </p>

        {loading ? (
          <div className="flex justify-center">
            <p className="text-center audio text-3xl">Loading....</p>
          </div>
        ) : (
          <div className="mt-4 md:mt-4">
            <TableContainer
              component={Paper}
              sx={{ backgroundColor: "#262938", alignItems: "center" }}
            >
              <Table
                sx={{
                  [`& .${tableCellClasses.root}`]: {
                    borderBottom: "none",
                  },
                  border: "1px solid #404050",
                  borderCollapse: "separate",
                  borderSpacing: "0px 20px",
                  px: paddingX,
                  borderRadius: "8px",
                  "& .MuiTableCell-head": {
                    padding: 0,
                  },
                }}
                className={classes.root}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="left"
                      sx={{
                        color: "#6A6A78",
                        fontSize: "12px",
                        lineHeight: "15.3px",
                        fontWeight: 400,
                        paddingLeft: "6px",
                      }}
                    >
                      <p className="audio font-audiowide font-medium  ">
                        Folder Name
                      </p>
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{
                        color: "#6A6A78",
                        fontSize: "12px",
                        lineHeight: "15.3px",
                        fontWeight: 400,
                      }}
                    >
                      <p className="audio font-audiowide font-medium flex justify-end lg:justify-center">
                        Action
                      </p>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resourcesList.length ? (
                    <>
                      {resourcesList.map((item) => (
                        <TableRow
                          sx={{
                            height: "16px",
                            backgroundColor: "#151929",
                            padding: "0px",
                          }}
                          className={classes.tr}
                        >
                          <TableCell align="center" sx={{ fontSize: "0.8rem" }}>
                            <Link to={`/resources/view/${item?.slug}?name=${item.name}`}>
                              <div className="flex flex-row gap-2 lg:flex items-center w-full lg:gap-4">
                                <span className="flex justify-center w-[40px] ">
                                  <img
                                    src={
                                      item.folder_image
                                        ? item.folder_image
                                        : folder
                                    }
                                    alt="folder"
                                  />
                                </span>

                                <p className="audio text-xs lg:text-sm lg:w-full w-[200px] flex justify-start text-left">
                                  {item?.name || "--"}
                                </p>
                              </div>
                            </Link>
                          </TableCell>
                          <TableCell
                            align="center"
                            width="200px"
                            sx={{ fontSize: "0.8rem" }}
                          >
                            <span className="flex justify-end lg:justify-center cursor-pointer ">
                              <Tooltip title="edit">
                                <Link to={`/resources/view/${item?.slug}`}>
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M10.9091 10.908C12.5157 10.908 13.8182 9.60558 13.8182 7.99893C13.8182 6.39229 12.5157 5.08984 10.9091 5.08984C9.30244 5.08984 8 6.39229 8 7.99893C8 9.60558 9.30244 10.908 10.9091 10.908Z"
                                      fill="#57CD53"
                                    />
                                    <path
                                      d="M21.7742 7.75273C20.9188 5.54011 19.4339 3.62663 17.5028 2.24879C15.5718 0.87095 13.2793 0.089144 10.9088 0C8.53825 0.089144 6.24579 0.87095 4.31475 2.24879C2.3837 3.62663 0.898717 5.54011 0.043327 7.75273C-0.0144423 7.91251 -0.0144423 8.08749 0.043327 8.24727C0.898717 10.4599 2.3837 12.3734 4.31475 13.7512C6.24579 15.1291 8.53825 15.9109 10.9088 16C13.2793 15.9109 15.5718 15.1291 17.5028 13.7512C19.4339 12.3734 20.9188 10.4599 21.7742 8.24727C21.832 8.08749 21.832 7.91251 21.7742 7.75273ZM10.9088 12.7273C9.97382 12.7273 9.05985 12.45 8.28245 11.9306C7.50505 11.4111 6.89915 10.6728 6.54135 9.80905C6.18356 8.94525 6.08994 7.99476 6.27234 7.07775C6.45475 6.16075 6.90497 5.31843 7.56609 4.65731C8.22722 3.99619 9.06954 3.54596 9.98654 3.36356C10.9035 3.18116 11.854 3.27477 12.7178 3.63257C13.5816 3.99037 14.3199 4.59627 14.8394 5.37367C15.3588 6.15106 15.6361 7.06503 15.6361 8C15.6341 9.25316 15.1355 10.4544 14.2493 11.3406C13.3632 12.2267 12.1619 12.7253 10.9088 12.7273Z"
                                      fill="#57CD53"
                                    />
                                  </svg>
                                </Link>
                              </Tooltip>
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : (
                    ""
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}

        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={meta.total}
          pageSize={10}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
};
export default InternalResourcesList;
