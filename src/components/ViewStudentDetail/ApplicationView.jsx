import React, { useState, useEffect, useContext } from "react";
import Myinfo from "./Myinfo";
import api from "../../api/index";
import { AppContext } from "../../context/Appcontext";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./styles.scss";
import moment from "moment";
import Discussions from "./Discussions";
import CustomCheckbox from "./Checkbox";

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import checked from "../../Images/check.svg";
import info from "../../Images/pending.svg";
import upload from "../../Images/upload.svg";

import download from "../../assets/allstudents/download.svg";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReuploadDocument } from "../../ReuploadDocument";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Delete from "../../assets/application/Delete.svg";
import { decryptData, uuid } from "../../utils/helpers";
import Dropdown from "./Dropdown";
import UpArrow from "../../assets/application/UpArrow.svg";
import Edit from "../../assets/application/Edit.svg";
import view from "../../assets/allstudents/view.svg";
import del from "../../assets/allstudents/delete.svg";
import { AddOfferDialog } from "./AddOfferDialog";
import { OfferDefer } from "./OfferDefer";
import { AddCourseLink } from "./AddCourseLink";

import Log1 from "../../common/Log";
import Status from "./Status";
import Enrolement from "./Enrolement";
import Tooltip from "@mui/material/Tooltip";
import PdfViewer from "../StudentViewModule/Resources/PdfViewer";
import DeleteConfirmModel from "../../DeleteConfirmModel";


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
    check_box: "gatherchecklist_allchecked",
    toggle: "gatherchecklist_toggle",
    time_stamp: "check_list_started_on",
    config: "COMMON",
  },
  {
    step: "UNIVERSITY_SELECTION",
    status: "universityies",
    toggle: "university_toggle",
    name: "University Application",
    slug: "University Application",
    time_stamp: "",
    check_box: "",
    config: "CUSTOM",
  },
  {
    step: "FINANCIAL_EVIDENCE",
    status: "financial_evidence",
    toggle: "financial_evidence_toggle",
    time_stamp: "financial_evidence_started_on",
    name: "Financial Evidence",
    slug: "Financial Evidence",
    check_box: "financial_evidence_allchecked",
    config: "CUSTOM",
  },
  {
    step: "AFTERI20",
    status: "after_i20",
    slug: "After I-20",
    toggle: "after_120_toggle",
    time_stamp: "after_i20_started_on",
    name: "After I-20",
    check_box: "after_i20_allchecked",
    config: "COMMON",
  },
  {
    step: "PRE_CAS_PROCESS",
    status: "pre_cas_process",
    toggle: "pre_cas_process_toggle",
    time_stamp: "pre_cas_started_on",
    name: "Pre-CAS Process",
    slug: "Pre-CAS Process",
    check_box: "pre_cas_process_allchecked",
    config: "COMMON",
  },
  {
    step: "VISA_APPLICATION",
    status: "visa_application",
    toggle: "visa_application_toggle",
    time_stamp: "visa_app_started_on",
    name: "Visa Application",
    slug: "Visa Application",
    check_box: "visa_application_allchecked",
    config: "CUSTOM",
  },
  {
    step: "PREDEPEATURE",
    status: "predepeature",
    toggle: "predepeature_toggle",
    time_stamp: "pre_departure_started_on",
    slug: "Pre-Departure",
    name: "Pre-Departure",
    check_box: "predepeature_allchecked",
    config: "COMMON",
  },
  {
    step: "ONARRIVAL",
    status: "on_arrival",
    toggle: "on_arrival_toggle",
    time_stamp: "on_arrival_started_on",
    name: "On-Arrival",
    slug: "On-Arrival",
    check_box: "on_arrival_allchecked",
    config: "COMMON",
  },

  {
    step: "PRE_REQUISITE",
    status: "predepeature",
    toggle: "pre_requisite_toggle",
    time_stamp: "pre_requisite_started_on",
    name: "Pre Requisite",
    config: "CUSTOM",
    check_box: "pre_requisite_allchecked",
    slug: "Pre Requisite",
  },
];

let obj = {
  gatherchecklist: false,
  gatherchecklist_toggle: false,
  gatherchecklist_allchecked: false,
  universityies: false,
  university_toggle: false,
  financial_evidence: false,
  financial_evidence_toggle: false,
  financial_evidence_allchecked: false,
  pre_cas_process: false,
  pre_cas_process_toggle: false,
  pre_cas_process_allchecked: false,
  pre_requisite: false,
  pre_requisite_toggle: false,
  pre_requisite_allchecked: false,
  after_120_toggle: false,
  after_i20: false,
  after_i20_allchecked: false,
  predepeature: false,
  predepeature_toggle: false,
  predepeature_allchecked: false,
  on_arrival: false,
  on_arrival_toggle: false,
  on_arrival_allchecked: false,
  visa_application: false,
  visa_application_toggle: false,
  visa_application_allchecked: false,

};
let initialParamState = {
  university_status: "",
  financial_evidence_total: "",
  visa_application_link: "",
};

