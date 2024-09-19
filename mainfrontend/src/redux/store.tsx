import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import propertyReducer from "./propertySlice"
import categoryReducer from './categorySlice';
import unitReducer from "./unitSlice"
import bookingReducer from "./bookingSlice"
import subscriptionReducer from "./subscriptionSlice";

const store: any = configureStore({
  reducer: {
    auth: authReducer,
    properties: propertyReducer,
    categories: categoryReducer,
    units: unitReducer,
    bookings: bookingReducer,
    subscription: subscriptionReducer,
  },
});

export default store;
