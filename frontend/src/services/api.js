import axios from "axios";

const API = axios.create({
  baseURL: "https://teamtaskmanager-production-cf93.up.railway.app/api"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;