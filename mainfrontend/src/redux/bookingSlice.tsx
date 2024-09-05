import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const submitBookingRequest = createAsyncThunk(
  'bookings/submitBookingRequest',
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/booking/request/', bookingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOwnerBookings = createAsyncThunk(
  'bookings/fetchOwnerBookings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/booking/owner/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const approveBooking = createAsyncThunk(
    'bookings/approveBooking',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get('/api/booking/owner/');
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);
  
export const denyBooking = createAsyncThunk(
    'bookings/denyBooking',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get('/api/booking/owner/');
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );


export const manageBookingRequest = createAsyncThunk(
  'bookings/manageBookingRequest',
  async ({ bookingId, action }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/booking/manage/${bookingId}/`, { action });
      return { bookingId, status: action };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
    status: null,
    loading: false,
    error: null,
    ownerBookings: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle booking request submission
    builder.addCase(submitBookingRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(submitBookingRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.bookings.push(action.payload);  // Add new booking to the state
    });
    builder.addCase(submitBookingRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle fetching owner's booking requests
    builder.addCase(fetchOwnerBookings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOwnerBookings.fulfilled, (state, action) => {
      state.loading = false;
      state.ownerBookings = action.payload;  // Store owner's booking requests
    });
    builder.addCase(fetchOwnerBookings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle approving/disapproving booking requests
    builder.addCase(manageBookingRequest.fulfilled, (state, action) => {
      const booking = state.ownerBookings.find(b => b.id === action.payload.bookingId);
      if (booking) {
        booking.status = action.payload.status;  // Update the booking status
      }
    });
  },
});

export default bookingSlice.reducer;