const ApplicationView = () => {
  const [student, setStudentData] = useState("");
  const [studentCheckList, setStudentCheckList] = useState({
    [GATHER_CHECKLIST]: [],
    [FINANCIAL_EVIDENCE]: [],
    [PRE_CAS_PROCESS]: [],
    [PRE_REQUISITE]: [],
    [AFTERI20]: [],
    [PREDEPEATURE]: [],
    [ONARRIVAL]: [],
    [VISA_APPLICATION]: []
  });


  const [checkListId, setCheckListId] = useState("");
  const [apiLoading, setApiLoading] = useState(false);
  const [params, setParams] = useState(initialParamState);

  const [stepProcessStatus, setStepProcessStatus] = useState(obj);
  const [dialogConfig, setdialogConfig] = useState({
    upload: false,
    delete: false,
    title: "",
    preview: false,
    confirm: false,
    offerModel: false,
    uniDelete: false,
    offerDiffer: false,
    course_link: false,
  });
  const [isLoading, setLoading] = useState(false);
  const { BASE_URL } = useContext(AppContext);
  const { id } = useParams();
  const [notes, setNotes] = useState("");

  useEffect(() => {
    getStudentData();
  }, []);

  const getStudentData = () => {
    api
      .get(`${BASE_URL}/admin/students/${decryptData(id)}`)
      .then((res) => {
        setStudentData(res.data.data);
        let response = { ...res.data.data };
        let ele = JSON.parse(JSON.stringify(res.data.data))
        setStudentCheckList({
          [GATHER_CHECKLIST]: ele.check_list[GATHER_CHECKLIST],
          [FINANCIAL_EVIDENCE]: ele.check_list[FINANCIAL_EVIDENCE],
          [PRE_CAS_PROCESS]: ele.check_list[PRE_CAS_PROCESS],
          [PRE_REQUISITE]: ele.check_list[PRE_REQUISITE],
          [AFTERI20]: ele.check_list[AFTERI20],
          [PREDEPEATURE]: ele.check_list[PREDEPEATURE],
          [ONARRIVAL]: ele.check_list[ONARRIVAL],
          [VISA_APPLICATION]: ele.check_list[VISA_APPLICATION]
        })


        let G_CHECKLIST = response.check_list[GATHER_CHECKLIST];
        let steps = { ...stepProcessStatus };
        if (
          response?.steps_timestamp?.check_list_started_on &&
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
          response.steps_timestamp?.pre_cas_started_on &&
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
          response?.steps_timestamp?.pre_requisite_started_on &&
          response.check_list[PRE_REQUISITE]?.filter((x) => x.checked)
            ?.length &&
          response.check_list[PRE_REQUISITE]?.filter((x) => x.value)?.length ===
          response.check_list[PRE_REQUISITE]?.filter((x) => x.checked)?.length
        ) {
          steps.pre_requisite = true;
        }
        if (
          response?.steps_timestamp?.after_i20_started_on &&
          response.check_list[AFTERI20]?.filter((x) => x.checked)?.length &&
          response.check_list[AFTERI20]?.filter((x) => x.value)?.length ===
          response.check_list[AFTERI20]?.filter((x) => x.checked)?.length
        ) {
          steps.after_i20 = true;
        }

        if (
          response?.steps_timestamp?.pre_departure_started_on &&
          response.check_list[PREDEPEATURE]?.filter((x) => x.checked)?.length &&
          response.check_list[PREDEPEATURE]?.filter((x) => x.value)?.length ===
          response.check_list[PREDEPEATURE]?.filter((x) => x.checked)?.length
        ) {
          steps.predepeature = true;
        }

        if (
          response?.steps_timestamp?.on_arrival_started_on &&
          response.check_list[ONARRIVAL]?.filter((x) => x.checked)?.length &&
          response.check_list[ONARRIVAL]?.filter((x) => x.value)?.length ===
          response.check_list[ONARRIVAL]?.filter((x) => x.checked)?.length
        ) {
          steps.on_arrival = true;
        }

        if (
          response.steps_timestamp?.visa_app_started_on &&
          response.check_list[VISA_APPLICATION]?.filter((x) => x.checked)
            ?.length &&
          (response.check_list[VISA_APPLICATION]?.filter((x) => x.value)
            ?.length ===
            response.check_list[VISA_APPLICATION]?.filter((x) => x.checked)
              ?.length)
        ) {
          steps.visa_application = true;
        }

        for (let item of APPLICATION_PROCESS_LIST) {
          if (item.check_box && response.check_list[item.slug]) {
            steps[item.check_box] = response.check_list[item.slug]?.filter((x) => x.checked).length == response.check_list[item.slug].length
          }
        }

        setStepProcessStatus(steps)
      })
      .catch((error) => {
      });
  };

  const refresh = () => {
    getStudentData()
  }


  const selectAll = (e, checkbox, step) => {
    let tempList = [...studentCheckList[step]]
    for (let list of tempList) {
      list.checked = e.target.checked
    }

    setStudentCheckList((inputs) => ({ ...inputs, [step]: tempList }));
    setStepProcessStatus((inputs) => ({
      ...inputs,
      [checkbox]: e.target.checked,
    }));
  };
  const onCheckListChange = (e, value, step, checkbox) => {
    let tempList = [...studentCheckList[step]]
    for (let list of tempList) {
      if (list.id === value.id) {
        if (e.target.checked) {
          list.checked = true;
        } else {
          list.checked = false;
        }
        break;
      }
    }
    setStudentCheckList((inputs) => ({ ...inputs, [step]: tempList }));
    setStepProcessStatus((inputs) => ({
      ...inputs,
      [checkbox]: tempList?.filter((x) => x.checked).length == tempList.length,
    }));

  };

  const handleVisaLinkChange = (e, id) => {
    let applicant = { ...student }
    let tempList = applicant.check_list[VISA_APPLICATION]

    let index = tempList.findIndex((x) => x.id === id);
    if (index != -1) {
      tempList[index]["link_url"] = e.target.value;
    }
    applicant.check_list[VISA_APPLICATION] = tempList
    setStudentData(applicant)

  };

  const submitCheckList = (step) => {
    let list = studentCheckList[step]
      .filter((x) => x.checked)
      .map((x) => x.id);
    if (list.length) {
      updateCheckList({ checklist: list, type: step });
      return;
    }
    // toast
    toast.error('Please select atleast one checklist.')
  };

  const updateCheckList = (data) => {
    setLoading(true);
    api
      .put(`${BASE_URL}/admin/students/update-check-list/${decryptData(id)}`, data)
      .then((res) => {
        getStudentData();
        setLoading(false);
        toast.success("CheckList Updated Successfully!.");
      })
      .catch((error) => {
        setLoading(false);
        // toast
      });
  };
  const toogleAccordian = (stage) => {
    setStepProcessStatus((inputs) => ({
      ...inputs,
      [stage]: !stepProcessStatus[stage],
    }));
  };

  const handleChange = (e, item) => {
    let applicant = { ...student }
    let tempList = applicant.selected_universities

    let index = tempList.findIndex((x) => x.id === item.id);
    if (index != -1) {
      tempList[index]["status"] = e.target.value;
    }
    applicant.selected_universities = tempList
    setStudentData(applicant)
  };

  const handleChangeFees = (e, item) => {
    let tempList = [...studentCheckList[FINANCIAL_EVIDENCE]]
    const { value } = e.target;
    const re = /^\d{1,}(\.\d{0,3})?$/;
    if (value && !re.test(value)) {
      return;
    }

    let index = tempList.findIndex((x) => x.id === item.id);
    tempList[index].value = value ? parseFloat(value) : '';

    if (item.name === "Tuition Fees") {
      tempList[index].value = parseFloat(value);
      if (tempList[1].value) tempList[2].value = tempList[0].value - tempList[1].value;
    }

    if (item.name === "Deposit" && parseFloat(value) <= tempList[0].value) {
      tempList[index].value = parseFloat(value);
      tempList[2].value = tempList[0].value - tempList[1].value;
    }

    if (item.name.includes("Living Cost")) {
      tempList[index].value = value ? parseFloat(value) : '';
    }
    let total = (parseFloat(tempList[0].value || 0) + parseFloat(tempList[3].value || 0)) - parseFloat(tempList[1].value || 0)
    setParams((inputs) => ({
      ...inputs,
      financial_evidence_total: total,
    }));
    setStudentCheckList((inputs) => ({ ...inputs, [FINANCIAL_EVIDENCE]: tempList }));
  };

  const downloadDoc = (item) => {
    window.open(item, "_blank");
  };


  const previewAttachment = (item) => {
    setCheckListId(item.id);
    const name = item.value.substring(item.value.lastIndexOf("/") + 1);
    const lastDot = name.lastIndexOf(".");
    const ext = name.substring(lastDot + 1);
    if (ext !== "pdf") {
      window.open(item.value, "_blank");
      return;
    }
    setdialogConfig((inputs) => ({
      ...inputs,
      preview: true,
      attachment_url: item.value,
    }));
  };


  const handleDelete = (item) => {
    setCheckListId(item.id);
    setdialogConfig((inputs) => ({ ...inputs, delete: true }));
  };

  const handleCourseLink = (item) => {
    setCheckListId(item.id);
    setdialogConfig((inputs) => ({ ...inputs, course_link: true, link: item.course_link }));
  };


  const handleUpload = (item) => {
    setCheckListId(item.id);
    setdialogConfig((inputs) => ({ ...inputs, upload: true, title: "Upload " + item.name }));
  };

  const handleOfferUpload = (item, key) => {
    setCheckListId(item.id);
    setdialogConfig((inputs) => ({ ...inputs, [key]: true }));
  };

  const handleClose = () => {
    setdialogConfig((inputs) => ({
      ...inputs,
      upload: false,
      delete: false,
      offerModel: false,
      uniDelete: false,
      offerDiffer: false,
      preview: false,
      course_link: false,
    }));
  };

  const updateUniversityValues = (data) => {
    if (!data.status) {
      toast.error('Please Select Status')
      return;
    }
    api
      .put(`${BASE_URL}/admin/students/update-university-status/${data.id}`, {
        id: data.id,
        status: data.status,
      })
      .then((res) => {
        getStudentData();
        toast.success('Status Updated Successfully.')
      })
      .catch((error) => {
      });
  };

  const updateFinancialEvidence = () => {
    let isValid = studentCheckList[FINANCIAL_EVIDENCE].every((x) => x.value);
    if (!isValid) {
      toast.error('Please Enter Details.!')
      return
    }
    let obj = {
      student_id: student.id,
      check_list: studentCheckList[FINANCIAL_EVIDENCE],
    };
    api
      .put(`${BASE_URL}/admin/students/update-financial-evidence/${decryptData(id)}`, obj)
      .then((res) => {
        getStudentData();
        toast.success('Financial Evidence Updated Successfully.!')
      })
      .catch((error) => {
        console.log(error);
      });
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
        if (type === "delete") {
          toast.success("Attachment Deleted Successfully!.");
        } else {
          toast.success("Attachment Uploaded Successfully!.");
        }
        getStudentData();
        // toast
      })
      .catch((error) => {
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
      });
  };

  const updateUniDetails = (obj) => {
    api
      .put(
        `${BASE_URL}/admin/students/update-university-status/${checkListId}`,
        obj
      )
      .then((res) => {
        getStudentData();
        handleClose();
        toast.success("Updated Successfully.");
      })
      .catch((error) => {
      });
  };
  const downloadAll = (checklist) => {
    toast.warn("Please wait file processing...");

    api
      .get(
        `${BASE_URL}/admin/students/download-checklist/${student.id}?type=${checklist}`
      )
      .then((res) => {
        const linkSource = `data:application/zip;base64,${res.data.base64String}`;
        const downloadLink = document.createElement("a");
        document.body.appendChild(downloadLink);

        downloadLink.href = linkSource;
        downloadLink.target = "_self";
        downloadLink.download = "source.zip";
        downloadLink.click();
      })
      .catch((error) => {
      });
  };
  const onUniDelete = () => {
    updateUniDetails({ id: checkListId, type: "delete" });
  };
  const handleOfferDiffer = (e) => {
    updateUniDetails({
      id: checkListId,
      course_link: e.course_link,
      offer_intake: e.intake,
      defer: e.intake ? true : false,
    });
  };
  const handleOfferWithIntake = (e) => {
    const files = e.file.target.files;
    let file = files[0];
    var formData = new FormData();
    formData.append("file", file);
    setApiLoading(true);
    api
      .post(`${BASE_URL}/admin/upload`, formData)
      .then((res) => {
        updateUniDetails({
          id: checkListId,
          value: res.data.data,
          offer_intake: e.intake,
        });
        setApiLoading(false);
      })
      .catch((error) => {
      });
  };

  const onFileDelete = () => {
    updateCheckListValues("", checkListId, "delete");
  };

  const onUniVersityAdd = (value) => {
    let obj = {
      university_id: value,
    };
    api
      .put(`${BASE_URL}/admin/students/update-university/` + student.id, obj)
      .then((res) => {
        getStudentData();
        toast.success("University Added Successfully.");
      })
      .catch((error) => {
      });
  };

  const deleteUniversitySelection = (value) => {
    let obj = {
      university_id: value,
    };
    console.log(obj)
    api
      .put(`${BASE_URL}/admin/students/delete-university/` + student.id, obj)
      .then((res) => {
        getStudentData();
        toast.success("University Removed Successfully.");
      })
      .catch((error) => {
      });
  };

  function isUrlValid(userInput) {
    var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if (res == null)
      return false;
    else
      return true;
  }

  const updateVisaLink = (data) => {
    if (!data.link_url) {
      toast.error('Please Update Link')
      return;
    }
    if (!isUrlValid(data.link_url)) {
      toast.error('Please Enter Valid Link!.')
      return;
    }
    let obj = {
      value: "",
      check_list_id: data.id,
      student_id: student.id,
      type: "add",
      link: data.link_url,
    };
    setApiLoading(true);
    api
      .post(`${BASE_URL}/admin/students/update-check-list-value`, obj)
      .then((res) => {
        getStudentData();
        setApiLoading(false)
        toast.success("Link Updated Successfully.");

      })
      .catch((error) => {
        setApiLoading(false)
      });
  };
  const updateNotes = (e) => {
    e.preventDefault();
    if (!notes) {
      return;
    }
    api
      .patch(`${BASE_URL}/admin/students/notes/` + id, { notes: notes })
      .then((res) => {
        getStudentData();
        setNotes("");
      })
      .catch((error) => { });
  };

  return (

    <div className="mb-10 px-4 py-6 text-white ">
      {student ? (
        <>
          <Myinfo student={student} />


          <section>
            <div className="bg-light mt-6 rounded-lg px-3 py-3 md:px-8 md:py-6">
              <p className="text-base text-white font-medium">
                Application Process
              </p>
              <hr className="bord border-2 mt-3" />

              {
                student.check_list &&
                APPLICATION_PROCESS_LIST.map((z, index) => {
                  return (
                    <>
                      {
                        z.config === "COMMON" &&
                        student.check_list.hasOwnProperty(z.slug) && (
                          <div className=" lg:border-2 lg:border-line  rounded-lg mt-4">
                            <div className="flex flex-col">
                              <div
                                className={`bg-tab px-4 py-2  cursor-pointer rounded rounded-t-lg  hidden lg:flex lg:flex-row accordian-toogle relative custom-accordian-toggle ${stepProcessStatus[z.toggle] ? "open" : ""}`}
                                onClick={() => toogleAccordian(z.toggle)}
                              >
                                <div
                                  className={`h-6 w-6 rounded-xl  mt-2 mr-3 pl-1.5 pt-1.5 ${stepProcessStatus[z.status]
                                    ? "success-color-bg"
                                    : "out"
                                    }`}
                                >
                                  <div
                                    className={`h-3 w-3 rounded-lg ${stepProcessStatus[z.status]
                                      ? "success-color"
                                      : "in"
                                      }`}
                                  ></div>
                                </div>
                                <div className="text-white text-base mt-2 font-audiowide">
                                  {z.name}
                                </div>
                              </div>

                              <div className="block lg:hidden">
                                <Accordion>
                                  <AccordionSummary
                                    expandIcon={
                                      <ExpandMoreIcon className="text-white" />
                                    }
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    className="bg-tab text-white"
                                  >
                                    <Typography className="flex flex-row">
                                      <div
                                        className={`h-6 w-6 rounded-xl   mr-3 pl-1.5 pt-1.5 ${stepProcessStatus[z.status]
                                          ? "success-color-bg"
                                          : "out"
                                          }`}
                                      >
                                        <div
                                          className={`h-3 w-3 rounded-lg ${stepProcessStatus[z.status]
                                            ? "success-color"
                                            : "in"
                                            }`}
                                        ></div>
                                      </div>
                                      <div className=" text-base  font-audiowide text-white">
                                        {z.name}
                                      </div>
                                    </Typography>
                                  </AccordionSummary>

                                  {/* mble gathering */}

                                  <AccordionDetails>
                                    <div className=" flex-col block lg:hidden  gap-4 text-white text-sm">
                                      <div
                                        key={uuid()}
                                      >
                                        <CustomCheckbox
                                          Label='Select All'
                                          ischecked={stepProcessStatus[z.check_box]}
                                          handleCheck={(e) =>
                                            selectAll(
                                              e,
                                              z.check_box,
                                              z.slug,
                                            )
                                          }
                                        />
                                      </div>

                                      {studentCheckList[z.slug]?.map((x) => {
                                        return (
                                          <div
                                            key={uuid()}
                                          >
                                            <CustomCheckbox
                                              Label={x.name}
                                              ischecked={x.checked}
                                              handleCheck={(e) =>
                                                onCheckListChange(
                                                  e,
                                                  x,
                                                  z.slug,
                                                  z.check_box
                                                )
                                              }
                                            />
                                          </div>
                                        );
                                      })}
                                    </div>
                                    <div className="flex justify-end my-4">
                                      <button
                                        className={`px-6 py-2 font-semibold submit rounded-lg text-[#000000]`}
                                        onClick={() =>
                                          submitCheckList(z.slug)
                                        }
                                      >
                                        {" "}
                                        {student.steps_timestamp && student.steps_timestamp[z.time_stamp]
                                          ? "Update"
                                          : "Request Document"}
                                      </button>
                                    </div>
                                    {student.steps_timestamp && student.steps_timestamp[z.time_stamp] ? (
                                      <>
                                        <div className="flex flex-col lg:hidden bg-light">
                                          <div className="bg-tab rounded-xl px-4 md:px-6 py-4 md:py-6 flex gap-4 flex-col">
                                            <div className="flex flex-row gap-6 w-98">
                                              <div className="text-text text-xs  mt-0.5 font-audiowide">
                                                Stage Started Date
                                              </div>
                                              <div className="text-white text-xs ">
                                                {student.steps_timestamp[z.time_stamp]}
                                              </div>
                                            </div>
                                            <div className="flex flex-row gap-6 w-98">
                                              <div className="text-text text-xs  mt-0.5 font-audiowide">
                                                Documents Collected
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


                                            {
                                              student.check_list[z.slug]?.filter(
                                                (x) => x.value
                                              )?.length ?
                                                <div className="flex flex-col gap-2">
                                                  <div className="text-sm text-text font-audiowide">
                                                    Download all
                                                  </div>
                                                  <div className="text-white text-sm">
                                                    <Tooltip title="Download all attachments">
                                                      <img
                                                        className=" cursor-pointer"
                                                        onClick={() =>
                                                          downloadAll(z.slug)
                                                        }
                                                        src={download}
                                                        alt=""
                                                      />
                                                    </Tooltip>
                                                  </div>
                                                </div> : <></>
                                            }

                                          </div>
                                          {student.check_list[z.slug]
                                            ?.filter((x) => x.checked)
                                            .map((item) => (
                                              <div className="py-2 application-child-accordian">
                                                <Accordion>
                                                  <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon className="text-white" />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                  >
                                                    <Typography>
                                                      <div className="text-white font-sm flex flex-row ">
                                                        <p className="text-sm break-all font-audiowide">
                                                          {item.name}
                                                        </p>
                                                        <div className="mt-1 ml-3">
                                                          {item.value ? (
                                                            <div>
                                                              <img
                                                                src={checked}
                                                                alt="logo"
                                                              />
                                                            </div>
                                                          ) : (
                                                            <div>
                                                              <img
                                                                src={info}
                                                                alt="logo"
                                                              />
                                                            </div>
                                                          )}
                                                        </div>
                                                      </div>
                                                    </Typography>
                                                  </AccordionSummary>
                                                  <AccordionDetails>
                                                    <Typography>
                                                      <div className="text-text font-xs py-4">
                                                        <span className="font-audiowide text-xs">
                                                          {" "}
                                                          Date Uploaded:{" "}
                                                        </span>
                                                        {item.updated_at
                                                          ? moment(
                                                            item.updated_at
                                                          ).format("DD-MM-YYYY")
                                                          : "--"}
                                                      </div>
                                                      <hr className="border-b-2 bord" />
                                                      <div className="flex justify-end items-end py-2">
                                                        {item.value ? (
                                                          <div className=" flex justify-start pl-4 gap-3">
                                                            <Tooltip title="Preview Attactment">
                                                              <img
                                                                onClick={(e) =>
                                                                  previewAttachment(
                                                                    item
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
                                                    </Typography>
                                                  </AccordionDetails>
                                                </Accordion>
                                              </div>
                                            ))}
                                        </div>
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </AccordionDetails>
                                </Accordion>
                              </div>

                              {
                                stepProcessStatus[z.toggle] ? (
                                  <div className=" bg-light px-3 hidden lg:block py-4 lg:px-6 lg:py-6">
                                    <div className=" gap-40 lg:flex">
                                      <div className="flex flex-col gap-5 ">
                                        <div key={uuid()}>
                                          <CustomCheckbox
                                            Label='Select All'
                                            ischecked={stepProcessStatus[z.check_box]}
                                            handleCheck={(e) =>
                                              selectAll(
                                                e,
                                                z.check_box,
                                                z.slug,
                                              )
                                            }
                                          />
                                        </div>
                                        {studentCheckList[z.slug]
                                          ?.slice(
                                            0,
                                            index === 0 ? Math.round(studentCheckList[z.slug]?.length / 2) : studentCheckList[z.slug]?.length
                                          )
                                          .map((x) => {
                                            return (
                                              <div key={uuid()}>
                                                <CustomCheckbox
                                                  Label={x.name}
                                                  ischecked={x.checked}
                                                  handleCheck={(e) =>
                                                    onCheckListChange(
                                                      e,
                                                      x,
                                                      z.slug,
                                                      z.check_box
                                                    )
                                                  }
                                                />
                                              </div>
                                            );
                                          })}
                                      </div>
                                      {
                                        index === 0 &&
                                        <>
                                          <div className="border-l-2 h-auto border-line"></div>
                                          <div className="flex flex-col gap-5">
                                            {studentCheckList[z.slug]
                                              ?.slice(
                                                Math.round(studentCheckList[z.slug].length / 2),
                                                studentCheckList[z.slug]?.length
                                              )
                                              .map((x) => {
                                                return (
                                                  <div key={uuid()}>
                                                    <CustomCheckbox
                                                      Label={x.name}
                                                      ischecked={x.checked}
                                                      handleCheck={(e) =>
                                                        onCheckListChange(
                                                          e,
                                                          x,
                                                          z.slug,
                                                          z.check_box
                                                        )
                                                      }
                                                    />
                                                  </div>
                                                );
                                              })}
                                          </div>
                                        </>
                                      }

                                    </div>
                                    <div className="lg:flex hidden justify-end">
                                      <button
                                        className={`px-6 py-2 font-semibold submit rounded-lg text-[#000000]`}
                                        onClick={() => submitCheckList(z.slug)}
                                      >
                                        {" "}
                                        {student.steps_timestamp && student.steps_timestamp[z.time_stamp]
                                          ? "Update"
                                          : "Request Document"}
                                      </button>
                                    </div>
                                    {student.steps_timestamp && student.steps_timestamp[z.time_stamp] ? (
                                      <div className="bg-tab  rounded-xl  px-8 py-4 mt-4 hidden lg:flex lg:flex-col">
                                        <div className="flex flex-row gap-10 px-4">
                                          <div className="flex flex-col gap-2">
                                            <div className="text-sm text-text font-audiowide">
                                              Stage Started Date
                                            </div>
                                            <div className="text-white text-sm">
                                              {
                                                student.steps_timestamp[z.time_stamp]
                                              }
                                            </div>
                                          </div>
                                          <div className="flex flex-col gap-2">
                                            <div className="text-sm text-text font-audiowide">
                                              Document Uploaded
                                            </div>
                                            <div className="text-white text-sm">
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
                                          {
                                            student.check_list[z.slug]?.filter(
                                              (x) => x.value
                                            )?.length ?
                                              <div className="flex flex-col gap-2">
                                                <div className="text-sm text-text font-audiowide">
                                                  Download all
                                                </div>
                                                <div className="text-white text-sm">
                                                  <Tooltip title="Download all attachments">
                                                    <img
                                                      className=" cursor-pointer"
                                                      onClick={() =>
                                                        downloadAll(z.slug)
                                                      }
                                                      src={download}
                                                      alt=""
                                                    />
                                                  </Tooltip>
                                                </div>
                                              </div> : <></>
                                          }

                                        </div>
                                        <div className="bg-light rounded-base mt-4 rounded-xl">
                                          <Table className="relative px-4 font-audiowide custom-table">
                                            <Thead className="border-b-2 mb-1 z-20 text-text border-white">
                                              <Tr className="text-sm ">
                                                <Th className="pl-4 text-left font-audiowide">
                                                  S.No.:
                                                </Th>
                                                <Th className="pl-12 text-left font-audiowide">
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
                                            {
                                              student.check_list[z.slug]?.filter((x) => x.checked).map((data, i) => {
                                                return (
                                                  <Tbody key={uuid()}>
                                                    <Tr className="row border-b-2 text-xs text-white mb-32 ">
                                                      <Td className="pl-8 item-center">
                                                        {i + 1}
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
                                                      <Td className="text-left pl-20">
                                                        {data.updated_at
                                                          ? moment(
                                                            data.updated_at
                                                          ).format("DD-MM-YYYY")
                                                          : "--"}
                                                      </Td>
                                                      <Td className="pl-12 text-center ">
                                                        {data.value ? (
                                                          <div className="flex gap-3 justify-center">
                                                            <Tooltip title="Preview Attachment">
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
                                                            <Tooltip title="Delete Attachment">
                                                              <img
                                                                src={Delete}
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
                                                            <Tooltip title="Upload Attachment">
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
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                ) : (
                                  ""
                                )}
                            </div>
                          </div>
                        )
                      }

                      {
                        z.name === UNIVERSITY_SELECTION && (
                          <div>
                            <div className="lg:hidden mt-4">
                              <Accordion>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon className="text-white" />}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                  className="bg-tab"
                                >
                                  <Typography className="flex flex-row">
                                    <div
                                      className={`h-6 w-6 rounded-xl out  mr-3 pl-1.5 pt-1.5 ${stepProcessStatus.universityies
                                        ? "success-color-bg"
                                        : "out"
                                        }`}
                                    >
                                      <div
                                        className={`h-3 w-3 rounded-lg ${stepProcessStatus.universityies
                                          ? "success-color"
                                          : "in"
                                          }`}
                                      ></div>
                                    </div>
                                    <div className=" text-base  font-audiowide text-white">
                                      University Application
                                    </div>
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Dropdown
                                    selected_universities={student.selected_universities}
                                    country={student.country_id}
                                    onAddUni={onUniVersityAdd}
                                  />

                                  {student.selected_universities &&
                                    student.selected_universities.length ? (
                                    <div className="flex flex-col bg-light lg:hidden  py-4">
                                      <div className="bg-tab rounded-lg px-3 py-6 mt-4 flex gap-4 flex-col">
                                        <div className="flex flex-row gap-6 ">
                                          <div className="text-text text-xs  mt-0.5 break-all font-audiowide">
                                            Received Offer Letters
                                          </div>
                                          <div className="text-white text-xs font-audiowide">
                                            {
                                              student.selected_universities?.filter(
                                                (x) => x.value
                                              ).length
                                            }
                                            /{student.selected_universities?.length}
                                          </div>
                                        </div>
                                      </div>
                                      {student.selected_universities?.map((item) => (
                                        <div
                                          className="bg-tab rounded-lg px-3 py-6 mt-3 flex gap-4 flex-col"
                                          key={uuid()}
                                        >
                                          <div className="text-white font-audiowide mb-4 flex flex-row">
                                            {item?.university?.name}
                                          </div>
                                          <div className=" flex gap-3 flex-col">
                                            <div className="flex gap-2 ">
                                              <div className="text-xs sm:text-sm md:text-base  text-text font-audiowide">
                                                Application Status intake:
                                              </div>
                                              <div className="text-white text-xs sm:text-sm md:text-base font-audiowide">
                                                {item.status}
                                              </div>
                                            </div>
                                            <div className="flex gap-2 ">
                                              <div className="text-xs sm:text-sm md:text-base  text-text font-audiowide">
                                                Applied intake:
                                              </div>
                                              <div className="text-white text-xs sm:text-sm md:text-base font-audiowide">
                                                {student.intake_month} {student.intake_year}
                                              </div>
                                            </div>
                                            <div className="flex gap-2 ">
                                              <div className="text-xs sm:text-sm md:text-base  text-text font-audiowide">
                                                Offer intake:
                                              </div>
                                              <div className="text-white text-xs sm:text-sm md:text-base font-audiowide">
                                                {item.offer_intake || "NA"}
                                              </div>
                                            </div>

                                            <div className="flex gap-2 ">
                                              <div className="text-xs sm:text-sm md:text-base  text-text font-audiowide">
                                                Offer letter:
                                              </div>
                                              <div className="text-white text-xs sm:text-sm md:text-base font-audiowide">
                                                {item.is_selected ? (
                                                  <div className="text-xs sm:text-sm flex flex-row gap-2 text-white">
                                                    Accepted
                                                    <img src={checked} alt="icon" />
                                                  </div>
                                                ) : (
                                                  <div>--</div>
                                                )}
                                              </div>
                                            </div>
                                            </div>
                                            <div className="flex gap-2 pb-4">
                                              <div className="text-xs sm:text-sm md:text-base  text-text font-audiowide">
                                               Cource Link:
                                              </div>
                                              <div  onClick={() => handleCourseLink(item)} className="text-white text-xs sm:text-sm md:text-base font-audiowide">
                                              Click Here
                                              </div>

                                          </div>

                                          <div className=" flex gap-6 flex-col">
                                            <div className="flex flex-row ">
                                              <div className="text-xs sm:text-sm md:text-base  text-text font-audiowide">
                                                Application Status:
                                              </div>
                                              <div className="text-white flex relative bottom-3 text-xs sm:text-sm  md:text-base font-audiowide">
                                                <select
                                                  className="custom-select"
                                                  name="status"
                                                  value={item.status}
                                                  onChange={(e) => handleChange(e, item)}
                                                >
                                                  <option disabled selected>
                                                    Select Staus
                                                  </option>
                                                  <option value="Application due">
                                                    Application due
                                                  </option>
                                                  <option value="Application submitted">
                                                    Application submitted
                                                  </option>
                                                  <option value="Application approved">
                                                    Application approved
                                                  </option>
                                                  <option value="Admission granted">
                                                    Admission granted
                                                  </option>
                                                </select>
                                                <img
                                                  src={UpArrow}
                                                  onClick={() =>
                                                    updateUniversityValues(item)
                                                  }
                                                  className="mr-4 mt-4"
                                                  alt=""
                                                />

                                              </div>
                                            </div>
                                          </div>
                                          <hr className="border-b-2 bord" />
                                          <div className="flex justify-end items-end">
                                            {item.value ? (
                                              <div className="flex gap-4">
                                                <img
                                                  src={view}
                                                  className="cursor-pointer"
                                                  alt="alt"
                                                  onClick={(e) =>
                                                    previewAttachment(
                                                      item
                                                    )
                                                  }
                                                />
                                                <div className="border-l-2 h-auto border-line"></div>
                                                <img
                                                  src={Edit}
                                                  alt="edit"
                                                  onClick={() =>
                                                    handleOfferUpload(item, "offerDiffer")
                                                  }
                                                />
                                                <div className="border-l-2 h-auto border-line"></div>
                                                <img
                                                  src={Delete}
                                                  alt="reload"
                                                  className="cursor-pointer"
                                                  onClick={() => {
                                                    handleOfferUpload(item, "uniDelete");
                                                  }}
                                                />
                                              </div>
                                            ) : (
                                              <div className="flex gap-2">
                                                <Tooltip title="Upload Offer Letter">
                                                  <img
                                                    className="cursor-pointer"
                                                    src={upload}
                                                    onClick={() =>
                                                      handleOfferUpload(
                                                        item,
                                                        "offerModel"
                                                      )
                                                    }
                                                    alt="icon"
                                                  />
                                                </Tooltip>
                                                <div className="border-l-2 h-auto border-line"></div>
                                                <Tooltip title="Edit intake">
                                                  <img
                                                    className="cursor-pointer"
                                                    src={Edit}
                                                    alt="edit"
                                                    onClick={() =>
                                                      handleOfferUpload(
                                                        item,
                                                        "offerDiffer"
                                                      )
                                                    }
                                                  />
                                                </Tooltip>

                                                <div className="border-l-2 h-auto border-line"></div>
                                                <Tooltip title="Delete University">
                                                  <img
                                                    src={Delete}
                                                    alt="reload"
                                                    className="cursor-pointer"
                                                    onClick={() => {
                                                      deleteUniversitySelection(
                                                        item?.university_id,
                                                      );
                                                    }}
                                                  />
                                                </Tooltip>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </AccordionDetails>
                              </Accordion>
                            </div>

                            <div className="border-2 border-line  rounded-lg mt-4 hidden lg:flex lg:flex-col">
                              <div className="flex flex-col">
                                <div
                                  className={`h-[50px] bg-tab px-4  rounded-t-lg flex flex-row rounded accordian-toogle relative cursor-pointer  custom-accordian-toggle ${stepProcessStatus.university_toggle ? "open" : ""}`}
                                  onClick={() => toogleAccordian("university_toggle")}
                                >
                                  <div
                                    className={`h-6 w-6 rounded-xl mt-3 mr-3 pl-1.5 pt-1.5 ${stepProcessStatus.universityies
                                      ? "success-color-bg"
                                      : "out"
                                      }`}
                                  >
                                    <div
                                      className={`h-3 w-3 rounded-lg ${stepProcessStatus.universityies
                                        ? "success-color"
                                        : "in"
                                        }`}
                                    ></div>
                                  </div>
                                  <div className="text-white text-base mt-3 font-audiowide">
                                    University Application
                                  </div>
                                </div>

                                {stepProcessStatus.university_toggle ? (
                                  <>
                                    <div>
                                      <Dropdown
                                        selected_universities={
                                          student?.selected_universities
                                        }
                                        country={student?.country_id}
                                        onAddUni={onUniVersityAdd}
                                      />
                                    </div>

                                    {student?.selected_universities &&
                                      student?.selected_universities.length ? (
                                      <div className=" bg-light px-6 py-6">
                                        <div className="bg-tab  rounded-lg mt-3 px-4 py-4">
                                          <div className="flex flex-row gap-10 px-4">
                                            <div className="flex  gap-2">
                                              <div className="text-xs text-text font-audiowide">
                                                Received Offer Letters :
                                              </div>
                                              <div className="text-white text-xs">
                                                {
                                                  student?.selected_universities?.filter(
                                                    (x) => x.value
                                                  ).length
                                                }
                                                /
                                                {student?.selected_universities &&
                                                  student?.selected_universities?.length}
                                              </div>
                                            </div>
                                          </div>

                                          <div className=" bg-light rounded-base mt-4 rounded-lg ">
                                            <Table className="relative px-4 font-audiowide custom-table">
                                              <Thead className="border-b-2 mb-1 z-20 bg-light text-text border-white">
                                                <Tr className=" text-left text-sm ">
                                                  <Th className="pl-4 font-audiowide">
                                                    S.No
                                                  </Th>
                                                  <Th className="pl-4 font-audiowide">
                                                    Selected University
                                                  </Th>
                                                  <Th className="pl-4 font-audiowide">
                                                    Course Link
                                                  </Th>
                                                  <Th className="pl-10 font-audiowide">
                                                    <p>Applied</p>
                                                    <p>intake</p>
                                                  </Th>
                                                  <Th className="pl-10 font-audiowide">
                                                    <p>Offer letter</p>
                                                    <p>intake</p>
                                                  </Th>
                                                  <Th className="pl-12 font-audiowide ">
                                                    <p>Application</p>
                                                    <p>Status</p>
                                                  </Th>
                                                  <Th className="pl-12 font-audiowide">
                                                    Action
                                                  </Th>
                                                </Tr>
                                              </Thead>
                                              {student?.selected_universities.map(
                                                (data, i) => {
                                                  return (
                                                    <Tbody key={uuid()}>
                                                      <Tr className="row border-b-2 text-xs text-white  ">
                                                        <Td className=" text-left pl-4">
                                                          {i + 1}
                                                        </Td>

                                                        <Td className=" text-left pl-4 ">
                                                          {data?.university?.name}
                                                        </Td>
                                                        <Td className=" cursor-pointer text-left pl-4 " onClick={() => handleCourseLink(data)} >
                                                          Click Here
                                                        </Td>

                                                        <Td>
                                                          <div className="text-center ">
                                                            <p className="">
                                                              {student.intake_month}
                                                            </p>
                                                            <p>
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
                                                        <Td className="text-left pl-12 flex gap-5">
                                                          <select
                                                            className="bg-tab py-3 px-2 rounded-xl appearance-none"
                                                            name="university_status"
                                                            value={data.status}
                                                            onChange={(e) => handleChange(e, data)}

                                                          >
                                                            <option disabled selected>
                                                              Select Staus
                                                            </option>
                                                            <option value="Application due">
                                                              Application due
                                                            </option>
                                                            <option value="Application submitted">
                                                              Application submitted
                                                            </option>
                                                            <option value="Application approved">
                                                              Application approved
                                                            </option>
                                                            <option value="Admission granted">
                                                              Admission granted
                                                            </option>
                                                          </select>
                                                          <Tooltip title="Update status">
                                                            <img
                                                              className="cursor-pointer"
                                                              src={UpArrow}
                                                              onClick={() =>
                                                                updateUniversityValues(data)
                                                              }
                                                              alt=""
                                                            />
                                                          </Tooltip>
                                                        </Td>
                                                        <Td className="pl-12 text-center ">
                                                          {data.value ? (
                                                            <div className="flex gap-2 justify-center">
                                                              <Tooltip title="View Offer letter">
                                                                <img
                                                                  src={view}
                                                                  className="cursor-pointer"
                                                                  alt="alt"
                                                                  onClick={(e) =>
                                                                    previewAttachment(
                                                                      data
                                                                    )
                                                                  }
                                                                />
                                                              </Tooltip>
                                                              <div className="border-l-2 h-auto border-line"></div>
                                                              <Tooltip title="Edit intake">
                                                                <img
                                                                  className="cursor-pointer"
                                                                  src={Edit}
                                                                  alt="edit"
                                                                  onClick={() =>
                                                                    handleOfferUpload(
                                                                      data,
                                                                      "offerDiffer"
                                                                    )
                                                                  }
                                                                />
                                                              </Tooltip>
                                                              <div className="border-l-2 h-auto border-line"></div>
                                                              <Tooltip title="Delete Offer Letter">
                                                                <img
                                                                  src={Delete}
                                                                  alt="reload"
                                                                  className="cursor-pointer"
                                                                  onClick={() => {
                                                                    handleOfferUpload(
                                                                      data,
                                                                      "uniDelete"
                                                                    );
                                                                  }}
                                                                />
                                                              </Tooltip>
                                                            </div>
                                                          ) : (
                                                            <div className="flex justify-center gap-2">
                                                              <Tooltip title="Upload Offer Letter">
                                                                <img
                                                                  className="cursor-pointer"
                                                                  src={upload}
                                                                  onClick={() =>
                                                                    handleOfferUpload(
                                                                      data,
                                                                      "offerModel"
                                                                    )
                                                                  }
                                                                  alt="icon"
                                                                />
                                                              </Tooltip>
                                                              <div className="border-l-2 h-auto border-line"></div>
                                                              <Tooltip title="Edit intake">
                                                                <img
                                                                  className="cursor-pointer"
                                                                  src={Edit}
                                                                  alt="edit"
                                                                  onClick={() =>
                                                                    handleOfferUpload(
                                                                      data,
                                                                      "offerDiffer"
                                                                    )
                                                                  }
                                                                />
                                                              </Tooltip>

                                                              <div className="border-l-2 h-auto border-line"></div>
                                                              <Tooltip title="Delete University">
                                                                <img
                                                                  src={Delete}
                                                                  alt="reload"
                                                                  className="cursor-pointer"
                                                                  onClick={() => {
                                                                    deleteUniversitySelection(
                                                                      data?.university_id,
                                                                    );
                                                                  }}
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
                                      ""
                                    )}
                                  </>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      }

                      {
                        z.name === FINANCIAL_EVIDENCE &&
                        student.check_list.hasOwnProperty(FINANCIAL_EVIDENCE) && (

                          <div>
                            <div className="lg:hidden mt-4">
                              <Accordion>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon className="text-white" />}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                  className="bg-tab"
                                >
                                  <Typography className="flex flex-row">
                                    <div
                                      className={`h-6 w-6 rounded-xl   mr-3 pl-1.5 pt-1.5 ${stepProcessStatus.financial_evidence
                                        ? "success-color-bg"
                                        : "out"
                                        }`}
                                    >
                                      <div
                                        className={`h-3 w-3 rounded-lg 
                                                       ${stepProcessStatus.financial_evidence
                                            ? "success-color"
                                            : "in"
                                          } `}
                                      ></div>
                                    </div>
                                    <div className=" text-base  font-audiowide text-white">
                                      Financial Evidence
                                    </div>
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <div>
                                    <hr className="border-b-2 bord" />
                                    <div className="flex flex-col gap-6 py-3">
                                      {studentCheckList[z.slug].map((item) => (
                                        <div
                                          className="flex justify-between  text-white"
                                        >
                                          <div className=" text-sm w-[130px]">
                                            {item.name}
                                          </div>
                                          <div className=" text-sm  text-right">
                                            <div className="flex justify-end gap-1">
                                              <p className="bg-tab px-3 py-2 rounded-l-lg">
                                                {student?.country?.symbol}
                                              </p>
                                              <input
                                                className="py-2  bg-tab border-none rounded-r-lg  w-20"
                                                type="text"
                                                value={item.value}
                                                readOnly={item.name === "Remaining Fee"}
                                                onChange={(e) =>
                                                  handleChangeFees(e, item)
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                    <hr className="border-b-2 bord" />
                                    <div className="flex flex-row gap-2  mt-2 text-white">
                                      <div className=" text-xs w-[400px]">
                                        Total funds Required in{" "}
                                        {student?.country?.currency}
                                      </div>
                                      <div className=" text-sm w-full text-right">
                                        {params.financial_evidence_total
                                          ? student?.country?.symbol
                                          : ""}
                                        {params.financial_evidence_total
                                          ? params.financial_evidence_total
                                          : "--"}
                                      </div>
                                    </div>
                                    <div
                                      className="flex justify-end mt-4"
                                      onClick={() => updateFinancialEvidence()}
                                    >
                                      <button className="px-2 py-2 submit text-[#000000] rounded-lg text-sm">
                                        Update Values
                                      </button>
                                    </div>
                                  </div>
                                </AccordionDetails>
                              </Accordion>
                            </div>
                            <div className="border-2 border-line  rounded-lg mt-4 hidden lg:flex lg:flex-col">
                              <div className="flex flex-col">
                                <div
                                  className="h-[50px] bg-tab px-4  rounded-t-lg flex flex-row rounded accordian-toogle relative cursor-pointer"
                                  onClick={() =>
                                    toogleAccordian("financial_evidence_toggle")
                                  }
                                >
                                  <div
                                    className={`h-6 w-6 rounded-xl  mt-3 mr-3 pl-1.5 pt-1.5 ${stepProcessStatus.financial_evidence
                                      ? "success-color-bg"
                                      : "out"
                                      }`}
                                  >
                                    <div
                                      className={`h-3 w-3 rounded-lg  ${stepProcessStatus.financial_evidence
                                        ? "success-color"
                                        : "in"
                                        }`}
                                    ></div>
                                  </div>
                                  <div className="text-white text-base mt-3 font-audiowide">
                                    Financial Evidence
                                  </div>
                                </div>

                                {stepProcessStatus.financial_evidence_toggle ? (
                                  <div className=" bg-light px-6 py-6">
                                    <div className="bg-tab rounded-lg px-8 py-4">
                                      <div className="flex justify-end px-4">
                                        <button
                                          className="px-5 py-2 submit rounded-lg text-[#000000]"
                                          onClick={() => updateFinancialEvidence()}
                                        >
                                          Update Values
                                        </button>
                                      </div>
                                      <div className=" bg-light rounded-base mt-4 px-4 rounded-lg pb-4">
                                        <Table className=" px-4 border-b-2 border-tab custom-table">
                                          <Thead className="  mb-1 z-20 text-text">
                                            <Tr className=" text-left text-sm font-audiowide">
                                              <Th className="  text-center ">S. No.</Th>
                                              <Th className="  pl-10">Particulars</Th>
                                              <Th className="   text-right">
                                                Estimated Fees
                                              </Th>
                                            </Tr>
                                          </Thead>
                                          {studentCheckList[z.slug].map((data, i) => {
                                            return (
                                              <Tbody >
                                                <Tr className="row border-b-2 text-xs text-white font-audiowide ">
                                                  <Td className="pt-4 text-center pb-4">
                                                    {i + 1}.
                                                  </Td>
                                                  <Td className=" text-left pl-12 ">
                                                    <div className="flex gap-3">
                                                      <p
                                                        className={`relative ${i === 3 ? "top-2" : ""
                                                          }`}
                                                      >
                                                        {data?.name}
                                                      </p>
                                                    </div>
                                                  </Td>
                                                  <Td className="text-right">
                                                    <div className="flex justify-end gap-1">
                                                      <p className="bg-tab px-3 py-2 rounded-l-lg">
                                                        {student?.country?.symbol}
                                                      </p>

                                                      <input
                                                        value={data?.value}
                                                        readOnly={
                                                          data.name === "Remaining Fee"
                                                        }
                                                        className="py-2  bg-tab border-none rounded-r-lg"
                                                        type="text"
                                                        name={data.name}
                                                        onChange={(e) =>
                                                          handleChangeFees(e, data)
                                                        }
                                                      />
                                                    </div>
                                                  </Td>
                                                </Tr>
                                              </Tbody>
                                            );
                                          })}
                                        </Table>
                                        <div className="flex justify-between pl-10 text-white text-xs mt-3 font-audiowide  md:pr-14">
                                          <div className="w-11/12">
                                            Total funds Required/in{" "}
                                            {student?.country?.currency}
                                          </div>
                                          <div className="w-1/12 text-right mr-2 md:mr-0">
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
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      }

                      {
                        z.name === VISA_APPLICATION &&
                        student.check_list.hasOwnProperty(VISA_APPLICATION) && (
                          <div>
                            <div className="lg:hidden mt-4">
                              <Accordion>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon className="text-white" />}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                  className="bg-tab"
                                >
                                  <Typography className="flex flex-row">
                                    <div
                                      className={`h-6 w-6 rounded-xl   mr-3 pl-1.5 pt-1.5 ${stepProcessStatus.visa_application
                                        ? "success-color-bg"
                                        : "out"
                                        }`}
                                    >
                                      <div
                                        className={`h-3 w-3 rounded-lg ${stepProcessStatus.visa_application
                                          ? "success-color"
                                          : "in"
                                          } `}
                                      ></div>
                                    </div>
                                    <div className=" text-base  font-audiowide text-white">
                                      Visa Application
                                    </div>
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <div className="flex flex-col bg-light lg:hidden  py-4">
                                    <div className="flex flex-col gap-4">
                                      <div
                                        key={uuid()}
                                        className="flex flex-row px-4 py-2 text-white "
                                      >
                                        <CustomCheckbox
                                          Label='Select All'
                                          ischecked={stepProcessStatus[z.check_box]}
                                          handleCheck={(e) =>
                                            selectAll(
                                              e,
                                              z.check_box,
                                              z.slug,
                                            )
                                          }
                                        />
                                      </div>

                                      {studentCheckList[z.slug].map((item) => (
                                        <div
                                          className="flex flex-row px-4 py-2 text-white "
                                          key={uuid()}
                                        >
                                          <CustomCheckbox
                                            Label={item.name}
                                            ischecked={item.checked}
                                            handleCheck={(e) =>
                                              onCheckListChange(
                                                e,
                                                item,
                                                z.slug,
                                                z.check_box
                                              )
                                            }
                                          />
                                        </div>
                                      ))}

                                      <div className="flex justify-end mb-5">
                                        <button
                                          className={`px-6 py-2 font-semibold submit rounded-lg text-[#000000]`}
                                          onClick={() =>
                                            submitCheckList(z.slug)
                                          }
                                        >
                                          {" "}
                                          {student.steps_timestamp?.visa_app_started_on
                                            ? "Update"
                                            : "Request Document"}
                                        </button>
                                      </div>
                                    </div>
                                    <div className="bg-tab rounded-lg px-3 py-6 mt-4 flex gap-4 flex-col">
                                      <div className="flex flex-row gap-6 ">
                                        <div className="text-text text-xs  mt-0.5 font-audiowide">
                                          Stage Started Date
                                        </div>
                                        <div className="text-white text-xs ">
                                          {student.steps_timestamp?.visa_app_started_on}
                                        </div>
                                      </div>
                                      <div className="flex flex-row gap-6 w-98">
                                        <div className="text-text text-xs  mt-0.5 font-audiowide">
                                          Documents Collected
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


                                      {
                                        student.check_list[z.slug]?.filter(
                                          (x) => x.value
                                        )?.length ?
                                          <div className="flex flex-col gap-2">
                                            <div className="text-sm text-text font-audiowide">
                                              Download all
                                            </div>
                                            <div className="text-white text-sm">
                                              <Tooltip title="Download all attachments">
                                                <img
                                                  className=" cursor-pointer"
                                                  onClick={() =>
                                                    downloadAll(z.slug)
                                                  }
                                                  src={download}
                                                  alt=""
                                                />
                                              </Tooltip>
                                            </div>
                                          </div> : <></>
                                      }
                                    </div>
                                    {student.check_list[z.slug]
                                      ?.filter((x) => x.checked).map((item, index) => (
                                        <div
                                          className="bg-tab rounded-lg px-6 py-6 mt-3 flex gap-4 flex-col"
                                        >
                                          <div className="text-white font-sm mb-4">
                                            {item.name}
                                          </div>
                                          <div className="flex flex-row gap-4">
                                            <div className="text-text text-sm w-[50px] md:text-base font-audiowide mt-2">
                                              info
                                            </div>
                                            <div className="flex gap-2 text-white text-sm md:text-base">
                                              <input
                                                className="border bg-tab py-2 w-10/12 rounded-lg pl-4 px-4"
                                                type="text"
                                                onChange={(e) =>
                                                  handleVisaLinkChange(e, item.id)
                                                }
                                                value={item?.link_url}
                                                name="visa_application_link"
                                                placeholder="Enter Reference Link"
                                              />
                                              <img
                                                className="cursor-pointer"
                                                src={UpArrow}
                                                onClick={() => updateVisaLink(item)}
                                                alt=""
                                              />
                                            </div>
                                            <div></div>
                                          </div>
                                          <div className="flex flex-row gap-4">
                                            <div className="text-text text-sm w-[50px] md:text-base font-audiowide">
                                              Date Uploaded
                                            </div>
                                            <div className="text-white text-sm md:text-base">
                                              {item.updated_at
                                                ? moment(item?.updated_at).format(
                                                  "DD/MM/YYYY"
                                                )
                                                : "--"}
                                            </div>
                                          </div>
                                          <hr className="border-b-2 bord" />
                                          <div className="flex justify-end items-end py-2">
                                            {item.value ? (
                                              <div className=" flex justify-start pl-4 gap-3">
                                                <Tooltip title="Preview Attactment">
                                                  <img
                                                    onClick={(e) =>
                                                      previewAttachment(
                                                        item
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
                                </AccordionDetails>
                              </Accordion>
                            </div>
                            <div className="border-2 border-line  rounded-lg mt-4 hidden lg:flex lg:flex-col">
                              <div className="flex flex-col">
                                <div
                                  className={`h-[50px] bg-tab px-4  rounded-t-lg flex flex-row rounded accordian-toogle relative cursor-pointer custom-accordian-toggle ${stepProcessStatus.visa_application_toggle
                                    ? "open"
                                    : ""
                                    }`}
                                  onClick={() =>
                                    toogleAccordian("visa_application_toggle")
                                  }
                                >
                                  {" "}
                                  <div
                                    className={`h-6 w-6 rounded-xl mt-3 mr-3 pl-1.5 pt-1.5 ${stepProcessStatus.visa_application
                                      ? "success-color-bg"
                                      : "out"
                                      }`}
                                  >
                                    <div
                                      className={`h-3 w-3 rounded-lg  ${stepProcessStatus.visa_application
                                        ? "success-color"
                                        : "in"
                                        }`}
                                    ></div>
                                  </div>
                                  <div className="text-white text-base mt-3 font-audiowide">
                                    Visa Application
                                  </div>
                                </div>

                                {stepProcessStatus.visa_application_toggle ? (
                                  <div className=" bg-light px-6 py-6 ">
                                    <div className="flex flex-col gap-4 mb-2">
                                      <div key={uuid()}>
                                        <CustomCheckbox
                                          Label='Select All'
                                          ischecked={stepProcessStatus[z.check_box]}
                                          handleCheck={(e) =>
                                            selectAll(
                                              e,
                                              z.check_box,
                                              z.slug,
                                            )
                                          }
                                        />
                                      </div>
                                      {studentCheckList[z.slug].map((x) => {
                                        return (
                                          <div key={uuid()}>
                                            <CustomCheckbox
                                              Label={x.name}
                                              ischecked={x.checked}
                                              handleCheck={(e) =>
                                                onCheckListChange(
                                                  e,
                                                  x,
                                                  z.slug,
                                                  z.check_box
                                                )
                                              }
                                            />
                                          </div>
                                        );
                                      })}
                                    </div>
                                    <div className="lg:flex hidden justify-end mb-5">
                                      <button
                                        className={`px-6 py-2 font-semibold submit rounded-lg text-[#000000]`}
                                        onClick={() =>
                                          submitCheckList(z.slug)
                                        }
                                      >
                                        {" "}
                                        {student.steps_timestamp?.visa_app_started_on
                                          ? "Update"
                                          : "Request Document"}
                                      </button>
                                    </div>

                                    {student.steps_timestamp?.visa_app_started_on ? (
                                      <div className="bg-tab  rounded-lg px-8 py-4 ">
                                        <div className="flex flex-row gap-10 px-4 ">
                                          <div className="flex flex-col gap-2">
                                            <div className="text-xs text-text font-audiowide">
                                              Stage Started Date
                                            </div>
                                            <div className="text-white text-xs">
                                              {
                                                student.steps_timestamp
                                                  ?.visa_app_started_on
                                              }
                                            </div>
                                          </div>
                                          <div className="flex flex-col gap-2">
                                            <div className="text-sm text-text font-audiowide">
                                              Document Uploaded
                                            </div>
                                            <div className="text-white text-sm">
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
                                          {
                                            student.check_list[z.slug]?.filter(
                                              (x) => x.value
                                            )?.length ?
                                              <div className="flex flex-col gap-2">
                                                <div className="text-sm text-text font-audiowide">
                                                  Download all
                                                </div>
                                                <div className="text-white text-sm">
                                                  <Tooltip title="Download all attachments">
                                                    <img
                                                      className=" cursor-pointer"
                                                      onClick={() =>
                                                        downloadAll(z.slug)
                                                      }
                                                      src={download}
                                                      alt=""
                                                    />
                                                  </Tooltip>
                                                </div>
                                              </div> : <></>
                                          }
                                        </div>

                                        <div className="bg-light rounded-base mt-4 rounded-lg mb-2">
                                          <Table className=" px-4 custom-table">
                                            <Thead className="border-b-2 mb-1 z-20 text-text border-white">
                                              <Tr className=" text-left text-sm font-audiowide ">
                                                <Th>S.no</Th>
                                                <Th className="  pl-4">Particulars</Th>
                                                <Th className="  pl-20 ">Info</Th>
                                                <Th className="  pl-20 ">
                                                  Date Uploaded
                                                </Th>
                                                <Th className="  text-right pr-10 pl-12">
                                                  Action
                                                </Th>
                                              </Tr>
                                            </Thead>
                                            {student.check_list[z.slug]
                                              ?.filter((x) => x.checked).map((data, i) => {
                                                return (
                                                  <Tbody >
                                                    <Tr className="row border-b-2 text-xs text-white font-audiowide ">
                                                      <Td>{i + 1}</Td>
                                                      <Td className=" text-left pl-4 ">
                                                        <div className="flex gap-2">
                                                          <p>{data?.name}</p>
                                                          {data?.value ? (
                                                            <div>
                                                              <img
                                                                src={checked}
                                                                alt="checked"
                                                              />
                                                            </div>
                                                          ) : (
                                                            <div>
                                                              <img
                                                                src={info}
                                                                alt="infp"
                                                              />
                                                            </div>
                                                          )}
                                                        </div>
                                                      </Td>
                                                      <Td className="text-left pl-8">
                                                        <div className="flex gap-2">
                                                          <input
                                                            className="border-none bg-tab py-2 w-[250px] rounded-lg pl-4"
                                                            type="text"
                                                            onChange={(e) =>
                                                              handleVisaLinkChange(
                                                                e,
                                                                data.id
                                                              )
                                                            }
                                                            value={data?.link_url}
                                                            name="visa_application_link"
                                                            placeholder="Enter Reference Link"
                                                          />
                                                          <Tooltip title="Update Link">
                                                            <img
                                                              className="cursor-pointer"
                                                              src={UpArrow}
                                                              alt=""
                                                              onClick={() =>
                                                                updateVisaLink(data)
                                                              }
                                                            />
                                                          </Tooltip>
                                                        </div>
                                                      </Td>
                                                      <Td className="pl-12 text-center">
                                                        {data.updated_at
                                                          ? moment(
                                                            data?.updated_at
                                                          ).format("DD/MM/YYYY")
                                                          : "--"}
                                                      </Td>
                                                      <Td className="pl-12 text-center ">
                                                        {data.value ? (
                                                          <div className="flex gap-3 justify-center">
                                                            <Tooltip title="Preview Attachment">
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
                                                            <Tooltip title="Delete Attachment">
                                                              <img
                                                                src={Delete}
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
                                                            <Tooltip title="Upload Attachment">
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
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      }
                    </ >
                  )
                })

              }


            </div>
          </section>

          {
            student &&
            <div className="mt-6">
              <Enrolement student={student} refresh={refresh} />
            </div>
          }


          {
            student &&
            <div className="mt-6 px-3 py-3 md:px-6 md:py-6 bg-light rounded-lg">
              <Discussions student={student} />
            </div>
          }


          {/* Status */}
          {
            student &&
            <div className="mt-6 px-3 py-3 md:px-6 md:py-6 bg-light rounded-lg">
              <Status refresh={refresh} />
            </div>

          }


          {/* <LogInfo /> */}

          <div className=" bg-light mt-6 rounded-xl px-5 lg:px-10 py-6 ">
            <p className="text-white text-base font-medium hidden lg:block">
              Logs Info
            </p>
            <p className="text-white text-base font-medium lg:hidden">
              Logs info
            </p>
            <hr className="bord border-2 mt-3" />
            <div className=" mt-5 bg-tab flex flex-col gap-4 rounded-xl md:px-6 py-6">
              <Log1 logs={student?.logs} />
            </div>
          </div>
        </>
      ) : (
        <p className="audio text-3xl text-center">Loading...</p>
      )}

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
      {dialogConfig.uniDelete && (
        <div>
          <DeleteConfirmModel
            open={dialogConfig.uniDelete}
            loading={apiLoading}
            handleClose={handleClose}
            deleteUpload={onUniDelete}
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
      {dialogConfig.offerModel && (
        <div>
          <AddOfferDialog
            loading={apiLoading}
            handleClose={handleClose}
            submitFileUpload={handleOfferWithIntake}
          />
        </div>
      )}
      {dialogConfig.course_link && (
        <div>
          <AddCourseLink
            loading={apiLoading}
            handleClose={handleClose}
            submitFileUpload={handleOfferDiffer}
            link={dialogConfig.link}
          />
        </div>
      )}

      {dialogConfig.offerDiffer && (
        <div>
          <OfferDefer
            loading={apiLoading}
            handleClose={handleClose}
            submitFileUpload={handleOfferDiffer}
          />
        </div>
      )}


      {dialogConfig?.preview && (
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

    </div>
  );
};

export default ApplicationView;
