import React, { useState, useEffect, useContext } from "react";
import "./style.scss";
import { AppContext } from "../../context/Appcontext";
import api from "../../api/index";
import "./style.scss";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import checked from "../../Images/check.svg";
import info from "../../Images/pending.svg";
import upload from "../../Images/upload.svg";
import view from "../../assets/allstudents/view.svg";
import del from "../../assets/allstudents/delete.svg";
import { ReuploadDocument } from "../../ReuploadDocument";
import DeleteConfirmModel from "../../DeleteConfirmModel";
import ConfirmModel from "../../ConfirmModel";

import moment from "moment";
import { toast } from "react-toastify";
import PdfViewer from "../StudentViewModule/Resources/PdfViewer";
import Tooltip from "@mui/material/Tooltip";
import { uuid } from "../../common/utils/helpers";

const GATHER_CHECKLIST = "Gathering Checklist";
const FINANCIAL_EVIDENCE = "Financial Evidence";
const PRE_CAS_PROCESS = "Pre-CAS Process";
const PRE_REQUISITE = "Pre Requisite";
const AFTERI20 = "After I-20";
const PREDEPEATURE = "Pre-Departure";
const ONARRIVAL = "On-Arrival";
const VISA_APPLICATION = "Visa Application";
const UNIVERSITY_SELECTION = "University Application";

const APPLICATION_PROCESS_LIST = [
  {
    step: "GATHER_CHECKLIST",
    name: " Gathering Checklists",
    slug: "Gathering Checklist",
    status: "gatherchecklist",
    toggle: "gatherchecklist_toggle",
    time_stamp: "check_list_started_on",
    config: "COMMON",
  },
  {
    step: "UNIVERSITY_SELECTION",
    status: "universityies",
    toggle: "university_toggle",
    name: "University Applications",
    slug: "University Application",
    time_stamp: "",
    config: "CUSTOM",
  },
  {
    step: "FINANCIAL_EVIDENCE",
    status: "financial_evidence",
    toggle: "financial_evidence_toggle",
    time_stamp: "financial_evidence_started_on",
    name: "Financial Calculator",
    slug: "Financial Evidence",
    config: "CUSTOM",
  },
  {
    step: "AFTERI20",
    status: "after_i20",
    slug: "After I-20",
    toggle: "after_120_toggle",
    time_stamp: "after_i20_started_on",
    name: "Before/After I-20",
    config: "COMMON",
  },
  {
    step: "PRE_CAS_PROCESS",
    status: "pre_cas_process",
    toggle: "pre_cas_process_toggle",
    time_stamp: "pre_cas_started_on",
    name: "Pre-CAS Process",
    slug: "Pre-CAS Process",
    config: "COMMON",
  },
  {
    step: "VISA_APPLICATION",
    status: "visa_application",
    toggle: "visa_application_toggle",
    time_stamp: "visa_app_started_on",
    name: "Visa Checklist",
    slug: "Visa Application",
    config: "CUSTOM",
  },
  {
    step: "PREDEPEATURE",
    status: "predepeature",
    toggle: "predepeature_toggle",
    time_stamp: "pre_departure_started_on",
    slug: "Pre-Departure",
    name: "Pre-Departure",
    config: "COMMON",
  },
  {
    step: "ONARRIVAL",
    status: "on_arrival",
    toggle: "on_arrival_toggle",
    time_stamp: "on_arrival_started_on",
    name: "On-Arrival",
    slug: "On-Arrival",
    config: "COMMON",
  },

  {
    step: "PRE_REQUISITE",
    status: "predepeature",
    toggle: "pre_requisite_toggle",
    time_stamp: "pre_requisite_started_on",
    name: "Pre Requisite",
    config: "CUSTOM",
    slug: "Pre Requisite",
  },
];

let obj = {
  gatherchecklist: false,
  gatherchecklist_toggle: false,
  universityies: false,
  university_toggle: false,
  financial_evidence: false,
  financial_evidence_toggle: false,
  pre_cas_process: false,
  pre_cas_process_toggle: false,
  pre_requisite: false,
  pre_requisite_toggle: false,
  after_120_toggle: false,
  after_i20: false,
  predepeature: false,
  predepeature_toggle: false,
  on_arrival: false,
  on_arrival_toggle: false,
  visa_application: false,
  visa_application_toggle: false,
};
let initialParamState = {
  university_status: "",
  financial_evidence_total: "",
};

