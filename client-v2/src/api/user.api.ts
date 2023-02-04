import { AxiosInstance, AxiosResponse } from "axios";
import { UserInfoRegister, UserLogin, UserProfile } from "~types/user.type";
import { AuthLogin, UserLogout } from "~types/auth.type";
import axiosClient from "./axiosConfig";

export const userRegister = (user: UserInfoRegister) => {
  return axiosClient
    .post<never, AxiosResponse<AuthLogin>>("/users//register", user)
    .then((data) => data.data);
};

export const userLoginLocal = (
  aixosPrivate: AxiosInstance,
  user: UserLogin
) => {
  return aixosPrivate
    .post<never, AxiosResponse<AuthLogin>>("/users/login", user)
    .then((data) => data.data);
};

export const userLoginByGoogle = () => {
  return axiosClient.get("/users/google/callback").then((data) => data.data);
};

export const refreshToken = (axiosPrivate: AxiosInstance) => {
  return axiosPrivate.get<never, AxiosResponse<AuthLogin>>(
    "/users/refresh-token"
  );
};

export const loginSuccess = (axiosPrivate: AxiosInstance) => {
  return axiosPrivate.get<never, AxiosResponse<AuthLogin>>("/users/success");
};

export const getUserProfile = (axiosPrivate: AxiosInstance) => {
  return axiosPrivate.get<never, AxiosResponse<UserProfile>>("/users/:id");
};

export const logout = (axiosPrivate: AxiosInstance) => {
  return axiosPrivate.get<never, AxiosResponse<UserLogout>>("/users/logout");
};

export const getAllUsers = (axiosPrivate: AxiosInstance) => {
  return axiosPrivate.get<never, AxiosResponse<UserProfile[]>>(
    "/users/all-users"
  );
};
