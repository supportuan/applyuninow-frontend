import { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import study from "../Images/study.svg";
import uninow from "../Images/uninow.svg";
import "../styles/Header.css";

export const Header = () => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <>
      <div className="relative">
        <div className="w-full flex  justify-between  gap-0 md:gap-2 uninowMobileView mb-0 md:mb-2 items-center">
          <Link to="/">
            <img className="inline h-11 md:h-13 pl-0 lg:pl-8 object-contain w-auto max-w-[180px] md:max-w-[240px]" src={uninow} alt="uninow" />
          </Link>
          <div className="flex space-x-2 items-center pt-2">
            <Link
              to="/login"
              className={`${path === "/explore" ? "hidden" : "block"}`}
            >
              <button className="px-4 py-2 border rounded-lg text-darkblue border-none bg-bglightblue fontChange text-sm hover:bg-slider hover:text-white md:px-5">
                Student
              </button>
            </Link>

            <Link to="/explore" className={`${path == "/explore" ? "hidden" : "block"}`}>
              <button className="px-4 py-2 border rounded-lg text-darkblue border-none bg-bglightblue fontChange text-sm hover:bg-slider hover:text-white md:px-5">
                Explore
              </button>
            </Link>

            <Link
              to="/login"
              className={`${path == "/explore" ? "hidden" : "block"}`}
            >
              <button className="px-4 py-2 border rounded-lg text-darkblue border-none bg-bglightblue fontChange text-sm hover:bg-slider hover:text-white md:px-5">
                Recruiter
              </button>
            </Link>
          </div>
          <img
            className="inline w-32 lg:w-36 h-11 md:h-13 mr-2 lg:mr-10 relative top-1 applyMobileView object-contain"
            src={study}
            alt="applynow"
          />
          <div className="clear hidden"></div>
        </div>
        <div className="w-full py-1 border-4 border-x-0 border-darkblue md:mb-7 ">
          <p className="hidden px-4 justify-center py-2  text-sm  lg:text-base text-white bg-slider md:flex fontChange">
            55000+ graduate courses to choose from 22 study destinations
          </p>
          <div className="bg-slider">
            <p className="justify-center px-4 py-2  md:text-base text-white md:hidden wrapper text-sm lg:text-base ">
              55000+ graduate courses to choose from 22 study destinations
            </p>
          </div>
        </div>
      </div>
    </>
  );
};