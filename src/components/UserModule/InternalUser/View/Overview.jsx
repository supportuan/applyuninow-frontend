import React from "react";
import moment from "moment";
import person from "../../../../assets/user/person.svg";
import { useState, useEffect, useMemo, useContext } from "react";
import api from "../../../../api/index";
import { AppContext } from "../../../../context/Appcontext";
import { Pagination } from "../../../Shared/Pagination/Pagination.jsx";
import { useParams } from "react-router-dom";
import { DateRangePicker } from "../../../../common/DateRangePicker";
import Log1 from "../../../../common/Log";
import { decryptData } from "../../../../utils/helpers";

const initialFilterValues = {
  start_date: "",
  end_date: "",
  page: 1,
};

const Overview = ({ usersData }) => {
  const { BASE_URL } = useContext(AppContext);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState(null);
  const { id } = useParams();
  const [inputs, setInputs] = useState(initialFilterValues);
  const [logsList, setLogsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, metaData] = useState({
    current_page: "",
    total: "0",
    per_page: "0",
  });

  const getLogs = (inputs) => {
    setLoading(true);
    setLogsList([]);
    api
      .get(
        `${BASE_URL}/admin/users/logs/${decryptData(id)}?page=${inputs.page}&start_date=${inputs.start_date}&end_date=${inputs.end_date}&user_type=1`
      )
      .then((res) => {
        console.log(res);
        setLoading(false);
        metaData(res.data.data.meta);
        setLogsList(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useMemo(() => {
    let payload = inputs;
    payload.page = currentPage;
    getLogs(payload);
  }, [currentPage]);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    const sDate = moment(start).format("DD-MM-YYYY");
    const eDate = moment(end).format("DD-MM-YYYY");
    setInputs({ ...inputs, start_date: sDate, end_date: eDate });
    filterDate(inputs);
  };

  const filterDate = (values) => {
    getLogs(values);
  };

  return (
    <>
      {/* for desktop */}
      <div className="p-5 bg-light rounded-lg font-audiowide hidden lg:block">
        <p className="">Current/Last Session</p>
        <div className="mt-2 pb-5 rounded-lg bg-tab flex flex-col">
          {
            usersData?.session && 
            <div className="flex flex-row items-start  text-sm">
            <div>
              <p className="border-b border-border text-text px-20 py-4">
                Browser
              </p>
              <p className="px-20 py-5">
                {usersData?.session?.device_info?.client?.name || "--"}
              </p>
            </div>
            <div>
              <p className="border-b border-border text-text px-24 py-4">
                Device info
              </p>
              <p className="px-24 py-5">
                <div className="flex flex-col justify-center gap-1">
                  <p>{usersData?.session?.user_ip || "--"}</p>
                  {usersData?.session?.device_info ? (
                    <p>
                      {usersData?.session?.device_info?.client?.name || "--"} on{" "}
                      {usersData?.session?.device_info?.device?.model || "--"}
                    </p>
                  ) : (
                    "--"
                  )}
                  <p>
                    Last Accessed on{" "}
                    {usersData?.session?.last_access_on || "--"}
                  </p>

                  {usersData?.session?.signin_at ? (
                    <p>
                      Signed in:{" "}
                      {moment(usersData?.session?.signin_at).format(
                        "DD/MM/YYYY"
                      )}{" "}
                      {moment(usersData?.session?.signin_at).format("LT")}
                    </p>
                  ) : (
                    "--"
                  )}
                </div>
              </p>
            </div>
            <div>
              <p className="border-b border-border text-text px-24 py-4">
                Location
              </p>
              <p className="px-24 py-5">
                {usersData?.session?.location?.city || "--"}{" "}
                {usersData?.session?.location?.region}{" "}
                {usersData?.session?.location?.country}
              </p>
            </div>
          </div>
          }

          {
             !usersData?.session && 
            <div className="flex flex-row items-center justify-center py-4 text-sm">
              <div> No Sessions Found.</div>
              </div>
          }
         
        </div>
      </div>

      {/* for tab and mobile */}
      <div className="p-5 bg-light rounded-lg font-audiowide md:block lg:hidden">
        <p className="">Current Session</p>
        {
          usersData?.session &&

          <div className="mt-2 rounded-lg bg-tab flex flex-col sm:text-sm text-xs">
            <div className="flex flex-row justify-between items-center p-5">
              <p className="text-text">Browser</p>
              <p>{usersData?.session?.device_info?.client?.name || "--"}</p>
            </div>
            <div className="flex flex-row justify-between p-5">
              <p className="text-text">Device info</p>
              <div className="text-right">
                <p>{usersData?.session?.user_ip || "--"}</p>
                {usersData?.session?.device_info ? (
                  <p>
                    {usersData?.session?.device_info?.client?.name || "--"} on{" "}
                    {usersData?.session?.device_info?.device?.model || "--"}
                  </p>
                ) : (
                  "--"
                )}
                <p>
                  Last Accessed on {usersData?.session?.last_access_on || "--"}
                </p>
                {usersData?.session?.signin_at ? (
                  <p>
                    Signed in:{" "}
                    {moment(usersData?.session?.signin_at).format("DD/MM/YYYY")}{" "}
                    {moment(usersData?.session?.signin_at).format("LT")}
                  </p>
                ) : (
                  "--"
                )}
              </div>
            </div>
            <div className="flex flex-row justify-between p-5">
              <p className="text-text">Location</p>
              <p>
                {usersData?.session?.location?.city || "--"}{" "}
                {usersData?.session?.location?.region}{" "}
                {usersData?.session?.location?.country}
              </p>
            </div>
          </div>

        }
        {

          !usersData?.session &&

          <div className="mt-2 rounded-lg bg-tab flex flex-col sm:text-sm text-xs">
            <div> No Sessions Found.</div>
          </div>
        }
       
      </div>

      {/* for desktop, tablet and mobile */}
      <div className="mt-6 p-5 bg-light rounded-lg font-audiowide">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 lg:gap-0">
          <div>
            <p className="">Staff Activity Logs</p>
          </div>
          <div>
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onChange={onChange}
              id="5"
            />
          </div>
        </div>

        <div className="mt-4 p-5 rounded-lg bg-tab flex flex-col gap-4">
          {loading ? (
            <div className="w-full">
              <p className="text-center audio text-xl">Loading....</p>
            </div>
          ) : (
            <>
              {logsList.length > 0 ? (
                <div className="inner-div mt-4">
                  <Log1 logs={logsList} />
                </div>
              ) : (
                <p className="text-center audio text-xl">No data Found!!!</p>
              )}
            </>
          )}
        </div>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={meta.total}
          pageSize={10}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
};

export default Overview;
