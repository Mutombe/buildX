import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAxios from "../utils/authAxios";

export const bookProperty = createAsyncThunk(
  "bookings/bookingProperty",
  async (property_id, { rejectWithValue }) => {
    try {
      const response = await authAxios.post(`book/property/${property_id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const bookUnit = createAsyncThunk(
  "bookings/bookingUnit",
  async (unit_id, { rejectWithValue }) => {
    try {
      const response = await authAxios.post(`book/unit/${unit_id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBookings = createAsyncThunk(
  "bookings/fetchOwnerBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAxios.get("/api/booking/owner/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const approveBooking = createAsyncThunk(
  "bookings/approveBooking",
  async (booking_id, { rejectWithValue }) => {
    try {
      const response = await authAxios.post(`approve/booking/${booking_id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const denyBooking = createAsyncThunk(
  "bookings/denyBooking",
  async (booking_id, { rejectWithValue }) => {
    try {
      const response = await authAxios.post(`approve/booking/${booking_id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const manageBookings = createAsyncThunk(
  "bookings/manageBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAxios.get("manage/bookings/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    unitBookings: [],
    propertyBookings: [],
    status: null,
    loading: false,
    error: null,
    allBookings: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(bookProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.propertyBookings.push(action.payload);
      })
      .addCase(bookProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(bookUnit.pending, (state) => {
        state.loading = true;
      })
      .addCase(bookUnit.fulfilled, (state, action) => {
        state.loading = false;
        state.unitBookings.push(action.payload);
      })
      .addCase(bookUnit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(approveBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(approveBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;
      })
      .addCase(approveBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(denyBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(denyBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;
      })
      .addCase(denyBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(manageBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(manageBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.allBookings = action.payload;
      })
      .addCase(manageBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingSlice.reducer;
