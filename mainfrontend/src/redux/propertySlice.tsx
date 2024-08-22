import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/baseApiUtil";

export const fetchProperties = createAsyncThunk(
  "properties/fetchProperties",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/properties/");
      console.log(response);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUnits = createAsyncThunk(
  "units/fetchUnits",
  async (propertyId) => {
    const response = await api.get(`/properties/${propertyId}/units/`);
    return response.data;
  }
);

export const fetchUserProperties = createAsyncThunk(
  "properties/fetchUserProperties",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/properties/");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProperty = createAsyncThunk(
  "properties/updateProperty",
  async ({ id, propertyData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/properties/${id}/`, propertyData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProperty = createAsyncThunk(
  "properties/deleteProperty",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/properties/${id}/`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createProperty = createAsyncThunk(
  "properties/createProperty",
  async (propertyData: any, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in propertyData) {
        console.log(key);
        if (key === "images") {
          console.log("Images", key);
          propertyData[key].forEach((image: File) => {
            formData.append("images", image);
          });
        } else {
          formData.append(key, propertyData[key]);
        }
      }

      const response = await api.post("/properties/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response?.data;
    } catch (error: any) {
      console.error("Error in createProperty:", error);
      return rejectWithValue(error.response?.data);
    }
  }
);

const propertySlice = createSlice({
  name: "properties",
  initialState: {
    properties: [],
    userProperties: [],
    token: localStorage.getItem("token") || null,
    units: [],
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.properties = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchProperties.rejected, (state: any, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(fetchUnits.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUnits.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.units = action.payload;
      })
      .addCase(fetchUnits.rejected, (state: any, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(fetchUserProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userProperties = action.payload;
      })
      .addCase(fetchUserProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProperty.fulfilled, (state, action: any) => {
        state.userProperties.push(action.payload);
        console.log(action.payload);
      })
      .addCase(updateProperty.fulfilled, (state: any, action) => {
        const index = state.userProperties.findIndex(
          (property: any) => property.id === action.payload.id
        );
        if (index !== -1) {
          state.userProperties[index] = action.payload;
        }
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.userProperties = state.userProperties.filter(
          (property: any) => property.id !== action.payload
        );
      });
  },
});

export default propertySlice.reducer;
