import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_SERVER,
    headers: {
        'content-type': 'application/json',
    },
    withCredentials: true,
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default axiosClient;
