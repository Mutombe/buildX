import { client } from "./baseApiUtil";
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from "./axiosConfig";

export const signup = (username: string, email: string, password: string) => {
  return api.post("/register", {
    username: username,
    email: email,
    password: password,
  });
};

export const login = (username: string, password: string) => {
  return client.post("/login", { username: username, password: password });
};

export const logout = () => {
  return client.post("/logout");
};

export const fetchUser = () => {
    return api.get("/user/");
  };

export const fetchProperties = createAsyncThunk('properties/fetchProperties', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/properties/');
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchUnits = createAsyncThunk('units/fetchUnits', async (propertyId) => {
    const response = await api.get(`/properties/${propertyId}/units/`);
    return response.data;
  });

export const fetchUserProperties = createAsyncThunk('properties/fetchUserProperties', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/user/properties/');
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await api.get('/categories/');
    return response.data;
});

export const createProperty = createAsyncThunk('properties/createProperty', async (propertyData: any, { rejectWithValue }) => {
    try {
        const formData = new FormData();
        for (const key in propertyData) {
            console.log(key)
            if (key === 'images') {
                console.log("Images", key)
                propertyData[key].forEach((image: File) => {
                    formData.append('images', image);
                });
            } else {
                formData.append(key, propertyData[key]);
            }
        }
 
        const response = await api.post('/properties/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response?.data;
    } catch (error: any) {
        console.error("Error in createProperty:", error);
        return rejectWithValue(error.response?.data);
    }
});

export const subscribeToProperty = async (userId: number, propertyId: number) => {
    try {
        const response = await api.post('/subscriptions/', {
            user: userId,
            property: propertyId
        });
        return response.data;
    } catch (error) {
        console.error('Error subscribing to property:', error);
        throw error;
    }
};


export const updateProperty = createAsyncThunk('properties/updateProperty', async ({ id, propertyData }, { rejectWithValue }) => {
    try {
        const response = await api.put(`/properties/${id}/`, propertyData);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});

export const deleteProperty = createAsyncThunk('properties/deleteProperty', async (id, { rejectWithValue }) => {
    try {
        await api.delete(`/properties/${id}/`);
        return id;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});