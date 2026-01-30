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
import { Link, useNavigate } from "react-router-dom";
import Status from "../../../common/Status";
import { Tooltip } from "@mui/material";
import eye from "../../../assets/leads/eye.svg";
import user from "../../../assets/leads/user.svg";
import deleteIcon from "../../../assets/leads/delete.svg";
import { loginUser } from "../../../utils";
import { inArray } from "jquery";
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

const BasicTable = ({ cols, data, handleClickOpen }) => {
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
                <p className="audio"> {item?.id || '--'}</p>
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
              <Tooltip placement="top"  title={item?.phone ? <> +91 {item?.phone}</> : "--"}>
                <p className="audio text-ellipsis-table">
                  {item?.phone ? <> +91 {item?.phone}</> : "--"}
                </p>
                </Tooltip>
                <Tooltip  placement="bottom" title= {item?.email ? <> {item?.email}</> : "--"}>
                <p className="audio text-ellipsis-table">
                  {item?.email ? <> {item?.email}</> : "--"}
                </p>
                </Tooltip>
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "0.8rem" }}>
                <span className="flex justify-center">
                  <p className="audio">
                    <img src={item?.flag} alt="flag" className="w-12" />
                  </p>
                </span>
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "0.8rem" }}>
                <p className="audio">{item.source || "--"}</p>
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "0.8rem" }}>
              <p className="audio text-xs">{item?.intake_month}</p>
                <p className="audio text-xs">{item?.intake_year || '--'}</p>
              </TableCell>

              <TableCell align="center" sx={{ fontSize: "0.8rem" }}>
                <p className="audio">{item?.user?.name || "--"}</p>
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "0.8rem" }}>
                <p className="audio">
                  <Status>{item.status || "NOT_ASSIGNED"}</Status>
                </p>
              </TableCell>
              <TableCell align="center"  width="200px" sx={{ fontSize: "0.8rem" }}>
                <span className="flex gap-2 pr-4 justify-center items-center">
                  <Tooltip title="view">
                    <Link to={`/leads/explore/view/${encryptData(item?.id)}`}>
                      <img
                        src={eye}
                        alt="icon"
                        className="w-6 cursor-pointer"
                      />
                    </Link>
                  </Tooltip>

                  <span className="h-8 border border-[#262938] "></span>
                  {!item.assigned_to && isAdmin && (
                    <Tooltip title="assign">
                      <img
                        src={user}
                        alt="icon"
                        className="w-6 cursor-pointer"
                        onClick={() => {
                          handleClickOpen("assignLargeScreen", true, item?.id);
                        }}
                      />
                    </Tooltip>
                  )}
                  {item.assigned_to && (
                    <Tooltip title="re-assign">
                      <svg
                        width="21"
                        className=" cursor-pointer"
                        onClick={() => {
                          handleClickOpen(
                            "exe_cancelLargeScreen",
                            true,
                            item?.id
                          );
                        }}
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.4615 0.00620012C5.22154 0.189192 1.00674 4.40399 0.823749 9.64398C0.62186 15.4251 5.39068 20.1952 11.1734 19.9936C16.4134 19.8103 20.6282 15.5955 20.8111 10.3558C21.0134 4.5747 16.2426 -0.196004 10.4615 0.00620012ZM5.49745 13.6037C5.39463 13.6025 5.29364 13.5763 5.20325 13.5273C5.11285 13.4783 5.03578 13.4079 4.97871 13.3224L3.16328 10.6248C3.09872 10.5289 3.06145 10.4173 3.05547 10.3019C3.04948 10.1864 3.075 10.0716 3.1293 9.96952C3.1836 9.86749 3.26463 9.78215 3.36371 9.72265C3.4628 9.66314 3.5762 9.6317 3.69178 9.6317H4.3217C4.34316 9.63174 4.36382 9.62357 4.37945 9.60888C4.39508 9.59418 4.40451 9.57406 4.4058 9.55264C4.63855 6.21249 7.41902 3.57344 10.8174 3.57344C12.2409 3.57136 13.6244 4.04419 14.7488 4.91706C14.7581 4.92446 14.7658 4.93375 14.7713 4.94431C14.7768 4.95487 14.78 4.96648 14.7807 4.97836C14.7814 4.99025 14.7796 5.00216 14.7754 5.0133C14.7712 5.02445 14.7647 5.03458 14.7563 5.04304L13.1686 6.63044C13.1548 6.64429 13.1365 6.65287 13.1171 6.65471C13.0976 6.65655 13.078 6.65153 13.0619 6.64052C12.4862 6.25619 11.8214 6.0262 11.1313 5.97263C10.4412 5.91905 9.74892 6.04368 9.12083 6.33457C8.49274 6.62545 7.94992 7.07284 7.54443 7.63381C7.13894 8.19478 6.88438 8.85053 6.80516 9.53816C6.80369 9.55001 6.80475 9.56205 6.80829 9.57346C6.81183 9.58488 6.81776 9.5954 6.82569 9.60434C6.83362 9.61328 6.84336 9.62043 6.85427 9.62531C6.86517 9.63019 6.877 9.63269 6.88894 9.63265H7.32359C7.4389 9.63304 7.55194 9.66469 7.65067 9.72425C7.74941 9.7838 7.83014 9.86902 7.88428 9.97083C7.93842 10.0726 7.96392 10.1872 7.95809 10.3024C7.95226 10.4175 7.9153 10.529 7.85115 10.6248L7.14217 11.6783L6.0354 13.3224C5.97668 13.4108 5.89659 13.4829 5.80254 13.5321C5.70849 13.5813 5.60355 13.6059 5.49745 13.6037ZM17.9724 10.2821H17.4549C17.3967 10.2819 17.3405 10.3037 17.2977 10.3431C17.2548 10.3825 17.2284 10.4367 17.2237 10.4947C16.9718 13.8125 14.2001 16.4257 10.8174 16.4257C9.45643 16.4274 8.13038 15.9948 7.03225 15.1907C7.00519 15.1711 6.98271 15.1458 6.96636 15.1166C6.95002 15.0874 6.94019 15.055 6.93755 15.0217C6.93492 14.9884 6.93954 14.9548 6.95111 14.9234C6.96267 14.8921 6.9809 14.8636 7.00453 14.8399L8.38658 13.4559C8.42353 13.4192 8.47183 13.3961 8.5236 13.3904C8.57537 13.3847 8.62755 13.3967 8.67162 13.4245C9.24395 13.7829 9.89699 13.9921 10.571 14.0331C11.2451 14.0741 11.9187 13.9454 12.5302 13.6589C13.1417 13.3724 13.6717 12.9372 14.0716 12.3931C14.4716 11.849 14.7287 11.2133 14.8197 10.5441C14.824 10.5115 14.8214 10.4784 14.812 10.4468C14.8025 10.4153 14.7864 10.3862 14.7648 10.3614C14.7432 10.3366 14.7166 10.3167 14.6866 10.303C14.6567 10.2893 14.6242 10.2822 14.5913 10.2821H14.3422C14.2266 10.282 14.1132 10.2506 14.0142 10.1911C13.9151 10.1316 13.8341 10.0462 13.7798 9.94424C13.7255 9.84224 13.6999 9.72739 13.7058 9.61198C13.7117 9.49657 13.7489 9.38494 13.8134 9.28902L14.4814 8.29658L15.6291 6.59139C15.6874 6.50473 15.7661 6.43374 15.8583 6.38465C15.9505 6.33556 16.0533 6.30989 16.1578 6.30989C16.2622 6.30989 16.365 6.33556 16.4572 6.38465C16.5494 6.43374 16.6281 6.50473 16.6864 6.59139L18.5019 9.28902C18.5665 9.38496 18.6037 9.49667 18.6097 9.61217C18.6156 9.72768 18.59 9.84263 18.5356 9.94469C18.4812 10.0467 18.4 10.1321 18.3008 10.1915C18.2016 10.251 18.0881 10.2823 17.9724 10.2821Z"
                          fill="#EF9255"
                        />
                      </svg>
                    </Tooltip>
                  )}
                  {item?.status === "CALL_BACK" ? (
                    <>
                      <span className="h-8 border border-[#262938]"></span>
                      <Tooltip
                        title={item?.callback_time ? moment(item?.callback_time
                          ).format(
                          "DD/MM/YYYY LT"
                        ):''}
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
                  {isAdmin && (
                    <>
                      <span className="h-8 border border-[#262938]"></span>
                      <Tooltip title="delete">
                        <svg
                          width="21"
                          height="21"
                          viewBox="0 0 15 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="cursor-pointer"
                          onClick={() => {
                            handleClickOpen(
                              "archeiveLargeScreen",
                              true,
                              item?.id
                            );
                          }}
                        >
                          <path
                            d="M1.81763 16C1.81763 17.1 2.71763 18 3.81763 18H11.8176C12.9176 18 13.8176 17.1 13.8176 16V6C13.8176 4.9 12.9176 4 11.8176 4H3.81763C2.71763 4 1.81763 4.9 1.81763 6V16ZM13.8176 1H11.3176L10.6076 0.29C10.4276 0.11 10.1676 0 9.90763 0H5.72763C5.46763 0 5.20763 0.11 5.02763 0.29L4.31763 1H1.81763C1.26763 1 0.817627 1.45 0.817627 2C0.817627 2.55 1.26763 3 1.81763 3H13.8176C14.3676 3 14.8176 2.55 14.8176 2C14.8176 1.45 14.3676 1 13.8176 1Z"
                            fill="#EF4949"
                          />
                        </svg>
                      </Tooltip>
                    </>
                  )}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
