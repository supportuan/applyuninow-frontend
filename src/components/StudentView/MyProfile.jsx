import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/index";
import { environment } from "../../environments/environment";

import Education from "./EducationDetails";
import CustomButton from "../../common/CustomButton";
import { toTitleCase } from "../../utils/helpers";

const MyProfile = () => {
  const [studentData, setStudentData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = () => {
    setLoading(true);
    api
      .get(`${environment.API_BASE_URL}/admin/students/view-info`)
      .then((res) => {
        setStudentData(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

 

  return (
    <div>
      {loading ? (
        <p className="audio text-3xl text-center pt-4">Loading...</p>
      ) : (
        <div className="p-2 md:p-6">
          <div className="flex justify-center md:justify-between  font-audiowide audio py-0">
            <h1 className="text-white hidden md:block relative text-base md:text-2xl text-center md:text-left">
              My Profile
            </h1>
            {studentData?.is_enrolled ? (
              ""
            ) : (
              <div className="hidden md:flex">
                <Link to="/applicant/profile/edit">
                  <CustomButton
                    variant="outlined"
                    size="large"
                    borderRadius="8px"
                    width="w-fit"
                    bgcolor="#151929"
                    className="px-6"
                  >
                    <p className="gradient-text">Edit</p>
                  </CustomButton>
                </Link>
              </div>
            )}
          </div>

          <div className="w-full hidden md:flex border-b mt-2 border-border"></div>

          <div className="flex justify-between mt-1 md:mt-4 px-2">
            <div>
              <p className="text-xl md:text-2xl font-audiowide gradient-text">
                Hey{" "}
                <span className="text-xl md:text-2xl font-audiowide  gradient-text ">
                  {" "}
                  {toTitleCase(studentData?.name.split(' ')[0])},
                </span>
              </p>
              <p className="text-xs font-audiowide text-primary ">
                The More we know about you,
              </p>
              <p className="text-xs font-audiowide text-primary ">
                The more we can assist you the best..!
              </p>
              <p className="text-xs font-audiowide text-primary  ">
                Create your own future and upskill yourself..!
              </p>
            </div>
            <div className="flex md:hidden justify-end">
              {studentData?.is_enrolled ? (
                ""
              ) : (
                <>
                  <Link to="/applicant/profile/edit">
                    <svg
                      className="w-[30px]"
                      width="39"
                      height="40"
                      viewBox="0 0 39 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M28.4204 15.4297C28.3911 15.5378 28.3644 15.6471 28.3337 15.7538C28.2124 16.1765 27.9924 16.5419 27.6816 16.854C24.6772 19.8597 21.6728 22.8655 18.6683 25.87C18.4069 26.1313 18.0962 26.2447 17.7348 26.1353C17.4068 26.0367 17.1908 25.8126 17.1121 25.4752C17.0467 25.1979 17.1001 24.9392 17.2801 24.7138C17.3361 24.6444 17.4015 24.5804 17.4641 24.5178C19.7605 22.2201 22.0581 19.9237 24.3558 17.6274C24.4065 17.5767 24.4745 17.5447 24.5252 17.5101C23.5717 16.5566 22.6582 15.6404 21.6834 14.6656C21.6594 14.7136 21.6434 14.787 21.5994 14.831C18.499 17.9355 15.3972 21.0386 12.2927 24.1377C11.9486 24.4804 11.7873 24.8751 11.8006 25.3606C11.8166 25.9713 11.8033 26.5834 11.802 27.1942C11.802 27.2582 11.802 27.3222 11.802 27.4022C12.0633 27.4022 12.3074 27.4022 12.5514 27.4022C13.0315 27.4022 13.5102 27.4062 13.9903 27.4022C14.3863 27.3982 14.7144 27.2395 15.0078 26.9755C15.4372 26.5887 16.0559 26.6674 16.368 27.1341C16.604 27.4849 16.572 27.9516 16.268 28.2583C15.6879 28.8437 14.9811 29.1798 14.1556 29.1971C13.0648 29.2198 11.974 29.2051 10.8832 29.2025C10.3964 29.2011 10.007 28.8091 10.0057 28.3197C10.003 27.2342 9.99236 26.15 10.0097 25.0645C10.0217 24.2924 10.3231 23.623 10.8391 23.0509C10.9032 22.9802 10.9712 22.9122 11.0392 22.8442C14.7811 19.1023 18.5243 15.3604 22.2635 11.6159C22.6782 11.2011 23.1463 10.9051 23.7331 10.8171C23.7491 10.8144 23.7637 10.7984 23.7784 10.7891C24.0064 10.7891 24.2345 10.7891 24.4612 10.7891C24.4878 10.8011 24.5132 10.8184 24.5398 10.8237C25.0266 10.9064 25.452 11.1144 25.8027 11.4598C26.4561 12.1026 27.1029 12.752 27.747 13.4041C28.0524 13.7135 28.2497 14.0856 28.3484 14.5096C28.3671 14.5896 28.3938 14.667 28.4164 14.7456V15.4284L28.4204 15.4297ZM25.7934 16.1725C26.0147 15.9552 26.2428 15.7498 26.4481 15.5258C26.6868 15.2644 26.6802 14.9137 26.4455 14.6443C26.3588 14.5456 26.2628 14.4549 26.1694 14.3616C25.6573 13.8482 25.1466 13.3348 24.6319 12.824C24.3625 12.556 24.0104 12.4906 23.7584 12.708C23.5024 12.928 23.2917 13.2014 23.0676 13.4455C23.9584 14.3363 24.8732 15.2511 25.7934 16.1712V16.1725Z"
                        fill="url(#paint0_linear_5620_13587)"
                      />
                      <path
                        d="M28.4191 28.4851C28.3031 28.8265 28.107 29.0892 27.735 29.1772C27.6656 29.1932 27.5936 29.2025 27.5229 29.2025C24.8212 29.2025 22.1181 29.2038 19.4164 29.2025C18.9337 29.2025 18.5709 28.8678 18.5096 28.3797C18.4576 27.9543 18.767 27.5303 19.2124 27.4263C19.2991 27.4062 19.3911 27.4063 19.4791 27.4063C22.1328 27.4063 24.7879 27.4063 27.4416 27.4063C27.931 27.4063 28.2004 27.5916 28.3844 28.053C28.3897 28.0677 28.4071 28.077 28.4177 28.089V28.4851H28.4191Z"
                        fill="url(#paint1_linear_5620_13587)"
                      />
                      <rect
                        x="0.5"
                        y="0.5"
                        width="37.4204"
                        height="39"
                        rx="7.5"
                        stroke="url(#paint2_linear_5620_13587)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_5620_13587"
                          x1="10"
                          y1="20.1159"
                          x2="28.7144"
                          y2="20.1159"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#07A1C0" />
                          <stop offset="1" stop-color="#99D592" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_5620_13587"
                          x1="18.5039"
                          y1="28.3161"
                          x2="28.5773"
                          y2="28.3161"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#07A1C0" />
                          <stop offset="1" stop-color="#99D592" />
                        </linearGradient>
                        <linearGradient
                          id="paint2_linear_5620_13587"
                          x1="4.855e-08"
                          y1="20.2532"
                          x2="39.0335"
                          y2="20.2532"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#07A1C0" />
                          <stop offset="1" stop-color="#99D592" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6 mt-6">
            <div className="view-div-mobile p-3 lg:p-6 ">
              <div className="flex justify-between">
                <p className="text-[16px] lg:text-lg gradient-text">
                  My Details
                </p>
              </div>

              <div className="inner-div mt-4 flex flex-col gap-4 lg:grid grid-cols-4 lg:gap-6">
                <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col  lg:gap-1 ">
                  <p className="text-secondary text-xs">First Name</p>
                  <p className="flex lg:justify-start justify-end text-xs lg:text-base break-all">
                    {studentData?.first_name || "--"}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col  lg:gap-1 ">
                  <p className="text-secondary text-xs">Last Name</p>
                  <p className="flex  lg:justify-start justify-end text-xs lg:text-base break-all">
                    {studentData?.last_name || "--"}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col  lg:gap-1 ">
                  <p className="text-secondary text-xs">Phone #</p>
                  <p className="text-xs flex lg:justify-start justify-end lg:text-base">
                    +91 {studentData?.phone}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col  lg:gap-1 ">
                  <p className="text-secondary text-xs ">Email Id</p>
                  <p className="flex  lg:justify-start justify-end text-xs lg:text-base break-word break-all">
                    {studentData?.email || "--"}
                  </p>
                </div>
              </div>
            </div>

            {/*lead Details */}

            <div className="view-div-mobile p-3 lg:p-6">
              <div className="mt-6 bg-light mb-8">
                {studentData ? (
                  <>
                    <Education student={studentData} />
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
