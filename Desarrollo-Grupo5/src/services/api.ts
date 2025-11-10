import axios from "axios";

const api = axios.create({
  baseURL: "/", // 
});

// Interceptor para agregar Authorization si hay token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;