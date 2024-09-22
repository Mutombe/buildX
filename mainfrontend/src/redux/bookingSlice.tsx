import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAxios from "../utils/authAxios";

export const fetchDetails = createAsyncThunk(
  "bookings/fetchDetails",
  async ({ id, type }, { rejectWithValue }) => {
    try {
      const endpoint = type === "unit" ? `/units/${id}` : `/properties/${id}`;
      const response = await authAxios.get(endpoint);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const bookProperty = createAsyncThunk(
  "bookings/bookProperty",
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await authAxios.post(
        `book/properties/${bookingData.property}/`,
        bookingData
      );
      console.log(
        "Property ID Booking/ Slice Post to Backend",
        bookingData.property
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const bookUnit = createAsyncThunk(
  "bookings/bookUnit",
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await authAxios.post(
        `book/unit/${bookingData.unit}/`,
        bookingData
      );
      console.log("Unit ID Booking/ Slice Post to Backend", bookingData.unit);
      return response.data;
    } catch (error) {
      console.log("Booking Error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const approveBooking = createAsyncThunk(
  "bookings/approveBooking",
  async (booking_id, { rejectWithValue }) => {
    try {
      const response = await authAxios.post(`approve/booking/${booking_id}/`);
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
      const response = await authAxios.post(`deny/booking/${booking_id}/`);
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
      const customerBookings = await authAxios.get("customer/bookings/");
      return [...response.data, ...customerBookings.data];
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    details: {},
    bookingData: {},
    unitBookings: [],
    propertyBookings: [],
    status: null,
    loading: false,
    error: null,
    allBookings: [],
  },
  reducers: {
    setBookingDetails: (state, action) => {
      state.bookingData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
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

export const { setBookingDetails } = bookingSlice.actions;
export default bookingSlice.reducer;
