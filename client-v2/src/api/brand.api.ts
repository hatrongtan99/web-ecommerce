import { AxiosInstance } from "axios";
import { Brands, CreateBrand } from "~types/brand.type";
import axiosClient from "./axiosConfig";

export const getAllBrand = () => {
  return axiosClient.get<never, { success: boolean; brands: Brands[] }>(
    "/brands"
  );
};

export const createNewBrand = (
  axiosPrivate: AxiosInstance,
  newBrand: CreateBrand
) => {
  return axiosPrivate.post("/brands", newBrand);
};
