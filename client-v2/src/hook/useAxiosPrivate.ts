import axiosClient from '~api/axiosConfig';
import { useEffect, useContext } from 'react';
import { AuthContext } from '~context/AuthProvider';

const useAxiosPrivate = () => {
    const { auth } = useContext(AuthContext);
    useEffect(() => {
        const axiosClientRequest = axiosClient.interceptors.request.use(
            (config) => {
                if (!config.headers!['Auhthorization']) {
                    config.headers!['Auhthorization'] = `Bearer ${auth?.token}`;
                }
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
    }, []);

    return axiosClient;
};

// export const useAxiosClient = () => {
//     useEffect(() => {
//         const axiosClientResponse = axiosClient.interceptors.response.use(
//             (response) => {
//                 if (response && response.data) {
//                     return response.data;
//                 }
//                 return response;
//             },
//             (err) => {
//                 return Promise.reject(err);
//             }
//         );
//         return () => {
//             axiosClient.interceptors.response.eject(axiosClientResponse);
//         };
//     }, []);

//     return axiosClient;
// };

export default useAxiosPrivate;
