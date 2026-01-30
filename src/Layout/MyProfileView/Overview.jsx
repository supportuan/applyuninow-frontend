import React from "react";
import moment from "moment";
import person from "../../assets/user/person.svg";
import { useState, useEffect, useMemo, useContext } from "react";
import api from "../../api/index";
import { AppContext } from "../../context/Appcontext";
import { Pagination } from "../../components/Shared/Pagination/Pagination";
import { useParams } from "react-router-dom";
import { DateRangePicker } from "../../common/DateRangePicker";

const Overview = ({ usersData }) => {
  return (
    <>
      {/* for desktop */}
      <div className="p-5 bg-light rounded-lg font-audiowide hidden lg:block">
        <p className="">Current Session</p>
        <div className="mt-2 pb-5 rounded-lg bg-tab flex flex-col">
          <div className="flex flex-row items-start text-sm">
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
                  <p>
                    {usersData?.session?.device_info?.client?.name || "--"} on{" "}
                    {usersData?.session?.device_info?.device?.model || "--"}
                  </p>
                  <p>
                    Last Accessed on{" "}
                    {usersData?.session?.last_access_on || "--"}
                  </p>
                  <p>
                    Signed in:{" "}
                    {moment(usersData?.session?.signin_at).format("DD/MM/YYYY")}{" "}
                    {moment(usersData?.session?.signin_at).format("LT")}
                  </p>
                </div>
              </p>
            </div>
            <div>
              <p className="border-b border-border text-text px-24 py-4">
                Location
              </p>
              <p className="px-24 py-5">
                {usersData?.session?.location?.city || "--"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* for tab and mobile */}
      <div className="p-5 bg-light rounded-lg font-audiowide md:block lg:hidden">
        <p className="">Current Session</p>
        <div className="mt-2 rounded-lg bg-tab flex flex-col sm:text-sm text-xs">
          <div className="flex flex-row justify-between items-center p-5">
            <p className="text-text">Browser</p>
            <p>{usersData?.session?.device_info?.client?.name || "--"}</p>
          </div>
          <div className="flex flex-row justify-between p-5">
            <p className="text-text">Device info</p>
            <div className="text-right">
              <p>{usersData?.session?.user_ip || "--"}</p>
              <p>
                {usersData?.session?.device_info?.client?.name || "--"} on{" "}
                {usersData?.session?.device_info?.device?.model || "--"}
              </p>
              <p>
                Last Accessed on {usersData?.session?.last_access_on || "--"}
              </p>
              <p>
                Signed in:{" "}
                {moment(usersData?.session?.signin_at).format("DD/MM/YYYY")}{" "}
                {moment(usersData?.session?.signin_at).format("LT")}
              </p>
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
      </div>
    </>
  );
};

export default Overview;
