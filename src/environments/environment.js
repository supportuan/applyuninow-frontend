const apiBaseUrl =
  process.env.REACT_APP_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://api-staging.applyuninow.com";

const dataStorageUrl =
  process.env.REACT_APP_DATA_STORAGE_URL ||
  process.env.NEXT_PUBLIC_DATA_STORAGE_URL ||
  "https://applyuninow-assets.s3.ap-south-1.amazonaws.com";

export const environment = {
  API_BASE_URL: apiBaseUrl,
  DATA_STORAGE_URL: dataStorageUrl,
};