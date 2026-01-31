import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

import { Tooltip } from "@mui/material";
import { loginUser } from "../../utils";
import folder from "../../assets/resources/folder.svg";

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

const BasicTable = ({ data, handleEdit, handleDelete }) => {
  const classes = useStyles();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let loggedUser = loginUser();
    if (loggedUser) {
      let user = JSON.parse(loggedUser);
      if (user.role_slug === "admin") {
        setIsAdmin(true);
      }
    }
  });

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
          <TableCell
                align="left"
                sx={{
                  color: "#6A6A78",
                  fontSize: "12px",
                  lineHeight: "15.3px",
                  fontWeight: 400,
                  paddingLeft:'6px'
                }}
              >
                <p className="audio font-audiowide font-medium ">
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
                <p className="audio font-audiowide font-medium ">
               Action
                </p>
              </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.length > 0 ? (
            <>
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
                  <Link
                      to={`/resources/view/internal/${item?.slug}`}
                    >
                   <div className="flex items-center  gap-4">
                   <span className="flex justify-center ">
                      <img width={"40px"}
                        src={item.folder_image ? item.folder_image : folder}
                        alt="folder"
                      />
                    </span>
                    <p className="audio">{item?.name || "--"}</p>

                   </div>
                   </Link>
                  </TableCell>
                  <TableCell
                    align="center"
                    width="200px"
                    sx={{ fontSize: "0.8rem" }}
                  >
                    <span className="flex gap-2 justify-center cursor-pointer resource-actions">
                      <Tooltip title="edit">
                        <svg
                          width="23"
                          height="23"
                          viewBox="0 0 23 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => {
                            handleEdit(item);
                          }}
                        >
                          <path
                            d="M14.4721 0.215089C14.1853 -0.0716964 13.7204 -0.0716964 13.4336 0.215089L9.54671 4.10196L17.9289 12.4841L21.8157 8.59724C22.1025 8.31045 22.1025 7.84548 21.8157 7.5587L14.4721 0.215089Z"
                            fill="#FE9705"
                          />
                          <path
                            d="M0 13.6487L8.50817 5.1405L16.8903 13.5227L8.38215 22.0308H0.734361C0.328784 22.0308 0 21.702 0 21.2965V13.6487Z"
                            fill="#FE9705"
                          />
                          <path
                            d="M11.7498 22.0308H22.0308V20.5621H11.7498V22.0308Z"
                            fill="#FE9705"
                          />
                        </svg>
                      </Tooltip>
                      <span className="h-8 border border-[#262938] "></span>
                      <Tooltip title="Delete">
                        <svg
                          width="23"
                          height="23"
                          viewBox="0 0 15 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="cursor-pointer"
                          onClick={() => {
                            handleDelete(item);
                          }}
                        >
                          <path
                            d="M1.81763 16C1.81763 17.1 2.71763 18 3.81763 18H11.8176C12.9176 18 13.8176 17.1 13.8176 16V6C13.8176 4.9 12.9176 4 11.8176 4H3.81763C2.71763 4 1.81763 4.9 1.81763 6V16ZM13.8176 1H11.3176L10.6076 0.29C10.4276 0.11 10.1676 0 9.90763 0H5.72763C5.46763 0 5.20763 0.11 5.02763 0.29L4.31763 1H1.81763C1.26763 1 0.817627 1.45 0.817627 2C0.817627 2.55 1.26763 3 1.81763 3H13.8176C14.3676 3 14.8176 2.55 14.8176 2C14.8176 1.45 14.3676 1 13.8176 1Z"
                            fill="#EF4949"
                          />
                        </svg>
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
  );
};

export default BasicTable;
