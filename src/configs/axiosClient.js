import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_API,
    Headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axios.interceptors.response.use(
    function (response) {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    function (error) {
        return Promise.reject(error);
    },
);

export default axiosClient;
