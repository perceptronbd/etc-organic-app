import axios from "axios";

//NOTE: URL
export const baseURL = axios.create({
  baseURL: `https://etc-backend.onrender.com/mobile`,
  // baseURL: `http://192.168.0.101:5000/mobile`,
  headers: {
    "Content-type": "application/json",
  },
  timeout: 10000,
});
