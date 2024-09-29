import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAxios from "../utils/authAxios";

export const fetchUnits = createAsyncThunk("units/fetchUnits", async () => {
  const response = await authAxios.get(`/units/`);
  return response.data;
});

export const addUnit = createAsyncThunk(
  "units/addUnit",
  async ({ property_id, formData }) => {
    try {
      const response = await authAxios.post(
        `/properties/${property_id}/units/`,
        formData
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  }
);

export const updateUnit = createAsyncThunk(
  "units/updateUnit",
  async ({ id, unitData }, { rejectWithValue }) => {
    try {
      const response = await authAxios.put(
        `user/properties/units/${id}/`,
        unitData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUnit = createAsyncThunk(
  "units/deleteUnit",
  async (id, { rejectWithValue }) => {
    try {
      await authAxios.delete(`user/properties/units/${id}/`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
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
        state.units.push(action.payload);
        console.log("Uploaded Unit", action.payload);
      })
      .addCase(addUnit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUnits.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUnits.fulfilled, (state, action) => {
        state.units = action.payload;
        console.log("Fetched Units", action.payload);
      })
      .addCase(fetchUnits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUnit.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUnit.fulfilled, (state, action) => {
        const index = state.units.findIndex(
          (unit) => unit.id === action.payload.id
        );
        if (index !== -1) {
          state.units[index] = action.payload;
        }
      })
      .addCase(updateUnit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUnit.fulfilled, (state, action) => {
        state.units = state.units.filter(
          (unit: any) => unit.id !== action.payload
        );
      });
  },
});

export default unitSlice.reducer;
