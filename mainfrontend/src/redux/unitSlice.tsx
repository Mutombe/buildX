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
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addUnit.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export default unitSlice.reducer;

