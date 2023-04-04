import axiosClient from "./axiosConfig";

export const searchByText = async (params: any) => {
    return axiosClient.get("/search", { params });
};
