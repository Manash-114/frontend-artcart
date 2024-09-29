import axios from "axios";
import { BASE_URL_LOCAL } from "./common-db";
// const BASE_URL = "http://localhost:7002";
export default axios.create({
  baseURL: BASE_URL_LOCAL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL_LOCAL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const axiosPrivateWithFormData = axios.create({
  baseURL: BASE_URL_LOCAL,
  headers: {
    "Content-Type": "multipart/form-data", // Important for FormData
  },
  withCredentials: true,
});
