import { HOST } from "@env";
import axios from "axios";

export const authURL = (token) =>
  axios.create({
    baseURL: `${HOST}/mobile`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    timeout: 10000,
  });
