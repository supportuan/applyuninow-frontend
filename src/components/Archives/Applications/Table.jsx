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
import Restore from "../../../assets/user/Restore.svg";
import DeleteModal from "../../../common/DeleteModal";

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
  handleDelete,
  handleRestore,
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
                sx={{ color: "#6A6A78", fontSize: "12px", paddingLeft: '10px !important', lineHeight: '18px' }}
              >
                <p className="audio font-audiowide ">{header.title.split(' ')[0]}</p>
                <p className="audio font-audiowide ">{header.title.split(' ')[1]}</p>
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
              <TableCell align="center" sx={{ fontSize: "0.8rem", padding: '10px' }}>
                <p className="audio">
                  {item?.id}
                </p>
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "0.8rem", padding: '10px' }}>
                <p className="audio">
                  {moment(item?.created_at).format("DD/MM/YYYY")}
                </p>
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "0.8rem", padding: '10px' }}>
                <p className="audio">
                  {item?.name || '--'}
                  <br/>
                  {item?.phone ? <> +91 {item?.phone}</> : "--"}
                </p>
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "0.8rem", padding: '10px' }}>
                <p className="audio">{item?.primaryContact?.name || '--'}</p>
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "0.8rem", padding: '10px' }}>
                <span className="flex justify-center">
                  <p className="audio">
                    {/* {item?.destination ? item?.destination : "--"} */}
                    <img src={item?.flag} alt="flag" className="w-12" />
                  </p>
                </span>
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "0.8rem", padding: '10px' }}>
                <p className="audio">{item?.stage || '--'}</p>
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "0.8rem", padding: '10px' }}>
                <p className="audio flex justify-center">
                  <Status>{item?.status || '--'}</Status>
                </p>
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "0.8rem", padding: '10px' }}>
                <span className="flex gap-2 pr-4 justify-center items-center">
                  <Tooltip title="Restore">
                    <img
                      src={Restore}
                      alt="icon"
                      className="cursor-pointer"
                      onClick={(e) => handleRestore(e, item)}
                    />
                  </Tooltip>
                  <span className="h-6 border border-[#262938]"></span>
                  <Tooltip title="Delete">
                    <img
                      src={deleteIcon}
                      alt="icon"
                      className="cursor-pointer"
                      onClick={(e) => handleDelete(e, item)}
                    />
                  </Tooltip>
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
