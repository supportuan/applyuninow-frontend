import axios from 'axios'
import { authHeader } from '../config/auth-header';
import { environment } from '../environments/environment'
export const api = axios.create({
    baseURL: environment.API_BASE_URL,
})

api.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.clear();
                window.location.href = '/';
            }
        }
        throw(error) 
    });

export default api;
