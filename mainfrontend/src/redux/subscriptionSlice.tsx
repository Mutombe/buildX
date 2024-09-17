import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAxios from "../utils/authAxios";

export const subscribeToProperty = createAsyncThunk(
  "subscription/subscribeToProperty",
  async ({ property_id }, { rejectWithValue }) => {
    try {
      const response = await authAxios.post(`/subscribe/${property_id}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const unsubscribeFromProperty = createAsyncThunk(
  "subscription/unsubscribeFromProperty",
  async ({ property_id }, { rejectWithValue }) => {
    try {
      const response = await authAxios.delete(`/unsubscribe/${property_id}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const checkSubscriptionStatus = createAsyncThunk(
  "subscription/checkSubscriptionStatus",
  async ({ property_id }, { rejectWithValue }) => {
    try {
      const response = await authAxios.get(`/check-subscription-status/${property_id}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    isSubscribed: false, // Tracks whether the user is subscribed
    success: false,
    error: null,
  },
  reducers: {
    toggleSubscription: (state) => {
      state.isSubscribed = !state.isSubscribed;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(subscribeToProperty.fulfilled, (state) => {
        state.isSubscribed = true;
      })
      .addCase(unsubscribeFromProperty.fulfilled, (state) => {
        state.isSubscribed = false;
      })
      .addCase(checkSubscriptionStatus.fulfilled, (state, action) => {
        state.isSubscribed = action.payload.is_subscribed;
      });
  },
});

export const { toggleSubscription } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
