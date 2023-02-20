import { AxiosInstance, AxiosResponse } from "axios";
import { CommonResponse } from "~types/index.type";

export const createOrUpdateDescription = async (
    axiosPrivate: AxiosInstance,
    id: string,
    data: any
) => {
    return axiosPrivate.post(`/products/desc/${id}`, data);
};

export const deleteDescription = async (
    axiosPrivate: AxiosInstance,
    id: string
) => {
    return axiosPrivate.delete<never, AxiosResponse<CommonResponse>>(
        `/products/desc/${id}`
    );
};
