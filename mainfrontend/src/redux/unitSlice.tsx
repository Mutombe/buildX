import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAxios from "../utils/authAxios";

export const addUnit = createAsyncThunk(
  "units/addUnit",
  async ({ property_id, ...unitData }) => {
    const response = await authAxios.post(`/properties/${property_id}/units/`, unitData);
    return response.data;
  }
);

const unitSlice = createSlice({
  name: "units",
  initialState: {
    units: [],
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
        state.units = action.payload;
      })
      .addCase(addUnit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default unitSlice.reducer;

