import { AxiosInstance } from 'axios';

export const getFilter = (axiosClient: AxiosInstance) => {
    return axiosClient.get('/category/filter');
};
