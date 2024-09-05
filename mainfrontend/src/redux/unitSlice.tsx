import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAxios from "../utils/authAxios";

export const addUnit = createAsyncThunk(
  "units/addUnit",
  async ({ property_id, formData }) => {
    try {
      const response = await authAxios.post(
        `/property/${property_id}/units/`,
        formData,
      );
      console.log("Unit data and Property ID", formData, property_id)
      console.log("Response.data", response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  }
);

const unitSlice = createSlice({
  name: "units",
  initialState: {
    unit: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUnit.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUnit.fulfilled, (state, action) => {
        state.unit.push(action.payload);
        console.log("Uploaded Unit", action.payload)
      })
      .addCase(addUnit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default unitSlice.reducer;
