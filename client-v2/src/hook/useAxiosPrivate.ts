import axios from "axios";
import { useEffect, useContext } from "react";
import { AuthContext } from "~context/AuthProvider";
import { getStorage } from "~utils/storage";

const useAxiosPrivate = () => {
  const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_SERVER,
    headers: {
      "content-type": "application/json",
    },
    withCredentials: true,
  });
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const token =
      auth?.token ??
      JSON.parse(getStorage("token", "sessionStorage") as string);
    const axiosClientRequest = axiosClient.interceptors.request.use(
      (config) => {
        if (!config.headers!["Authorization"]) {
          config.headers!["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    const axiosClientResponse = axiosClient.interceptors.response.use(
      (response) => {
        if (response && response.data) {
          return response.data;
        }
        return response;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    return () => {
      axiosClient.interceptors.request.eject(axiosClientRequest);
      axiosClient.interceptors.response.eject(axiosClientResponse);
    };
  }, [auth]);

  return axiosClient;
};

export default useAxiosPrivate;
