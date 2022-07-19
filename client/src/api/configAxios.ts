import axios, {AxiosResponse} from 'axios';
import queryString from 'query-string';

const configAxios = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

configAxios.interceptors.request.use(async (config) => {
    // handle token here
    return config;
})

configAxios.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data
    }
    return response;
    }, (error) => {
        throw error;
    }
);

export default configAxios