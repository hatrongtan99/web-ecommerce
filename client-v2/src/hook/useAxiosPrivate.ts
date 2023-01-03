import axiosClient from '~api/axiosConfig';
import { useEffect } from 'react';

const useAxiosPrivate = () => {
    useEffect(() => {
        const axiosClientRequest = axiosClient.interceptors.request.use(
            (config) => {
                return config;
            },
            (err) => {
                return Promise.reject(err);
            }
        );

        const axiosClientResponse = axiosClient.interceptors.response.use(
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

        return () => {
            axiosClient.interceptors.request.eject(axiosClientRequest);
            axiosClient.interceptors.response.eject(axiosClientResponse);
        };
    });

    return axiosClient;
};

export default useAxiosPrivate;
