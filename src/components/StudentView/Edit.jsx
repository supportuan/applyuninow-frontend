import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CustomButton from "../../common/CustomButton";
import { makeStyles } from "@material-ui/core/styles";
import AutoComplete1 from "../../../src/components/Lead/Explore/AutoComplete";
import { Input } from "../../common/InputBox";
import { SelectInput } from "../../common/Select";
import { environment } from "../../environments/environment";
import { initialParams } from "./helpers";
import { capitalize } from "../../utils/helpers";
import { eng_prof_test_list } from "./helpers";
import { examList } from "./helpers";
import Validator from "validatorjs";
import { toast } from "react-toastify";
const useStyles = makeStyles({
  option: {
    "&:hover": {
      backgroundColor: "#fff !important",
    },
  },
  customTextField: {
    "& input::placeholder": {
      color: "#fff !important",
    },
  },
});

const examMeta = [
  {
    name: " Per SAT - Pre Scholastic Assessment Test",
    type: "ug",
    min: 400,
    max: 1600,
    ind_min: -1,
    ind_max: -1,
    options: [
      "overall_score",
      "Reading",
      "Writing",
      "Language",
      "Mathematics",
      "Essay(Optional)",
    ],
  },
  {
    name: "SAT - Scholastic Assessment Test",
    type: "ug",
    min: 400,
    max: 1600,
    ind_min: -1,
    ind_max: -1,
    options: [
      "overall_score",
      "Reading",
      "Writing",
      "Language",
      "Mathematics",
      "Essay(Optional)",
    ],
  },
  {
    name: "ACT - American College Test",
    type: "ug",
    min: 400,
    max: 1600,
    ind_min: -1,
    ind_max: -1,
    options: [
      "overall_score",
      "English",
      "Mathematics",
      "Reading",
      "Science",
      "Writing(optional)",
    ],
  },
  {
    name: "GRE - Graduate Record Examinations",
    type: "pg",
    min: 0,
    max: 340,
    ind_min: -1,
    ind_max: -1,
    options: [
      "overall_score",
      "verbal reasoning",
      "quantitative reasoning",
      "analytical writing skills",
    ],
  },
  {
    name: "GMAT - Graduate Management Admission Test",
    type: "pg",
    min: 200,
    max: 800,
    ind_min: -1,
    ind_max: -1,
    options: [
      "overall_score",
      "Mathematics",
      "Verbal",
      "Integrated Reasoning",
      "Essay",
    ],
  },
  {
    name: "I wish to consider the tests but later!",
    type: "common",
    options: [],
  },
  {
    name: "I do not wish to consider the test for making applications**!",
    type: "common",
    options: [],
  },
];
const EditStudentForm = () => {
  const navigate = useNavigate();
  const [dropdowns, setDropdowns] = useState({
    study_destination: [],
    study_area: [],
    study_level: [],
    study_industry: [],
    intake_month: [],
    intake_year: [],
    study_durations: [],
    type_of_degree: [],
    years_of_experience: [],
    study_sub_industry: [],
    study_durations: [],
    type_of_degree_category: [],
  });

  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState(initialParams);
  const [formErrors, setFormErrors] = useState(initialParams);
  const [isAdmin, setIsAdmin] = useState(false);
  const [subIndustry, setSubIndustry] = useState([]);
  const [degree, setDegree] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const re = /^[0-9\b]+$/;
      if (value && !re.test(value)) {
        return;
      }
    }
    if (name === "level") {
      let data = dropdowns.type_of_degree_category.filter((item) => {
        return item.name === e.target.value;
      });

      setDegree(data[0].options);
    }
    const obj = { [name]: value };
    if (name === "industry_id") {
      getStudySubIndustry(value);
      getStudyArea(value);
      obj["study_sub_ind_id"] = "";
      obj["study_area_id"] = "";
      obj["study_area_label"] = "";
      obj["s_label"] = "";
    }
    if (name === "study_sub_ind_id") {
      getStudySubChange(value);
      obj["study_area_id"] = "";
      obj["study_area_label"] = "";
      obj["s_label"] = "";
    }

    setParams({ ...params, ...obj });
    setFormErrors(initialParams);
  };

  const handleAuChange = (value) => {
    if (value)
      setParams({ ...params, study_area_id: value.id, s_label: value });
  };

  const handleEducation = (e, index) => {
    setFormErrors(initialParams);
    let { name, value } = e.target;
    if (e.target.name === "grade" || e.target.name === "backlogs") {
      const re = /\b(0|[1-9][0-9]?|100)\b/;

      if (e.target.value && !re.test(e.target.value)) {
        return;
      }
    }

    if (
      name === "passing_year" ||
      name === "start_year" ||
      name === "end_year"
    ) {
      const re = /^[0-9\b]+$/;
      if (value && !re.test(value)) {
        return;
      }
      if (value.length > 4) {
        return;
      }
    }

    let arr = [...params.education_details];
    arr[index][e.target.name] = e.target.value;
    setParams({ ...params, education_details: arr });
  };
  const fetchStudent = () => {
    api
      .get(`${environment.API_BASE_URL}/admin/students/view-info`)
      .then((res) => {
        let student = res.data.data;

        setParams({
          first_name: student.first_name,
          last_name: student.last_name,
          email: student.email,
          phone: student.phone,
          country_id: student.country_id,
          level: student.level,
          type_of_degree: student.type_of_degree,
          intake_year: student.intake_year,
          intake_month: student.intake_month,
          study_duration: student.study_duration,
          industry_id: student.industry_id,
          study_area_id: student.study_area_id,
          study_mode: student.study_mode,
          study_attendance_type: student.study_attendance_type,
          study_budget: student.study_budget,
          work_experince: student.work_experince,
          source: student.source,
          education_details:
            student.education_details && student.education_details.length
              ? student.education_details
              : [
                  {
                    passing_year: "",
                    medium: "",
                    grade: "",
                    type: "SSC",
                    label: "Secondary school Certificate / 10th",
                  },
                  {
                    passing_year: "",
                    medium: "",
                    grade: "",
                    type: "HSC",
                    label: "Higher Secondary school Certificate / 12th",
                  },
                  {
                    passing_year: "",
                    medium: "'",
                    start_year: "",
                    end_year: "",
                    grade: "",
                    type: "UG",
                    label: "Under Graduation",
                    ug_type: "",
                    backlogs: "",
                  },
                  {
                    passing_year: "",
                    medium: "",
                    start_year: "",
                    end_year: "",
                    grade: "",
                    type: "PG",
                    label: "Post Graduation",
                    ug_type: "",
                    backlogs: "",
                  },
                ],
          asst_exam_sections: student.asst_exam_sections,
          study_sub_ind_id: student.study_area?.sub_industry_id,
          s_label: student.study_area
            ? { name: student.study_area.name, id: student.study_area.id }
            : "",
        });
        getStudySubIndustry(student.industry_id);
        fetchDropdowns(student.level);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const handleAssistantExam = (e, index) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value && !re.test(e.target.value)) {
      return;
    }
    let arr = [...params.asst_exam_sections];
    arr[index][e.target.name] = e.target.value;
    let exam_sections = params.exam_sections;
    if (e.target.name === "label" && index === 0) {
      let list = examMeta.find((x) => x.name == e.target.value)?.options || [];
      exam_sections = list.map((x) => {
        return {
          key:
            x != "overall_score"
              ? x.trim().toLowerCase().replace("(optional)", "")
              : "Overall Score",
          value: "",
        };
      });
    }

    setParams({
      ...params,
      asst_exam_sections: arr,
      exam_sections: exam_sections,
    });
  };

  const handleSubmit = () => {
    const rules = {
      email: "required|max:150|email",
      first_name: "required|max:30",
      last_name: "required|max:30",
      phone: "required|max:10|min:10",
      level: "required|max:200",
      country_id: "required|max:200",
      industry_id: "required|max:200",
      intake_month: "required",
      intake_year: "required",
      study_mode: "required",
      study_budget: "required",
      study_attendance_type: "required",
      work_experince: "required",
    };
    const validation = new Validator(params, rules);

    if (validation.fails()) {
      const fieldErrors = {};
      Object.keys(validation.errors.errors).forEach((key) => {
        fieldErrors[key] = validation.errors.errors[key][0];
      });

      const err = Object.keys(fieldErrors);
      if (err.length) {
        const input = document.querySelector(`input[name=${err[0]}]`);
        if (input) {
          input.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "start",
          });
        }
      }

      setFormErrors(fieldErrors);
      return false;
    }

    let obj = { ...params };

    if (obj && obj.education_details && obj.education_details.length) {
      const currentYear = new Date().getFullYear();
      let ssc = obj.education_details.find((x) => x.type === "SSC");
      let hsc = obj.education_details.find((x) => x.type === "HSC");
      let ug = obj.education_details.find(
        (x) => x.label === "Under Graduation"
      );
      let pg = obj.education_details.find(
        (x) => x.label === 'Post Graduation"'
      );

      if (ssc && ssc.passing_year) {
        if (
          Number(ssc.passing_year) > currentYear ||
          ssc.passing_year.length < 4
        ) {
          toast.error("Please Enter valid SSC Passing Year!.");
          return;
        }
      }
      if (hsc && hsc.passing_year) {
        if (Number(hsc.passing_yea) > currentYear || hsc.passing_year < 4) {
          toast.error("Please Enter valid HSC Passing Year!.");
          return;
        }
      }

      if (
        ssc &&
        hsc &&
        ssc.passing_year &&
        hsc.passing_year &&
        Number(hsc.passing_year) <= Number(ssc.passing_year)
      ) {
        toast.error(
          "HSC passing year should not be less then SSC passing year!."
        );
        return;
      }

      if (ug && ug.start_year) {
        if (Number(ug.start_year) > currentYear || ug.start_year.length < 4) {
          toast.error("Please Enter valid UG Start Year!.");
          return;
        }
      }
      if (ug && ug.end_year) {
        if (Number(ug.end_year) > currentYear || ug.end_year.length < 4) {
          toast.error("Please Enter valid UG End Year!.");
          return;
        }
      }

      if (
        ug &&
        ug.start_year &&
        hsc &&
        Number(ug.start_year) < Number(hsc.passing_year)
      ) {
        toast.error(
          "UG starting year should not be less then HSC passing year!."
        );
        return;
      }

      if (
        ug &&
        ug.start_year &&
        ug.end_year &&
        Number(ug.end_year) <= Number(ug.start_year)
      ) {
        toast.error(
          "UG end year should not be less than or Same as UG Start year!."
        );
        return;
      }

      if (pg && pg.start_year) {
        if (
          Number(pg.start_year) > currentYear + 3 ||
          pg.start_year.length < 4
        ) {
          toast.error("Please Enter valid PG Start Year!.");
          return;
        }
      }
      if (pg && pg.end_year) {
        if (Number(pg.end_year) > currentYear + 3 || pg.end_year.length < 4) {
          toast.error("Please Enter valid PG End Year!.");
          return;
        }
      }

      if (
        pg &&
        ug &&
        pg.start_year &&
        Number(pg.start_year) <= Number(ug.end_year)
      ) {
        toast.error(
          "PG starting year should not be less than or Same as UG End year!."
        );
        return;
      }

      if (
        pg &&
        pg.start_year &&
        pg.end_year &&
        Number(pg.end_year) < Number(pg.start_year)
      ) {
        toast.error("PG end year should not be less then PG Start year!.");
        return;
      }
    }

    let istestValid = isValidTest();
    if (!istestValid) {
      return;
    }

    var object =
      params.exam_sections &&
      params.exam_sections.reduce(
        (obj, item) => Object.assign(obj, { [item.key]: item.value }),
        {}
      );
    obj.asst_exam_sections[0] =
      { ...obj.asst_exam_sections[0], ...object } || {};
    setLoading(true);
    console.log(obj);
    api
      .post(`${environment.API_BASE_URL}/admin/students/update-info`, obj)
      .then((res) => {
        setLoading(false);
        toast.success("student Updated Successfully");
        setParams(initialParams);
        setFormErrors(initialParams);
        navigate("/applicant/profile/view");
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Unable to Update  ");
      });
  };

  const handleTestChange = (e, index) => {
    let { value, name } = e.target;
    if (name !== "exam_type" && name !== "eng_prof_test") {
      const re = /^\d{1,}(\.\d{0,3})?$/;
      if (value && !re.test(value)) {
        return;
      }
    }

    let arr = [...params.asst_exam_sections];

    if (name !== "exam_type" && name !== "eng_prof_test") {
      arr[index][e.target.name] = value;
    }

    if (e.target.name === "exam_type") {
      let list = examMeta.find((x) => x.name == value);
      if (list) {
        let obj = {
          label: value,
          type: "exam",
        };
        for (let option of list.options) {
          obj[
            option
              .trim()
              .toLowerCase()
              .replace("(optional)", "")
              .replace(/ /g, "_")
          ] = "";
        }
        arr[index] = obj;
      }
    }

    if (name === "eng_prof_test") {
      let list = eng_prof_test_list.find((x) => x.name == value)?.options || [];
      let obj = {
        label: value,
        type: "exam",
      };
      for (let option of list) {
        obj[
          option
            .trim()
            .toLowerCase()
            .replace("(optional)", "")
            .replace(/ /g, "_")
        ] = "";
      }
      arr[index] = obj;
    }

    setParams({
      ...params,
      asst_exam_sections: arr,
    });
  };

  const isValidTest = () => {
    let [exam_type, eng_prof_test] = params.asst_exam_sections;
    if (exam_type) {
      let list = examMeta.find((x) => x.name === exam_type.label);
      if (list && list.options.length) {
        let filled = Object.keys(exam_type)
          .filter((key) => key != "type" && key != "label")
          .every((x) => exam_type[x]);
        if (!filled) {
          toast.error(`Please enter  ${list.name} test details.`);
          return;
        }

        const total = Number(exam_type.overall_score);
        if (total < list.min || total > list.max) {
          toast.error(
            `${list.name} Overall Score should be in the range b/w  ${list.min} to ${list.max}`
          );
          return;
        }

        if (list.name == "GRE - Graduate Record Examinations") {
          let verbal_reasoning = Number(exam_type.verbal_reasoning || 0);
          let quantitative_reasoning = Number(
            exam_type.quantitative_reasoning || 0
          );
          let analytical_writing_skills = Number(
            exam_type.analytical_writing_skills || 0
          );

          if (verbal_reasoning < 10 || verbal_reasoning > 170) {
            toast.error(`GRE - Verbal Reasoning b/w 10 to 170`);
            return;
          }
          if (quantitative_reasoning < 10 || quantitative_reasoning > 170) {
            toast.error(`GRE - Quantitative Reasoning b/w 10 to 170`);
            return;
          }
          if (analytical_writing_skills < 1 || analytical_writing_skills > 5) {
            toast.error(`GRE - Analytical Writing Skills b/w 1.0 to 5.0`);
            return;
          }
        }
      }
    }

    if (eng_prof_test) {
      let list = eng_prof_test_list.find((x) => x.name === eng_prof_test.label);
      if (list && list.options.length) {
        let filled = Object.keys(eng_prof_test)
          .filter((key) => key != "type" && key != "label")
          .every((x) => eng_prof_test[x]);

        if (!filled) {
          toast.error(`Please enter ${list.name} test details.`);
          return;
        }
        const total = Number(eng_prof_test.overall_score);

        if (total < list.min || total > list.max) {
          toast.error(
            `${list.name} Overall Score should be in the range b/w  ${list.min} to ${list.max}`
          );
          return;
        }

        for (let key of Object.keys(eng_prof_test).filter(
          (key) => key != "type" && key != "label"
        )) {
          if (
            Number(eng_prof_test[key]) < list.ind_min ||
            Number(eng_prof_test[key]) < list.ind_min
          ) {
            toast.error(
              `${test.key}  should be in the range b/w  ${list.min} to ${list.max}`
            );
            return;
          }
        }
      }
    }

    return true;
  };

  const fetchDropdowns = (level) => {
    api
      .get(`${environment.API_BASE_URL}/prerequisite`)
      .then((res) => {
        setLoading(false);
        setDropdowns({
          ...dropdowns,
          study_destination: res.data.data.study_destination,
          study_area: res?.data?.data?.study_area,
          study_level: res?.data?.data?.study_level,
          study_industry: res?.data?.data?.study_industry,
          intake_month: res?.data?.data?.intake_month,
          intake_year: res?.data?.data?.intake_year,
          study_durations: res?.data?.data?.study_durations,
          type_of_degree: res?.data?.data?.type_of_degree,
          years_of_experience: res?.data?.data?.years_of_experience,
          type_of_degree_category: res?.data?.data?.type_of_degree_category,
        });
        if (level) {
          let data = res?.data?.data?.type_of_degree_category.filter((item) => {
            return item.name === level;
          });
          setDegree(data[0].options);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const getStudySubIndustry = (id) => {
    api
      .get(`${environment.API_BASE_URL}/study-sub-industries/${id}`)
      .then((res) => {
        setSubIndustry(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStudyArea = (id) => {
    api
      .get(`${environment.API_BASE_URL}/study-areas?industry_id=${id}`)
      .then((res) => {
        setDropdowns({
          ...dropdowns,
          study_area: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStudySubChange = (industry_id) => {
    api
      .get(
        `${environment.API_BASE_URL}/study-areas?industry_id=${params.industry_id}&sub_industry_id=${industry_id}`
      )
      .then((res) => {
        setDropdowns({
          ...dropdowns,
          study_area: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log(industry_id, "industry_id");
      });
  };
  useEffect(() => {
    fetchDropdowns();
  }, []);

  return (
    <div className="p-2 lg:p-6">
      <div className="flex flex-col gap-1">
        <div className="flex flex-row gap-2">
          <Link to="/applicant/profile/view">
            {" "}
            <p className="text-xs">Student</p>
          </Link>
          <p className="text-xs">{">"}</p>
          <p className="text-xs">Edit Profile</p>
        </div>
        <div>
          <h1 className=" audio text-white relative text-xl lg:text-2xl">
            Student
          </h1>
        </div>
      </div>

      <div className="w-full p-2 lg:p-6 rounded-lg mt-4 flex flex-col gap-6 bg-[#262938]">
        <div className="w-full bg-tab p-3 rounded-lg ">
          <p className="text-lg gradient-text">
            <span className="text-lg gradient-text "> Student Info</span>
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 mt-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
              <Input
                disabled={false}
                readOnly={false}
                name="first_name"
                label="First Name"
                value={params.first_name}
                handleChange={handleChange}
                error={formErrors.first_name}
                helperText={formErrors.first_name}
                bgcolor="#262938"
              />
              <Input
                disabled={false}
                readOnly={false}
                name="last_name"
                label="Last Name"
                value={params.last_name}
                handleChange={handleChange}
                error={formErrors.last_name}
                helperText={formErrors.last_name}
                bgcolor="#262938"
              />
            </div>
            <Input
              disabled={false}
              readOnly={false}
              name="phone"
              label="Phone Number"
              value={params.phone}
              handleChange={handleChange}
              error={formErrors.phone}
              helperText={formErrors.phone}
              bgcolor="#262938"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Input
              disabled={false}
              readOnly={true}
              name="email"
              label="Email"
              value={params.email}
              handleChange={handleChange}
              error={formErrors.email}
              helperText={formErrors.email}
              bgcolor="#262938"
            />
          </div>
        </div>

        <div className="w-full bg-tab p-3 rounded-lg">
          {/* <p className="text-lg text-[#56FFB8]">My Preference</p> */}
          <p className="text-lg gradient-text">
            <span className="text-lg gradient-text "> My Preference</span>
          </p>
        </div>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 mt-4">
          <div className="flex flex-col gap-4">
            <SelectInput
              options={dropdowns.study_destination}
              handleChange={handleChange}
              value={params.country_id}
              error={!!formErrors.country_id}
              helperText={formErrors.country_id}
              label="Study Destination"
              name="country_id"
              bgcolor="#262938"
            />
            <SelectInput
              options={dropdowns.study_level}
              handleChange={handleChange}
              value={params.level}
              error={!!formErrors.level}
              helperText={formErrors.level}
              label="Study Level"
              name="level"
              bgcolor="#262938"
            />
            <SelectInput
              options={dropdowns.study_industry}
              handleChange={handleChange}
              value={params.industry_id}
              error={!!formErrors.industry_id}
              helperText={formErrors.industry_id}
              label="Study Industry"
              name="industry_id"
              bgcolor="#262938"
            />

            <SelectInput
              options={subIndustry}
              handleChange={handleChange}
              value={params.study_sub_ind_id}
              error={!!formErrors.study_sub_ind_id}
              helperText={formErrors.study_sub_ind_id}
              label="Study Area"
              name="study_sub_ind_id"
              bgcolor="#262938"
            />

            <AutoComplete1
              options={dropdowns.study_area}
              value={params?.s_label}
              handleChange={handleAuChange}
            />

            <SelectInput
              options={[
                "£ 15,000 - £ 20,000",
                "£ 20,000 - £ 25,000",
                "£ 25,000+",
              ]}
              handleChange={handleChange}
              value={params.study_budget}
              error={!!formErrors.study_budget}
              helperText={formErrors.study_budget}
              label="Study Budget"
              name="study_budget"
              bgcolor="#262938"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
              <SelectInput
                options={dropdowns.intake_month}
                handleChange={handleChange}
                value={params.intake_month}
                error={!!formErrors.intake_month}
                helperText={formErrors.intake_month}
                label="Intake"
                name="intake_month"
                bgcolor="#262938"
              />
              <SelectInput
                options={dropdowns.intake_year}
                handleChange={handleChange}
                value={params.intake_year}
                error={!!formErrors.intake_year}
                helperText={formErrors.intake_year}
                label="Intake Year"
                name="intake_year"
                bgcolor="#262938"
              />
            </div>
            {params?.level?.includes("Graduation") ? (
              <SelectInput
                options={dropdowns.study_durations}
                handleChange={handleChange}
                value={params.study_duration}
                error={!!formErrors.study_duration}
                helperText={formErrors.study_duration}
                label="Study duration"
                name="study_duration"
                bgcolor="#262938"
              />
            ) : (
              ""
            )}

            {params?.level?.includes("Graduation") ? (
              <>
                <SelectInput
                  options={degree}
                  handleChange={handleChange}
                  value={params.type_of_degree}
                  error={!!formErrors.type_of_degree}
                  helperText={formErrors.type_of_degree}
                  label="Degree Type"
                  name="type_of_degree"
                  bgcolor="#262938"
                />
              </>
            ) : (
              ""
            )}

            <SelectInput
              options={["Full Time", "Part Time"]}
              handleChange={handleChange}
              value={params.study_mode}
              error={!!formErrors.study_mode}
              helperText={formErrors.study_mode}
              label="Study Format"
              name="study_mode"
              bgcolor="#262938"
            />

            <SelectInput
              options={[
                "On Campus",
                "Online Learning",
                "Blended Learning",
                "Executive Programs",
                "Joint Programs",
              ]}
              handleChange={handleChange}
              value={params.study_attendance_type}
              error={!!formErrors.study_attendance_type}
              helperText={formErrors.study_attendance_type}
              label="Study Attendance Type"
              name="study_attendance_type"
              bgcolor="#262938"
            />

            <SelectInput
              options={["Less than 3 Years", "Less than 5 Years", "5+ Years"]}
              handleChange={handleChange}
              value={params.work_experince}
              error={!!formErrors.work_experince}
              helperText={formErrors.work_experince}
              label="Work Experience"
              name="work_experince"
              bgcolor="#262938"
            />
          </div>
        </div>

        <div className="w-full bg-tab p-3 rounded-lg">
          {/* <p className="text-lg text-[#56FFB8]">Education Background</p> */}
          <p className="text-lg gradient-text">
            <span className="text-lg gradient-text ">Education Background</span>
          </p>
        </div>
        <p>Secondary School Certificate / 10th</p>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <Input
              disabled={false}
              readOnly={false}
              name="passing_year"
              label="Year of completion"
              value={params.education_details[0]?.passing_year}
              handleChange={(e) => {
                handleEducation(e, 0);
              }}
              error={!!formErrors[`education_details.${0}.passing_year`]}
              helperText={formErrors[`education_details.${0}.passing_year`]}
              bgcolor="#262938"
            />
            <SelectInput
              options={["English", "Regional"]}
              handleChange={(e) => {
                handleEducation(e, 0);
              }}
              value={params.education_details[0]?.medium}
              error={!!formErrors[`education_details.${0}.medium`]}
              helperText={formErrors[`education_details.${0}.medium`]}
              label="Medium"
              name="medium"
              bgcolor="#262938"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Input
              disabled={false}
              readOnly={false}
              name="grade"
              label="Enter Percentage"
              value={params.education_details[0]?.grade}
              handleChange={(e) => {
                handleEducation(e, 0);
              }}
              error={!!formErrors[`education_details.${0}.grade`]}
              helperText={formErrors[`education_details.${0}.grade`]}
              bgcolor="#262938"
            />
          </div>
        </div>

        <p>Higher Secondary School Certificate / 12th</p>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <Input
              disabled={false}
              readOnly={false}
              name="passing_year"
              label="Year of completion"
              value={params.education_details[1]?.passing_year}
              handleChange={(e) => {
                handleEducation(e, 1);
              }}
              error={!!formErrors[`education_details.${1}.passing_year`]}
              helperText={formErrors[`education_details.${1}.passing_year`]}
              bgcolor="#262938"
            />
            <SelectInput
              options={["English", "Regional"]}
              handleChange={(e) => {
                handleEducation(e, 1);
              }}
              value={params.education_details[1]?.medium}
              error={!!formErrors[`education_details.${1}.medium`]}
              helperText={formErrors[`education_details.${1}.medium`]}
              label="Medium"
              name="medium"
              bgcolor="#262938"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Input
              disabled={false}
              readOnly={false}
              name="grade"
              label="Enter Percentage"
              value={params.education_details[1]?.grade}
              handleChange={(e) => {
                handleEducation(e, 1);
              }}
              error={!!formErrors[`education_details.${1}.grade`]}
              helperText={formErrors[`education_details.${1}.grade`]}
              bgcolor="#262938"
            />
          </div>
        </div>

        <p>Under Graduation</p>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <SelectInput
              options={[
                {
                  name: "BE/B.Tech- Bachelor of Technology",
                },
                {
                  name: "B.Arch- Bachelor of Architecture",
                },
                {
                  name: "BBA - Bachelor of Business Administration",
                },
                {
                  name: "BCom - Bachelor of Commerce",
                },
                {
                  name: "BCA- Bachelor of Computer Applications",
                },
                {
                  name: "B.Sc.- Information Technology",
                },
                {
                  name: "BPharma- Bachelor of Pharmacy",
                },
                {
                  name: "B.Sc- Interior Design",
                },
                {
                  name: "BDS- Bachelor of Dental Surgery",
                },
                {
                  name: "B.Sc. Mathematics",
                },
                {
                  name: "B.Sc. Chemistry",
                },
                {
                  name: "Others",
                },
              ]}
              handleChange={(e) => {
                handleEducation(e, 2);
              }}
              value={params.education_details[2]?.type}
              error={!!formErrors.type}
              helperText={formErrors.type}
              label="Type of Degree"
              name="type"
              bgcolor="#262938"
            />
            <div className="flex flex-col lg:flex-row gap-4">
              <Input
                disabled={false}
                readOnly={false}
                handleChange={(e) => {
                  handleEducation(e, 2);
                }}
                value={params.education_details[2]?.grade}
                error={!!formErrors.grade}
                helperText={formErrors.grade}
                label="CGPA"
                name="grade"
                bgcolor="#262938"
              />

              <SelectInput
                options={["English", "Regional"]}
                handleChange={(e) => {
                  handleEducation(e, 2);
                }}
                value={params.education_details[2]?.medium}
                error={!!formErrors.medium}
                helperText={formErrors.medium}
                label="Medium"
                name="medium"
                bgcolor="#262938"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
              <Input
                disabled={false}
                readOnly={false}
                name="start_year"
                label="Start Year"
                value={params.education_details[2]?.start_year}
                handleChange={(e) => {
                  handleEducation(e, 2);
                }}
                error={formErrors.start_year}
                helperText={formErrors.start_year}
                bgcolor="#262938"
              />
              <Input
                disabled={false}
                readOnly={false}
                name="end_year"
                label="End Year"
                value={params.education_details[2]?.end_year}
                handleChange={(e) => {
                  handleEducation(e, 2);
                }}
                error={formErrors.end_year}
                helperText={formErrors.end_year}
                bgcolor="#262938"
              />
            </div>

            <Input
              disabled={false}
              readOnly={false}
              name="backlogs"
              label="Backlogs"
              value={params.education_details[2]?.backlogs}
              handleChange={(e) => {
                handleEducation(e, 2);
              }}
              error={formErrors.backlogs}
              helperText={formErrors.backlogs}
              bgcolor="#262938"
            />
          </div>
        </div>

        <p>Post Graduation</p>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <SelectInput
              options={[
                {
                  name: "M.Tech",
                },
                {
                  name: "MBA",
                },
                {
                  name: "MCA",
                },
                {
                  name: "MS",
                },
                {
                  name: "BRS",
                },
                {
                  name: "Others",
                },
              ]}
              handleChange={(e) => {
                handleEducation(e, 3);
              }}
              value={params.education_details[3]?.type}
              error={!!formErrors.type}
              helperText={formErrors.type}
              label="Type of Degree"
              name="type"
              bgcolor="#262938"
            />
            <div className="flex flex-col lg:flex-row gap-4">
              <Input
                disabled={false}
                readOnly={false}
                handleChange={(e) => {
                  handleEducation(e, 3);
                }}
                value={params.education_details[3]?.grade}
                error={!!formErrors.grade}
                helperText={formErrors.grade}
                label="CGPA"
                name="grade"
                bgcolor="#262938"
              />
              <SelectInput
                options={["English", "Regional"]}
                handleChange={(e) => {
                  handleEducation(e, 3);
                }}
                value={params.education_details[3]?.medium}
                error={!!formErrors.medium}
                helperText={formErrors.medium}
                label="Medium"
                name="medium"
                bgcolor="#262938"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
              <Input
                disabled={false}
                readOnly={false}
                name="start_year"
                label="Start Year"
                value={params.education_details[3]?.start_year}
                handleChange={(e) => {
                  handleEducation(e, 3);
                }}
                error={formErrors.start_year}
                helperText={formErrors.start_year}
                bgcolor="#262938"
              />
              <Input
                disabled={false}
                readOnly={false}
                name="end_year"
                label="End Year"
                value={params.education_details[3]?.end_year}
                handleChange={(e) => {
                  handleEducation(e, 3);
                }}
                error={formErrors.end_year}
                helperText={formErrors.end_year}
                bgcolor="#262938"
              />
            </div>

            <Input
              disabled={false}
              readOnly={false}
              name="backlogs"
              label="Backlogs"
              value={params.education_details[3]?.backlogs}
              handleChange={(e) => {
                handleEducation(e, 3);
              }}
              error={formErrors.backlogs}
              helperText={formErrors.backlogs}
              bgcolor="#262938"
            />
          </div>
        </div>

        <div className="w-full bg-tab p-3 rounded-lg">
          {/* <p className="text-lg text-[#56FFB8]">My Assessments</p> */}
          <p className="text-lg gradient-text">
            <span className="text-lg gradient-text ">My Assessments</span>
          </p>
        </div>
        <p>
          <SelectInput
            options={examList}
            handleChange={(e) => {
              handleTestChange(e, 0);
            }}
            value={params?.asst_exam_sections[0]?.label}
            error={!!formErrors.label}
            helperText={formErrors.label}
            label={`${
              params.level === "Under Graduation"
                ? "Choose Pre SAT/SAT/ACT"
                : "Choose GRE/GMAT"
            } `}
            name="exam_type"
            bgcolor="#262938"
          />
        </p>
        <div className="flex flex-wrap gap-4 w-full">
          {params?.asst_exam_sections[0] &&
            Object.keys(params?.asst_exam_sections[0])
              .filter((key) => key != "type" && key != "label")
              .sort((z) => z != "overall_score")
              .map((item) => (
                <Input
                  disabled={false}
                  readOnly={false}
                  name={item}
                  label={capitalize(item)}
                  value={params?.asst_exam_sections[0][item]}
                  handleChange={(e) => {
                    handleTestChange(e, 0);
                  }}
                  error={formErrors.reading}
                  helperText={formErrors.reading}
                  width={"w-[220px]"}
                  bgcolor="#262938"
                />
              ))}
        </div>

        <p>
          {" "}
          <SelectInput
            options={eng_prof_test_list}
            handleChange={(e) => {
              handleTestChange(e, 1);
            }}
            value={params?.asst_exam_sections[1]?.label}
            error={!!formErrors.label}
            helperText={formErrors.label}
            label="Choose the ELP test"
            name="eng_prof_test"
            bgcolor="#262938"
          />
        </p>
        <div className="flex flex-wrap gap-4 w-full">
          {params?.asst_exam_sections[1] &&
            Object.keys(params?.asst_exam_sections[1])
              .filter((key) => key != "type" && key != "label")
              .sort((z) => z != "overall_score")
              .map((item) => (
                <Input
                  disabled={false}
                  readOnly={false}
                  name={item}
                  label={capitalize(item)}
                  width={"w-[220px]"}
                  value={params?.asst_exam_sections[1][item]}
                  handleChange={(e) => {
                    handleTestChange(e, 1);
                  }}
                  error={formErrors.reading}
                  helperText={formErrors.reading}
                  bgcolor="#262938"
                />
              ))}
        </div>
      </div>

      <div className="w-full mt-6 pb-4 flex justify-center lg:justify-end">
        {loading ? (
          <CustomButton
            variant="contained"
            size="large"
            borderRadius="8px"
            width="w-fit"
          >
            <p className="">Loading...</p>
          </CustomButton>
        ) : (
          <CustomButton
            variant="contained"
            size="large"
            borderRadius="8px"
            disabled={loading}
            width="w-fit"
            onClick={handleSubmit}
          >
            <p className="">Update Details</p>
          </CustomButton>
        )}
      </div>
    </div>
  );
};

export default EditStudentForm;
