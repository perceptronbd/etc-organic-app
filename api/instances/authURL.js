import axios from "axios";

//const apiUrl = Constants.manifest2.extra.apiUrl;

export const authURL = (token) =>
  axios.create({
    baseURL: `https://etc-organic-backend.onrender.com/mobile`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    timeout: 10000,
  });
