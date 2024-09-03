import api from "./axiosConfig";
import authAxios from "./authAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signup = (username: string, email: string, password: string) => {
  return api.post("/register", {
    username: username,
    email: email,
    password: password,
  });
};

export const login = (username: string, password: string) => {
  return api.post("/login", { username: username, password: password });
};

export const logout = () => {
  return authAxios.post("/logout");
};

export const fetchUser = () => {
  const response = api.get("/user");
  console.log(response);
  return response;
};

export const subscribeToProperty = async (
  userId: number,
  propertyId: number
) => {
  try {
    const response = await api.post("/subscriptions/", {
      user: userId,
      property: propertyId,
    });
    return response.data;
  } catch (error) {
    console.error("Error subscribing to property:", error);
    throw error;
  }
};

export const subscribing = createAsyncThunk('properties/subscribe', async (propertyId) => {
  const response = await authAxios.post(`/api/properties/${propertyId}/subscribe/`);
  return response.data
});
