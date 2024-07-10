import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X=CSRFToken";
axios.defaults.withCredentials = true;

export const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const signup = (username: string, email: string, password: string) => {
  return client.post("/login", { username, email, password });
};

export const login = (username: string, password: string) => {
  return client.post("/register", { username, password });
};

export const logout = () => {
  return client.post("/logout", { withCredentials: true  });
};

