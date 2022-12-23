import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.BASE_URL_SERVER,
    withCredentials: true,
});

export default axiosClient;
