import { useState, useContext, useMemo } from "react";
import api from "../../../api/index";
import { AppContext } from "../../../context/Appcontext";
import "react-datepicker/dist/react-datepicker.css";
import { Pagination } from "../../Shared/Pagination/Pagination.jsx";
import Tooltip from "@mui/material/Tooltip";
import pdf from "../../../assets/resources/pdf.svg";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ViewIcon from "../../../assets/StudentsIcons/ViewIcon.svg"
import PdfViewer from "./PdfViewer";
import { toTitleCase } from "../../../utils/helpers";
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
const fields = {
  name: '',
  url: '',
  image: ''
}

const MediumOfInstruction = () => {
  const classes = useStyles();

  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { BASE_URL } = useContext(AppContext);
  const [resourcesList, setResourcesList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  console.log(searchParams.get("name"))
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [meta, metaData] = useState({
    current_page: "",
    total: "0",
    per_page: "0",
  });

  const handleDownload = (e, item) => {
    e.preventDefault();
    window.open(item.url, "_blank");
  };

  const getResourcesList = () => {
    setLoading(true);
    api
      .get(
        `${BASE_URL}/admin/resources/sub?slug=${slug}&page=${currentPage}`
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
    getResourcesList();
  }, [currentPage]);


  const handleClose = () => {
    setOpen(false);
  };

  const handleView = (item) => {
    setSelectedItem(item)
    convertToBase64(item.url)
    setOpen(true)
  }
  function convertToBase64(url) {
    var url = url;
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var codes = new Uint8Array(xhr.response);
      var bin = String.fromCharCode.apply(null, codes);
      var b64 = btoa(bin);
    };

    xhr.open('GET', url);
    xhr.responseType = 'arraybuffer';
    xhr.send();
  }

  const handleDowload = (item) => {
    window.open(selectedItem.url, "_blank");
    setOpen(true)
  }
  return (
    <div className="p-2 lg:p-4">
    <div className="flex flex-col gap-1">
        <div className="flex flex-row gap-1 lg:pl-0 pl-2">
          <Link to={`/resources/listing`}>
            {" "}
            <p className="text-[10px] text-primary">Resources</p>
          </Link>
          <p className="text-[10px] text-primary">{">"}</p>
          <p className="text-[10px] text-primary">{ searchParams.get("name") ? searchParams.get("name") : toTitleCase(slug.replace('-', ' '))}</p>
        </div>
        <div></div>
      </div>
      <div className="lg:flex lg:justify-between pb-2">
        <p className="text-xl md:text-2xl audio  gradient-text ">
          <span className="text-xl md:text-2xl audio lg:pl-0 pl-2">
          { searchParams.get("name") ? searchParams.get("name") :  toTitleCase(slug.replace('-', ' '))}
          </span>
        </p>
      </div>
      {/* Listing */}

      {loading ? (
        <div className="flex justify-center mt-56">
          <p>Loading.....</p>
        </div>
      ) : (
        <div>
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
                      paddingLeft: '6px'
                    }}
                  >
                    <p className="audio font-audiowide font-medium ">
                      Resource Name
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
                          <Tooltip title={item?.name}>
                            <div className="flex items-center lg:gap-4 gap-2">
                              <span className="flex justify-center w-[40px] ">
                                <img width={"40px"} src={pdf}
                                  alt="folder"
                                />
                              </span>
                              <p className="audio">{item?.name || "--"}</p>

                            </div>
                          </Tooltip>
                        </TableCell>
                        <TableCell
                          align="center"
                          width="200px"
                          sx={{ fontSize: "0.8rem" }}
                        >
                          <div className=" flex justify-end lg:justify-center gap-4 pt-4 pb-2">
                            <Tooltip title="View ">
                              <span
                                className="cursor-pointer "
                                onClick={(e) => handleDownload(e, item)
                                }
                              >
                                <img  className="w-7" src={ViewIcon} alt="" />

                              </span>
                            </Tooltip>
                          </div>
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

      {
        open &&
        <PdfViewer
          hideNavbar={true}
          open={open}
          item={selectedItem}
          handleClose={handleClose}
          handleDowload={handleDowload}
        />
      }


    </div>
  );
};
export default MediumOfInstruction;