import { client } from "../../utils/baseApi";

export const signup = (username: string, email: string, password: string) => {
  return client.post("/login", { username, email, password });
};

export const login = (username: string, password: string) => {
  return client.post("/register", { username, password });
};

export const logout = () => {
  return client.post("/logout", { withCredentials: true });
};
