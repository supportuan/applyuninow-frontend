const environment = {
  API_BASE_URL:
    process.env.REACT_APP_API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://api.applyuninow.com",
};