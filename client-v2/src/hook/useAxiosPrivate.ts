import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { refreshToken } from "~api/user.api";
import { axiosPrivate } from "~api/axiosConfig";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const { auth, persirt, setAuth } = useAuth();

  useEffect(() => {
    const token = auth?.token;
    const axiosPrivateRequest = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers!["Authorization"]) {
          if (token) {
            config.headers!["Authorization"] = `Bearer ${token}`;
          }
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    const axiosPrivateResponse = axiosPrivate.interceptors.response.use(
      (response) => {
        return response;
      },
      async (err: AxiosError) => {
        const prevRequest = err?.config!;
        if (err.response?.status === 403) {
          if (prevRequest.url !== "/users/refresh-token") {
            try {
              const res = await refreshToken(axiosPrivate);
              if (res.data?.success && res.data?.token) {
                setAuth(res.data);
                return axiosPrivate(prevRequest);
              }
            } catch (error) {
              console.log(error);
            }
          }
        } else {
          return Promise.reject(err);
        }
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(axiosPrivateRequest);
      axiosPrivate.interceptors.response.eject(axiosPrivateResponse);
    };
  }, [axiosPrivate, auth]);

  return axiosPrivate;
};

export default useAxiosPrivate;
