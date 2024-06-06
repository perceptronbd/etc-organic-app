import axios from "axios";
import apiUrl from "../apiUrl";

//NOTE: URL
export const baseURL = axios.create({
  baseURL: apiUrl(),
  // baseURL: `http://192.168.0.101:5000/mobile`,
  headers: {
    "Content-type": "application/json",
  },
  timeout: 10000,
});
