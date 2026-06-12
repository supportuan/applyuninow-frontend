import * as _ from "lodash";
import * as CryptoJS from 'crypto-js';

/* eslint-disable */
export const uuid = () => {
  let uuid = "";
  let i;
  for (i = 0; i < 32; i += 1) {
    switch (i) {
      case 8:
      case 20:
        uuid += "-";
        uuid += (Math.random() * 16 || 0).toString(16);
        break;
      case 12:
        uuid += "-";
        uuid += "4";
        break;
      case 16:
        uuid += "-";
        uuid += (Math.random() * 4 || 8).toString(16);
        break;
      default:
        uuid += (Math.random() * 16 || 0).toString(16);
    }
  }
  return uuid;
};
export const toTitleCase = (string) => {
  if(!string) return
  return string.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

/* eslint-enable */
export const resolveDisplayName = (value) => {
  if (value == null || value === "") return "";
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (typeof value === "object" && value.name != null) {
    return resolveDisplayName(value.name);
  }
  return "";
};

export const capitalize = (string) => {
  if (!string) {
    return "";
  }

  const text = typeof string === "string" ? string : resolveDisplayName(string);
  if (!text) return "";

  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const capitalizeUppertoLower = (string) => {
  if (!string) {
    return "";
  }

  return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
};

export const getValueAsFloatWithNDecimalPlaces = (value, decimalPlaces) => {
  if (["0", 0].includes(value)) {
    return value;
  }

  return Number(value).toFixed(decimalPlaces);
};

export const validateArray = (array) => {
  if (!array || !Array.isArray(array) || !array.length) {
    return [];
  }

  return array;
};

export const copyToClipboard = (value) => {
  navigator.clipboard.writeText(_.unescape(value));
};

export const grade = [
  {
    name: "English",
  },
  {
    name: "Regional",
  },
];

export const exams = [
  {
    name: "GRE",
  },
  {
    name: "ELP",
  },
  {
    name: "GMAT",
  },
  {
    name: "SAT",
  },
];

export const  academic_list  = [
  {
    name:'SSC'
  },
  {
    name:'ISC'
  },
  {
    name:'CBSE'
  },
  {
    name:'DEGREE'
  },
  {
    name:'BTECH'
  },
  {
    name:'MTECH'
  },
  {
    name:'PG'
  },
]


const CLIENT_SECRET = 'HNHGGBHGHBHG7VVGVWH';
export const encryptData = (data) => {
  const encrypt = CryptoJS.AES.encrypt(JSON.stringify(data), CLIENT_SECRET).toString();
  return encrypt.replaceAll('+', '-').replaceAll('/', '_');
};

export const decryptData = (data) => {
  if (data) {
    const decrypt = data.replaceAll('-', '+').replaceAll('_', '/');
    const bytes = CryptoJS.AES.decrypt(decrypt, CLIENT_SECRET);
    if (bytes.toString()) {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
  }
  return data;
};