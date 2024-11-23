import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  // baseURL: import.meta.env.VITE_PROD_BACKEND_URL || "http://localhost:8000",
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
