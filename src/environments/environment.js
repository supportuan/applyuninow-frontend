const apiBaseUrl =
  process.env.REACT_APP_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:3337";

const dataStorageUrl =
  process.env.REACT_APP_DATA_STORAGE_URL ||
  process.env.NEXT_PUBLIC_DATA_STORAGE_URL ||
  "http://localhost:3337";

export const environment = {
  API_BASE_URL: apiBaseUrl,
  DATA_STORAGE_URL: dataStorageUrl,
};
