import React, { useState, useEffect } from "react";
import api from "../../api/index";
import { environment } from "../../environments/environment";
import moment from "moment";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import staffplaceholder from "../../assets/user/staffplaceholder.svg";
import CustomButton from "../../common/CustomButton";
import { makeStyles } from "@mui/styles";
import Tab from "./Tab/Tab";
import Overview from "./Overview";
import KYCDetails from "./KYCDetails";
import Payslips from "./Payslips";
import EditProfile from "./EditProfile";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#262938 !important",
  },
  details: {
    border: "1px solid red",
    margin: " 24px",
    backgroundColor: "#151929",
    borderRadius: "1rem",
  },

  AccordionSummary: {
    borderRadius: "15px",
    margin: "0px",
    padding: "0px",
    maxHeight: "25px",
    // borderBottom: '1px solid #404050',
  },

  tooltip: {
    padding: "8px",
    backgroundColor: "#fff",
  },
}));

const TabConstants = [
  {
    title: "Overview",
  },
  {
    title: "KYC Details",
  },
  {
    title: "Payslips",
  },
];

const ViewProfile = () => {
  const classes = useStyles();
  const [usersData, setUsersData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [profileModal, setProfileModal] = useState(false);
  const intialValues = {
    name: "",
    phone: "",
    image: "",
    new_pwd: "",
    confirm_pwd: "",
  };
  const [params, setParams] = useState(intialValues);

  useEffect(() => {
    getUsersData();
  }, []);

  const getUsersData = () => {
    api
      .get(`${environment.API_BASE_URL}/admin/users/profile/info`)
      .then((res) => {
        setUsersData(res?.data?.data);
        let x = res.data.data;
        setParams({ ...params, name: x.name, phone: x.phone, image: x.image });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const userDetails = [
    {
      name: "User ID",
      value: usersData?.id || "--",
    },
    {
      name: "Phone Number",
      value: usersData?.phone ? `+91 ${usersData?.phone}` : "--",
    },
    {
      name: "Staff Role",
      value: usersData?.role?.name || "--",
    },
    {
      name: "Email ID",
      value: usersData?.email || "--",
    },
    {
      name: "Created Date and time",
      value: `${moment(usersData?.created_at)?.format("DD/MM/YYYY")} ${moment(
        usersData?.created_at
      )?.format("LT")}`,
    },
    {
      name: "Offer Letter",
      value: usersData?.offer_letter || "--",
    },
    {
      name: "Document Status",
      value: usersData?.document_status || "--",
    },
    {
      name: "Emergency Contact Name",
      value: usersData?.emg_contact_name || "--",
    },
    {
      name: "Emergency Phone Number",
      value: usersData?.emg_contact_phone || "--",
    },
  ];

  const editProfile = () => {
    // profileInfo();
    setProfileModal(!profileModal);
  };

  const handleClose = () => {
    setProfileModal(false);
    // getUsersData();
  };
  const downloadDoc = (item) => {
    window.open(item, "_blank");
  };

  return (
    <div className="p-2 lg:p-6 text-white ">
      <p className="text-2xl mb-4">My profile</p>

      {isLoading ? (
        <div className="w-full h-80 flex justify-center items-center">
          <span className="text-3xl">Loading...</span>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="bg-light w-full lg:w-[400px] rounded-lg h-fit">
            <div className="flex lg:flex-col flex-row p-4 lg:justify-center items-center justify-start gap-4 lg:gap-0">
              <div>
                <img
                  className="rounded-lg  sm:h-[174px] sm:w-[173px] h-[101px] w-[102px]"
                  src={usersData?.image || staffplaceholder}
                  alt=""
                />
              </div>
              <div className="ml-4 lg:ml-0">
                <p className="mb-4 lg:mb-2 lg:mt-4 text-left lg:text-center">
                  {usersData?.name}
                </p>
                <CustomButton
                  borderRadius="20px"
                  width="w-fit"
                  variant="outlined"
                  size="medium"
                  bgcolor="#262938"
                  onClick={editProfile}
                  icon={
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.87402 9.22386H9.50032"
                        stroke="url(#paint0_linear_4278_3134)"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.39 0.897396C5.77783 0.433893 6.47499 0.365928 6.94811 0.745866C6.97427 0.766479 7.81474 1.41939 7.81474 1.41939C8.33449 1.7336 8.49599 2.40155 8.1747 2.91129C8.15764 2.93859 3.40597 8.88224 3.40597 8.88224C3.24789 9.07945 3.00792 9.19588 2.75145 9.19867L0.931764 9.22151L0.521765 7.48616C0.464331 7.24215 0.521765 6.98589 0.679851 6.78867L5.39 0.897396Z"
                        stroke="url(#paint1_linear_4278_3134)"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.51074 2L7.23687 4.09356"
                        stroke="url(#paint2_linear_4278_3134)"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_4278_3134"
                          x1="5.87402"
                          y1="9.22739"
                          x2="9.55819"
                          y2="9.22739"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#07A1C0" />
                          <stop offset="1" stop-color="#99D592" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_4278_3134"
                          x1="0.5"
                          y1="4.91595"
                          x2="8.46508"
                          y2="4.91595"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#07A1C0" />
                          <stop offset="1" stop-color="#99D592" />
                        </linearGradient>
                        <linearGradient
                          id="paint2_linear_4278_3134"
                          x1="4.51074"
                          y1="3.06003"
                          x2="7.28037"
                          y2="3.06003"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#07A1C0" />
                          <stop offset="1" stop-color="#99D592" />
                        </linearGradient>
                      </defs>
                    </svg>
                  }
                >
                  <span className="gradient-text text-xs">Edit Profile</span>
                </CustomButton>
              </div>
            </div>
            <div className="flex flex-col ">
              <Accordion
                elevation={0}
                className={classes.root}
                defaultExpanded={true}
              >
                <AccordionSummary
                  expandIcon={
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M19.2498 10C19.2498 4.892 15.1088 0.75 9.99976 0.75C4.89176 0.75 0.749756 4.892 0.749756 10C0.749756 15.108 4.89176 19.25 9.99976 19.25C15.1088 19.25 19.2498 15.108 19.2498 10Z"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M13.4709 11.4453L9.99995 7.95931L6.52895 11.4453"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  }
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    {" "}
                    <p className="text-sm font-audiowide text-white">
                      Basic Details
                    </p>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div className="bg-tab  flex flex-col gap-y-4 rounded-lg p-[18px] font-audiowide ">
                      {userDetails?.map((item, index) => (
                        <div key={index} className="flex justify-between items-start">
                          {
                            item.name != 'Offer Letter' &&
                            <p className="text-xs font-normal text-white  break-all">
                              {item.value}
                            </p>
                          }
                          {
                            item.name == 'Offer Letter' &&
                            <p onClick={() => downloadDoc(item.value)} className="text-xs font-normal text-white  break-all cursor-pointer">
                              Click Here
                            </p>
                          }
                        </div>
                      ))}
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>

          <div className="flex bg-light rounded-lg flex-col w-full gap-5 ">
            <Tab
              cols={TabConstants}
              data={[
                <Overview key="overview" usersData={usersData} />,
                <KYCDetails key="kyc" usersData={usersData} refresh={getUsersData} />,
                <Payslips key="payslips" usersData={usersData} getUsersData={getUsersData} />,
              ]}
            />
          </div>

          {profileModal && (
            <EditProfile
              editProfile={editProfile}
              handleClose={handleClose}
              params={params}
              isLoading={isLoading}
              getUsersData={getUsersData}
            />
          )}
        </div>
      )}
    </div>
  );
};
export default ViewProfile;
