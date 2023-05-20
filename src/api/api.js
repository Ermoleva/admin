import axios from "axios";
import tokens from "./tokens";
import auth from './auth';

const api = axios.create({
    // baseURL: "http://176.57.68.130:2956/api",
    baseURL: "http://localhost:8080/api",
    withCredentials: false,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
});

api.interceptors.request.use(
    async config => {
        config.headers = { 
            'authorization': tokens.getToken()
        }
        return config;
    },
    error => Promise.reject(error)
);
  
api.interceptors.response.use(r => r, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        await auth.refresh();
        axios.defaults.headers.common['authorization'] = tokens.getToken();
        return api(originalRequest);
    }
    return Promise.reject(error);
});

export default api;