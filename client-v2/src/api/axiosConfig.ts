import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_SERVER,
  headers: {
    "content-type": "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_SERVER,
  headers: {
    "content-type": "application/json",
  },
  withCredentials: true,
});

export default axiosClient;
