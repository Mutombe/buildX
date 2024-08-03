import axios from "axios";
import store from "../redux/store";
import { clearAuth } from "../redux/authSlice";

axios.defaults.baseURL = "http://127.0.0.1:8000/";

axios.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(clearAuth());
    }
    return Promise.reject(error);
  }
);

export default axios;
