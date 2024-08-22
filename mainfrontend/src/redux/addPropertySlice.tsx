import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axiosConfig";

export const uploadProperty = createAsyncThunk(
  "property/uploadProperty",
  async (propertyData, { rejectWithValue }) => {
    try {
      const response = await api.post("/properties/", propertyData, {
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const propertySlice = createSlice({
  name: "property",
  initialState: {
    properties: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.properties.push(action.payload);
        console.log(
          "Property data getting pushed to the database: ",
          action.payload
        );
      })
      .addCase(uploadProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default propertySlice.reducer;