const MyApplicationProcess = () => {
  const [student, setStudentData] = useState("");
  const [checkListId, setCheckListId] = useState("");
  const { BASE_URL } = useContext(AppContext);
  const [params, setParams] = useState(initialParamState);
  const [apiLoading, setApiLoading] = useState(false);
  const [expanded, setExpanded] = useState();

  const [stepProcessStatus, setStepProcessStatus] = useState(obj);
  const [dialogConfig, setdialogConfig] = useState({
    upload: false,
    delete: false,
    title: "",
    preview: false,
    confirm: false,
  });

  const handleAccordian = (pannel) => (event, newExpanded) => {
    if (expanded === pannel) {
      setExpanded(-1);
      return;
    }
    setExpanded(newExpanded ? pannel : false);
  };

  const getStudentData = () => {
    api
      .get(`${BASE_URL}/admin/students/view-info`)
      .then((res) => {
        setStudentData(res.data.data);
        let response = res.data.data;
        let G_CHECKLIST = response.check_list[GATHER_CHECKLIST];
        let steps = { ...stepProcessStatus };
        if (
          response.steps_timestamp?.check_list_started_on &&
          G_CHECKLIST?.filter((x) => x.checked)?.length &&
          G_CHECKLIST?.filter((x) => x.value)?.length ===
            G_CHECKLIST?.filter((x) => x.checked)?.length
        ) {
          steps.gatherchecklist = true;
        }
        steps.universityies = response.selected_universities.some(
          (x) => x.is_selected
        );

        if (response.check_list[FINANCIAL_EVIDENCE]) {
          steps.financial_evidence = response.check_list[
            FINANCIAL_EVIDENCE
          ].every((x) => x.value);
          const value =
            Number(response.check_list[FINANCIAL_EVIDENCE][0].value || 0) +
            Number(response.check_list[FINANCIAL_EVIDENCE][3].value || 0) -
            Number(response.check_list[FINANCIAL_EVIDENCE][1].value || 0);
          setParams((inputs) => ({
            ...inputs,
            financial_evidence_total: value,
          }));
        }

        if (
          response.check_list[PRE_CAS_PROCESS]?.filter((x) => x.checked)
            ?.length &&
          response.check_list[PRE_CAS_PROCESS]?.filter((x) => x.value)
            ?.length ===
            response.check_list[PRE_CAS_PROCESS]?.filter((x) => x.checked)
              ?.length
        ) {
          steps.pre_cas_process = true;
        }

        if (
          response.check_list[PRE_REQUISITE]?.filter((x) => x.checked)
            ?.length &&
          response.check_list[PRE_REQUISITE]?.filter((x) => x.value)?.length ===
            response.check_list[PRE_REQUISITE]?.filter((x) => x.checked)?.length
        ) {
          steps.pre_requisite = true;
        }
        if (
          response.check_list[AFTERI20]?.filter((x) => x.checked)?.length &&
          response.check_list[AFTERI20]?.filter((x) => x.value)?.length ===
            response.check_list[AFTERI20]?.filter((x) => x.checked)?.length
        ) {
          steps.after_i20 = true;
        }

        if (
          response.check_list[PREDEPEATURE]?.filter((x) => x.checked)?.length &&
          response.check_list[PREDEPEATURE]?.filter((x) => x.value)?.length ===
            response.check_list[PREDEPEATURE]?.filter((x) => x.checked)?.length
        ) {
          steps.predepeature = true;
        }
        if (
          response.check_list[ONARRIVAL]?.filter((x) => x.checked)?.length &&
          response.check_list[ONARRIVAL]?.filter((x) => x.value)?.length ===
            response.check_list[ONARRIVAL]?.filter((x) => x.checked)?.length
        ) {
          steps.on_arrival = true;
        }

        if (
          response.check_list[VISA_APPLICATION]?.filter((x) => x.checked)
            ?.length &&
          response.check_list[VISA_APPLICATION]?.filter((x) => x.value)
            ?.length ===
            response.check_list[VISA_APPLICATION]?.filter((x) => x.checked)
              ?.length
        ) {
          steps.visa_application = true;
        }

        if (
          response.check_list[VISA_APPLICATION]?.filter((x) => x.checked)
            ?.length &&
          response.check_list[VISA_APPLICATION]?.filter((x) => x.value)
            ?.length ===
            response.check_list[VISA_APPLICATION]?.filter((x) => x.checked)
              ?.length
        ) {
          steps.visa_application = true;
        }
        setStepProcessStatus(steps);
        setParams((inputs) => ({ ...inputs, ...obj }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toogleAccordian = (stage) => {
    setStepProcessStatus((inputs) => ({
      ...inputs,
      gatherchecklist_toggle: false,
      university_toggle: false,
      financial_evidence_toggle: false,
      pre_cas_process_toggle: false,
      pre_requisite_toggle: false,
      after_120_toggle: false,
      predepeature_toggle: false,
      on_arrival_toggle: false,
      visa_application_toggle: false,
      [stage]: !stepProcessStatus[stage],
    }));
  };

  const downloadDoc = (item) => {
    window.open(item, "_blank");
  };

  const previewAttachment = (item) => {
    setCheckListId(item.id);
    window.open(item.value, "_blank");

    // const name = item.value.substring(item.value.lastIndexOf("/") + 1);
    // const lastDot = name.lastIndexOf(".");
    // const ext = name.substring(lastDot + 1);
    // if (ext !== "pdf") {
    //   window.open(item.value, "_blank");
    //   return;
    // }
    // setdialogConfig((inputs) => ({
    //   ...inputs,
    //   preview: true,
    //   attachment_url: item.value,
    // }));
  };

  const handleDelete = (item) => {
    setCheckListId(item.id);
    setdialogConfig((inputs) => ({ ...inputs, delete: true }));
  };

  const confirmUniversityOffer = (item) => {
    setCheckListId(item.id);
    setdialogConfig((inputs) => ({ ...inputs, confirm: true }));
  };

  const handleUpload = (item) => {
    setCheckListId(item.id);
    setdialogConfig((inputs) => ({
      ...inputs,
      upload: true,
      title: "Upload " + item.name,
    }));
  };

  const handleClose = () => {
    setdialogConfig((inputs) => ({
      ...inputs,
      upload: false,
      delete: false,
      title: "",
      preview: false,
      attachment_url: "",
      confirm: false,
    }));
    setCheckListId("");
  };

  const updateCheckListValues = (value, id, type) => {
    let obj = {
      value,
      check_list_id: id,
      student_id: student.id,
      type: type,
    };
    api
      .post(`${BASE_URL}/admin/students/update-check-list-value`, obj)
      .then((res) => {
        setdialogConfig((inputs) => ({
          ...inputs,
          upload: false,
          delete: false,
        }));
        getStudentData();
        if (type === "delete") {
          toast.success("Attachment Deleted Successfully!.");
        } else {
          toast.success("Attachment Uploaded Successfully!.");
        }
        // toast
      })
      .catch((error) => {
        console.log(error);
        // toast
      });
  };

  const updateFileChange = (e) => {
    let file = e;
    var formData = new FormData();
    formData.append("file", file);
    setApiLoading(true);

    api
      .post(`${BASE_URL}/admin/upload`, formData)
      .then((res) => {
        updateCheckListValues(res.data.data, checkListId, "add");
        setApiLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFileDelete = () => {
    updateCheckListValues("", checkListId, "delete");
  };

  const updateUniversityValues = (data) => {
    let obj = { id: checkListId, is_selected: true };
    setApiLoading(true);
    api
      .put(
        `${BASE_URL}/admin/students/update-university-status/${checkListId}`,
        obj
      )
      .then((res) => {
        setApiLoading(false);
        getStudentData();
        toast.success("OFFER ACCEPTED SUCCESSFULLY!");
        handleClose();
      })
      .catch((error) => {
        setApiLoading(false);
        toast.error("INTERNAL SERVER ERROR");
      });
  };

  useEffect(() => {
    getStudentData();
  }, []);

  return (
    <div className="p-2 md:p-6 mt-1 ">
      {/* <p className="font-bold  text-xl  mb-2 gradient-text">
       hello
      </p> */}
      <p className="text-xl md:text-2xl font-audiowide gradient-text">
        <span className="text-xl md:text-2xl font-audiowide  gradient-text ">
          {" "}
          My Application Process...
        </span>
      </p>
      <p className="text-xs mb-2 text-primary ">
        ApplyUniNow is 100% digital platform supporting you step-by-step
        guidance to the aspirational upskilling globally and we maximise
        ourselves on what it takes to find a good match and set you up for
        success.
      </p>
      {/* Ghatering CheckList */}

      {student.check_list &&
        APPLICATION_PROCESS_LIST.map((z,index) => {
          return (
            <>
              {z.config === "COMMON" &&
                student.check_list.hasOwnProperty(z.slug) && (
                  <div className=" lg:border-2 lg:border-line rounded rounded-t-lg mt-6 md:mt-5">
                    <div
                      className="flex flex-col "
                      data-modal-toggle="popup-modal"
                    >
                      <div
                        className={`h-[50px] bg-tab px-4 hidden lg:flex  rounded-t-lg flex-row rounded accordian-toogle relative cursor-pointer custom-accordian-toggle ${
                          stepProcessStatus[z.toggle] ? "open" : ""
                        }`}
                        onClick={() => toogleAccordian(z.toggle)}
                      >
                        {/* <div> */}

                        <div
                          className={`h-6 w-6 rounded-xl  mt-3 mr-3 pl-1.5 pt-1.5 ${
                            stepProcessStatus[z.status]
                              ? "success-color-bg"
                              : "out"
                          }`}
                        >
                          <div
                            className={`h-3 w-3 rounded-lg ${
                              stepProcessStatus[z.status]
                                ? "success-color"
                                : "in"
                            }`}
                          ></div>
                        </div>
                        <div className="text-base mt-3 font-audiowide">
                          {stepProcessStatus[z.status] ? (
                            <>
                              <p className="text-[#57CD53]">{z.name}</p>
                            </>
                          ) : (
                            <>
                              <p className="text-red">{z.name}</p>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="lg:hidden application-view-accordian">
                        <Accordion 
                         expanded={expanded === index}
                         elevation={0}
                         onChange={handleAccordian(index)}
                        >
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon
                                className={
                                  stepProcessStatus[z.status]
                                    ? "text-[#57CD53]"
                                    : "text-red"
                                }
                              />
                            }
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className="green"
                          >
                            <Typography className="flex w-full flex-row justify-between items-center">
                              <div className="w-full flex items-center">
                                <div
                                  className={`h-6 w-6 rounded-xl   mr-3 pl-1.5 pt-1.5 ${
                                    stepProcessStatus[z.status]
                                      ? "success-color-bg"
                                      : "out"
                                  }`}
                                >
                                  <div
                                    className={`h-3 w-3 rounded-lg ${
                                      stepProcessStatus[z.status]
                                        ? "success-color"
                                        : "in"
                                    }`}
                                  ></div>
                                </div>
                                <div className=" text-sm  font-audiowide">
                                  {stepProcessStatus[z.status] ? (
                                    <>
                                      <p className="text-[#57CD53]">{z.name}</p>
                                    </>
                                  ) : (
                                    <>
                                      <p className="text-red">{z.name}</p>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className=" text-sm  font-audiowide text-[#60E2FF]">
                                {stepProcessStatus[z.status] ? (
                                  <>
                                    <p className="text-[#57CD53]">
                                      {
                                        student.check_list[z.slug]?.filter(
                                          (x) => x.value
                                        )?.length
                                      }
                                      /
                                      {
                                        student.check_list[z.slug]?.filter(
                                          (x) => x.checked
                                        )?.length
                                      }
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p className="text-red">
                                      {
                                        student.check_list[z.slug]?.filter(
                                          (x) => x.value
                                        )?.length
                                      }
                                      /
                                      {
                                        student.check_list[z.slug]?.filter(
                                          (x) => x.checked
                                        )?.length
                                      }
                                    </p>
                                  </>
                                )}
                              </div>
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            {student.steps_timestamp[z.time_stamp] ? (
                              <>
                                <div className="flex flex-col lg:hidden bg-light">
                                  <div className="bg-tab rounded-xl px-3 md:px-6 py-4 md:py-6 flex gap-4 flex-col">
                                    {student.check_list[z.slug]
                                      ?.filter((x) => x.checked)
                                      .map((item) => (
                                        <div className="flex flex-row items-center">
                                          <div className="text-white flex gap-2 text-xs w-full  mt-0.5 font-audiowide">
                                            {item.value ? (
                                              <div>
                                                <img src={checked} alt="logo" />
                                              </div>
                                            ) : (
                                              <div>
                                                <img src={info} alt="logo" />
                                              </div>
                                            )}
                                            <div className="w-[200px] break-words">
                                              {item.name}
                                            </div>
                                          </div>
                                          <div className="flex justify-end items-end py-2">
                                            {item.value ? (
                                              <div className=" flex justify-start pl-4 gap-3 mr-4 lg:mr-0 ">
                                                <Tooltip title="Preview Attactment">
                                                  <img
                                                    onClick={(e) =>
                                                      previewAttachment(item)
                                                    }
                                                    className=" cursor-pointer"
                                                    src={view}
                                                    alt="alt"
                                                  />
                                                </Tooltip>
                                                <div className="border-l-2 h-auto border-line"></div>
                                                <Tooltip title="Delete Attactment">
                                                  <img
                                                    className=" cursor-pointer"
                                                    onClick={() => {
                                                      handleDelete(item);
                                                    }}
                                                    src={del}
                                                    alt="reload"
                                                  />
                                                </Tooltip>
                                              </div>
                                            ) : (
                                              <div>
                                                <Tooltip title="Upload Attachment">
                                                  <img
                                                    className=" cursor-pointer"
                                                    onClick={() =>
                                                      handleUpload(item)
                                                    }
                                                    src={upload}
                                                    alt="logo"
                                                  />
                                                </Tooltip>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className=" rounded-lg text-center bg-light px-3 py-4 lg:px-6 lg:py-6  text-white">
                                <p>CheckList Not updated !.</p>
                              </div>
                            )}
                          </AccordionDetails>
                        </Accordion>
                      </div>

                      {stepProcessStatus[z.toggle] ? (
                        <>
                          {student.check_list[z.slug]?.filter((x) => x.checked)
                            ?.length ? (
                            <div className="hidden lg:block rounded-lg bg-light px-3 py-4 lg:px-6 lg:py-6">
                              <div className="bg-tab rounded-lg px-8 py-6 hidden lg:flex lg:flex-col">
                                <div className="flex flex-row gap-10 px-4">
                                  <div className="flex flex-col gap-2">
                                    <div className="text-xs text-text font-audiowide">
                                      Stage Started Date
                                    </div>
                                    <div className="text-white text-xs">
                                      {student.steps_timestamp[z.time_stamp]}
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    <div className="text-xs text-text font-audiowide">
                                      Document Uploaded
                                    </div>
                                    <div className="text-white text-xs">
                                      {
                                        student.check_list[z.slug]?.filter(
                                          (x) => x.value
                                        )?.length
                                      }{" "}
                                      /{" "}
                                      {
                                        student.check_list[z.slug]?.filter(
                                          (x) => x.checked
                                        )?.length
                                      }
                                    </div>
                                  </div>
                                </div>
                                <div className=" bg-light rounded-base mt-4 rounded-xl">
                                  <Table className="relative px-4 font-audiowide custom-table">
                                    <Thead className="border-b-2 mb-1 z-20 text-text border-white">
                                      <Tr className="text-sm ">
                                        <Th className="pl-4 text-left font-audiowide">
                                          Sno.
                                        </Th>
                                        <Th className="pl-4 text-left font-audiowide">
                                          Document Name
                                        </Th>
                                        <Th className="pl-10   text-left font-audiowide">
                                          Date Uploaded
                                        </Th>
                                        <Th className="pl-10  text-center font-audiowide">
                                          Action
                                        </Th>
                                      </Tr>
                                    </Thead>
                                    {student.check_list[z.slug]
                                      ?.filter((x) => x.checked)
                                      .map((data, i) => {
                                        return (
                                          <Tbody key={uuid()}>
                                            <Tr className="row border-b-2 text-xs text-white  ">
                                              <Td className="text-left pl-4">
                                                <div className="mr-3">
                                                  {i + 1}
                                                </div>
                                              </Td>
                                              <Td className=" text-left pl-4 flex flex-row mt-4">
                                                <div className="mr-3">
                                                  {data?.name}
                                                </div>
                                                <div>
                                                  {data?.value ? (
                                                    <div>
                                                      <img
                                                        src={checked}
                                                        alt="icon"
                                                      />
                                                    </div>
                                                  ) : (
                                                    <div>
                                                      <img
                                                        src={info}
                                                        alt="icon"
                                                      />
                                                    </div>
                                                  )}
                                                </div>
                                              </Td>
                                              <Td className="text-left pl-12">
                                                {data.updated_at
                                                  ? moment(
                                                      data.updated_at
                                                    ).format("DD-MM-YYYY")
                                                  : "--"}
                                              </Td>
                                              <Td className="pl-12 text-center ">
                                                {data.value ? (
                                                  <div className="flex gap-3 justify-center">
                                                    <Tooltip title="Preview Attactment">
                                                      <img
                                                        src={view}
                                                        alt="alt"
                                                        className="cursor-pointer"
                                                        onClick={(e) =>
                                                          previewAttachment(
                                                            data
                                                          )
                                                        }
                                                      />
                                                    </Tooltip>
                                                    <div className="border-l-2 h-auto border-line"></div>
                                                    <Tooltip title="Delete Attactment">
                                                      <img
                                                        src={del}
                                                        alt="reload"
                                                        className="cursor-pointer"
                                                        onClick={() => {
                                                          handleDelete(data);
                                                        }}
                                                      />
                                                    </Tooltip>
                                                  </div>
                                                ) : (
                                                  <div className="flex  justify-center">
                                                    <Tooltip title="Upload File">
                                                      <img
                                                        className="cursor-pointer"
                                                        src={upload}
                                                        onClick={() =>
                                                          handleUpload(data)
                                                        }
                                                        alt="icon"
                                                      />
                                                    </Tooltip>
                                                  </div>
                                                )}
                                              </Td>
                                            </Tr>
                                          </Tbody>
                                        );
                                      })}
                                  </Table>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className=" rounded-lg text-center bg-light px-3 py-4 lg:px-6 lg:py-6 hidden lg:block">
                              <p>CheckList Not updated !.</p>
                            </div>
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                )}

              {z.slug === UNIVERSITY_SELECTION && (
                <div>
                  <div className="lg:hidden  application-view-accordian mt-4">
                    <Accordion 
                     expanded={expanded === index}
                     elevation={0}
                     onChange={handleAccordian(index)}>
                      <AccordionSummary
                        expandIcon={
                          <ExpandMoreIcon
                            className={
                              stepProcessStatus.universityies
                                ? "text-[#57CD53]"
                                : "text-red"
                            }
                          />
                        }
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className="bg-tab"
                      >
                        <Typography className="flex w-full flex-row justify-between items-center">
                          <div className="w-full flex items-center">
                            <div
                              className={`h-6 w-6 rounded-xl  mr-3 pl-1.5 pt-1.5 ${
                                stepProcessStatus.universityies
                                  ? "success-color-bg"
                                  : "out"
                              }`}
                            >
                              <div
                                className={`h-3 w-3 rounded-lg  ${
                                  stepProcessStatus.universityies
                                    ? "success-color"
                                    : "in"
                                }`}
                              ></div>
                            </div>
                            <div className=" text-sm font-audiowide">
                              {/* University Applications */}
                              {stepProcessStatus.universityies ? (
                                <p className="text-[#57CD53]">
                                  University Applications
                                </p>
                              ) : (
                                <p className="text-red">
                                  University Applications
                                </p>
                              )}
                            </div>
                          </div>
                          <div className=" text-sm font-audiowide text-[#60E2FF]">
                            {stepProcessStatus[z.status] ? (
                              <>
                                <p className="text-[#57CD53]">
                                  {
                                    student.selected_universities?.filter(
                                      (x) => x.value
                                    ).length
                                  }
                                  /{student.selected_universities?.length}
                                </p>
                              </>
                            ) : (
                              <>
                                <p className="text-red">
                                  {
                                    student.selected_universities?.filter(
                                      (x) => x.value
                                    ).length
                                  }
                                  /{student.selected_universities?.length}
                                </p>
                              </>
                            )}
                          </div>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {student?.selected_universities?.length ? (
                          <div className="flex flex-col bg-light lg:hidden px-0 py-2">
                            {student.selected_universities?.map(
                              (data, index) => (
                                <div className="py-2 application-child-accordian">
                                  <Accordion>
                                    <AccordionSummary
                                      expandIcon={
                                        <ExpandMoreIcon className="text-white" />
                                      }
                                      aria-controls="panel1a-content"
                                      id="panel1a-header"
                                    >
                                      <Typography>
                                        <div className="text-white font-sm flex flex-row ">
                                          <div className="mt-1 mr-3">
                                            {data.value && data.is_selected ? (
                                              <div>
                                                <img src={checked} alt="logo" />
                                              </div>
                                            ) : (
                                              <div>
                                                <img src={info} alt="logo" />
                                              </div>
                                            )}
                                          </div>
                                          <p className="text-sm break-all font-audiowide">
                                            {" "}
                                            {data?.university?.name}
                                          </p>
                                        </div>
                                      </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      <Typography>
                                        <div className="w-ful flex gap-6 flex-col">
                                          <div className="flex justify-between gap-2 ">
                                            <div className="text-xs text-text font-audiowide">
                                              Application Status:
                                            </div>
                                            <div className="text-white text-xs text-right font-audiowide">
                                              {data.status}
                                            </div>
                                          </div>
                                          <div className="flex justify-between gap-2 ">
                                            <div className="text-xs   text-text font-audiowide">
                                              Applied intake:
                                            </div>
                                            <div className="text-white text-xs text-right  font-audiowide">
                                              {student.intake_month}{" "}
                                              {student.intake_year}
                                            </div>
                                          </div>

                                          <div className="flex justify-between gap-2 ">
                                            <div className="text-xs   text-text font-audiowide">
                                              Offer intake:
                                            </div>
                                            <div className="text-white text-xs  text-right font-audiowide">
                                              {data.offer_intake || "NA"}
                                            </div>
                                          </div>

                                          <div className="flex justify-between gap-2 ">
                                            <div className="text-xs   text-text font-audiowide">
                                              Course Link:
                                            </div>
                                            <div className="text-white text-xs text-right cursor-pointer font-audiowide">
                                              {data.course_link && (
                                                <p
                                                  onClick={() =>
                                                    downloadDoc(
                                                      data.course_link
                                                    )
                                                  }
                                                >
                                                 <u>Click Here</u> 
                                                </p>
                                              )}
                                              {!data.course_link && <p>NA</p>}
                                            </div>
                                          </div>
                                            
                                          {
                                            data?.value ?
                                              <div className="flex flex-row justify-end ">
                                                <div className="flex  gap-4">
                                                  <Tooltip title="Preview OfferLeffer">
                                                    <img
                                                      onClick={(e) =>
                                                        previewAttachment(data)
                                                      }
                                                      className=" cursor-pointer"
                                                      src={view}
                                                      alt="alt"
                                                    />
                                                  </Tooltip>

                                                  <>
                                                    {!data?.is_selected &&
                                                      data.value &&
                                                      !stepProcessStatus.universityies ? (
                                                      <Tooltip title="Accept OfferLeffer">
                                                        <svg
                                                          className=" cursor-pointer"
                                                          onClick={() =>
                                                            confirmUniversityOffer(
                                                              data
                                                            )
                                                          }
                                                          width="20"
                                                          height="20"
                                                          viewBox="0 0 20 20"
                                                          fill="none"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                          <path
                                                            fill-rule="evenodd"
                                                            clip-rule="evenodd"
                                                            d="M9.103 0.0236656C7.1704 0.212879 5.38422 0.924853 3.81813 2.13021C3.05548 2.71717 2.06507 3.82029 1.49272 4.72015C1.24554 5.10879 0.76437 6.09359 0.592 6.56357C0.399273 7.08911 0.193862 7.8922 0.0927815 8.51536C-0.0309271 9.27808 -0.0309271 10.7262 0.0927815 11.4889C0.267696 12.5672 0.544396 13.4388 1.01801 14.4038C1.53547 15.4581 2.07353 16.2054 2.93514 17.0665C3.7968 17.9277 4.54453 18.4654 5.59938 18.9826C6.56493 19.4559 7.43708 19.7325 8.51593 19.9073C9.27908 20.0309 10.728 20.0309 11.4912 19.9073C12.57 19.7325 13.4422 19.4559 14.4077 18.9826C15.4626 18.4654 16.2103 17.9277 17.072 17.0665C17.9336 16.2054 18.4717 15.4581 18.9891 14.4038C19.3328 13.7035 19.5057 13.2446 19.6908 12.5408C19.9374 11.6036 20 11.0899 20 10.0021C20 8.91445 19.9374 8.40069 19.6908 7.46346C19.5057 6.7597 19.3328 6.30076 18.9891 5.60048C18.4717 4.54623 17.9336 3.79893 17.072 2.93777C16.2103 2.07664 15.4626 1.5389 14.4077 1.02173C13.4431 0.548814 12.5537 0.266677 11.5108 0.1027C10.9353 0.0122408 9.65041 -0.0299369 9.103 0.0236656ZM15.2472 5.70714C15.4431 5.76724 15.7418 6.06322 15.8244 6.27904C15.9201 6.5291 15.9105 6.85392 15.8008 7.08054C15.6776 7.3349 9.23336 13.7277 8.94123 13.8854C8.66156 14.0363 8.33127 14.0363 8.05116 13.8854C7.88533 13.796 4.91699 11.139 4.41233 10.6282C4.21529 10.4287 4.11726 10.1852 4.12091 9.90433C4.12866 9.31216 4.5607 8.91277 5.148 8.95475C5.28893 8.96484 5.46068 9.00225 5.52962 9.03785C5.63387 9.09173 7.61289 10.8698 8.25222 11.484L8.43877 11.6632L11.3645 8.74335C12.9737 7.13747 14.347 5.79521 14.4163 5.76058C14.6875 5.62493 14.9288 5.6094 15.2472 5.70714Z"
                                                            fill="#07A1C0"
                                                          />
                                                        </svg>
                                                      </Tooltip>
                                                    ) : data?.is_selected ? (
                                                      ""
                                                    ) : (
                                                      "--"
                                                    )}
                                                  </>
                                                </div>
                                              </div> : <></>
                                          }

                                        </div>
                                      </Typography>
                                    </AccordionDetails>
                                  </Accordion>
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          <div className=" rounded-lg text-center bg-light text-white px-3 py-4 lg:px-6 lg:py-6">
                            <p>Universities Not Selected!.</p>
                          </div>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  </div>

                  <div className="border-2 border-line  rounded rounded-t-lg mt-4 hidden lg:flex lg:flex-col">
                    <div className="flex flex-col">
                      <div
                        className={`h-[50px] bg-tab px-4  rounded-t-lg flex flex-row rounded accordian-toogle relative cursor-pointer  custom-accordian-toggle ${
                          stepProcessStatus.university_toggle ? "open" : ""
                        }`}
                        onClick={() => toogleAccordian("university_toggle")}
                      >
                        <div
                          className={`h-6 w-6 rounded-xl  mt-3 mr-3 pl-1.5 pt-1.5 ${
                            stepProcessStatus.universityies
                              ? "success-color-bg"
                              : "out"
                          }`}
                        >
                          <div
                            className={`h-3 w-3 rounded-lg ${
                              stepProcessStatus.universityies
                                ? "success-color"
                                : "in"
                            }`}
                          ></div>
                        </div>
                        <div className=" text-base  mt-3 font-audiowide">
                          {stepProcessStatus.universityies ? (
                            <p className="text-[#57CD53]">
                              University Applications
                            </p>
                          ) : (
                            <p className="text-red">University Applications</p>
                          )}
                        </div>
                      </div>
                      {stepProcessStatus.university_toggle ? (
                        <div className="bg-light px-6 py-6 hidden lg:block">
                          {student?.selected_universities?.length ? (
                            <div className="bg-tab  rounded-xl mt-3 px-8 py-4">
                              <div className="flex flex-row gap-10 px-4">
                                <div className="flex  gap-2">
                                  <div className=" text-text text-xs font-audiowide">
                                    Received Offer Letters:
                                  </div>
                                  <div className="text-white text-sm">
                                    {
                                      student.selected_universities?.filter(
                                        (x) => x.value
                                      ).length
                                    }
                                    /{student.selected_universities?.length}
                                  </div>
                                </div>
                              </div>
                              <div className=" bg-light rounded-base mt-4 mb-4 rounded-lg">
                                <Table className=" relative px-4 font-audiowide custom-table">
                                  <Thead className=" border-b-2 mb-1 bg-light text-text border-white">
                                    <Tr className=" text-left text-sm  font-audiowide ">
                                      <Th className="pl-4 font-audiowide">
                                        Selected University
                                      </Th>
                                      <Th className="pl-4 font-audiowide">
                                        Course Link
                                      </Th>
                                      <Th className="pl-4 text-center font-audiowide">
                                        Applied intake
                                      </Th>
                                      <Th className="pl-6 text-center font-audiowide">
                                        <p>Offer letter </p>
                                        <p>intake</p>
                                      </Th>
                                      <Th className="pl-1 text-center font-audiowide ">
                                        <p>Application </p>
                                        <p>Status</p>
                                      </Th>
                                      <Th className="pl-1 text-center font-audiowide">
                                        Action
                                      </Th>
                                    </Tr>
                                  </Thead>
                                  {student.selected_universities.map(
                                    (data, i) => {
                                      return (
                                        <Tbody key={uuid()}>
                                          <Tr className="row border-b-2 text-xs text-white  font-audiowide">
                                            <Td className=" text-left pl-4 ">
                                              {data?.university?.name}
                                            </Td>
                                            <Td className=" cursor-pointer text-left pl-4 ">
                                              {data.course_link && (
                                                <p
                                                  onClick={() =>
                                                    downloadDoc(
                                                      data.course_link
                                                    )
                                                  }
                                                >
                                                  Click Here
                                                </p>
                                              )}
                                              {!data.course_link && <p>NA</p>}
                                            </Td>
                                            <Td>
                                              <div className="text-center ">
                                                <p className="">
                                                  {student.intake_month}{" "}
                                                  {student.intake_year}
                                                </p>
                                              </div>
                                            </Td>
                                            <Td>
                                              <div className="text-center ">
                                                <p className="">
                                                  {data.offer_intake || "NA"}
                                                </p>
                                              </div>
                                            </Td>
                                            <Td className="text-center pl-12">
                                              {data.status}
                                            </Td>

                                            <Td className="pl-2 text-center ">
                                              {data?.value ? (
                                                <div className="flex justify-center gap-4">
                                                  <Tooltip title="Preview OfferLeffer">
                                                    <img
                                                      onClick={(e) =>
                                                        previewAttachment(data)
                                                      }
                                                      className=" cursor-pointer"
                                                      src={view}
                                                      alt="alt"
                                                    />
                                                  </Tooltip>

                                                  <>
                                                    {!data?.is_selected &&
                                                    data.value &&
                                                    !stepProcessStatus.universityies ? (
                                                      <Tooltip title="Accept OfferLeffer">
                                                        <svg
                                                          className=" cursor-pointer"
                                                          onClick={() =>
                                                            confirmUniversityOffer(
                                                              data
                                                            )
                                                          }
                                                          width="20"
                                                          height="20"
                                                          viewBox="0 0 20 20"
                                                          fill="none"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                          <path
                                                            fill-rule="evenodd"
                                                            clip-rule="evenodd"
                                                            d="M9.103 0.0236656C7.1704 0.212879 5.38422 0.924853 3.81813 2.13021C3.05548 2.71717 2.06507 3.82029 1.49272 4.72015C1.24554 5.10879 0.76437 6.09359 0.592 6.56357C0.399273 7.08911 0.193862 7.8922 0.0927815 8.51536C-0.0309271 9.27808 -0.0309271 10.7262 0.0927815 11.4889C0.267696 12.5672 0.544396 13.4388 1.01801 14.4038C1.53547 15.4581 2.07353 16.2054 2.93514 17.0665C3.7968 17.9277 4.54453 18.4654 5.59938 18.9826C6.56493 19.4559 7.43708 19.7325 8.51593 19.9073C9.27908 20.0309 10.728 20.0309 11.4912 19.9073C12.57 19.7325 13.4422 19.4559 14.4077 18.9826C15.4626 18.4654 16.2103 17.9277 17.072 17.0665C17.9336 16.2054 18.4717 15.4581 18.9891 14.4038C19.3328 13.7035 19.5057 13.2446 19.6908 12.5408C19.9374 11.6036 20 11.0899 20 10.0021C20 8.91445 19.9374 8.40069 19.6908 7.46346C19.5057 6.7597 19.3328 6.30076 18.9891 5.60048C18.4717 4.54623 17.9336 3.79893 17.072 2.93777C16.2103 2.07664 15.4626 1.5389 14.4077 1.02173C13.4431 0.548814 12.5537 0.266677 11.5108 0.1027C10.9353 0.0122408 9.65041 -0.0299369 9.103 0.0236656ZM15.2472 5.70714C15.4431 5.76724 15.7418 6.06322 15.8244 6.27904C15.9201 6.5291 15.9105 6.85392 15.8008 7.08054C15.6776 7.3349 9.23336 13.7277 8.94123 13.8854C8.66156 14.0363 8.33127 14.0363 8.05116 13.8854C7.88533 13.796 4.91699 11.139 4.41233 10.6282C4.21529 10.4287 4.11726 10.1852 4.12091 9.90433C4.12866 9.31216 4.5607 8.91277 5.148 8.95475C5.28893 8.96484 5.46068 9.00225 5.52962 9.03785C5.63387 9.09173 7.61289 10.8698 8.25222 11.484L8.43877 11.6632L11.3645 8.74335C12.9737 7.13747 14.347 5.79521 14.4163 5.76058C14.6875 5.62493 14.9288 5.6094 15.2472 5.70714Z"
                                                            fill="#07A1C0"
                                                          />
                                                        </svg>
                                                      </Tooltip>
                                                    ) : data?.is_selected ? (
                                                      ""
                                                    ) : (
                                                      "--"
                                                    )}
                                                  </>
                                                </div>
                                              ) : (
                                                "--"
                                              )}
                                            </Td>
                                          </Tr>
                                        </Tbody>
                                      );
                                    }
                                  )}
                                </Table>
                              </div>
                            </div>
                          ) : (
                            <div className=" rounded-lg text-center bg-light px-3 py-4 lg:px-6 lg:py-6 hidden lg:block">
                              <p>Universities Not Selected!.</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              )}

              {z.slug === FINANCIAL_EVIDENCE &&
                student.check_list.hasOwnProperty(FINANCIAL_EVIDENCE) && (
                  <div>
                    <div className="lg:hidden mt-4 application-view-accordian">
                      <Accordion 
                       expanded={expanded === index}
                       elevation={0}
                       onChange={handleAccordian(index)}>
                        <AccordionSummary
                          expandIcon={
                            <ExpandMoreIcon
                              className={
                                stepProcessStatus.financial_evidence
                                  ? "text-[#57CD53]"
                                  : "text-red"
                              }
                            />
                          }
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          className="bg-tab"
                        >
                          <Typography className="flex flex-row">
                            <div
                              className={`h-6 w-6 rounded-xl   mr-3 pl-1.5 pt-1.5 ${
                                stepProcessStatus.financial_evidence
                                  ? "success-color-bg"
                                  : "out"
                              }`}
                            >
                              <div
                                className={`h-3 w-3 rounded-lg 
                                   ${
                                     stepProcessStatus.financial_evidence
                                       ? "success-color"
                                       : "in"
                                   } `}
                              ></div>
                            </div>
                            <div className="text-sm font-audiowide text-[#60E2FF]">
                              {/* Financial Calculator */}
                              { stepProcessStatus.financial_evidence ? (
                            <p className="text-[#57CD53]">
                              Financial Calculator
                            </p>
                          ) : (
                            <p className="text-red">Financial Calculator</p>
                          )}
                            </div>
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {student?.steps_timestamp
                            ?.financial_evidence_started_on ? (
                            <div className="bg-tab">
                              <hr className="border-b-2 bord " />
                              <div className="flex flex-col gap-4 py-3 bg-tab">
                                {student.check_list[FINANCIAL_EVIDENCE].map(
                                  (item) => (
                                    <div className="flex flex-row gap-2 px-4 text-white">
                                      <div className=" text-xs w-[400px]">
                                        {item.name}
                                      </div>
                                      <div className=" text-xs w-full text-right">
                                        {student?.country?.symbol}
                                        {item.value}
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                              <hr className="border-b-2 bord" />
                              <div className="flex flex-row gap-2 px-4 mt-5 font-semibold ">
                                <div className=" text-xs w-[400px] text-white ">
                                  Total funds Required in{" "}
                                  {student?.country?.currency}
                                </div>
                                <div className=" text-xs w-full text-right text-white">
                                  {params.financial_evidence_total
                                    ? student?.country?.symbol
                                    : ""}
                                  {params.financial_evidence_total
                                    ? params.financial_evidence_total
                                    : "--"}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className=" rounded-lg text-center bg-light px-3 py-4 lg:px-6 lg:py-6 text-white">
                              <p>Financial Evidence Not updated !.</p>
                            </div>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    </div>
                    <div className="border-2 border-line  rounded rounded-t-lg  mt-4  hidden lg:flex lg:flex-col">
                      <div className="flex flex-col">
                        <div
                          className={`h-[50px] bg-tab px-4  rounded-t-lg flex flex-row rounded accordian-toogle relative cursor-pointer custom-accordian-toggle ${
                            stepProcessStatus.financial_evidence_toggle
                              ? "open"
                              : ""
                          }`}
                          onClick={() =>
                            toogleAccordian("financial_evidence_toggle")
                          }
                        >
                          <div
                            className={`h-6 w-6 rounded-xl  mt-3 mr-3 pl-1.5 pt-1.5 ${
                              stepProcessStatus.financial_evidence
                                ? "success-color-bg"
                                : "out"
                            }`}
                          >
                            <div
                              className={`h-3 w-3 rounded-lg 
                               ${
                                 stepProcessStatus.financial_evidence
                                   ? "success-color"
                                   : "in"
                               } `}
                            ></div>
                          </div>
                          <div className="text-[#60E2FF] text-base mt-3 font-audiowide">
                            { stepProcessStatus.financial_evidence ? (
                            <p className="text-[#57CD53]">
                              Financial Calculator
                            </p>
                          ) : (
                            <p className="text-red">Financial Calculator</p>
                          )}
                          </div>
                        </div>
                        {stepProcessStatus.financial_evidence_toggle && (
                          <>
                            {student?.steps_timestamp
                              ?.financial_evidence_started_on ? (
                              <div className=" bg-light px-6 py-6">
                                <div className="bg-tab  rounded-lg px-8 py-4">
                                  <div className=" px-4">
                                    <div className="flex flex-col gap-2 text-xs lg:text-base">
                                      <div className=" text-text text-xs  font-audiowide ">
                                        Stage Started Date
                                      </div>
                                      <div className="text-white text-xs">
                                        {
                                          student?.steps_timestamp
                                            ?.financial_evidence_started_on
                                        }
                                      </div>
                                    </div>
                                  </div>
                                  <div className=" bg-light rounded-base mt-4 px-4 mb-3 rounded-lg ">
                                    <Table className=" relative px-4 font-audiowide  custom-table">
                                      <Thead className="  mb-1 text-text">
                                        <Tr className=" text-left text-sm font-audiowide">
                                          <Th className=" text-center ">
                                            S. No.
                                          </Th>
                                          <Th className=" pl-10 text-center">
                                            Particulars
                                          </Th>
                                          <Th className=" pl-12  text-right">
                                            Estimated Fees
                                          </Th>
                                        </Tr>
                                      </Thead>
                                      {student.check_list[
                                        FINANCIAL_EVIDENCE
                                      ].map((data, i) => {
                                        return (
                                          <Tbody key={uuid()}>
                                            <Tr className="row border-b-2 text-xs text-white lg:text-base font-audiowide">
                                              <Td className="pt-4 text-center text-xs pb-4">
                                                {i + 1}.
                                              </Td>
                                              <Td className="pl-12 text-xs  text-center">
                                                {data?.name}
                                              </Td>
                                              <Td className="text-right pr-10 pl-12 text-xs">
                                                {data.value
                                                  ? student?.country?.symbol
                                                  : ""}{" "}
                                                {data.value ? data.value : "--"}
                                              </Td>
                                            </Tr>
                                          </Tbody>
                                        );
                                      })}
                                    </Table>
                                    <div className="flex justify-end gap-4 py-8  text-white text-xs  md:pr-14 lg:text-base">
                                      <div className="text-sm">
                                        Total funds Required/in{" "}
                                        {student?.country?.currency}
                                      </div>
                                      <div className=" text-right text-sm">
                                        {params.financial_evidence_total
                                          ? student?.country?.symbol
                                          : ""}
                                        {params.financial_evidence_total
                                          ? params.financial_evidence_total
                                          : "--"}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className=" rounded-lg text-center bg-light px-3 py-4 lg:px-6 lg:py-6 hidden lg:block">
                                <p>Financial Evidence Not updated !.</p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}

              {z.slug === VISA_APPLICATION &&
                student.check_list.hasOwnProperty(VISA_APPLICATION) && (
                  <div>
                    <div className="lg:hidden mt-4 application-view-accordian">
                      <Accordion 
                       expanded={expanded === index}
                       elevation={0}
                       onChange={handleAccordian(index)}>
                        <AccordionSummary
                          expandIcon={
                            <ExpandMoreIcon
                              className={
                                stepProcessStatus.visa_application
                                  ? "text-[#57CD53]"
                                  : "text-red"
                              }
                            />
                          }
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          className="bg-tab"
                        >
                          <Typography className="flex w-full flex-row justify-between items-center">
                            <div className="w-full flex items-center">
                              <div
                                className={`h-6 w-6 rounded-xl   mr-3 pl-1.5 pt-1.5 ${
                                  stepProcessStatus.visa_application
                                    ? "success-color-bg"
                                    : "out"
                                }`}
                              >
                                <div
                                  className={`h-3 w-3 rounded-lg  ${
                                    stepProcessStatus.visa_application
                                      ? "success-color"
                                      : "in"
                                  }`}
                                ></div>
                              </div>
                              <div className="text-sm  font-audiowide">
                                {stepProcessStatus.visa_application ? (
                                  <p className="text-[#57CD53]">Visa Checklist</p>
                                ) : (
                                  <p className="text-red">Visa Checklist</p>
                                )}
                              </div>
                            </div>
                            <div className="text-sm  font-audiowide text-[#60E2FF]">
                              {stepProcessStatus.visa_application ? (
                                <>
                                  <p className="text-[#57CD53]">
                                    {
                                      student.check_list[
                                        VISA_APPLICATION
                                      ]?.filter((x) => x.value)?.length
                                    }
                                    /
                                    {
                                      student.check_list[VISA_APPLICATION]
                                        ?.length
                                    }
                                  </p>
                                </>
                              ) : (
                                <>
                                  <p className="text-red">
                                    {
                                      student.check_list[
                                        VISA_APPLICATION
                                      ]?.filter((x) => x.value)?.length
                                    }
                                    /
                                    {
                                      student.check_list[VISA_APPLICATION]
                                        ?.length
                                    }
                                  </p>
                                </>
                              )}
                            </div>
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {student?.steps_timestamp?.visa_app_started_on ? (
                            <div className="flex flex-col bg-tab lg:hidden">
                              {student.check_list[VISA_APPLICATION].map(
                                (item) => (
                                  <>
                                    <div className="flex flex-row justify-between items-center rounded-xl px-2 md:px-6 py-4 md:py-6 gap-6 w-full">
                                      <div className="text-white flex gap-2 pl-1 items-center text-xs w-[70%] mt-0.5 font-audiowide">
                                        {item.value ? (
                                          <div className="w-[20px]">
                                            <img src={checked} alt="logo" />
                                          </div>
                                        ) : (
                                          <div className="w-[20px]">
                                            <img src={info} alt="logo" />
                                          </div>
                                        )}
                                        <div className="w-full break">{item.name}</div>
                                      </div>
                                      <div className="flex justify-end items-end py-2">
                                        {item.value ? (
                                          <div className=" flex justify-start pr-2 gap-3">
                                            <Tooltip title="Preview Attactment">
                                              <img
                                                onClick={(e) =>
                                                  previewAttachment(item)
                                                }
                                                className=" cursor-pointer"
                                                src={view}
                                                alt="alt"
                                              />
                                            </Tooltip>
                                            <div className="border-l-2 h-auto border-line"></div>
                                            <Tooltip title="Delete Attactment">
                                              <img
                                                className=" cursor-pointer"
                                                onClick={() => {
                                                  handleDelete(item);
                                                }}
                                                src={del}
                                                alt="reload"
                                              />
                                            </Tooltip>
                                          </div>
                                        ) : (
                                          <div className="pr-2">
                                            <Tooltip title="Upload Attachment">
                                              <img
                                                className=" cursor-pointer"
                                                onClick={() =>
                                                  handleUpload(item)
                                                }
                                                src={upload}
                                                alt="logo"
                                              />
                                            </Tooltip>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex flex-row gap-4 rounded-xl px-3 md:px-6 ">
                                      <div className="text-text font-audiowide text-xs ">
                                        info:
                                      </div>
                                      <div className="text-white text-xs cursor-pointer">
                                        {item.link_url ? (
                                          <u
                                            onClick={(e) =>
                                              downloadDoc(item.link_url)
                                            }
                                          >
                                            Click Here
                                          </u>
                                        ) : (
                                          "--"
                                        )}
                                      </div>
                                    </div>
                                    {/* <hr className="border-b-2 bord" /> */}
                                  </>
                                )
                              )}
                            </div>
                          ) : (
                            <div className=" rounded-lg text-center bg-light text-white px-3 py-4 lg:px-6 lg:py-6 ">
                              <p>CheckList Not updated !.</p>
                            </div>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    </div>
                    <div className="border-2 border-line rounded rounded-t-lg  mt-4 hidden lg:flex lg:flex-col">
                      <div className="flex flex-col">
                        <div
                          className={`h-[50px] bg-tab px-4  rounded-t-lg flex flex-row rounded accordian-toogle relative cursor-pointer custom-accordian-toggle ${
                            stepProcessStatus.visa_application_toggle
                              ? "open"
                              : ""
                          }`}
                          onClick={() =>
                            toogleAccordian("visa_application_toggle")
                          }
                        >
                          <div
                            className={`h-6 w-6 rounded-xl  mt-3 mr-3 pl-1.5 pt-1.5 ${
                              stepProcessStatus.visa_application
                                ? "success-color-bg"
                                : "out"
                            }`}
                          >
                            <div
                              className={`h-3 w-3 rounded-lg ${
                                stepProcessStatus.visa_application
                                  ? "success-color"
                                  : "in"
                              }`}
                            ></div>
                          </div>
                          <div className="text-[#60E2FF] text-base mt-3 font-audiowide">
                            {stepProcessStatus.visa_application ? (
                              <p className="text-[#57CD53]">Visa Checklist</p>
                            ) : (
                              <p className="text-red">Visa Checklist</p>
                            )}
                          </div>
                        </div>
                        {stepProcessStatus.visa_application_toggle ? (
                          <>
                            {student?.steps_timestamp?.visa_app_started_on ? (
                              <div className=" bg-light px-6 py-6">
                                <div className="bg-tab  rounded-xl px-8 py-4">
                                  <div className="flex flex-row gap-10 px-4">
                                    <div className="flex flex-col gap-2 text-xs ">
                                      <div className=" text-text font-audiowide">
                                        Stage Started Date
                                      </div>
                                      <div className="text-white ">
                                        {
                                          student?.steps_timestamp
                                            ?.visa_app_started_on
                                        }
                                      </div>
                                    </div>
                                    <div className="flex flex-col gap-2 text-xs">
                                      <div className=" text-text font-audiowide">
                                        Document Collected
                                      </div>
                                      <div className="text-white ">
                                        {
                                          student.check_list[
                                            VISA_APPLICATION
                                          ]?.filter((x) => x.value)?.length
                                        }{" "}
                                        /{" "}
                                        {
                                          student.check_list[VISA_APPLICATION]
                                            ?.length
                                        }
                                      </div>
                                    </div>
                                  </div>
                                  <div className="bg-light  mt-4 rounded-xl mb-4 ">
                                    <Table className=" relative px-4 font-audiowide  custom-table">
                                      <Thead className="border-b-2 mb-1 text-text border-white">
                                        <Tr className=" text-left text-sm lg:text-base font-audiowide">
                                          <Th className=" pl-4">Sno</Th>
                                          <Th className=" pl-4">Particulars</Th>
                                          <Th className=" pl-8 ">Info</Th>
                                          <Th className="text-center pl-12">
                                            Action
                                          </Th>
                                        </Tr>
                                      </Thead>
                                      {student.check_list[VISA_APPLICATION].map(
                                        (data, i) => {
                                          return (
                                            <Tbody key={uuid()}>
                                              <Tr className="row border-b-2 text-xs text-white font-audiowide ">
                                                <Td className=" text-left pl-4 ">
                                                  {i + 1}
                                                </Td>
                                                <Td className=" text-left pl-4 ">
                                                  {data?.name}
                                                </Td>
                                                <Td className="text-left pl-8">
                                                  <div className="cursor-pointer">
                                                    {data.link_url ? (
                                                      <u
                                                        onClick={(e) =>
                                                          downloadDoc(
                                                            data.link_url
                                                          )
                                                        }
                                                      >
                                                        Click Here
                                                      </u>
                                                    ) : (
                                                      "--"
                                                    )}
                                                  </div>
                                                </Td>
                                                <Td className="pl-12 text-center ">
                                                  {data.value ? (
                                                    <div className="flex gap-3 justify-center">
                                                      <Tooltip title="Preview Attactment">
                                                        <img
                                                          onClick={(e) =>
                                                            previewAttachment(
                                                              data
                                                            )
                                                          }
                                                          className=" cursor-pointer"
                                                          src={view}
                                                          alt="alt"
                                                        />
                                                      </Tooltip>
                                                      <div className="border-l-2 h-auto border-line"></div>
                                                      <Tooltip title="Delete Attactment">
                                                        <img
                                                          src={del}
                                                          alt="reload"
                                                          className="cursor-pointer"
                                                          onClick={() => {
                                                            handleDelete(data);
                                                          }}
                                                        />
                                                      </Tooltip>
                                                    </div>
                                                  ) : (
                                                    <div className="flex  justify-center">
                                                      <Tooltip title="Upload File">
                                                        <img
                                                          className="cursor-pointer"
                                                          src={upload}
                                                          onClick={() =>
                                                            handleUpload(data)
                                                          }
                                                          alt="icon"
                                                        />
                                                      </Tooltip>
                                                    </div>
                                                  )}
                                                </Td>
                                              </Tr>
                                            </Tbody>
                                          );
                                        }
                                      )}
                                    </Table>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className=" rounded-lg text-center bg-light px-3 py-4 lg:px-6 lg:py-6 hidden lg:block">
                                <p>CheckList Not updated !.</p>
                              </div>
                            )}
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                )}
            </>
          );
        })}

      {/* Popup deleteModal */}

      {dialogConfig.delete && (
        <div>
          <DeleteConfirmModel
            open={dialogConfig.delete}
            loading={apiLoading}
            handleClose={handleClose}
            deleteUpload={onFileDelete}
          />
        </div>
      )}
      {dialogConfig.confirm && (
        <div>
          <ConfirmModel
            open={dialogConfig.confirm}
            loading={apiLoading}
            handleClose={handleClose}
            onConfirm={updateUniversityValues}
          />
        </div>
      )}
      {dialogConfig.upload && (
        <div>
          <ReuploadDocument
            loading={apiLoading}
            handleClose={handleClose}
            submitFileUpload={updateFileChange}
            title={dialogConfig.title}
          />
        </div>
      )}

      {dialogConfig.preview && (
        <PdfViewer
          hideNavbar={true}
          open={dialogConfig.preview}
          item={{
            url: dialogConfig.attachment_url,
          }}
          handleClose={handleClose}
          handleDowload={() => downloadDoc(dialogConfig.attachment_url)}
        />
      )}

      {/* <NotesandLogs /> */}
    </div>
  );
};

export default MyApplicationProcess;
