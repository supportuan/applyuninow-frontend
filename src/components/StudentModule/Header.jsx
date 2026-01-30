import { useEffect, useState } from "react";
import filter from "../../assets/allstudents/filter.svg";
import api from "../../api/index";
import moment from "moment";
import { environment } from "../../environments/environment";
import { Link } from "react-router-dom";

export const Header = () => {
  const [role, setRole] = useState();
  const [dateRange, setDateRange] = useState();
  const [showFilter, setShowFilter] = useState(false);
  const [stats, setStats] = useState({});

  useEffect(() => {
    filterStats("all");
  }, []);

  const onSelectRole = (e) => {
    setRole(e.target.value);
  };

  const onSelectDate = (e) => {
    setDateRange(e.target.value);
    filterStats(e.target.value);
  };

  const handleFilter = () => {
    setShowFilter(!showFilter);
  };

  const getStats = (event, from, to) => {
    api
      .get(
        `${environment.API_BASE_URL}/admin/students/statistics?` +
          "from=" +
          from +
          "&to=" +
          to
      )
      .then((res) => {
        setStats(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterStats = (event) => {
    var range;
    switch (event) {
      case "0":
        range = [moment(), moment()];
        break;
      case "-1":
        range = [moment().subtract(1, "days"), moment().subtract(1, "days")];
        break;
      case "-7":
        range = [moment().subtract(6, "days"), moment()];
        break;
      case "-30":
        range = [moment().subtract(29, "days"), moment()];
        break;
      case "TM":
        range = [moment().startOf("month"), moment().endOf("month")];
        break;
      case "LM":
        range = [
          moment().subtract(1, "month").startOf("month"),
          moment().subtract(1, "month").endOf("month"),
        ];
        break;
      case "all":
        range = [
          moment().subtract(1, "month").startOf("month"),
          moment().subtract(1, "month").endOf("month"),
        ];
        break;
    }

    let from = event !== "all" ? moment(range[0]).format("YYYY-MM-DD") : "";
    let to = event !== "all" ? moment(range[1]).format("YYYY-MM-DD") : "";
    getStats(event, from, to);
  };
  return (
    <>
      <div className="flex  lg:items-center justify-between pb-2 ">
        <h1 className=" audio text-white text-xl lg:text-2xl">
        Applications Analytics
        </h1>
        {/* Mobile View And Tablet View filter */}
        <div className="grid grid-flow-col gap-1 relative top-1 lg:hidden">
          <img className="relative top-[5px]" src={filter} alt="filter" />
          <p onClick={handleFilter} className="text-gradient cursor-pointer">
            Filter
          </p>
        </div>

        <div className="hidden gap-3  lg:flex">
        <div className="block">
            <div className="px-5 rounded-md bg-formfieldbg py-1  ">
              <label className="block text-xs text-text">Date Range</label>
              <select
                className="bg-formfieldbg relative right-1"
                onChange={(e) => onSelectDate(e)}
                value={dateRange}
              >
                <option value="all"> All Time </option>
                <option value="0"> Today </option>
                <option value="-1"> Yesterday </option>
                <option value="-7"> Last 7 Days </option>
                <option value="-30"> Last 30 Days </option>
                <option value="TM">This Month </option>
                <option value="LM">Last Month </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-t-line border-t mt-3 lg:mt-0" />

      {/* Tablet And Mobile View Filter Content */}
      <div
        className={`flex-col gap-3  py-3 lg:hidden ${
          showFilter ? "flex" : "hidden"
        }`}
      >
        <div className=" rounded-md ">
          <label className="block text-sm text-text pl-2 mb-1">Roles</label>
          <div className="select">
            <select
              className=" w-full py-3 border border-border px-3 rounded-lg bg-light"
              onChange={(e) => onSelectRole(e)}
              value={role}
            >
              <option>Select Option</option>
              <option value="Admin"> Admin </option>
              <option value="Student"> Student </option>
            </select>
          </div>
        </div>
        <div className=" rounded-md ">
          <label className="block text-sm text-text pl-2 mb-1">
            Date Range
          </label>
          <select
            className=" w-full py-3 border px-3 border-border rounded-lg bg-light"
            onChange={(e) => onSelectDate(e)}
            value={dateRange}
          >
            <option disabled selected>
              {" "}
              Select Date Range{" "}
            </option>
            <option value="all"> All Time </option>
            <option value="0"> Today </option>
            <option value="-1"> Yesterday </option>
            <option value="-7"> Last 7 Days </option>
            <option value="-30"> Last 30 Days </option>
            <option value="TM">This Month </option>
            <option value="LM">Last Month </option>
          </select>
        </div>
        <hr className=" border-t-line border-t mt-2" />
      </div>
      <div className="flex justify-between stats-info">
      <div className="py-3 flex justify-around  md:w-[350px] lg:w-[300px] text-xs text-white bg-light rounded-xl mt-4 border border-border">
        <div>
          <p className="text-4xl font-semibold text-orange">
            {stats?.total_students}
          </p>
          <p>Total Applications </p>
        </div>
        <div>
          <p>InProcess</p>
          <p className="text-4xl font-semibold text-inactivered">
            {stats?.not_enrolled}
          </p>
        </div>

        <div>
          <p>Enrolled </p>
          <p className="text-4xl font-semibold  text-[#99D592]">
            {stats?.enrolled}
          </p>
        </div>
        
      </div>
      <div>
      <button className="submit mt-2 lg:mt-0 py-2 px-3 rounded-lg font-medium relative bottom-2 text-[#000000]">
          <Link to={`/students/create-student`}> + New Student</Link>
        </button>
      </div>

        </div>
    </>
  );
};
