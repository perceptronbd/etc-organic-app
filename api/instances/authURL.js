import axios from "axios";

//NOTE: URL
export const authURL = (token) =>
  axios.create({
    baseURL: `https://etc-backend.onrender.com/mobile`,
    // baseURL: `http://192.168.0.101:5000/mobile`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    timeout: 10000,
  });
