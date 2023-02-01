import { AxiosInstance } from "axios";
import { CommonResponse } from "~types/index.type";
import {
  CreateProduct,
  ProductByCategory,
  ProductDetails,
} from "~types/product.type";
import axiosClient from "./axiosConfig";

export const getAllProducts = (params?: any) => {
  return axiosClient.get("/products", params);
};

export const getProductByCategory = (slug: string, params?: any) => {
  return axiosClient.get<never, { success: boolean; data: ProductByCategory }>(
    `/products/category/${slug}`,
    {
      params,
    }
  );
};

export const createProduct = (
  axiosPrivate: AxiosInstance,
  product: CreateProduct
) => {
  return axiosPrivate.post("/products", product);
};

export const getDetailsProduct = (slug: string) => {
  return axiosClient.get<never, { success: boolean; product: ProductDetails }>(
    `/products/${slug}`
  );
};

export const updateProduct = (axiosPrivate: AxiosInstance) => {};

export const deleteProduct = (axiosPrivate: AxiosInstance, id: string) => {
  return axiosPrivate.delete<never, CommonResponse>(`/products/${id}`);
};
