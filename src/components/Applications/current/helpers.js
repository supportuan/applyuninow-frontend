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

export const cols = [
  {
    title: "StudentId",
  }, 
  {
    title: "Date",
  },
  {
    title: "StudentName Phone#",
  },
  {
    title: "Poc",
  },
  {
    title: "Study Destination",
  },
  {
    title: "Stage",
  },
  {
    title: "Application Status",
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
  stage: "",
  search_key: "",
  country_id: "",
  contact_id: '',
  status: '',
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
