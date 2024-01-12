import { HOST } from "@env";
import axios from "axios";

export const baseURL = axios.create({
  baseURL: `${HOST}/mobile`,
  headers: {
    "Content-type": "application/json",
  },
  timeout: 10000,
});
