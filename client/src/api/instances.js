import axios from "axios";

export const authURL = (token) =>
  axios.create({
    baseURL: "/etc-backend/api/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    timeout: 1000,
  });

export const noAuthURL = () =>
  axios.create({
    baseURL: "/etc-backend/api/",
    timeout: 1000,
  });
