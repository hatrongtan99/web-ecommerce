import { AxiosInstance, AxiosResponse } from "axios";
import { UserInfoRegister, UserLogin, UserProfile } from "~types/user.type";
import { AuthLogin, UserLogout } from "~types/auth.type";
import axiosClient from "./axiosConfig";

export const userRegister = async (user: UserInfoRegister) => {
  return axiosClient
    .post<never, AxiosResponse<AuthLogin>>("/users//register", user)
    .then((data) => data.data);
};

export const userLoginLocal = async (user: UserLogin) => {
  return axiosClient
    .post<never, AxiosResponse<AuthLogin>>("/users/login", user, {
      withCredentials: true,
    })
    .then((data) => data.data);
};

export const refreshToken = (axiosPrivate: AxiosInstance) => {
  return axiosPrivate.get<never, AxiosResponse<AuthLogin>>(
    "/users/refresh-token"
  );
};

export const loginSuccess = (axiosPrivate: AxiosInstance) => {
  return axiosPrivate.get<never, AxiosResponse<AuthLogin>>("/users/success");
};

export const loginSocialSuccess = () => {
  return axiosClient.get<never, AxiosResponse<AuthLogin>>(
    "/users/social-login/success",
    { withCredentials: true }
  );
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
