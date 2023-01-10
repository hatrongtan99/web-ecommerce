import { AxiosInstance } from 'axios';
import { UserInfoRegister, UserLogin, UserProfile } from '~types/user.type';
import { AuthLogin, UserLogout } from '~types/auth.type';

export const userRegister = (
    axiosClient: AxiosInstance,
    user: UserInfoRegister
) => {
    return axiosClient.post<never, AuthLogin>('/users//register', user);
};

export const userLoginLocal = (axiosClient: AxiosInstance, user: UserLogin) => {
    return axiosClient.post<never, AuthLogin>('/users/login', user);
};

export const userLoginByGoogle = (axiosClient: AxiosInstance) => {
    return axiosClient.get('/users/google');
};

export const refreshToken = (axiosPrivate: AxiosInstance) => {
    return axiosPrivate.get<never, AuthLogin>('/users/refreshToken');
};

export const getUserProfile = (axiosPrivate: AxiosInstance) => {
    return axiosPrivate.get<never, UserProfile>('/users/:id');
};

export const logout = (axiosPrivate: AxiosInstance) => {
    return axiosPrivate.get<never, UserLogout>('/users/logout');
};

export const getAllUsers = (axiosPrivate: AxiosInstance) => {
    return axiosPrivate.get<never, [UserProfile]>('/users/all-users');
};
