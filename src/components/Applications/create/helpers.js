import moment from "moment";

export const cols = [
  {
    title: "Date",
  },
  {
    title: "FirstName LastName",
  },
  {
    title: "Phone# EmailID",
  },
  {
    title: "Study Destination",
  },
  {
    title: "Lead Source",
  },
  {
    title: "Intake Year",
  },
  {
    title: "Assigned to",
  },
  {
    title: "Status",
  },
  {
    title: "Action",
  },
];

export const grade = [10, 9, 8, 7, 6, 5, 4];

export const initialValues = {
  from: "",
  to: "",
  status: "",
  search: "",
  intake_month: "",
  intake_year: "",
  contact_id: "",
  source: "",
  country_id: "",
};

export const initialParams = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  enable_email_notification: false,
  country_id: "",
  level: "",
  type_of_degree: "",
  intake_year: "",
  intake_month: "",
  study_duration: "",
  industry_id: "",
  study_area_id: "",
  study_sub_ind_id:'',
  study_mode: "",
  study_attendance_type: "",
  study_budget: "",
  work_experince: "",
  rec_level_academic: "",
  rec_grade_achived: "",
  pre_study_loc: "",
  contact_id: "",
  exam_sections: "",
  s_label:'',
  education_details: [
    {
      passing_year: "",
      medium: "",
      grade: "",
      type: "SSC",
      label: "Secondary School Certificate / 10th",
    },
    {
      passing_year: "",
      medium: "",
      grade: "",
      type: "HSC",
      label: "Higher Secondary School Certificate / 12th",
    },
    {
      medium: "",
      start_year: "",
      end_year: "",
      grade: "",
      type: "UG",
      label: "Under Graduation",
      ug_type: "",
      backlogs: "",
    },
    {
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
  asst_exam_sections: [
    {
      type: "exam",
      label: "gre",
      reading: "",
      writing: "",
      language: "",
      mathematics: "",
      essay: "",
    },
    {
      type: "test",
      label: "english",
      reading: "",
      writing: "",
      speaking: "",
      listening: "",
      overall_score: "",
    },
  ],
};


export const eng_prof_test_list = [
  {
    min: 1,
    max: 9,
    ind_min: 1,
    ind_max: 9,
    name: "IELTS - International English Language Testing Systems ",
    options: ['overall_score', 'reading', 'writing', 'speaking', 'listening'],
  },
  {

    min: 0,
    max: 120,
    ind_min: 0,
    ind_max: 30,
    name: "TOEFL - Test of English as a Foreign Language",
    options: ['overall_score', 'reading', 'writing', 'speaking', 'listening'],
  },
  {

    min: 10,
    max: 90,
    ind_min: 10,
    ind_max: 90,
    name: "PTE - Pearson Test of English",
    options: ['overall_score', 'reading', 'writing', 'speaking', 'listening'],
  },
  {

    min: 10,
    max: 160,
    ind_min: 10,
    ind_max: 160,
    name: "DET - Duolingo English Test",
    options: ['overall_score', 'literacy', 'conversation', 'comprehension', 'production'],
  },
  {
    name: "I wish to consider the tests but later!",
    options: [],
  },
  {
    name: " I do not wish to consider the test for making applications**!",
    options: [],
  },
];
export const examList = [
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