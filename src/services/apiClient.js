import axios from 'axios';
import { HTTP_STATUS } from '../types';

let _token = null;

export function setAuthToken(token) {
  _token = token;
}

export function clearAuthToken() {
  _token = null;
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

apiClient.interceptors.request.use(
  (config) => {
    if (_token) {
      config.headers.Authorization = `Bearer ${_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === HTTP_STATUS.UNAUTHORIZED) {
      clearAuthToken();
    }
    return Promise.reject(error);
  }
);

export default apiClient;