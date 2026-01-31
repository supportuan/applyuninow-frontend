import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import { Tooltip } from "@mui/material";
import deleteIcon from "../../../assets/leads/delete.svg";
import Restore from "../../../assets/user/Restore.svg";

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
            {cols.map((header, index) => (
              <TableCell
                key={index}
                align="center"
                sx={{ color: "#6A6A78", fontSize: "12px" }}
              >
                <p className="audio font-audiowide ">{header.title}</p>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={item.id || index}
              sx={{
                height: "16px",
                backgroundColor: "#151929",
                padding: "0px",
              }}
              className={classes.tr}
            >
              <TableCell align="center" sx={{ fontSize: "0.8rem" }}>
                <p className="audio">
                  09
                </p>
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "0.8rem" }}>
                <p className="audio">{item.name}</p>
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "0.8rem" }}>
                <span className="flex gap-2 justify-center items-center">
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
