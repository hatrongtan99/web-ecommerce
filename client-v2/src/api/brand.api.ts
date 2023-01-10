import { AxiosInstance, AxiosResponse } from 'axios';
import { Brands, CreateBrand } from '~types/brand.type';

export const getAllBrand = (axiosClient: AxiosInstance) => {
    return axiosClient.get<never, { success: boolean; brands: Brands[] }>(
        '/brands'
    );
};

export const createNewBrand = (
    axiosPrivate: AxiosInstance,
    newBrand: CreateBrand
) => {
    return axiosPrivate.post('/brands', newBrand);
};
