import { client } from "../../utils/baseApi";

export const signup = (username: string, email: string, password: string) => {
  return client.post("/register", { username: username, email: email, password: password });
};

export const login = (username: string, password: string) => {
  return client.post("/login", { username: username, password: password });
};

export const logout = () => {
  return client.post("/logout", { withCredentials: true });
};
