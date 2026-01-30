import moment from "moment";

export const intakeMonth = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const servicesList = [
  {
    name: "Pre-Departure",
    checked: false,
  },
  {
    name: "Forex Exchange",
    checked: false,
  },
  {
    name: "Destination – Arrival pickup",
    checked: false,
  },
  {
    name: "On- Arrival registrations",
    checked: false,
  },
  {
    name: "Internship (in-line to Subject area)",
    checked: false,
  },
  {
    name: "Accommodation",
    checked: false,
  },
  {
    name: "Part-time jobs (in-line to academics / work experience)",
    checked: false,
  },
  {
    name: "Resume / CV marketing for Professional jobs",
    checked: false,
  },
];

export const cols = [
  {
    title: "Add-On ID",
  },
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
    title: "Country",
  },
  {
    title: "Add-Ons",
  },
  {
    title: "Educational Status",
  },

  {
    title: "Status",
  },
  {
    title: "Action",
  },
];

export const intakeYear = [
  new Date().getFullYear(),
  new Date().getFullYear() + 1,
  new Date().getFullYear() + 2,
  new Date().getFullYear() + 3,
];

export const initialValues = {
  created_from: "",
  created_to: "",
  status: "",
  search_key: "",
  country_id: "",
  service: "",
};

export const initialParams = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  alternate_phone: "",
  dob: "",
  gender: "",
  passport_no: "",
  present_status: "",
  selected_service: "",
  notes: "",
  images: [
    {
      label: "Resume",
      url: "",
      preview: "",
      file: "",
    },
  ],
  country_id: "",
};

export const filterStats = (event) => {
  var range;
  switch (event) {
    case "0":
      range = [moment(), moment()];
      break;
    case "-1":
      range = [moment().subtract(1, "days"), moment().subtract(1, "days")];
      break;
    case "-7":
      range = [moment().subtract(6, "days"), moment()];
      break;
    case "-30":
      range = [moment().subtract(29, "days"), moment()];
      break;
    case "TM":
      range = [moment().startOf("month"), moment().endOf("month")];
      break;
    case "LM":
      range = [
        moment().subtract(1, "month").startOf("month"),
        moment().subtract(1, "month").endOf("month"),
      ];
      break;
    case "all":
      range = [
        moment().subtract(1, "month").startOf("month"),
        moment().subtract(1, "month").endOf("month"),
      ];
      break;
  }

  let from = event !== "all" ? moment(range[0]).format("YYYY-MM-DD") : "";
  let to = event !== "all" ? moment(range[1]).format("YYYY-MM-DD") : "";
  let filterdate = {
    event: event,
    from: from,
    to: to,
  };
  return filterdate;
};
