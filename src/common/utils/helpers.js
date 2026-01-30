import moment from 'moment'
export const defaultFiltersDropDown = [
  {
    id: "ALL",
    name: "All",
  },
  {
    id: "0",
    name: "Today",
  },
  {
    id: "-1",
    name: "Yesterday",
  },
  {
    id: "-7",
    name: "Last 7 Days",
  },
  {
    id: "-30",
    name: "Last 30 Days",
  },
  {
    id: "TM",
    name: "This Month",
  },
  {
    id: "LM",
    name: "Last Month",
  },
  {
    id: "custom",
    name: "Custom Date",
  },
];

export const states =  [
  {
      code: 'AN',
      name: 'Andaman and Nicobar Islands',
  },
  {
      code: 'AP',
      name: 'Andhra Pradesh',
  },
  {
      code: 'AR',
      name: 'Arunachal Pradesh',
  },
  {
      code: 'AS',
      name: 'Assam',
  },
  {
      code: 'BR',
      name: 'Bihar',
  },
  {
      code: 'CG',
      name: 'Chandigarh',
  },
  {
      code: 'CH',
      name: 'Chhattisgarh',
  },
  {
      code: 'DH',
      name: 'Dadra and Nagar Haveli',
  },
  {
      code: 'DD',
      name: 'Daman and Diu',
  },
  {
      code: 'DL',
      name: 'Delhi',
  },
  {
      code: 'GA',
      name: 'Goa',
  },
  {
      code: 'GJ',
      name: 'Gujarat',
  },
  {
      code: 'HR',
      name: 'Haryana',
  },
  {
      code: 'HP',
      name: 'Himachal Pradesh',
  },
  {
      code: 'JK',
      name: 'Jammu and Kashmir',
  },
  {
      code: 'JH',
      name: 'Jharkhand',
  },
  {
      code: 'KA',
      name: 'Karnataka',
  },
  {
      code: 'KL',
      name: 'Kerala',
  },
  {
      code: 'LD',
      name: 'Lakshadweep',
  },
  {
      code: 'MP',
      name: 'Madhya Pradesh',
  },
  {
      code: 'MH',
      name: 'Maharashtra',
  },
  {
      code: 'MN',
      name: 'Manipur',
  },
  {
      code: 'ML',
      name: 'Meghalaya',
  },
  {
      code: 'MZ',
      name: 'Mizoram',
  },
  {
      code: 'NL',
      name: 'Nagaland',
  },
  {
      code: 'OR',
      name: 'Odisha',
  },
  {
      code: 'PY',
      name: 'Puducherry',
  },
  {
      code: 'PB',
      name: 'Punjab',
  },
  {
      code: 'RJ',
      name: 'Rajasthan',
  },
  {
      code: 'SK',
      name: 'Sikkim',
  },
  {
      code: 'TN',
      name: 'Tamil Nadu',
  },
  {
      code: 'TS',
      name: 'Telangana',
  },
  {
      code: 'TR',
      name: 'Tripura',
  },
  {
      code: 'UP',
      name: 'Uttar Pradesh',
  },
  {
      code: 'UK',
      name: 'Uttarakhand',
  },
  {
      code: 'WB',
      name: 'West Bengal',
  },
]

/* eslint-disable */
export const uuid = () => {
  let uuid = ''
  let i
  for (i = 0; i < 32; i += 1) {
    switch (i) {
      case 8:
      case 20:
        uuid += '-'
        uuid += (Math.random() * 16 || 0).toString(16)
        break
      case 12:
        uuid += '-'
        uuid += '4'
        break
      case 16:
        uuid += '-'
        uuid += (Math.random() * 4 || 8).toString(16)
        break
      default:
        uuid += (Math.random() * 16 || 0).toString(16)
    }
  }
  return uuid
}

export const dateRange = (type) => {
  let range = [];

  switch (type) {
    case "0":
      range = [
        moment().startOf("day").format("YYYY-MM-DD HH:mm:ss"),
        moment().endOf("day").format("YYYY-MM-DD HH:mm:ss"),
      ];
      break;
    case "-1":
      range = [
        moment()
          .subtract(1, "days")
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        moment().subtract(1, "days").endOf("day").format("YYYY-MM-DD HH:mm:ss"),
      ];
      break;
    case "-7":
      range = [
        moment()
          .subtract(6, "days")
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        moment().endOf("day").format("YYYY-MM-DD HH:mm:ss"),
      ];
      break;
    case "-30":
      range = [
        moment()
          .subtract(29, "days")
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        moment().endOf("day").format("YYYY-MM-DD HH:mm:ss"),
      ];
      break;
    case "TM":
      range = [
        moment().startOf("month").format("YYYY-MM-DD HH:mm:ss"),
        moment().endOf("month").format("YYYY-MM-DD HH:mm:ss"),
      ];
      break;
    case "LM":
      range = [
        moment()
          .subtract(1, "month")
          .startOf("month")
          .format("YYYY-MM-DD HH:mm:ss"),
        moment()
          .subtract(1, "month")
          .endOf("month")
          .format("YYYY-MM-DD HH:mm:ss"),
      ];
      break;
    default:
      range = [];
  }
  return range;
};


export const CountItems = (data) => {
  let total = 0
  Object.values(data).forEach((val) => {
    if (val === null || val === undefined || val === '') {
      return true
    }
    total += 1
  })
  // console.log(total, 'tpta;')
  return total
}