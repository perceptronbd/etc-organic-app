import axios from "axios";

//NOTE: URL Hardcoded
export const baseURL = axios.create({
  baseURL: `https://etc-backend.onrender.com/mobile`,
  headers: {
    "Content-type": "application/json",
  },
  timeout: 10000,
});
