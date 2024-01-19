import axios from "axios";

//const apiUrl = Constants.manifest2.extra.apiUrl;

export const baseURL = axios.create({
  baseURL: `https://etc-organic-backend.onrender.com/mobile`,
  headers: {
    "Content-type": "application/json",
  },
  timeout: 10000,
});
