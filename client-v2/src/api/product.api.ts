import { AxiosInstance } from 'axios';
import { CommonResponse } from '~types/index.type';
import {
    CreateProduct,
    ProductByCategory,
    ProductDetails,
} from '~types/product.type';

export const getAllProducts = (axiosClient: AxiosInstance) => {
    return axiosClient.get('/products');
};

export const getProductByCategory = (
    axiosClient: AxiosInstance,
    slug: string
) => {
    return axiosClient.get<
        never,
        { success: boolean; data: ProductByCategory }
    >(`/products/category/${slug}`);
};

export const createProduct = (
    axiosPrivate: AxiosInstance,
    product: CreateProduct
) => {
    return axiosPrivate.post('/products', product);
};

export const getDetailsProduct = (aixosClient: AxiosInstance, id: string) => {
    return aixosClient.get<never, ProductDetails>(`/products/${id}`);
};

export const updateProduct = (axiosPrivate: AxiosInstance) => {};

export const deleteProduct = (axiosPrivate: AxiosInstance, id: string) => {
    return axiosPrivate.delete<never, CommonResponse>(`/products/${id}`);
};
