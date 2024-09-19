import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAxios from "../utils/authAxios";

export const subscribeToProperty = createAsyncThunk(
  "subscription/subscribeToProperty",
  async ({ property_id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await authAxios.post(
        `/properties/${property_id}/subscribe/`
        );
        dispatch(subscriptionSlice.actions.toggleSubscription(property_id));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const unsubscribeFromProperty = createAsyncThunk(
  "subscription/unsubscribeFromProperty",
  async ({ property_id }, { rejectWithValue, dispatch }) => {
    try {
        const response = await authAxios.delete(`/unsubscribe/${property_id}/`);
        dispatch(subscriptionSlice.actions.toggleSubscription(property_id));
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
      const response = await authAxios.get(
        `/subscription_status/${property_id}/`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const subscriptionSlice = createSlice({
    name: "subscription",
    initialState: {
      subscriptions: {},  // Track subscription status for each property
      error: null,
    },
    reducers: {
      toggleSubscription: (state, action) => {
        const propertyId = action.payload;
        state.subscriptions[propertyId] = !state.subscriptions[propertyId];
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(subscribeToProperty.fulfilled, (state, action) => {
          const propertyId = action.meta.arg.property_id;
          state.subscriptions[propertyId] = true;
        })
        .addCase(unsubscribeFromProperty.fulfilled, (state, action) => {
          const propertyId = action.meta.arg.property_id;
          state.subscriptions[propertyId] = false;
        })
        .addCase(checkSubscriptionStatus.fulfilled, (state, action) => {
          console.log(action.payload);
          const { property_id, is_subscribed } = action.payload;
          state.subscriptions[property_id] = is_subscribed;
        });
    },
  });
  
export const { toggleSubscription } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
