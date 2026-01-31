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
import AssignFormModal from "./AssignFormModal";
import DeleteModal from "../../../common/DeleteModal";
import {encryptData} from '../../../utils/helpers'

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

const BasicTable = ({
  cols,
  data,
  handleDeleteOk,
  open,
  handleClose,
  handleClickOpen,
  loading,
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
                <p className="audio"> {item?.id}</p>
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
                <p className="audio"> {item?.first_name}</p>
                <p className="audio"> {item?.last_name}</p>
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "0.8rem" }}>
                <p className="audio">
                <p className="audio">
                  {item?.phone ? <> +91 {item?.phone}</> : "--"}
                </p>

                <p className="audio">
                  {item?.email ? <> {item?.email}</> : "--"}
                </p>
                </p>
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
                {item?.selected_service ? (
                  <>
                    {item?.selected_service?.includes(",") ? (
                      <p className="audio">
                        {item?.selected_service?.substring(
                          0,
                          item?.selected_service?.indexOf(",")
                        )}
                        <br />+{item?.selected_service?.split(",").length - 1}
                        More
                      </p>
                    ) : (
                      <p className="audio">{item?.selected_service}</p>
                    )}
                  </>
                ) : (
                  "--"
                )}
              </TableCell>

              <TableCell align="center" sx={{ fontSize: "0.8rem" }}>
                <p className="audio">{item?.present_status}</p>
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "0.8rem" }}>
                <p className="audio">
                  <Status>{item?.status}</Status>
                </p>
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "0.8rem" }}>
                <span className="flex gap-2 pr-1 justify-center items-center">
                  <Tooltip title="view">
                    <Link to={`/leads/add_on/view/${encryptData(item?.id)}`}>
                      <svg
                        width="21"
                        height="21"
                        viewBox="0 0 22 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.9091 10.9119C12.5157 10.9119 13.8182 9.60949 13.8182 8.00284C13.8182 6.39619 12.5157 5.09375 10.9091 5.09375C9.30244 5.09375 8 6.39619 8 8.00284C8 9.60949 9.30244 10.9119 10.9091 10.9119Z"
                          fill="#57CD53"
                        />
                        <path
                          d="M21.7742 7.75273C20.9188 5.54011 19.4339 3.62663 17.5028 2.24879C15.5718 0.87095 13.2793 0.089144 10.9088 0C8.53825 0.089144 6.24579 0.87095 4.31475 2.24879C2.3837 3.62663 0.898717 5.54011 0.043327 7.75273C-0.0144423 7.91251 -0.0144423 8.08749 0.043327 8.24727C0.898717 10.4599 2.3837 12.3734 4.31475 13.7512C6.24579 15.1291 8.53825 15.9109 10.9088 16C13.2793 15.9109 15.5718 15.1291 17.5028 13.7512C19.4339 12.3734 20.9188 10.4599 21.7742 8.24727C21.832 8.08749 21.832 7.91251 21.7742 7.75273ZM10.9088 12.7273C9.97382 12.7273 9.05985 12.45 8.28245 11.9306C7.50505 11.4111 6.89915 10.6728 6.54135 9.80905C6.18356 8.94525 6.08994 7.99476 6.27234 7.07775C6.45475 6.16075 6.90497 5.31843 7.56609 4.65731C8.22722 3.99619 9.06954 3.54596 9.98654 3.36356C10.9035 3.18116 11.854 3.27477 12.7178 3.63257C13.5816 3.99037 14.3199 4.59627 14.8394 5.37367C15.3588 6.15106 15.6361 7.06503 15.6361 8C15.6341 9.25316 15.1355 10.4544 14.2493 11.3406C13.3632 12.2267 12.1619 12.7253 10.9088 12.7273Z"
                          fill="#57CD53"
                        />
                      </svg>
                    </Link>
                  </Tooltip>

                  {item?.status === "CALL_BACK" ? (
                    <>
                      <span className="h-8 border border-[#262938]"></span>
                      <Tooltip
                        title={moment(item?.call_back_time).format(
                          "DD/MM/YYYY LT"
                        )}
                      >
                        <svg
                          width="21"
                          height="21"
                          viewBox="0 0 19 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="cursor-pointer"
                        >
                          <path
                            d="M12.0026 6.33169L11.5697 4.16883C11.4419 4.14332 11.3138 4.11951 11.1854 4.0974C10.6291 3.99512 10.0653 3.93874 9.49972 3.92883C8.934 3.92883 8.30972 4.01026 7.814 4.0974C7.67114 4.12169 7.54257 4.14598 7.42972 4.16883L6.99829 6.33169C6.91376 6.75293 6.70457 7.13903 6.39786 7.43988C6.09114 7.74074 5.70108 7.94245 5.27829 8.01883L4.31686 8.19455C3.59407 8.32613 2.84836 8.17423 2.23464 7.7704C1.62091 7.36656 1.18632 6.74184 1.02115 6.02598L0.924002 5.60598C0.552574 3.99455 1.14829 2.18598 2.79829 1.4374C4.324 0.745975 6.62114 0.00883257 9.49543 0.000261143C11.8149 -0.0129785 14.1096 0.477355 16.2211 1.4374C17.8597 2.18883 18.4454 3.99026 18.0754 5.58883L17.9754 6.02598C17.8103 6.74184 17.3757 7.36656 16.7619 7.7704C16.1482 8.17423 15.4025 8.32613 14.6797 8.19455L13.7183 8.01883C13.296 7.94193 12.9066 7.73999 12.6004 7.43917C12.2943 7.13836 12.0855 6.75254 12.0011 6.33169H12.0026Z"
                            fill="#56B6E0"
                          />
                          <path
                            d="M3.77856 14.2846C3.77856 12.7691 4.3806 11.3156 5.45224 10.244C6.52388 9.17235 7.97733 8.57031 9.49285 8.57031C11.0084 8.57031 12.4618 9.17235 13.5335 10.244C14.6051 11.3156 15.2071 12.7691 15.2071 14.2846C15.2071 15.8001 14.6051 17.2536 13.5335 18.3252C12.4618 19.3968 11.0084 19.9989 9.49285 19.9989C7.97733 19.9989 6.52388 19.3968 5.45224 18.3252C4.3806 17.2536 3.77856 15.8001 3.77856 14.2846ZM8.78142 11.4275C8.59198 11.4275 8.4103 11.5027 8.27635 11.6367C8.14239 11.7706 8.06714 11.9523 8.06714 12.1417V14.9989C8.06714 15.1883 8.14239 15.37 8.27635 15.504C8.4103 15.6379 8.59198 15.7132 8.78142 15.7132H10.9143C11.1037 15.7132 11.2854 15.6379 11.4194 15.504C11.5533 15.37 11.6286 15.1883 11.6286 14.9989C11.6286 14.8094 11.5533 14.6278 11.4194 14.4938C11.2854 14.3599 11.1037 14.2846 10.9143 14.2846H9.49571V12.1417C9.49571 11.9523 9.42045 11.7706 9.2865 11.6367C9.15254 11.5027 8.97086 11.4275 8.78142 11.4275Z"
                            fill="#56B6E0"
                          />
                        </svg>
                      </Tooltip>
                    </>
                  ) : (
                    ""
                  )}

                  <span className="h-8 border border-[#262938]"></span>
                  <Tooltip title="archive">
                    
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 15 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="cursor-pointer"
                      onClick={() => {
                        handleClickOpen("archeiveLargeScreen", true, item?.id);
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
        </TableBody>
      </Table>

      {open.assignLargeScreen ? (
        <AssignFormModal
          open={open.assignLargeScreen}
          handleClose={handleClose}
          type="assign"
        />
      ) : (
        ""
      )}

      {open.reassignLargeScreen ? (
        <AssignFormModal
          open={open.reassignLargeScreen}
          handleClose={handleClose}
          type="reassign"
        />
      ) : (
        ""
      )}
      {open.deleteLargeScreen ? (
        <DeleteModal
          open={open.deleteLargeScreen}
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
          title=" Are you sure you want to Archive the Lead?"
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
