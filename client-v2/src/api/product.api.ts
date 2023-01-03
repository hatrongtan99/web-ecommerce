import { AxiosInstance } from 'axios';
import { CommonResponse } from '~types/index.type';
import { CreateProduct, ProductDetails } from '~types/product.type';

export const getAllProducts = (axiosPrivate: AxiosInstance) => {
    return axiosPrivate.get('/products');
};

export const createProduct = (
    axiosPrivate: AxiosInstance,
    product: CreateProduct
) => {
    return axiosPrivate.post('/products', product);
};

export const getDetailsProduct = (axiosPrivate: AxiosInstance, id: string) => {
    return axiosPrivate.get<never, ProductDetails>(`/products/${id}`);
};

export const updateProduct = (axiosPrivate: AxiosInstance) => {};

export const deleteProduct = (axiosPrivate: AxiosInstance, id: string) => {
    return axiosPrivate.delete<never, CommonResponse>(`/products/${id}`);
};
