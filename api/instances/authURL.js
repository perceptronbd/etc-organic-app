import axios from "axios";
import url from "../apiUrl";

//NOTE: URL
export const authURL = (token) =>
  axios.create({
    baseURL: url(),
    // baseURL: `http://192.168.0.101:5000/mobile`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    timeout: 10000,
  });
