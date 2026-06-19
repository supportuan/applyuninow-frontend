
import country2 from "./Images/rev/flags/usa.svg";
import country4 from "./Images/rev/flags/uk.svg";
import country6 from "./Images/rev/flags/canada.svg";
import country8 from "./Images/rev/flags/ireland.svg";
import country9 from "./Images/rev/flags/australia.svg";
import country10 from "./Images/rev/flags/germany.svg";
import country11 from "./Images/rev/flags/netherlands.svg";
import country12 from "./Images/rev/flags/sweden.svg";
import country13 from "./Images/rev/flags/switzerland.svg";
import country14 from "./Images/rev/flags/new-zealand.svg";
import country15 from "./Images/rev/flags/cyprus.svg";
import country16 from "./Images/rev/flags/denmark.svg";
import country17 from "./Images/rev/flags/france.svg";
import country18 from "./Images/rev/flags/italy.svg";
import country19 from "./Images/rev/flags/finland.svg";
import country20 from "./Images/rev/flags/latvia.svg";
import country21 from "./Images/rev/flags/malta.svg";
import country22 from "./Images/rev/flags/norway.svg";
import country23 from "./Images/rev/flags/poland.svg";
import country24 from "./Images/rev/flags/singapore.svg";
import country25 from "./Images/rev/flags/spain.svg";

export const countryOrder = [
  "AUSTRALIA",
  "CANADA",
  "UNITED KINGDOM",
  "UNITED STATES OF AMERICA",
  "IRELAND",
  "GERMANY",
  "SWITZERLAND",
  "SWEDEN",
  "NETHERLANDS",
  "NEW ZEALAND",
  "CYPRUS",
  "DENMARK",
  "FRANCE",
  "ITALY",
  "FINLAND",
  "LATVIA",
  "MALTA",
  "NORWAY",
  "POLAND",
  "SINGAPORE",
  "SPAIN",
];

export const country = [
  {
    img: country9,
    name: "Australia",
    slug: "australia",
    fullName: "AUSTRALIA",
  },
  {
    img: country6,
    name: "Canada",
    slug: "canada",
    fullName: "CANADA",
  },
  {
    img: country4,
    name: "UK",
    slug: "uk",
    fullName: "UNITED KINGDOM",
  },
  {
    img: country2,
    name: "USA",
    slug: "usa",
    fullName: "UNITED STATES OF AMERICA",
  },
  {
    img: country8,
    name: "Ireland",
    slug: "ireland",
    fullName: "IRELAND",
  },
  {
    img: country10,
    name: "Germany",
    slug: "germany",
    fullName: "GERMANY",
  },
  {
    img: country13,
    name: "Switzerland",
    slug: "switzerland",
    fullName: "SWITZERLAND",
  },
  {
    img: country12,
    name: "Sweden",
    slug: "sweden",
    fullName: "SWEDEN",
  },
  {
    img: country11,
    name: "Netherlands",
    slug: "netherlands",
    fullName: "NETHERLANDS",
  },
  {
    img: country14,
    name: "New Zealand",
    slug: "new-zealand",
    fullName: "NEW ZEALAND",
  },
  {
    img: country15,
    name: "Cyprus",
    slug: "cyprus",
    fullName: "CYPRUS",
  },
  {
    img: country16,
    name: "Denmark",
    slug: "denmark",
    fullName: "DENMARK",
  },
  {
    img: country17,
    name: "France",
    slug: "france",
    fullName: "FRANCE",
  },
  {
    img: country18,
    name: "Italy",
    slug: "italy",
    fullName: "ITALY",
  },
  {
    img: country19,
    name: "Finland",
    slug: "finland",
    fullName: "FINLAND",
  },
  {
    img: country20,
    name: "Latvia",
    slug: "latvia",
    fullName: "LATVIA",
  },
  {
    img: country21,
    name: "Malta",
    slug: "malta",
    fullName: "MALTA",
  },
  {
    img: country22,
    name: "Norway",
    slug: "norway",
    fullName: "NORWAY",
  },
  {
    img: country23,
    name: "Poland",
    slug: "poland",
    fullName: "POLAND",
  },
  {
    img: country24,
    name: "Singapore",
    slug: "singapore",
    fullName: "SINGAPORE",
  },
  {
    img: country25,
    name: "Spain",
    slug: "spain",
    fullName: "SPAIN",
  },
];

import { resolveDisplayName } from "./utils/helpers";

const COUNTRY_ALIASES = {
  usa: "UNITED STATES OF AMERICA",
  us: "UNITED STATES OF AMERICA",
  "united states": "UNITED STATES OF AMERICA",
  uk: "UNITED KINGDOM",
  "great britain": "UNITED KINGDOM",
};

export const findCountryByApiName = (apiName) => {
  const raw = resolveDisplayName(apiName)?.trim();
  if (!raw) return null;

  const lower = raw.toLowerCase();
  let match = country.find((x) => x.fullName.toLowerCase() === lower);
  if (match) return match;

  match = country.find((x) => x.name.toLowerCase() === lower);
  if (match) return match;

  match = country.find((x) => x.slug === lower.replace(/\s+/g, "-"));
  if (match) return match;

  const alias = COUNTRY_ALIASES[lower];
  if (alias) {
    return country.find((x) => x.fullName === alias) || null;
  }

  return null;
};

export const getCountryFlagSrc = (flag) => {
  if (!flag) return "";
  if (typeof flag === "string") return flag;
  return flag.src || "";
};

export const getStaticStudyDestinations = () =>
  country.map((c) => ({
    id: `static-${c.slug}`,
    name: c.fullName,
    checked: false,
    flag: c.img,
    short_name: c.name,
    isStaticFallback: true,
  }));

export const enrichStudyDestination = (item) => {
  const name = resolveDisplayName(item?.name);
  const matched = findCountryByApiName(name);
  const defaultFlag = country[0]?.img;

  return {
    ...item,
    name: matched?.fullName || name,
    checked: Boolean(item?.checked),
    flag: matched?.img || defaultFlag,
    short_name: matched?.name || name,
  };
};

export const normalizeStudyDestinations = (list) => {
  if (!Array.isArray(list) || !list.length) return [];
  return sortStudyDestinations(list.map((item) => enrichStudyDestination(item)));
};

export const sortStudyDestinations = (destinations) =>
  [...destinations].sort((a, b) => {
    const aIdx = countryOrder.indexOf(a.name?.toUpperCase());
    const bIdx = countryOrder.indexOf(b.name?.toUpperCase());
    if (aIdx === -1) return 1;
    if (bIdx === -1) return -1;
    return aIdx - bIdx;
  });
