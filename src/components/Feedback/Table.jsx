import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { loginUser } from "../../utils";

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

const BasicTable = ({ cols, data, handleTruncateFeedback }) => {
  const classes = useStyles();

  return (
    <TableContainer
      component={Paper}
      sx={{ backgroundColor: "#262938", alignItems: "left" }}
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
                align="left"
                sx={{
                  color: "#6A6A78",
                  fontSize: "12px",
                  lineHeight: "15.3px",
                  fontWeight: 400,
                }}
              >
                <p className="audio font-audiowide font-medium ">
                  {header.title.split(" ")[0]}
                </p>
                <p className="audio font-audiowide font-medium ">
                  {header.title.split(" ")[1]}
                </p>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              sx={{
                height: "16px",
                backgroundColor: "#151929",
                padding: "0px",
              }}
              className={classes.tr}
            >
              <TableCell align="left" sx={{ fontSize: "0.8rem" }}>
                <p className="audio"> {item?.id || "--"}</p>
              </TableCell>
              <TableCell align="left" sx={{ fontSize: "0.8rem", padding: "0" }}>
                <p className="audio"> {item?.student?.name}</p>
                <p className="audio"> {item?.last_name}</p>
              </TableCell>

              <TableCell align="left" sx={{ fontSize: "0.8rem", padding: "0" }}>
                <p className="audio">
                  {item?.student?.phone ? (
                    <> +91 {item?.student?.phone}</>
                  ) : (
                    "--"
                  )}
                </p>

                <p className="audio ">
                  {item?.student?.email ? <> {item?.student?.email}</> : "--"}
                </p>
              </TableCell>
              <TableCell align="left" sx={{ fontSize: "0.8rem", padding: "0" }}>
                <p className="audio">
                  <p className="break-words">
                    {moment(item?.created_at).format("LT")}
                  </p>
                  <p className="break-words">
                    {moment(item.created_at).format("DD/MM/YYYY")}
                  </p>
                </p>
              </TableCell>

              <TableCell align="left" sx={{ fontSize: "0.8rem", padding: "0" }}>
                <span className="flex gap-1  items-center">
                  <p className="audio text-[#FFE15A] text-[18px]">
                    {item?.rating || 0}
                  </p>
                  <svg
                    width="18"
                    height="17"
                    viewBox="0 0 18 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.11555 0.676341C8.49076 -0.0348058 9.50924 -0.0348076 9.88445 0.676339L11.827 4.35822C11.9717 4.63247 12.2355 4.82408 12.541 4.87694L16.643 5.58669C17.4352 5.72377 17.75 6.69241 17.1896 7.26901L14.2882 10.2543C14.0721 10.4766 13.9713 10.7867 14.0155 11.0936L14.6081 15.2141C14.7225 16.01 13.8985 16.6086 13.177 16.2538L9.44125 14.417C9.16299 14.2801 8.83701 14.2801 8.55875 14.417L4.82301 16.2538C4.10146 16.6086 3.27749 16.01 3.39194 15.2141L3.98451 11.0936C4.02865 10.7867 3.92792 10.4766 3.71181 10.2543L0.81042 7.26901C0.250025 6.69241 0.564752 5.72377 1.35704 5.58669L5.45901 4.87694C5.76455 4.82408 6.02827 4.63247 6.17297 4.35822L8.11555 0.676341Z"
                      fill="#FFE15A"
                    />
                  </svg>
                </span>
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontSize: "0.8rem", width: "400px" }}
              >
                <p className="audio break-all">
                  {item?.feedback.length < 60 ? (
                    <p>{item?.feedback}</p>
                  ) : (
                    <>
                      {" "}
                      {!item.isChecked ? (
                        <p>
                          {item?.feedback.slice(0, 60)}...{" "}
                          <span
                            className="underline cursor-pointer"
                            onClick={() => {
                              handleTruncateFeedback(index);
                            }}
                          >
                            read more
                          </span>
                        </p>
                      ) : (
                        <p>
                          {item?.feedback}{" "}
                          <span
                            className="underline cursor-pointer"
                            onClick={() => {
                              handleTruncateFeedback(index);
                            }}
                          >
                            read less
                          </span>
                        </p>
                      )}
                    </>
                  )}
                </p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
