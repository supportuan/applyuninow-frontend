import React from "react";
import { Link,useLocation } from "react-router-dom";
import { loginUser } from "../utils";
import student from "../assets/navbar/student.svg";
import users from "../assets/navbar/user.svg";
import leads from "../assets/navbar/leads.svg";
import university from '../assets/navbar/university-building.svg';

import login_star from "../Images/login_star.svg";

export const SideMenu = () => {
  let user = loginUser();
  user = JSON.parse(user);


  const location = useLocation();
  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");

  return (
    <div className="h-screen">
      <div className="flex items-center py-10 mt-6">
        <img src={login_star} alt="" width={60} />
        <span className="hidden text-lg font-bold text-white lg:block audio">
          ApplyUniNow
        </span>
      </div>
      {user && user.role_slug === "admin" ? (
        <ul>
          <li
            className={`py-2 text-center text-white cursor-pointer ${
              splitLocation[1] === 'dashboard' ? "bg-hover border-l-4" : ""
            }`}
          >
            <Link to="/dashboard">
              <img
                className="inline-block mr-[9px]"
                width="18"
                height="16"
                viewBox="0 0 18 16"
                src={leads}
                alt="student"
              />
            </Link>
            <span className="hidden lg:inline-block lg:w-16 lg:text-left">
              <Link to="/dashboard"> Leads</Link>
            </span>
          </li>

          <li
            className={`py-2 text-center text-white cursor-pointer ${
              splitLocation[1] === 'students' ? "bg-hover border-l-4" : ""
            }`}
          >
            <Link to="/students" >
              <img
                className="inline-block mr-3"
                width="18"
                height="16"
                viewBox="0 0 18 16"
                src={student}
                alt="student"
              />
            </Link>

            <span className="hidden lg:inline-block lg:w-16 lg:text-left">
              <Link to="/students"> Applications</Link>
            </span>
          </li>
          <li
            className={`py-2 text-center text-white cursor-pointer ${
              splitLocation[1] === 'user' ? "bg-hover border-l-4" : ""
            }`}
          >
            <Link to="/user">
              {" "}
              <img
                className="inline-block mr-3"
                width="18"
                height="16"
                viewBox="0 0 18 16"
                src={users}
                alt="student"
              />
            </Link>
            <span className="hidden lg:inline-block lg:w-16 lg:text-left">
              <Link to="/user">Staff</Link>
            </span>
          </li>
          <li
            className={`py-2 text-center text-white cursor-pointer ${
              splitLocation[1] === 'universities' ? "bg-hover border-l-4" : ""
            }`}
          >
            <Link to="/universities">
              <img
                className="inline-block mr-3"
                width="18"
                height="16"
                viewBox="0 0 18 16"
                src={university}
                alt="universities"
              />
              {" "}
            </Link>
            <span className="hidden lg:inline-block lg:w-16 lg:text-left">
              <Link to="/universities">Universities</Link>
            </span>
          </li>
        </ul>
      ) : (
        ""
      )}

      {user && user.role_slug === "student" ? (
        <ul>
          <li className={`py-2 text-center text-white border-l-4 border-white cursor-pointer ${ splitLocation[1] === 'students' ? "bg-hover border-l-4" : ""}`}
          >
            <svg
              className="inline-block mr-2"
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.6 8.53333C10.1658 8.53333 10.7084 8.7581 11.1085 9.15817C11.5086 9.55825 11.7333 10.1009 11.7333 10.6667V12.2667C11.7333 14.4576 9.50613 16 5.86667 16C2.2272 16 0 14.4576 0 12.2667V10.6667C0 10.1009 0.224761 9.55825 0.624839 9.15817C1.02492 8.7581 1.56754 8.53333 2.13333 8.53333H9.6ZM14.9333 8.53333C15.4991 8.53333 16.0417 8.7581 16.4418 9.15817C16.8419 9.55825 17.0667 10.1009 17.0667 10.6667V11.2C17.0667 13.4283 15.3941 14.9333 12.2667 14.9333C12.1163 14.9333 11.968 14.9301 11.8251 14.9227C12.4 14.2539 12.7403 13.4443 12.7925 12.5216L12.8 12.2667V10.6667C12.8 9.92853 12.5504 9.248 12.1301 8.7072L11.984 8.53333H14.9333ZM5.86667 0C6.35694 -7.30557e-09 6.8424 0.0965654 7.29535 0.284183C7.7483 0.471801 8.15986 0.746796 8.50653 1.09347C8.8532 1.44014 9.1282 1.8517 9.31582 2.30465C9.50344 2.7576 9.6 3.24307 9.6 3.73333C9.6 4.2236 9.50344 4.70907 9.31582 5.16202C9.1282 5.61497 8.8532 6.02653 8.50653 6.3732C8.15986 6.71987 7.7483 6.99487 7.29535 7.18248C6.8424 7.3701 6.35694 7.46667 5.86667 7.46667C4.87653 7.46667 3.92694 7.07333 3.2268 6.3732C2.52667 5.67306 2.13333 4.72347 2.13333 3.73333C2.13333 2.74319 2.52667 1.7936 3.2268 1.09347C3.92694 0.393332 4.87653 1.47543e-08 5.86667 0ZM13.3333 2.13333C14.0406 2.13333 14.7189 2.41428 15.219 2.91438C15.719 3.41448 16 4.09276 16 4.8C16 5.50724 15.719 6.18552 15.219 6.68562C14.7189 7.18572 14.0406 7.46667 13.3333 7.46667C12.6261 7.46667 11.9478 7.18572 11.4477 6.68562C10.9476 6.18552 10.6667 5.50724 10.6667 4.8C10.6667 4.09276 10.9476 3.41448 11.4477 2.91438C11.9478 2.41428 12.6261 2.13333 13.3333 2.13333Z"
                fill="white"
              />
            </svg>{" "}
            <span className="hidden lg:inline-block lg:w-16 lg:text-left">
              <Link to="/students/process-applications">Applications</Link>
            </span>
          </li>
        </ul>
      ) : (
        ""
      )}

    {user && (user.role_slug === "agent" ||  user.role_slug === "executive" ) ? (
        <ul>
          <li
            className={`py-2 text-center text-white cursor-pointer ${
              splitLocation[1] === 'students' ? "bg-hover border-l-4" : ""
            }`}
          >
            <Link to="/students" >
              <img
                className="inline-block mr-3"
                width="18"
                height="16"
                viewBox="0 0 18 16"
                src={student}
                alt="student"
              />
            </Link>

            <span className="hidden lg:inline-block lg:w-16 lg:text-left">
              <Link to="/students"> Applications</Link>
            </span>
          </li>
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};
