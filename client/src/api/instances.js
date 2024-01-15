import axios from "axios";

export const authURL = (token) =>
  axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    timeout: 1000,
  });

export const noAuthURL = () =>
  axios.create({
    baseURL: "http://localhost:5000/api",
    timeout: 1000,
  });
