import { AxiosInstance, AxiosResponse } from "axios";
import { CommonResponse } from "~types/index.type";
import {
    CreateProduct,
    ProductByCategory,
    ProductDetails,
} from "~types/product.type";
import axiosClient from "./axiosConfig";

export const getAllProducts = async (params?: any) => {
    return axiosClient
        .get<never, AxiosResponse>("/products", params)
        .then((data) => data.data);
};

export const getProductByCategory = async (slug: string, params?: any) => {
    return axiosClient
        .get<
            never,
            AxiosResponse<{ success: boolean; data: ProductByCategory }>
        >(`/products/category/${slug}`, {
            params,
        })
        .then((data) => data.data);
};

export const createProduct = (
    axiosPrivate: AxiosInstance,
    product: CreateProduct
) => {
    return axiosPrivate.post("/products", product);
};

export const getDetailsProduct = async (slug: string) => {
    return axiosClient
        .get<
            never,
            AxiosResponse<{ success: boolean; product: ProductDetails }>
        >(`/products/${slug}`)
        .then((data) => data.data);
};

export const updateProduct = (
    axiosPrivate: AxiosInstance,
    id: string,
    data: any
) => {
    return axiosPrivate.put(`/products/${id}`, data);
};

export const deleteProduct = (axiosPrivate: AxiosInstance, id: string) => {
    return axiosPrivate.delete<never, AxiosResponse<CommonResponse>>(
        `/products/${id}`
    );
};

// upload img
interface ImagesRes {
    success: boolean;
    thumb: string;
    images: string[];
}
export const uploadImg = (axiosPrivate: AxiosInstance, data: FormData) => {
    return axiosPrivate.post<never, AxiosResponse<ImagesRes>>(
        "/images/upload",
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
};
