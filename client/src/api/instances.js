import axios from "axios";

export const authURL = (token) =>
  axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const noAuthURL = () =>
  axios.create({
    baseURL: "http://localhost:5000/api",
  });
