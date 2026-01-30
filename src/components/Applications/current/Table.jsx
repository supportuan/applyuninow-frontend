import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import Status from "../../../common/Status";
import { Tooltip } from "@mui/material";
import eye from "../../../assets/leads/eye.svg";
import user from "../../../assets/leads/user.svg";
import deleteIcon from "../../../assets/leads/delete.svg";
import TempDelete from "../../../assets/application/TempDelete.svg";
import info from "../../../assets/allstudents/info.svg";
import DeleteModal from "../../../common/DeleteModal";
import { encryptData } from "../../../utils/helpers";
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

const BasicTable = ({
  cols,
  data,
  handleDeleteOk,
  handleClose,
  loading,
  open,
  handleClickOpen,
}) => {
  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer
      component={Paper}
      sx={{ backgroundColor: "#262938", alignItems: "center" }}
    >
      <Table
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: "none",
          },
          minWidth: 650,
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
            {cols.map((header) => (
              <TableCell
                align="center"
                sx={{ color: "#6A6A78", fontSize: "13px" }}
              >
                <p className="audio font-audiowide ">
                  {header.title.split(" ")[0]}
                </p>
                <p className="audio font-audiowide ">
                  {header.title.split(" ")[1]}
                </p>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow
              sx={{
                height: "16px",
                backgroundColor: "#151929",
                padding: "0px",
              }}
              className={classes.tr}
            >
              <TableCell align="center" sx={{ fontSize: "0.8rem" }}>
                <p className="audio">{item?.id}</p>
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "0.8rem" }}>
                <p className="audio">
                  <p className="break-words">
                    {moment(item.created_at).format("DD/MM")}
                  </p>
                  <p className="break-words">
                    {moment(item.created_at).format("YYYY")}
                  </p>
                </p>
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "0.8rem" }}>
                <p className="audio">
                  {" "}
                  {item?.name}
                  <br />
                  +91 {item?.phone}
                </p>
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "0.8rem" }}>
                <p className="audio">{item?.primaryContact?.name}</p>
                <p className="audio">{item?.primaryContact?.phone}</p>
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "0.8rem" }}>
                <span className="flex justify-center">
                  <p className="audio">
                    {/* {item?.destination ? item?.destination : "--"} */}
                    <img src={item?.flag} alt="flag" className="w-12" />
                  </p>
                </span>
              </TableCell>

              <TableCell align="center" sx={{ fontSize: "0.8rem" }}>
                <div className="flex bg-tab gap-2  h-16  audio  justify-center items-center">
                  <div className="flex flex-col gap-2">
                    <p>{item?.stage} </p>
                    <p>
                      &nbsp;•&nbsp;
                      {item?.stage_completed_task}/{item?.stage_total_task}
                      &nbsp; • &nbsp;
                    </p>
                  </div>

                  <div>
                    <img className="" src={info} alt="not done" />
                  </div>
                </div>
              </TableCell>

              <TableCell align="center" sx={{ fontSize: "0.8rem" }}>
                <p className="audio">{item?.status}</p>
              </TableCell>

              <TableCell align="center" sx={{ fontSize: "0.8rem" }}>
                <span className="flex gap-2 justify-center pr-4">
                  <Tooltip title="view">
                    <Link to={`/students/view-student-detail/${encryptData(item?.id)}`}>
                      <img
                        src={eye}
                        alt="icon"
                        className="w-6 cursor-pointer mt-2"
                      />
                    </Link>
                  </Tooltip>
                  <span className="h-8 border border-[#262938] "></span>
                  <Tooltip title="delete">
                    <img
                      src={deleteIcon}
                      alt="icon"
                      className="w-4 cursor-pointer"
                      onClick={() => {
                        handleClickOpen("archeiveLargeScreen", true, item?.id);
                      }}
                    />
                  </Tooltip>
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {open.archeiveLargeScreen ? (
        <DeleteModal
          open={open.archeiveLargeScreen}
          handleClose={handleClose}
          type="delete"
          handleActionButton={handleDeleteOk}
          loading={loading}
          title=" Are you sure you want to delete the Lead?"
        />
      ) : (
        ""
      )}

      {open.archeiveLargeScreen ? (
        <DeleteModal
          open={open.archeiveLargeScreen}
          handleClose={handleClose}
          type="archeive"
          title=" Are you sure you want to delete the Lead?"
          loading={loading}
          handleActionButton={handleDeleteOk}
        />
      ) : (
        ""
      )}
    </TableContainer>
  );
};

export default BasicTable;
