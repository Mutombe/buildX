import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

export const authAxios = axios.create({
  baseURL: "http://127.0.0.1:8000",

  headers: {
    Authorization: `Token ${localStorage.getItem("token")}`,
  },
});

export default authAxios;
