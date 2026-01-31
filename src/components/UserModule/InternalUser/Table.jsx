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
import { useState } from "react";
import ToggleButton from "../../ToggleButton/ToggleButton";
import documentCloud from "../../../assets/user/document-cloud.svg";
import DeleteModal from "../../../common/DeleteModal";
import {encryptData} from '../../../utils/helpers'

const useStyles = makeStyles(() => ({
  root: {
    "& td ": {
      color: "#FFFFFF",
      padding:3
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
  handleStatus,
  showDeleteModal,
  handleDelete,
  handleDeleteCancel,
  deleteUser,
  apiLoading,
}) => {
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
                sx={{
                  color: "#6A6A78",
                  fontSize: "12px",
                  lineHeight: "15.3px",
                  fontWeight: 400,
                }}
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
              <TableCell align="center" sx={{ fontSize: "0.8rem", maxWidth:150,   overflow: "hidden", textOverflow: "ellipsis", }}>
                <p className="audio break-all">{item?.name}</p>
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "0.8rem" }}>
                <p className="audio">
                  {item?.email ? item?.email : "--"}
                  <br />
                  {item?.phone ? item?.phone : "--"}
                </p>
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "0.8rem" }}>
                <p className="audio">
                  {item?.role?.name ? item?.role?.name : "--"}
                </p>
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "0.8rem" }}>
                <p className="audio flex justify-center">
                  <Status>{item?.document_status}</Status>
                </p>
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "0.8rem" }}>
                <div
                  className="bg-tab py-3"
                  onClick={() => {
                    handleStatus(item);
                  }}
                >
                  <ToggleButton
                    defaultChecked={item?.active}
                    value={item?.active}
                  />
                </div>
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "0.8rem" }}>
                <div className="bg-tab py-5 rounded-r-xl flex space-x-2 justify-center items-center">
                  <Link to={`/users/internal/view/${encryptData(item.id)}`}>
                    <Tooltip title="View">
                      <img className="cursor-pointer" src={eye} alt="" />
                    </Tooltip>
                  </Link>
                  <span className="w-[1px] h-[24px] bg-[#262938]"></span>
                

                  <Tooltip title="Delete">
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 15 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="cursor-pointer"
                      onClick={(e) => handleDelete(e, item)}
                    >
                      <path
                        d="M1.81763 16C1.81763 17.1 2.71763 18 3.81763 18H11.8176C12.9176 18 13.8176 17.1 13.8176 16V6C13.8176 4.9 12.9176 4 11.8176 4H3.81763C2.71763 4 1.81763 4.9 1.81763 6V16ZM13.8176 1H11.3176L10.6076 0.29C10.4276 0.11 10.1676 0 9.90763 0H5.72763C5.46763 0 5.20763 0.11 5.02763 0.29L4.31763 1H1.81763C1.26763 1 0.817627 1.45 0.817627 2C0.817627 2.55 1.26763 3 1.81763 3H13.8176C14.3676 3 14.8176 2.55 14.8176 2C14.8176 1.45 14.3676 1 13.8176 1Z"
                        fill="#EF4949"
                      />
                    </svg>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DeleteModal
        open={showDeleteModal}
        handleClose={handleDeleteCancel}
        type="delete"
        handleActionButton={deleteUser}
        loading={apiLoading}
        title="Are you sure you want to delete the User?"
      />
    </TableContainer>
  );
};

export default BasicTable;
