import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_BASE_URL;

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("@budgetapp:token");
      localStorage.removeItem("@budgetapp:user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
