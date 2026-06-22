import React, { useRef, useEffect, useState, useContext } from "react";
import {
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import loadable from "@loadable/component";
import Validator from "validatorjs";

//Pages
import { Home } from "../Pages/Home";
import { NotFound } from "../Pages/NotFound";

//utils
import { isLogin, loginUser } from "../utils";
import api from "../api/index";
import { AppContext } from "../context/Appcontext";
import { encryptData, uuid } from "../utils/helpers";
import { environment } from "../environments/environment";
import Badge from "@mui/material/Badge";
import CustomButton from "../common/CustomButton";

// assests
import login_star from "../Images/login_star.svg";
import Application from "../assets/navbar/Application.svg";
import Profile from "../assets/navbar/Profile.svg";
import staff from "../assets/navbar/staff.svg";
import leads from "../assets/navbar/leads.svg";
import settings from "../assets/navbar/settings.svg";
import NotificationIcon from "../assets/navbar/notification.svg";
import marketing from "../assets/navbar/marketing.svg";
import resources from "../assets/navbar/resources.svg";
import Resource from "../assets/navbar/Resource.svg";
import Revenue from "../assets/navbar/Revenue.svg";
import Faqs from "../assets/navbar/Faqs.svg";
import AddOns from "../assets/navbar/AddOns.svg";
import ChatHistory from "../assets/navbar/ChatHistory.svg";
import TermsIcon from "../assets/navbar/TermsIcon.svg";
import POCIcon from "../assets/navbar/POCIcon.svg";
import FeedbackIcon from "../assets/navbar/FeedbackIcon.svg";
import MediaIcon from "../assets/navbar/MediaIcon.svg";

import FaqsListing from "../components/Resources/faqs/Faqs";
import LeadListing from "../components/Lead/Explore/LeadListing";
import LeadCreate from "../components/Lead/Explore/LeadCreate";
import Archives from "../assets/navbar/Archives.svg";
import View from "../components/Lead/Explore/View";
import AddOnListing from "../components/Lead/AddOn/AddOnListing";
import AddOnView from "../components/Lead/AddOn/View";
import AddOnCreate from "../components/Lead/AddOn/AddOnCreate";
import MyProfile from "../components/StudentView/MyProfile";
import EditStudentForm from "../components/StudentView/Edit";

import Resources from "../components/StudentViewModule/Resources/Resources";
import MediumOfInstruction from "../components/StudentViewModule/Resources/MediumOfInstruction";
import FaqsList from "../components/StudentViewModule/FAQ/FaqsListing";
import AddOnsListing from "../components/StudentViewModule/Add-ons/AddOnsListing";
import ViewChatHistory from "../components/StudentViewModule/ChatHistory/ChatHistory";
import TermsConditions from "../components/StudentViewModule/TermsConditions/TermsConditions";
import PointOfContact from "../components/StudentViewModule/POC/PointOfContact";
import Feedback from "../components/StudentViewModule/GiveFeedback/Feedback";
import Media from "../components/StudentViewModule/Media/Media";

import CurrentListing from "../components/Applications/current/CurrentListing";
import ApplicationCreate from "../components/Applications/current/ApplicationCreate";
import UserRolesListing from "../components/Settings/UserRolesListing";
import StudentCreate from "../components/Applications/create/StudentCreate";
import SubIndustryList from "../components/Settings/studySubIndustry/StudySubIndustryList";
import Notification from "../Pages/Notification.jsx";
import FeedbackListing from "../components/Feedback/FeedbackListing";
import LogOutConfirmModel from "./LogOut";
import PreDepartureSupport from "../components/StudentViewModule/Add-ons/PreDepartureSupport";

// lazy loading components
const AboutUs = loadable(() => import("../Pages/AboutUs"));
const PrivacyPolicy = loadable(() => import("../Pages/PrivacyPolicy"));
const StudentExplore = loadable(() => import("../Pages/StudentExplore"));
const AdditionalServices = loadable(() =>
  import("../Pages/AdditionalServices")
);
const Login = loadable(() => import("../Pages/Login"));
const StudentLogin = loadable(() => import("../Pages/StudentLogin"));
const CountryDetails = loadable(() => import("../Pages/CountryDetails"));
const ResetPassword = loadable(() => import("../Pages/ResetPassword"));
const CreatePassword = loadable(() => import("../Pages/CreatePassword"));
const StudentsList = loadable(() => import("../Pages/StudentList"));

const ViewProfile = loadable(() =>
  import("../Layout/MyProfileView/ViewProfile")
);
const IndustryList = loadable(() =>
  import("../components/Settings/studyIndustry/StudyIndustryList")
);
const StudyAreaListing = loadable(() =>
  import("../components/Settings/studyAreas/StudyAreaListing")
);
const CreateInternalStaff = loadable(() =>
  import("../components/UserModule/InternalUser/CreateInternalStaff")
);
const CreateExternalStaff = loadable(() =>
  import("../components/UserModule/ExternalUser/CreateExternalStaff")
);
const InternalStaffsListing = loadable(() =>
  import("../Pages/InternalStaffsListing")
);
const InternalStaffView = loadable(() =>
  import("../components/UserModule/InternalUser/View/InternalStaffView")
);
const ExternalStaffView = loadable(() =>
  import("../components/UserModule/ExternalUser/View/ExternalStaffView")
);
const ExternalStaffsListing = loadable(() =>
  import("../Pages/ExternalStaffsListing")
);
const UpdatePassword = loadable(() => import("../Pages/UpdatePassword"));
const EditInternalStaff = loadable(() =>
  import("../components/UserModule/InternalUser/EditInternalStaff")
);
const EditExternalStaff = loadable(() =>
  import("../components/UserModule/ExternalUser/EditExternalStaff")
);
const EditStudent = loadable(() => import("../Pages/EditStudent"));
const UniversityListing = loadable(() =>
  import("../components/Settings/university/UniversitiesList")
);
const UniversityCreate = loadable(() =>
  import("../components/Settings/university/UniversityCreate")
);
const InternalRevenueList = loadable(() =>
  import("../components/Revenue/InternalRevenueList")
);
const ExternalRevenueList = loadable(() =>
  import("../components/Revenue/ExternalRevenueList")
);
const InternalResourcesListing = loadable(() =>
  import("../components/Resources/InternalResourcesList")
);
const ExternalResourcesListing = loadable(() =>
  import("../components/Resources/ExternalResourcesList")
);

const ResourcesSubList = loadable(() =>
  import("../components/Resources/ResourcesSubList")
);

const LeadExploreRecords = loadable(() =>
  import("../components/Archives/LeadExplore/LeadExploreRecords")
);
const LeadAddOnRecords = loadable(() =>
  import("../components/Archives/LeadAddon/LeadAddOnRecords")
);
const InternalStaffsRecords = loadable(() =>
  import("../components/Archives/InternalStaff/InternalStaffsRecords")
);
const ExternalStaffsRecords = loadable(() =>
  import("../components/Archives/ExternalStaff/ExternalStaffsRecords")
);
const ApplicationRecords = loadable(() =>
  import("../components/Archives/Applications/ApplicationRecords")
);
const ResourcesRecords = loadable(() =>
  import("../components/Archives/Resources/ResourcesRecords")
);

const ApplicationView = loadable(() =>
  import("../components/ViewStudentDetail/ApplicationView")
);

const MyApplicationProcess = loadable(() =>
  import("../components/OnlyStudents/MyApplicationProcess")
);

const USER_ROLES = ['ADMIN_USERS'];

function useOutsideAlerter(ref, callbak) {
  useEffect(() => {
    /**
     * clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callbak(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const PrivateRoute = ({ children, role }) => {
  const [sideMenu, setSideMenu] = React.useState(false);
  const [showLogout, setShowLogout] = React.useState(false);
  const [isSidebarOpen, setMenuOpen] = React.useState(true);
  const [showNotification, setNoticication] = React.useState(false);
  const [showUserInfo, setUserInfo] = React.useState(false);
  const [showSubMenu, setShowSubMenu] = React.useState(false);
  const [notificationsList, setNotificationList] = React.useState([]);
  const [notificationCount, setNotificationCount] = React.useState(0);
  const [notificationMeta, setNotificationMeta] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    const auth = isLogin();
    let user = "";
    let loggedUser = loginUser();
    if (loggedUser) {
      user = JSON.parse(loggedUser);
    }

    if (user && user.role_slug != "student") {
      fetchNotifications();
    }
  }, []);
  const loadMoreNotifications = () => {
    setIsLoading(true);
    api
      .get(
        `${environment.API_BASE_URL}/admin/notifications?page=${
          notificationMeta.current_page + 1
        }`
      )
      .then((res) => {
        setIsLoading(true);
        let list = [...notificationsList, ...res.data.data.data];
        setNotificationList(list);
        setNotificationCount(0);
        setNotificationMeta(res.data.data.meta);
      })
      .catch((error) => {});
  };
  const notificationMarkAsRead = () => {
    api
      .post(`${environment.API_BASE_URL}/admin/notifications/mark_as_read`, {})
      .then((res) => {})
      .catch((error) => {});
  };
  const notificationClearAll = () => {
    api
      .post(`${environment.API_BASE_URL}/admin/notifications/clear_all`, {})
      .then((res) => {
        setNotificationList([]);
        setNotificationCount(0);
        setNoticication(false);
      })
      .catch((error) => {});
  };
  const fetchNotifications = () => {
    api
      .get(`${environment.API_BASE_URL}/admin/notifications`)
      .then((res) => {
        setNotificationList(res.data.data.data);
        setNotificationCount(res.data.count);
        setNotificationMeta(res.data.data.meta);
        if (res.data.count) {
          notificationMarkAsRead();
        }
      })
      .catch((error) => {});
  };

  const onNotificaionClick = (item) => {
    if (item.category == 1) {
      navigate(`/leads/explore/view/${encryptData(item?.navigation_id)}`);
    } else {
      navigate(
        `/students/view-student-detail/${encryptData(item?.navigation_id)}`
      );
    }
    setNoticication(false);
  };

  const location = useLocation();
  let navigate = useNavigate();

  const wrapperInfoRef = useRef(null);
  useOutsideAlerter(wrapperInfoRef, setUserInfo);

  const wrapperNofificationRef = useRef(null);
  useOutsideAlerter(wrapperNofificationRef, setNoticication);

  const auth = isLogin();
  let user = "";
  let loggedUser = loginUser();
  if (loggedUser) {
    user = JSON.parse(loggedUser);
  }

  if (!auth) {
    return <Navigate to="/" />;
  }

  let SYSTEM_ROUTES = [
    {
      name: "Leads",
      icon: leads,
      active_icon: leads,
      sub_menus: [
        {
          name: "Explore",
          url: "leads/explore",
          sub_module: "explore",
        },
        {
          name: "Add On",
          url: "leads/add_on",
          sub_module: "add_on",
        },
      ],
      index: 0,
      url: "leads/explore",
      module: "leads",
    },
    {
      name: "Applications",
      icon: Application,
      active_icon: Application,
      index: 1,
      sub_menus: [],
      url: "students/application/current",
      module: "students",
    },
    {
      name: "Staffs",
      icon: staff,
      active_icon: staff,
      sub_menus: [
        {
          name: "Internal",
          url: "users/internal",
          sub_module: "internal",
        },
        {
          name: "External",
          url: "users/external",
          sub_module: "external",
        },
      ],
      index: 2,
      url: "users/internal",
      module: "users",
    },
    {
      name: "Settings",
      icon: settings,
      active_icon: settings,
      index: 3,
      sub_menus: [
        {
          name: "Universities",
          url: "settings/universities",
          sub_module: "universities",
        },
        {
          name: "Study Industry",
          url: "settings/study_industries",
          sub_module: "study_industries",
        },
        {
          name: "Study Area",
          url: "settings/study_sub_industries",
          sub_module: "study_sub_industries",
        },
        {
          name: "Subject Area",
          url: "settings/study_areas",
          sub_module: "study_areas",
        },
        {
          name: "User Roles",
          url: "settings/roles",
          sub_module: "roles",
        },
      ],
      url: "settings/universities",
      module: "settings",
    },

    {
      name: "Resources",
      icon: Resource,
      active_icon: Resource,
      index: 4,
      sub_menus: [
        {
          name: "Internal",
          url: "resources/internal",
          sub_module: "internal",
        },
        {
          name: "External",
          url: "resources/external",
          sub_module: "external",
        },
        {
          name: "FAQ'S",
          url: "resources/faqs",
          sub_module: "faqs",
        },
      ],
      url: "resources/internal",
      module: "resources",
    },
    {
      name: "Archives",
      icon: Archives,
      active_icon: Archives,
      index: 3,
      sub_menus: [
        {
          name: "Explore",
          url: "archives/leads_explore_records",
          sub_module: "leads_explore_records",
        },
        {
          name: "Add ons",
          url: "archives/leads_addon_records",
          sub_module: "leads_addon_records",
        },
        {
          name: "Applications",
          url: "archives/application_records",
          sub_module: "application_records",
        },
        {
          name: "Internal Staffs",
          url: "archives/internal_staffs_records",
          sub_module: "internal_staffs_records",
        },
        {
          name: "External Staffs",
          url: "archives/external_staffs_records",
          sub_module: "external_staffs_records",
        },
        {
          name: "Resources",
          url: "archives/resources_records",
          sub_module: "resources_records",
        },
      ],
      url: "archives/leads_explore_records",
      module: "archives",
    },

    {
      name: "Feedback",
      icon: FeedbackIcon,
      active_icon: FeedbackIcon,
      index: 2,
      sub_menus: [],
      url: "feedbacks",
      module: "feedbacks",
    },
  ];

  let ROUTES =
    user && user.role_slug !== "student"
      ? SYSTEM_ROUTES.filter((x) => {
          let is_match = Array.isArray(user.user_permissions)
            ? user.user_permissions.find((y) => y.slug === x.module)
            : false;
          return is_match ? true : false;
        }).map((x) => {
          x.sub_menus = x.sub_menus.filter((y) => {
            let is_match = user.user_permissions.find(
              (z) => z.slug === y.sub_module
            );
            return is_match ? true : false;
          });
          return x;
        })
      : SYSTEM_ROUTES;

  if (user.role_slug == "student") {
    ROUTES = [
      {
        name: "My Profile",
        icon: Profile,
        active_icon: Profile,
        index: 1,
        sub_menus: [],
        url: "applicant/profile/view",
        module: "applicant",
      },
      {
        name: "My Application",
        icon: Application,
        active_icon: Application,
        index: 1,
        sub_menus: [],
        url: "students/process-applications",
        module: "students",
      },
      {
        name: "Resources",
        icon: Resource,
        active_icon: Resource,
        index: 2,
        sub_menus: [],
        url: "resources/listing",
        module: "resources",
      },
      {
        name: "FAQ",
        icon: Faqs,
        active_icon: Faqs,
        index: 2,
        sub_menus: [],
        url: "faqs/listing",
        module: "faqs",
      },
      {
        name: "Give Feedback",
        icon: FeedbackIcon,
        active_icon: FeedbackIcon,
        index: 2,
        sub_menus: [],
        url: "feedback",
        module: "feedback",
      },
      {
        name: "Add-ons",
        icon: AddOns,
        active_icon: AddOns,
        index: 2,
        sub_menus: [],
        url: "add-ons/listing",
        module: "add-ons",
      },
      {
        name: "Media",
        icon: MediaIcon,
        active_icon: MediaIcon,
        index: 2,
        sub_menus: [],
        url: "media",
        module: "media",
      },
      {
        name: "POC",
        icon: POCIcon,
        active_icon: POCIcon,
        index: 2,
        sub_menus: [],
        url: "point-of-contact",
        module: "point-of-contact",
      },
      {
        name: "Chat History",
        icon: ChatHistory,
        active_icon: ChatHistory,
        index: 2,
        sub_menus: [],
        url: "chat-history",
        module: "chat-history",
      },
      {
        name: "T&C | Policy",
        icon: TermsIcon,
        active_icon: TermsIcon,
        index: 2,
        sub_menus: [],
        url: "terms-and-conditions",
        module: "terms-and-conditions",
      },
    ];
  }

  const { pathname } = location;
  const splitLocation = pathname.split("/");

  function toogleNotification() {
    if (showNotification) {
      return setNoticication(false);
    }
    setNoticication(true);
  }

  function toogleUserInfo() {
    if (showUserInfo) {
      return setUserInfo(false);
    }
    setUserInfo(true);
  }

  function toogleSubMenu(item) {
    if (item.sub_menus.length) {
      setShowSubMenu(
        showSubMenu && splitLocation.includes(item.module) ? false : true
      );
    }
  }

  function logout() {
    localStorage.clear();
    toast.success("Logout Successfully");
    navigate("/");
  }

  const editProfile = () => {
    navigate("/profile/info");
    setUserInfo(false);
  };

  return auth && user && ((role.includes('student') && role.includes(user.role_slug) || user.role_slug !='student')) ? (
    <div className="flex h-screen overflow-y-hidden bg-sidemenu text-white">
      {showLogout ? (
        <>
          <LogOutConfirmModel
            open={showLogout}
            handleClose={(e) => {
              setShowLogout(false);
            }}
            submit={() => logout()}
          />
        </>
      ) : null}
      <aside
        className={`fixed inset-y-0 z-10  flex-col flex-shrink-0 w-[215px]  border-r
       max-h-screen overflow-hidden transition-all transform bg-lightGray border-r-thinkLine hidden lg:flex
       shadow-lg lg:z-auto lg:static lg:shadow-none ${
         !isSidebarOpen ? "-translate-x-full lg:translate-x-0 lg:w-20" : ""
       }`}
      >
        <div
          className={`flex items-center justify-center  flex-shrink-0  ${
            !isSidebarOpen ? "lg:justify-center" : ""
          }`}
        >
          <span className="p-2 text-xl font-semibold leading-8 tracking-wider  whitespace-nowrap">
            <div className="flex flex-col justify-center items-center  pb-2 mt-6">
              <img src={login_star} alt="" width={60} />
              <span
                className={`text-base flex-row  font-bold text-white audio ${
                  isSidebarOpen ? "flex" : "hidden"
                } 
              ${user.role_slug != "student" ? "text-slider" : "text-gold"}`}
              >
                <p>Apply</p>
                <p>UniNow</p>
              </span>
            </div>
          </span>
          <button
            type="button"
            className="p-2 rounded-md lg:hidden"
            onClick={() => setMenuOpen(!isSidebarOpen)}
          >
            <svg
              className="w-6 h-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav
          className="flex-1 text-sm overflow-hidden hover:overflow-y-auto"
          id="slimscrool"
        >
          <ul className="overflow-hidden">
            {ROUTES.map((x) => (
              <li
                key={uuid()}
                className={`py-1 menu ${
                  x.sub_menus.length && isSidebarOpen ? "is-sub-menu" : ""
                }
               ${
                 x.url && splitLocation.includes(x.module) ? "active-link" : ""
               }`}
              >
                <Link
                  to={`/${x.url}`}
                  onClick={() => toogleSubMenu(x)}
                  className={`flex items-center py-3 px-4  space-x-4   ${
                    !isSidebarOpen ? "justify-center" : ""
                  }`}
                >
                  <span>
                    <img
                      src={`${
                        x.module && splitLocation.includes(x.module)
                          ? x.active_icon
                          : x.icon
                      }`}
                      alt="Setting"
                    />
                  </span>
                  <span className={`${!isSidebarOpen ? "lg:hidden" : ""}`}>
                    {x.name}
                  </span>
                </Link>

                <ul
                  className={`submenu ${
                    x.sub_menus.length &&
                    isSidebarOpen &&
                    splitLocation.includes(x.module) &&
                    showSubMenu
                      ? "block"
                      : "hidden"
                  }`}
                >
                  {x.sub_menus.map((y) => (
                    <li
                      key={uuid()}
                      className={`${
                        splitLocation.includes(y.sub_module)
                          ? "bg-sub-nav-active"
                          : ""
                      }`}
                    >
                      <Link to={`/${y.url}`}>
                        <a>
                          <span>{y.name}</span>
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
        <div
          className={`flex-shrink-0 p-2 border-t border-t-tab  max-h-14 ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        >
          <div
            className={`flex items-center justify-center w-full text-sm px-4 py-2 space-x-1 ${
              !isSidebarOpen ? "flex-col" : ""
            }`}
          >
            <span className="text-xs text-yellow">Powered by</span>
            <p className="text-xs">Scube</p>
          </div>
        </div>
      </aside>

      <div
        className={`fixed z-10 w-full bg-sidemenus transition-all block lg:hidden h-menu ${
          sideMenu ? "h-menu-active" : ""
        } `}
      >
        <div className="h-screen overflow-auto">
          <div className="relative flex items-center mt-2">
            <img src={login_star} alt="" width={60} />
            <span className="text-base font-bold text-white audio">
              ApplyUniNow
            </span>

            <svg
              onClick={() => setSideMenu(false)}
              className="absolute right-6 bottom-5 cursor-pointer"
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
          <ul className="mb-20 text-sm pt-8">
            {ROUTES.map((x) => (
              <li
                className={`py-1 text-white border-l-4 border-white cursor-pointer
               ${x.url && splitLocation.includes(x.module) ? "sidelist" : ""}`}
                key={uuid()}
              >
                <Link
                  to={`/${x.url}`}
                  onClick={() => !x.sub_menus.length && setSideMenu(false)}
                  className={`flex items-center py-2 px-2  space-x-4 rounded-md  ${
                    !isSidebarOpen ? "justify-center" : ""
                  }`}
                >
                  <span className={`${!isSidebarOpen ? "lg:hidden" : ""}`}>
                    {x.name}
                  </span>
                </Link>
                {x.sub_menus.length ? (
                  <ul className="submenu">
                    {x.sub_menus.map((y) => (
                      <li
                        key={uuid()}
                        className={`${
                          splitLocation.includes(y.sub_module)
                            ? "bg-sub-nav-active"
                            : ""
                        }`}
                        onClick={() => setSideMenu(false)}
                      >
                        <Link
                          to={`/${y.url}`}
                          onClick={() => setSideMenu(false)}
                        >
                          <a>
                            <span>{y.name}</span>
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <header className="flex-shrink-0">
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center space-x-3">
              <button
                className="p-2 cursor-pointer rounded-md focus:outline-none focus:ring hidden lg:block"
                type="button"
                onClick={() => setMenuOpen(!isSidebarOpen)}
              >
                <svg
                  className="w-4 h-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              </button>

              <div>
              <svg
              onClick={() => setSideMenu(true)}
              className="absolute cursor-pointer top-3 left-1 md:left-4  block lg:hidden"
                width="50"
                height="48"
                viewBox="0 0 40 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 10C10 10 25.9446 10 30 10M10 28.8235H30"
                  stroke="white"
                  stroke-width="2.11036"
                  stroke-linecap="round"
                />
                <path
                  d="M10 19L30 19"
                  stroke="url(#paint0_linear_5737_12501)"
                  stroke-width="2.11"
                  stroke-linecap="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_5737_12501"
                    x1="10"
                    y1="19.5063"
                    x2="30.3191"
                    y2="19.5063"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#07A1C0" />
                    <stop offset="1" stop-color="#99D592" />
                  </linearGradient>
                </defs>
              </svg>
              </div>
              
            </div>

            <div
              className="relative flex items-center space-x-0 md:space-x-3 pr-0 md:pr-3"
              ref={wrapperNofificationRef}
            >
              {user.role_slug !== "student" && (
                <div className="items-center space-x-3 md:flex">
                  <div className="relative">
                    <Badge badgeContent={notificationCount} color="secondary">
                      <img
                        className="cursor-pointer"
                        src={NotificationIcon}
                        alt="Notification"
                        onClick={() => toogleNotification()}
                      />
                    </Badge>

                    {showNotification ? (
                      <div
                        className={`absolute block z-10 mt-5 transform bg-light rounded-md 
                   shadow-lg -translate-x-3/4 ${
                     showNotification ? "block" : "hidden"
                   }`}
                      >
                        <Notification
                          clear={notificationClearAll}
                          onNotificaionClick={onNotificaionClick}
                          notificationsList={notificationsList}
                          meta={notificationMeta}
                          loading={isLoading}
                          loadMoreNotifications={loadMoreNotifications}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              )}

              <div className="relative" ref={wrapperInfoRef}>
                <div
                  className="m-1 mr-2 w-10 h-10 relative flex justify-center
              items-center rounded-full bg-slider text-xl text-white uppercase cursor-pointer"
                  onClick={() => toogleUserInfo()}
                >
                  {user?.name?.charAt(0)}
                </div>

                <div
                  className={`absolute  user-login-info  mt-3 transform -translate-x-full bg-light  z-10 rounded-md shadow-lg ${
                    showUserInfo ? "block" : "hidden"
                  } `}
                >
                  <div className="flex flex-col p-4 space-y-1 font-medium">
                    <span className="text-gray-800"> {user?.name}</span>
                    <span className="text-sm text-gray-400">{user?.email}</span>
                  </div>
                  {user.role_slug !== "student" && (
                    <ul className="flex flex-col p-2 my-1 space-y-1">
                      <li>
                        <a
                          onClick={editProfile}
                          className="cursor-pointer block px-2 py-1 transition rounded-md "
                        >
                          Edit Profile
                        </a>
                      </li>
                    </ul>
                  )}

                  <div className="flex items-center justify-end py-2 px-3">
                    <CustomButton
                      variant="outlined"
                      size="large"
                      borderRadius="8px"
                      width="w-fit"
                      bgcolor="#151929"
                      className="px-6"
                      onClick={(e) => setShowLogout(true)}
                    >
                      <p className="gradient-text">Logout</p>
                    </CustomButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 max-h-full  overflow-hidden overflow-y-scroll bg-tab">
          {children}
        </main>
      </div>
    </div>
  ) : auth && user && role.includes("student") ? (
    <Navigate to="/applicant/profile/view" />
  ) : (
    <Navigate to="/leads/explore" />
  );
};

const RestrictedRoute = ({ children }) => {
  const auth = isLogin();

  let user = "";
  let loggedUser = loginUser();
  if (loggedUser) {
    user = JSON.parse(loggedUser);
  }

  return !auth ? (
    children
  ) : user && user.role_slug != "student" ? (
    <Navigate to="/leads/explore" />
  ) : (
    <Navigate to="/applicant/profile/view" />
  );
};

export const Layout = () => {
  return (
    <div className="overflow-hidden">
      <Routes>
        {/* Public routes */}
        <>
          <Route exact path="/" element={<Home />}></Route>

          <Route exact path="/about-us" element={<AboutUs />}></Route>

          <Route
            exact
            path="/terms-conditions"
            element={<PrivacyPolicy />}
          ></Route>

          <Route exact path="/explore" element={<StudentExplore />}></Route>

          <Route
            exact
            path="/additional-services"
            element={<AdditionalServices />}
          ></Route>
        </>

        {/* Restricted routes */}
        <>
          <Route
            exact
            path="/login"
            element={
              <RestrictedRoute>
                <Login />
              </RestrictedRoute>
            }
          ></Route>
          <Route
            exact
            path="/login"
            element={
              <RestrictedRoute>
                <StudentLogin />
              </RestrictedRoute>
            }
          ></Route>
          <Route
            exact
            path="/forget-password"
            element={
              <RestrictedRoute>
                <ResetPassword />
              </RestrictedRoute>
            }
          ></Route>
          <Route
            exact
            path="/reset-password"
            element={
              <RestrictedRoute>
                <CreatePassword />
              </RestrictedRoute>
            }
          ></Route>
          <Route
            exact
            path="/update-password"
            element={
              <RestrictedRoute>
                <UpdatePassword />
              </RestrictedRoute>
            }
          ></Route>
        </>
        {/* Authenticated routes */}

        {/* Staff Routes */}
        <>
          <Route
            exact
            path="/profile/info"
            element={
              <PrivateRoute role={USER_ROLES}>
                <ViewProfile />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/users/internal"
            element={
              <PrivateRoute role={USER_ROLES}>
                <InternalStaffsListing />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/users/internal/view/:id"
            element={
              <PrivateRoute role={USER_ROLES}>
                <InternalStaffView />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/users/external"
            element={
              <PrivateRoute role={USER_ROLES}>
                <ExternalStaffsListing />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/users/external/view/:id"
            element={
              <PrivateRoute role={USER_ROLES}>
                <ExternalStaffView />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/users/internal/create-staff"
            element={
              <PrivateRoute role={USER_ROLES}>
                <CreateInternalStaff />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/users/internal/edit-staff/:id"
            element={
              <PrivateRoute role={USER_ROLES}>
                <EditInternalStaff />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/users/external/create-staff"
            element={
              <PrivateRoute role={USER_ROLES}>
                <CreateExternalStaff />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/users/external/edit-staff/:id"
            element={
              <PrivateRoute role={USER_ROLES}>
                <EditExternalStaff />
              </PrivateRoute>
            }
          ></Route>
        </>

        {/* Settings Routes */}
        <>
          <Route
            exact
            path="/settings/universities"
            element={
              <PrivateRoute role={USER_ROLES}>
                <UniversityListing />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="settings/universities/create"
            element={
              <PrivateRoute role={USER_ROLES}>
                <UniversityCreate />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/settings/universities/edit/:id"
            element={
              <PrivateRoute role={USER_ROLES}>
                <UniversityCreate />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/settings/study_industries"
            element={
              <PrivateRoute role={USER_ROLES}>
                <IndustryList />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/settings/study_sub_industries"
            element={
              <PrivateRoute role={USER_ROLES}>
                <SubIndustryList />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/settings/study_areas"
            element={
              <PrivateRoute role={USER_ROLES}>
                <StudyAreaListing />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/settings/roles"
            element={
              <PrivateRoute role={USER_ROLES}>
                <UserRolesListing />
              </PrivateRoute>
            }
          ></Route>
        </>

        {/* Resources Routes */}
        <>
          <Route
            exact
            path="/resources/internal"
            element={
              <PrivateRoute role={USER_ROLES}>
                <InternalResourcesListing />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/resources/external"
            element={
              <PrivateRoute role={USER_ROLES}>
                <ExternalResourcesListing />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/resources/view/:type/:slug"
            element={
              <PrivateRoute role={USER_ROLES}>
                <ResourcesSubList />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/resources/faqs"
            element={
              <PrivateRoute role={USER_ROLES}>
                <FaqsListing />
              </PrivateRoute>
            }
          ></Route>
        </>

        {/* Leads Routes */}
        <>
          <Route
            exact
            path="/leads/explore"
            element={
              <PrivateRoute role={USER_ROLES}>
                <LeadListing />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/leads/explore/create"
            element={
              <PrivateRoute role={USER_ROLES}>
                <LeadCreate />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/leads/explore/edit/:id"
            element={
              <PrivateRoute role={USER_ROLES}>
                <LeadCreate />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/leads/explore/view/:id"
            element={
              <PrivateRoute role={USER_ROLES}>
                <View />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/leads/add_on"
            element={
              <PrivateRoute role={USER_ROLES}>
                <AddOnListing />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/leads/add_on/view/:id"
            element={
              <PrivateRoute role={USER_ROLES}>
                <AddOnView />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/leads/add_on/edit/:id"
            element={
              <PrivateRoute role={USER_ROLES}>
                <AddOnCreate />
              </PrivateRoute>
            }
          ></Route>
        </>

        {/* Leads Routes */}
        <>
          <Route
            exact
            path="/archives/leads_explore_records"
            element={
              <PrivateRoute role={USER_ROLES}>
                <LeadExploreRecords />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/archives/leads_addon_records"
            element={
              <PrivateRoute role={USER_ROLES}>
                <LeadAddOnRecords />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/archives/internal_staffs_records"
            element={
              <PrivateRoute role={USER_ROLES}>
                <InternalStaffsRecords />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/archives/external_staffs_records"
            element={
              <PrivateRoute role={USER_ROLES}>
                <ExternalStaffsRecords />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/archives/application_records"
            element={
              <PrivateRoute role={USER_ROLES}>
                <ApplicationRecords />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/archives/resources_records"
            element={
              <PrivateRoute role={USER_ROLES}>
                <ResourcesRecords />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/students/application/create"
            element={
              <PrivateRoute role={USER_ROLES}>
                <StudentCreate />
              </PrivateRoute>
            }
          ></Route>
        </>

        {/* Application Routes */}

        <>
          <Route
            exact
            path="/students"
            element={
              <PrivateRoute role={USER_ROLES}>
                <StudentsList />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/students/create-student"
            element={
              <PrivateRoute role={USER_ROLES}>
                <StudentCreate />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/students/view-student-detail/:id"
            element={
              <PrivateRoute role={USER_ROLES}>
                <ApplicationView />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/students/edit-student/:id"
            element={
              <PrivateRoute role={USER_ROLES}>
                <StudentCreate />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="students/application/current"
            element={
              <PrivateRoute role={USER_ROLES}>
                <CurrentListing />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="feedbacks"
            element={
              <PrivateRoute role={USER_ROLES}>
                <FeedbackListing />
              </PrivateRoute>
            }
          ></Route>
        </>

        {/* Student Role Login Routes */}
        <>
          <Route
            activeClassName="is-active"
            exact
            path="/students/process-applications"
            element={
              <PrivateRoute role={["student"]}>
                <MyApplicationProcess />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/applicant/profile/view"
            element={
              <PrivateRoute role={["student"]}>
                <MyProfile />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/applicant/profile/edit"
            element={
              <PrivateRoute role={["student"]}>
                <EditStudentForm />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/resources/listing"
            element={
              <PrivateRoute role={["student"]}>
                <Resources />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/resources/view/:slug"
            element={
              <PrivateRoute role={["student"]}>
                <MediumOfInstruction />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/faqs/listing"
            element={
              <PrivateRoute role={["student"]}>
                <FaqsList />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/add-ons/listing"
            element={
              <PrivateRoute role={["student"]}>
                <AddOnsListing />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/chat-history"
            element={
              <PrivateRoute role={["student"]}>
                <ViewChatHistory />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/terms-and-conditions"
            element={
              <PrivateRoute role={["student"]}>
                <TermsConditions />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/point-of-contact"
            element={
              <PrivateRoute role={["student"]}>
                <PointOfContact />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/feedback"
            element={
              <PrivateRoute role={["student"]}>
                <Feedback />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/media"
            element={
              <PrivateRoute role={["student"]}>
                <Media />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/add-ons/pre-departure-support"
            element={
              <PrivateRoute role={["student"]}>
                <PreDepartureSupport />
              </PrivateRoute>
            }
          ></Route>
        </>
        <Route exact path="/country/:id" element={<CountryDetails />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
};
