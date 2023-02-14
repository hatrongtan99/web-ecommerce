import { AxiosInstance, AxiosResponse } from "axios";
import { AllCategory } from "~types/categories.type";
import axiosClient from "./axiosConfig";

export const getAllCategory = async () => {
  return axiosClient
    .get<never, AxiosResponse<{ success: boolean } & AllCategory>>(
      "/category/all"
    )
    .then((data) => data.data);
};
