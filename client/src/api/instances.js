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

export const authFileURL = (token) => {
  return axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
