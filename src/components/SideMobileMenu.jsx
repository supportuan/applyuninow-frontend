import React from "react";
import { Link } from "react-router-dom";

import login_star from "../Images/login_star.svg";

export const SideMobileMenu = () => {
  return (
    <div className="h-screen">
      <div className="relative flex items-center my-5">
        <img src={login_star} alt="" width={60} />
        <span className="text-base font-bold text-white audio">
          ApplyUniNow
        </span>

        <svg
          className="absolute right-6 bottom-5"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 2L18 18"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2 18L18 2"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <ul>
        <li className="py-2 text-white border-l-4 border-white cursor-pointer sidelist ">
          <Link to="/dashboard">
            <span>Leads</span>
          </Link>
        </li>
        <li className="py-2 text-white border-l-4 border-white cursor-pointer sidelist ">
          <Link to="/students">
            {" "}
            <span>Applications</span>
          </Link>
        </li>
        <li className="py-2 text-white border-l-4 border-white cursor-pointer sidelist ">
          <Link to="/user">
            <span>Staff</span>
          </Link>
        </li>
        <li className="py-2 text-white cursor-pointer sidelist">
          <span>Log-Out</span>
        </li>
      </ul>
    </div>
  );
};
