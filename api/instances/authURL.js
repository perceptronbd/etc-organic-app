import axios from "axios";

//NOTE: URL Hardcoded
export const authURL = (token) =>
  axios.create({
    baseURL: `https://etc-backend.onrender.com/mobile`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    timeout: 10000,
  });
