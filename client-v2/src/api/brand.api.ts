import { AxiosInstance, AxiosResponse } from "axios";
import { Brands, CreateBrand } from "~types/brand.type";
import axiosClient from "./axiosConfig";

export const getAllBrand = () => {
  return axiosClient
    .get<never, AxiosResponse<{ success: boolean; brands: Brands[] }>>(
      "/brands"
    )
    .then((data) => data.data);
};

export const createNewBrand = (
  axiosPrivate: AxiosInstance,
  newBrand: CreateBrand
) => {
  return axiosPrivate.post("/brands", newBrand);
};
