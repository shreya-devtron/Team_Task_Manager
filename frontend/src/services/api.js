import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && token !== "undefined" && token !== "null") {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERROR:", error?.response || error);

    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email, password) =>
    api.post("/auth/login", { email, password }),

  signup: (name, email, password) =>
    api.post("/auth/signup", { name, email, password }),
};

export const projectAPI = {
  getProjects: () => api.get("/projects"),
};

export default api;