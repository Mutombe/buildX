import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    Authorization: `Token ${localStorage.getItem("token")}`,
  },
});

api.interceptors.request.use(
  (config) => {
    console.log(config.headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
