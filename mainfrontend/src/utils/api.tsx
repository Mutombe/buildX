import { client } from "./baseApiUtil";
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

export const signup = (username: string, email: string, password: string) => {
  return client.post("/register", {
    username: username,
    email: email,
    password: password,
  });
};

export const login = (username: string, password: string) => {
  return client.post("/login", { username: username, password: password });
};

export const logout = () => {
  return client.post("/logout", { withCredentials: true });
};

export const fetchProperties = createAsyncThunk('properties/fetchProperties', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/properties/');
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchUnits = createAsyncThunk('units/fetchUnits', async (propertyId) => {
    const response = await axios.get(`http://127.0.0.1:8000/properties/${propertyId}/units/`);
    return response.data;
  });

export const fetchUserProperties = createAsyncThunk('properties/fetchUserProperties', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('/user/properties/');
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});

export const createProperty = createAsyncThunk('properties/createProperty', async (propertyData: any, { rejectWithValue }) => {
  try {
      const formData = new FormData();
      for (const key in propertyData) {
          if (key === 'images') {
              propertyData[key].forEach((image: File) => {
                  formData.append('images', image);
              });
          } else {
              formData.append(key, propertyData[key]);
          }
      }

      const response = await axios.post('/properties/', formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
      return response.data;
  } catch (error: any) {
      return rejectWithValue(error.response.data);
  }
});

export const updateProperty = createAsyncThunk('properties/updateProperty', async ({ id, propertyData }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/properties/${id}/`, propertyData);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});

export const deleteProperty = createAsyncThunk('properties/deleteProperty', async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`/properties/${id}/`);
        return id;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});