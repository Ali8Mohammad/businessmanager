import axios, { AxiosError } from "axios";

const API_BASE = "https://accountant.tap2see.net/app/public/api/v1";

export const axiosAPI = axios.create({
  baseURL: API_BASE,
  headers: {
    Accept: "application/json",
  },
});

axiosAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosAPI.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosAPI;
